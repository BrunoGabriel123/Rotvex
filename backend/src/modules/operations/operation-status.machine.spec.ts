import { OperationStatusMachine } from './operation-status.machine';

describe('OperationStatusMachine', () => {
  it('allows valid transitions', () => {
    expect(OperationStatusMachine.canTransition('DRAFT', 'AWAITING_PLANNING')).toBe(true);
    expect(OperationStatusMachine.canTransition('PLANNED', 'READY_TO_START')).toBe(true);
  });

  it('blocks invalid transitions', () => {
    expect(OperationStatusMachine.canTransition('COMPLETED', 'IN_TRANSIT')).toBe(false);
    expect(OperationStatusMachine.canTransition('READY_TO_START', 'DRAFT')).toBe(false);
  });

  it('requires driver and vehicle on execution statuses', () => {
    expect(OperationStatusMachine.requiresDriverVehicle('READY_TO_START')).toBe(true);
    expect(OperationStatusMachine.requiresDriverVehicle('IN_PICKUP')).toBe(true);
    expect(OperationStatusMachine.requiresDriverVehicle('COMPLETED')).toBe(false);
  });

  it('requires planned stops for planning/execution statuses', () => {
    expect(OperationStatusMachine.requiresStops('PLANNED')).toBe(true);
    expect(OperationStatusMachine.requiresStops('READY_TO_START')).toBe(true);
    expect(OperationStatusMachine.requiresStops('CANCELLED')).toBe(false);
  });
});
