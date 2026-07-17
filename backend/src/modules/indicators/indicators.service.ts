import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { PrismaService } from '../../common/database/prisma.service';
import { INDICATOR_CATALOG, findIndicatorDefinition } from './catalog/indicator-catalog';
import { INDICATOR_CALCULATORS } from './calculators/indicator-calculators';
import type {
  IndicatorDefinition,
  IndicatorFilterKey,
  IndicatorValueContext,
  IndicatorValuePayload,
  IndicatorQueryResolvedFilters,
} from './types/indicator.types';
import type { IndicatorQueryDto } from './dto/query-indicator.dto';

type ContextFilterRecord = Partial<Record<IndicatorFilterKey | 'period', string | undefined>>;

const DEFAULT_TIMEZONE = 'America/Sao_Paulo';
const MAX_RANGE_DAYS = 90;

@Injectable()
export class IndicatorsService {
  constructor(private readonly prisma: PrismaService) {}

  listDefinitions() {
    return INDICATOR_CATALOG;
  }

  getDefinition(key: string) {
    return this.findDefinitionOrThrow(key);
  }

  async getIndicatorValue(
    key: string,
    query: IndicatorQueryDto,
    companyId: string,
  ): Promise<IndicatorValuePayload> {
    const definition = this.findDefinitionOrThrow(key);
    const { range, contextFilters, resolvedFilters, notes: filterNotes } =
      this.resolveFilters(definition, query);

    const context = this.buildContext(range, contextFilters, filterNotes);

    if (definition.status !== 'available' || !definition.calculator) {
      return this.buildPlannedPayload(definition, context, ['Indicador em planejamento']);
    }

    const calculator = INDICATOR_CALCULATORS[definition.calculator];

    if (!calculator) {
      return this.buildPlannedPayload(definition, context, ['Calculadora não implementada']);
    }

    const result = await calculator({
      prisma: this.prisma,
      companyId,
      filters: resolvedFilters,
    });

    return this.buildPayload(definition, context, result);
  }

  async getBatchValues(
    keys: string[],
    query: IndicatorQueryDto,
    companyId: string,
  ): Promise<IndicatorValuePayload[]> {
    const uniqueKeys = [...new Set(keys)];
    return Promise.all(uniqueKeys.map((key) => this.getIndicatorValue(key, query, companyId)));
  }

  private findDefinitionOrThrow(key: string): IndicatorDefinition {
    const definition = findIndicatorDefinition(key);
    if (!definition) {
      throw new NotFoundException('Indicador não encontrado');
    }
    return definition;
  }

  private resolveFilters(
    definition: IndicatorDefinition,
    query: IndicatorQueryDto,
  ): {
    range: { start: DateTime; end: DateTime; timezone: string };
    contextFilters: ContextFilterRecord;
    resolvedFilters: IndicatorQueryResolvedFilters;
    notes: string[];
  } {
    const timezone = query.timezone ?? DEFAULT_TIMEZONE;
    const end = query.endDate
      ? DateTime.fromISO(query.endDate, { zone: timezone })
      : DateTime.now().setZone(timezone);
    if (!end.isValid) {
      throw new BadRequestException('Data final inválida');
    }

    const start = query.startDate
      ? DateTime.fromISO(query.startDate, { zone: timezone })
      : end.startOf('day');
    if (!start.isValid) {
      throw new BadRequestException('Data inicial inválida');
    }

    if (start > end) {
      throw new BadRequestException('Data inicial não pode ser posterior à final');
    }

    const diff = end.diff(start, 'days').days;
    if (diff > MAX_RANGE_DAYS) {
      throw new BadRequestException(`Período máximo de ${MAX_RANGE_DAYS} dias`);
    }

    const acceptedFilters = new Set(definition.acceptedFilters);
    const requestedFilters: ContextFilterRecord = {
      baseId: query.baseId,
      routeId: query.routeId,
      driverId: query.driverId,
      vehicleId: query.vehicleId,
      clientId: query.clientId,
      period: undefined,
    };

    const contextFilters: ContextFilterRecord = {
      baseId: undefined,
      routeId: undefined,
      driverId: undefined,
      vehicleId: undefined,
      clientId: undefined,
      period: undefined,
    };

    const filterNotes: string[] = [];
    const appliedFilters: Partial<Record<IndicatorFilterKey, string>> = {};

    (Object.entries(requestedFilters) as [IndicatorFilterKey, string | undefined][]).forEach(
      ([filterKey, value]) => {
        if (!value) return;
        if (acceptedFilters.has(filterKey)) {
          appliedFilters[filterKey] = value;
          contextFilters[filterKey] = value;
        } else {
          filterNotes.push(`Filtro ${filterKey} ignorado para ${definition.name}`);
        }
      },
    );

    const range = { start, end, timezone };

    const resolvedFilters: IndicatorQueryResolvedFilters = {
      startDate: start.toUTC().toJSDate(),
      endDate: end.toUTC().toJSDate(),
      timezone,
      ...appliedFilters,
    };

    return { range, contextFilters, resolvedFilters, notes: filterNotes };
  }

  private buildContext(
    range: { start: DateTime; end: DateTime; timezone: string },
    contextFilters: ContextFilterRecord,
    notes: string[],
  ): IndicatorValueContext {
    const period = {
      start: this.formatIso(range.start, range.timezone),
      end: this.formatIso(range.end, range.timezone),
    };
    if (contextFilters.period === undefined) {
      contextFilters.period = `${period.start}__${period.end}`;
    }
    return {
      period,
      filters: contextFilters,
      notes: notes.length ? notes : undefined,
    };
  }

  private formatIso(date: DateTime, timezone: string): string {
    const zoned = date.setZone(timezone);
    if (zoned.isValid) {
      return zoned.toISO() ?? new Date(zoned.toMillis()).toISOString();
    }
    const utc = date.toUTC();
    if (utc.isValid) {
      return utc.toISO() ?? new Date(utc.toMillis()).toISOString();
    }
    return new Date(date.toMillis()).toISOString();
  }

  private buildPayload(
    definition: IndicatorDefinition,
    context: IndicatorValueContext,
    result: { value: number | null; notes?: string[]; metadata?: Record<string, unknown>; sampleSize?: number; total?: number } | undefined,
  ): IndicatorValuePayload {
    const combinedNotes = [
      ...(context.notes ?? []),
      ...(result?.notes ?? []),
    ].filter(Boolean) as string[];

    const metadata = {
      ...(context.metadata ?? {}),
      ...(result?.metadata ?? {}),
      ...(result?.sampleSize !== undefined ? { sampleSize: result.sampleSize } : {}),
      ...(result?.total !== undefined ? { total: result.total } : {}),
    };

    return {
      key: definition.key,
      name: definition.name,
      unit: definition.unit,
      betterWhen: definition.betterWhen,
      value: result?.value ?? null,
      status: definition.status,
      availability: definition.status === 'available' ? 'ready' : 'planned',
      context: {
        ...context,
        notes: combinedNotes.length ? combinedNotes : undefined,
        metadata: Object.keys(metadata).length ? metadata : context.metadata,
      },
    };
  }

  private buildPlannedPayload(
    definition: IndicatorDefinition,
    context: IndicatorValueContext,
    extraNotes: string[],
  ): IndicatorValuePayload {
    const notes = [...(context.notes ?? []), ...extraNotes];
    return {
      key: definition.key,
      name: definition.name,
      unit: definition.unit,
      betterWhen: definition.betterWhen,
      value: null,
      status: definition.status,
      availability: 'planned',
      context: {
        ...context,
        notes,
      },
    };
  }
}
