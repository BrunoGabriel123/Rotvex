import { OperationStatus } from '@prisma/client';

const TRANSITIONS: Record<OperationStatus, OperationStatus[]> = {
  [OperationStatus.DRAFT]: [OperationStatus.AWAITING_PLANNING, OperationStatus.CANCELLED],
  [OperationStatus.AWAITING_PLANNING]: [
    OperationStatus.PLANNED,
    OperationStatus.CANCELLED,
  ],
  [OperationStatus.PLANNED]: [
    OperationStatus.READY_TO_START,
    OperationStatus.CANCELLED,
    OperationStatus.AWAITING_PLANNING,
  ],
  [OperationStatus.READY_TO_START]: [
    OperationStatus.IN_PICKUP,
    OperationStatus.CANCELLED,
  ],
  [OperationStatus.IN_PICKUP]: [OperationStatus.IN_TRANSIT, OperationStatus.CANCELLED],
  [OperationStatus.IN_TRANSIT]: [
    OperationStatus.IN_DELIVERY,
    OperationStatus.CANCELLED,
  ],
  [OperationStatus.IN_DELIVERY]: [
    OperationStatus.DELIVERED,
    OperationStatus.CANCELLED,
  ],
  [OperationStatus.DELIVERED]: [OperationStatus.COMPLETED, OperationStatus.CANCELLED],
  [OperationStatus.COMPLETED]: [],
  [OperationStatus.CANCELLED]: [],
};

export class OperationStatusMachine {
  static canTransition(from: OperationStatus, to: OperationStatus): boolean {
    return TRANSITIONS[from]?.includes(to) ?? false;
  }

  static requiresDriverVehicle(status: OperationStatus): boolean {
    return [
      OperationStatus.READY_TO_START,
      OperationStatus.IN_PICKUP,
      OperationStatus.IN_TRANSIT,
      OperationStatus.IN_DELIVERY,
    ].includes(status);
  }

  static requiresStops(status: OperationStatus): boolean {
    return [
      OperationStatus.AWAITING_PLANNING,
      OperationStatus.PLANNED,
      OperationStatus.READY_TO_START,
      OperationStatus.IN_PICKUP,
      OperationStatus.IN_TRANSIT,
      OperationStatus.IN_DELIVERY,
    ].includes(status);
  }
}
