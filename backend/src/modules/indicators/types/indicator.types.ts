import type { PrismaClient } from '@prisma/client';

export const INDICATOR_CATEGORIES = [
  'operation',
  'resources',
  'quality',
  'financial',
] as const;
export type IndicatorCategory = (typeof INDICATOR_CATEGORIES)[number];

export const INDICATOR_UNITS = [
  'count',
  'percentage',
  'currency',
  'duration',
  'distance',
] as const;
export type IndicatorUnit = (typeof INDICATOR_UNITS)[number];

export const INDICATOR_FILTER_KEYS = [
  'baseId',
  'routeId',
  'driverId',
  'vehicleId',
  'clientId',
] as const;
export type IndicatorFilterKey = (typeof INDICATOR_FILTER_KEYS)[number];

export const INDICATOR_GRANULARITIES = ['realtime', 'day', 'week', 'month'] as const;
export type IndicatorGranularity = (typeof INDICATOR_GRANULARITIES)[number];

export type IndicatorStatus = 'available' | 'planned';
export type IndicatorTrendDirection = 'higher' | 'lower' | 'target';

export interface IndicatorDefinition {
  key: string;
  name: string;
  description: string;
  formula: string;
  unit: IndicatorUnit;
  betterWhen: IndicatorTrendDirection;
  category: IndicatorCategory;
  dataSources: string[];
  acceptedFilters: IndicatorFilterKey[];
  granularities: IndicatorGranularity[];
  permissions: string[];
  formulaVersion: number;
  status: IndicatorStatus;
  calculator?: IndicatorCalculatorKey;
  tags?: string[];
}

export interface IndicatorValueContext {
  period: {
    start: string;
    end: string;
  };
  filters: Partial<Record<IndicatorFilterKey, string | undefined>>;
  notes?: string[];
  metadata?: Record<string, unknown>;
}

export interface IndicatorValuePayload {
  key: string;
  name: string;
  unit: IndicatorUnit;
  betterWhen: IndicatorTrendDirection;
  value: number | null;
  status: IndicatorStatus;
  availability: 'ready' | 'planned';
  context: IndicatorValueContext;
}

export interface IndicatorQueryResolvedFilters {
  startDate: Date;
  endDate: Date;
  timezone: string;
  baseId?: string;
  routeId?: string;
  driverId?: string;
  vehicleId?: string;
  clientId?: string;
}

export interface IndicatorCalculatorResult {
  value: number | null;
  sampleSize?: number;
  total?: number;
  notes?: string[];
  metadata?: Record<string, unknown>;
}

export interface IndicatorCalculatorContext {
  companyId: string;
  filters: IndicatorQueryResolvedFilters;
  prisma: PrismaClient;
}

export type IndicatorCalculator = (
  context: IndicatorCalculatorContext,
) => Promise<IndicatorCalculatorResult>;

export type IndicatorCalculatorKey =
  | 'operations_total'
  | 'operations_completed'
  | 'operations_in_progress'
  | 'operations_awaiting_planning'
  | 'operations_delayed'
  | 'operations_completion_rate'
  | 'deliveries_completed'
  | 'occurrences_open'
  | 'vehicles_unavailable'
  | 'drivers_without_allocation';
