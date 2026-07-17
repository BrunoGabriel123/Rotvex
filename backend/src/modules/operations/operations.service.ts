import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, OperationStatus, OperationPriority, OperationStopType } from '@prisma/client';
import { PrismaService } from '../../common/database/prisma.service';
import type { CreateOperationDto } from './dto/create-operation.dto';
import type { UpdateOperationDto } from './dto/update-operation.dto';
import type { FilterOperationsDto } from './dto/filter-operations.dto';
import type { ChangeOperationStatusDto } from './dto/change-operation-status.dto';
import type { AssignDriverDto } from './dto/assign-driver.dto';
import type { AssignVehicleDto } from './dto/assign-vehicle.dto';
import type { CreateOperationStopDto } from './dto/create-operation-stop.dto';
import type { UpdateOperationStopDto } from './dto/update-operation-stop.dto';
import type { ReorderOperationStopsDto } from './dto/reorder-operation-stops.dto';
import type { CurrentUserData } from '../../common/decorators/current-user.decorator';
import {
  OPERATION_PRIORITY_VALUES,
  type OperationPriorityValue,
  OPERATION_STOP_TYPE_VALUES,
  type OperationStopTypeValue,
  OPERATION_STATUS_VALUES,
  type OperationStatusValue,
} from './constants/operation.constants';
import { OperationStatusMachine } from './operation-status.machine';

const OPERATION_RELATIONS = {
  client: true,
  order: true,
  route: true,
  driver: true,
  vehicle: true,
  stops: {
    orderBy: { sequence: 'asc' as const },
  },
  statusHistory: {
    orderBy: { createdAt: 'desc' as const },
    include: { changedBy: true },
  },
} satisfies Prisma.OperationInclude;

type OperationWithRelations = Prisma.OperationGetPayload<{
  include: typeof OPERATION_RELATIONS;
}>;

type OperationWithStops = Prisma.OperationGetPayload<{ include: { stops: true } }>;

const ACTIVE_STATUSES: OperationStatus[] = [
  OperationStatus.AWAITING_PLANNING,
  OperationStatus.PLANNED,
  OperationStatus.READY_TO_START,
  OperationStatus.IN_PICKUP,
  OperationStatus.IN_TRANSIT,
  OperationStatus.IN_DELIVERY,
];

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = OPERATION_RELATIONS;

  async createOperation(dto: CreateOperationDto, user: CurrentUserData) {
    await this.ensureClient(user.companyId, dto.clientId);
    await this.ensureOptionalRelation(user.companyId, dto.orderId, 'order');
    await this.ensureOptionalRelation(user.companyId, dto.routeId, 'route');
    if (dto.driverId) {
      await this.ensureOptionalRelation(user.companyId, dto.driverId, 'driver');
    }
    if (dto.vehicleId) {
      await this.ensureOptionalRelation(
        user.companyId,
        dto.vehicleId,
        'vehicle',
      );
    }

    if (!dto.stops?.length) {
      throw new BadRequestException(
        'Operação deve possuir pelo menos uma parada planejada',
      );
    }

    const operation = await this.prisma.operation.create({
      data: {
        companyId: user.companyId,
        clientId: dto.clientId,
        orderId: dto.orderId,
        routeId: dto.routeId,
        driverId: dto.driverId,
        vehicleId: dto.vehicleId,
        priority: this.resolvePriority(dto.priority),
        code: dto.code,
        title: dto.title,
        status: 'DRAFT',
        originName: dto.originName,
        originAddress: dto.originAddress,
        originLatitude: dto.originLatitude,
        originLongitude: dto.originLongitude,
        destinationName: dto.destinationName,
        destinationAddress: dto.destinationAddress,
        destinationLatitude: dto.destinationLatitude,
        destinationLongitude: dto.destinationLongitude,
        plannedStartAt: this.parseDate(dto.plannedStartAt),
        plannedEndAt: this.parseDate(dto.plannedEndAt),
        estimatedDistanceKm: dto.estimatedDistanceKm,
        estimatedDurationMin: dto.estimatedDurationMin,
        estimatedCost: dto.estimatedCost,
        freightValue: dto.freightValue,
        quantityTotal: dto.quantityTotal,
        volumeTotal: dto.volumeTotal,
        weightTotal: dto.weightTotal,
        notes: dto.notes,
        createdById: user.id,
        updatedById: user.id,
        stops: {
          create: dto.stops.map((stop, index) =>
            this.buildStopCreateInput(stop, user.companyId, index),
          ),
        },
      },
      include: this.include,
    });

    await this.appendStatusHistory(
      operation.id,
      user,
      null,
      OperationStatus.DRAFT,
      dto.notes,
    );

    return operation;
  }

  async listOperations(filters: FilterOperationsDto, user: CurrentUserData) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'plannedStartAt',
      sortOrder = 'desc',
    } = filters;
    const skip = (page - 1) * limit;

    const where: Prisma.OperationWhereInput = {
      companyId: user.companyId,
      deletedAt: null,
    };

    if (filters.search) {
      where.OR = [
        { code: { contains: filters.search, mode: 'insensitive' } },
        { client: { name: { contains: filters.search, mode: 'insensitive' } } },
      ];
    }

    if (filters.status?.length) {
      where.status = { in: filters.status as OperationStatusValue[] };
    }

    if (filters.priority?.length) {
      where.priority = { in: filters.priority as OperationPriorityValue[] };
    }

    if (filters.clientId) {
      where.clientId = filters.clientId;
    }

    if (filters.driverId) {
      where.driverId = filters.driverId;
    }

    if (filters.vehicleId) {
      where.vehicleId = filters.vehicleId;
    }

    if (filters.startDate || filters.endDate) {
      where.plannedStartAt = {
        gte: filters.startDate ? this.parseDate(filters.startDate) : undefined,
        lte: filters.endDate ? this.parseDate(filters.endDate) : undefined,
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.operation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: this.include,
      }),
      this.prisma.operation.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getOperation(id: string, user: CurrentUserData) {
    return this.findOperationOrThrow(id, user.companyId);
  }

  async updateOperation(
    id: string,
    dto: UpdateOperationDto,
    user: CurrentUserData,
  ) {
    const operation = await this.findOperationOrThrow(id, user.companyId);

    if (
      [
        OperationStatus.IN_PICKUP,
        OperationStatus.IN_TRANSIT,
        OperationStatus.IN_DELIVERY,
        OperationStatus.DELIVERED,
        OperationStatus.COMPLETED,
      ].includes(operation.status)
    ) {
      throw new BadRequestException(
        'Operação em andamento não pode ser editada sem reabertura',
      );
    }

    if (dto.clientId && dto.clientId !== operation.clientId) {
      await this.ensureClient(user.companyId, dto.clientId);
    }

    await this.ensureOptionalRelation(user.companyId, dto.orderId, 'order');
    await this.ensureOptionalRelation(user.companyId, dto.routeId, 'route');
    await this.ensureOptionalRelation(user.companyId, dto.driverId, 'driver');
    await this.ensureOptionalRelation(user.companyId, dto.vehicleId, 'vehicle');

    const updated = await this.prisma.operation.update({
      where: { id: operation.id },
      data: {
        clientId: dto.clientId ?? undefined,
        orderId: dto.orderId ?? undefined,
        routeId: dto.routeId ?? undefined,
        driverId: dto.driverId ?? undefined,
        vehicleId: dto.vehicleId ?? undefined,
        code: dto.code ?? undefined,
        title: dto.title ?? undefined,
        priority: dto.priority ? this.resolvePriority(dto.priority) : undefined,
        originName: dto.originName ?? undefined,
        originAddress: dto.originAddress ?? undefined,
        originLatitude: dto.originLatitude ?? undefined,
        originLongitude: dto.originLongitude ?? undefined,
        destinationName: dto.destinationName ?? undefined,
        destinationAddress: dto.destinationAddress ?? undefined,
        destinationLatitude: dto.destinationLatitude ?? undefined,
        destinationLongitude: dto.destinationLongitude ?? undefined,
        plannedStartAt: dto.plannedStartAt
          ? this.parseDate(dto.plannedStartAt)
          : undefined,
        plannedEndAt: dto.plannedEndAt
          ? this.parseDate(dto.plannedEndAt)
          : undefined,
        estimatedDistanceKm: dto.estimatedDistanceKm ?? undefined,
        estimatedDurationMin: dto.estimatedDurationMin ?? undefined,
        estimatedCost: dto.estimatedCost ?? undefined,
        freightValue: dto.freightValue ?? undefined,
        quantityTotal: dto.quantityTotal ?? undefined,
        volumeTotal: dto.volumeTotal ?? undefined,
        weightTotal: dto.weightTotal ?? undefined,
        notes: dto.notes ?? undefined,
        updatedById: user.id,
      },
      include: this.include,
    });

    return updated;
  }

  async changeStatus(
    id: string,
    dto: ChangeOperationStatusDto,
    user: CurrentUserData,
  ) {
    const operation = await this.findOperationOrThrow(id, user.companyId);
    const targetStatus = dto.toStatus;

    if (!OperationStatusMachine.canTransition(operation.status, targetStatus)) {
      throw new BadRequestException('Transição de status não permitida');
    }

    if (targetStatus === 'CANCELLED' && !dto.reason) {
      throw new BadRequestException('Cancelamento requer motivo');
    }

    if (
      OperationStatusMachine.requiresStops(targetStatus) &&
      operation.stops.length === 0
    ) {
      throw new BadRequestException(
        'Operação precisa de paradas para prosseguir no fluxo',
      );
    }

    if (OperationStatusMachine.requiresDriverVehicle(targetStatus)) {
      if (!operation.driverId || !operation.vehicleId) {
        throw new BadRequestException(
          'Motorista e veículo devem estar alocados para prosseguir',
        );
      }
    }

    if (
      operation.status === 'DELIVERED' &&
      targetStatus === 'COMPLETED' &&
      operation.stops.some((stop) => stop.status !== 'COMPLETED')
    ) {
      throw new BadRequestException(
        'Não é possível concluir com paradas pendentes',
      );
    }

    const updated = await this.prisma.operation.update({
      where: { id: operation.id },
      data: {
        status: targetStatus,
        updatedById: user.id,
      },
      include: this.defaultInclude,
    });

    await this.appendStatusHistory(
      operation.id,
      user,
      operation.status,
      targetStatus,
      dto.reason,
    );

    return updated;
  }

  async assignDriver(id: string, dto: AssignDriverDto, user: CurrentUserData) {
    const operation = await this.findOperationOrThrow(id, user.companyId);
    await this.ensureOptionalRelation(user.companyId, dto.driverId, 'driver');
    await this.assertDriverAvailability(
      dto.driverId,
      user.companyId,
      operation,
    );

    return this.prisma.operation.update({
      where: { id: operation.id },
      data: {
        driverId: dto.driverId,
        updatedById: user.id,
      },
      include: this.defaultInclude,
    });
  }

  async assignVehicle(
    id: string,
    dto: AssignVehicleDto,
    user: CurrentUserData,
  ) {
    const operation = await this.findOperationOrThrow(id, user.companyId);
    await this.ensureOptionalRelation(user.companyId, dto.vehicleId, 'vehicle');
    await this.assertVehicleAvailability(
      dto.vehicleId,
      user.companyId,
      operation,
    );

    return this.prisma.operation.update({
      where: { id: operation.id },
      data: {
        vehicleId: dto.vehicleId,
        updatedById: user.id,
      },
      include: this.defaultInclude,
    });
  }

  async addStop(
    id: string,
    dto: CreateOperationStopDto,
    user: CurrentUserData,
  ) {
    const operation = await this.findOperationOrThrow(id, user.companyId);
    this.ensureStructuralChangesAllowed(operation.status);

    const stop = await this.prisma.operationStop.create({
      data: this.buildStopCreateInput(
        dto,
        user.companyId,
        operation.stops.length,
        id,
      ),
    });

    return stop;
  }

  async updateStop(
    id: string,
    stopId: string,
    dto: UpdateOperationStopDto,
    user: CurrentUserData,
  ) {
    const operation = await this.findOperationOrThrow(id, user.companyId);
    this.ensureStructuralChangesAllowed(operation.status);

    const stop = await this.prisma.operationStop.findFirst({
      where: {
        id: stopId,
        operationId: operation.id,
        companyId: user.companyId,
      },
    });

    if (!stop) {
      throw new NotFoundException('Parada não encontrada para esta operação');
    }

    return this.prisma.operationStop.update({
      where: { id: stop.id },
      data: {
        sequence: dto.sequence ?? undefined,
        type: dto.type ? (dto.type as Prisma.OperationStopType) : undefined,
        clientId: dto.clientId ?? undefined,
        locationName: dto.locationName ?? undefined,
        address: dto.address ?? undefined,
        latitude: dto.latitude ?? undefined,
        longitude: dto.longitude ?? undefined,
        windowStartAt: dto.windowStartAt
          ? this.parseDate(dto.windowStartAt)
          : undefined,
        windowEndAt: dto.windowEndAt
          ? this.parseDate(dto.windowEndAt)
          : undefined,
        plannedArrivalAt: dto.plannedArrivalAt
          ? this.parseDate(dto.plannedArrivalAt)
          : undefined,
        serviceTimeMinutes: dto.serviceTimeMinutes ?? undefined,
        quantity: dto.quantity ?? undefined,
        volume: dto.volume ?? undefined,
        weight: dto.weight ?? undefined,
        notes: dto.notes ?? undefined,
        instructions: dto.instructions ?? undefined,
        contactName: dto.contactName ?? undefined,
        contactPhone: dto.contactPhone ?? undefined,
      },
    });
  }

  async reorderStops(
    id: string,
    dto: ReorderOperationStopsDto,
    user: CurrentUserData,
  ) {
    const operation = await this.findOperationOrThrow(id, user.companyId);
    this.ensureStructuralChangesAllowed(operation.status);

    if (dto.stopIds.length !== operation.stops.length) {
      throw new BadRequestException(
        'Lista de paradas precisa conter todos os itens',
      );
    }

    const unknownStops = dto.stopIds.filter(
      (stopId) => !operation.stops.some((stop) => stop.id === stopId),
    );

    if (unknownStops.length) {
      throw new BadRequestException('Paradas inválidas para esta operação');
    }

    await this.prisma.$transaction(
      dto.stopIds.map((stopId, index) =>
        this.prisma.operationStop.update({
          where: { id: stopId },
          data: { sequence: index + 1 },
        }),
      ),
    );
  }

  private resolvePriority(priority?: string | null): OperationPriorityValue {
    if (!priority) return 'NORMAL';
    if (!OPERATION_PRIORITY_VALUES.includes(priority as OperationPriorityValue)) {
      throw new BadRequestException('Prioridade inválida');
    }
    return priority as OperationPriorityValue;
  }

  private parseDate(value?: string | null): Date | undefined {
    return value ? new Date(value) : undefined;
  }

  private async findOperationOrThrow(id: string, companyId: string) {
    const operation = await this.prisma.operation.findFirst({
      where: { id, companyId, deletedAt: null },
      include: {
        ...this.include,
        stops: true,
      },
    });

    if (!operation) {
      throw new NotFoundException('Operação não encontrada');
    }

    return operation;
  }

  private async ensureClient(companyId: string, clientId: string) {
    const client = await this.prisma.client.findFirst({
      where: { id: clientId, companyId, deletedAt: null },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }

  private async ensureOptionalRelation(
    companyId: string,
    id: string | undefined,
    relation: 'order' | 'route' | 'driver' | 'vehicle',
  ) {
    if (!id) return;

    let entity: { id: string } | null = null;

    switch (relation) {
      case 'order':
        entity = await this.prisma.order.findFirst({
          where: { id, companyId, deletedAt: null },
        });
        break;
      case 'route':
        entity = await this.prisma.route.findFirst({
          where: { id, companyId, deletedAt: null },
        });
        break;
      case 'driver':
        entity = await this.prisma.driver.findFirst({
          where: { id, companyId, deletedAt: null },
        });
        break;
      case 'vehicle':
        entity = await this.prisma.vehicle.findFirst({
          where: { id, companyId, deletedAt: null },
        });
        break;
      default:
        entity = null;
    }

    if (!entity) {
      throw new NotFoundException(
        `${relation} não encontrado para esta empresa`,
      );
    }
  }

  private buildStopCreateInput(
    stop: CreateOperationStopDto,
    companyId: string,
    index: number,
    operationId?: string,
  ): Prisma.OperationStopCreateInput {
    return {
      company: { connect: { id: companyId } },
      operation: operationId ? { connect: { id: operationId } } : undefined,
      sequence: stop.sequence ?? index + 1,
      type: stop.type,
      client: stop.clientId ? { connect: { id: stop.clientId } } : undefined,
      locationName: stop.locationName,
      address: stop.address,
      latitude: stop.latitude,
      longitude: stop.longitude,
      windowStartAt: this.parseDate(stop.windowStartAt),
      windowEndAt: this.parseDate(stop.windowEndAt),
      plannedArrivalAt: this.parseDate(stop.plannedArrivalAt),
      serviceTimeMinutes: stop.serviceTimeMinutes,
      quantity: stop.quantity,
      volume: stop.volume,
      weight: stop.weight,
      notes: stop.notes,
      instructions: stop.instructions,
      contactName: stop.contactName,
      contactPhone: stop.contactPhone,
    };
  }

  private async appendStatusHistory(
    operationId: string,
    user: CurrentUserData,
    fromStatus: OperationStatus | null,
    toStatus: OperationStatus,
    reason?: string,
  ) {
    await this.prisma.operationStatusHistory.create({
      data: {
        companyId: user.companyId,
        operationId,
        fromStatus,
        toStatus,
        changedById: user.id,
        reason,
      },
    });
  }

  private ensureStructuralChangesAllowed(status: OperationStatus) {
    if (
      [
        OperationStatus.READY_TO_START,
        OperationStatus.IN_PICKUP,
        OperationStatus.IN_TRANSIT,
        OperationStatus.IN_DELIVERY,
        OperationStatus.DELIVERED,
        OperationStatus.COMPLETED,
      ].includes(status)
    ) {
      throw new ForbiddenException(
        'Alterações nas paradas só são permitidas antes do início da operação',
      );
    }
  }

  private async assertDriverAvailability(
    driverId: string,
    companyId: string,
    operation: Prisma.OperationGetPayload<{ include: { stops: true } }>,
  ) {
    const conflict = await this.prisma.operation.findFirst({
      where: {
        companyId,
        id: { not: operation.id },
        driverId,
        status: { in: ACTIVE_STATUSES },
        deletedAt: null,
        AND: this.buildTimeOverlapFilter(
          operation.plannedStartAt,
          operation.plannedEndAt,
        ),
      },
    });

    if (conflict) {
      throw new BadRequestException(
        'Motorista já alocado em outra operação no período informado',
      );
    }
  }

  private async assertVehicleAvailability(
    vehicleId: string,
    companyId: string,
    operation: Prisma.OperationGetPayload<{ include: { stops: true } }>,
  ) {
    const conflict = await this.prisma.operation.findFirst({
      where: {
        companyId,
        id: { not: operation.id },
        vehicleId,
        status: { in: ACTIVE_STATUSES },
        deletedAt: null,
        AND: this.buildTimeOverlapFilter(
          operation.plannedStartAt,
          operation.plannedEndAt,
        ),
      },
    });

    if (conflict) {
      throw new BadRequestException(
        'Veículo já alocado em outra operação no período informado',
      );
    }
  }

  private buildTimeOverlapFilter(
    start?: Date | null,
    end?: Date | null,
  ): Prisma.OperationWhereInput[] {
    if (!start || !end) {
      return [];
    }

    return [
      {
        plannedStartAt: { lte: end },
        plannedEndAt: { gte: start },
      },
    ];
  }
}
