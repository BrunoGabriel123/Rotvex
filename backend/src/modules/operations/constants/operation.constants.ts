export const OPERATION_STATUS_VALUES = [
  'DRAFT',
  'AWAITING_PLANNING',
  'PLANNED',
  'READY_TO_START',
  'IN_PICKUP',
  'IN_TRANSIT',
  'IN_DELIVERY',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
] as const;

export type OperationStatusValue = (typeof OPERATION_STATUS_VALUES)[number];

export const OPERATION_PRIORITY_VALUES = [
  'LOW',
  'NORMAL',
  'HIGH',
  'CRITICAL',
] as const;

export type OperationPriorityValue = (typeof OPERATION_PRIORITY_VALUES)[number];

export const OPERATION_STOP_TYPE_VALUES = [
  'PICKUP',
  'DELIVERY',
  'SUPPORT',
  'RETURN',
] as const;

export type OperationStopTypeValue =
  (typeof OPERATION_STOP_TYPE_VALUES)[number];

export const OPERATION_STOP_STATUS_VALUES = [
  'PENDING',
  'ARRIVED',
  'IN_SERVICE',
  'COMPLETED',
  'FAILED',
  'SKIPPED',
] as const;

export type OperationStopStatusValue =
  (typeof OPERATION_STOP_STATUS_VALUES)[number];
