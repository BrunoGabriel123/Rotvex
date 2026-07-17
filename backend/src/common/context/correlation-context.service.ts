import { AsyncLocalStorage } from 'async_hooks';
import { Injectable } from '@nestjs/common';

interface CorrelationStore {
  correlationId: string;
}

@Injectable()
export class CorrelationContextService {
  private readonly storage = new AsyncLocalStorage<CorrelationStore>();

  run<T>(correlationId: string, callback: () => T): T {
    return this.storage.run({ correlationId }, callback);
  }

  getId(): string | undefined {
    return this.storage.getStore()?.correlationId;
  }
}
