import {
  type IndicatorCalculator,
  type IndicatorCalculatorKey,
  type IndicatorCalculatorContext,
} from '../types/indicator.types';
import type { PrismaService } from '../../../common/database/prisma.service';

const ACTIVE_OPERATION_STATUSES = ['IN_PICKUP', 'IN_TRANSIT', 'IN_DELIVERY'] as const;

const PLANNING_PENDING_STATUS = 'AWAITING_PLANNING';

type DriverIdProjection = { id: string };
type OperationDriverProjection = { driverId: string | null };

type PrismaWithModels = PrismaService & {
  operation: any;
  delivery: any;
  operationOccurrence: any;
  vehicle: any;
  driver: any;
};

const withModels = (
  client: IndicatorCalculatorContext['prisma'],
): PrismaWithModels => client as PrismaWithModels;

export const INDICATOR_CALCULATORS: Record<
  IndicatorCalculatorKey,
  IndicatorCalculator
> = {
  operations_total: async ({ prisma, companyId, filters }) => {
    const total = await withModels(prisma).operation.count({
      where: {
        companyId,
        deletedAt: null,
        plannedStartAt: {
          gte: filters.startDate,
          lte: filters.endDate,
        },
      },
    });

    return { value: total, total };
  },
  operations_completed: async ({ prisma, companyId, filters }) => {
    const completed = await withModels(prisma).operation.count({
      where: {
        companyId,
        deletedAt: null,
        status: 'COMPLETED',
        plannedStartAt: {
          gte: filters.startDate,
          lte: filters.endDate,
        },
      },
    });

    return { value: completed, total: completed };
  },
  operations_in_progress: async ({ prisma, companyId }) => {
    const inProgress = await withModels(prisma).operation.count({
      where: {
        companyId,
        deletedAt: null,
        status: { in: [...ACTIVE_OPERATION_STATUSES] },
      },
    });

    return { value: inProgress, total: inProgress };
  },
  operations_awaiting_planning: async ({ prisma, companyId }) => {
    const awaiting = await withModels(prisma).operation.count({
      where: {
        companyId,
        deletedAt: null,
        status: PLANNING_PENDING_STATUS,
      },
    });

    return { value: awaiting, total: awaiting };
  },
  operations_delayed: async ({ prisma, companyId, filters }) => {
    const now = new Date();
    const delayed = await withModels(prisma).operation.count({
      where: {
        companyId,
        deletedAt: null,
        plannedStartAt: {
          gte: filters.startDate,
          lte: filters.endDate,
        },
        plannedEndAt: {
          not: null,
          lt: now,
        },
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
      },
    });

    return { value: delayed, total: delayed };
  },
  operations_completion_rate: async ({ prisma, companyId, filters }) => {
    const [total, completed] = await Promise.all([
      withModels(prisma).operation.count({
        where: {
          companyId,
          deletedAt: null,
          plannedStartAt: {
            gte: filters.startDate,
            lte: filters.endDate,
          },
        },
      }),
      withModels(prisma).operation.count({
        where: {
          companyId,
          deletedAt: null,
          status: 'COMPLETED',
          plannedStartAt: {
            gte: filters.startDate,
            lte: filters.endDate,
          },
        },
      }),
    ]);

    const value = total === 0 ? null : Number(((completed / total) * 100).toFixed(2));

    return { value, total, sampleSize: completed };
  },
  deliveries_completed: async ({ prisma, companyId, filters }) => {
    const completed = await withModels(prisma).delivery.count({
      where: {
        status: 'completed',
        order: {
          companyId,
        },
        completedAt: {
          gte: filters.startDate,
          lte: filters.endDate,
        },
      },
    });

    return { value: completed, total: completed };
  },
  occurrences_open: async ({ prisma, companyId }) => {
    const openOccurrences = await withModels(prisma).operationOccurrence.count({
      where: {
        companyId,
        status: 'open',
      },
    });

    return { value: openOccurrences, total: openOccurrences };
  },
  vehicles_unavailable: async ({ prisma, companyId }) => {
    const unavailable = await withModels(prisma).vehicle.count({
      where: {
        companyId,
        deletedAt: null,
        status: { not: 'active' },
      },
    });

    return { value: unavailable, total: unavailable };
  },
  drivers_without_allocation: async ({ prisma, companyId }) => {
    const [activeDrivers, engagedDrivers] = await Promise.all([
      withModels(prisma).driver.findMany({
        where: {
          companyId,
          deletedAt: null,
          status: 'active',
        },
        select: { id: true },
      }) as Promise<DriverIdProjection[]>,
      withModels(prisma).operation.findMany({
        where: {
          companyId,
          deletedAt: null,
          status: { in: ACTIVE_OPERATION_STATUSES },
          driverId: { not: null },
        },
        select: { driverId: true },
      }) as Promise<OperationDriverProjection[]>,
    ]);

    const engagedSet = new Set(
      engagedDrivers
        .map(({ driverId }: OperationDriverProjection) => driverId)
        .filter((driverId): driverId is string => Boolean(driverId)),
    );
    const unallocated = activeDrivers.filter(({ id }: DriverIdProjection) => !engagedSet.has(id)).length;

    return {
      value: unallocated,
      total: activeDrivers.length,
      metadata: {
        engagedDrivers: engagedSet.size,
      },
    };
  },
};
