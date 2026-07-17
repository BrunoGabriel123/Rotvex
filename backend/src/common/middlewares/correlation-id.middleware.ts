import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { NextFunction, Request, Response } from 'express';
import { CorrelationContextService } from '../context/correlation-context.service';

declare module 'express-serve-static-core' {
  interface Request {
    correlationId?: string;
  }
}

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly correlationContext: CorrelationContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const incomingId =
      (req.headers['x-correlation-id'] as string | undefined) ?? randomUUID();
    req.correlationId = incomingId;
    res.setHeader('x-correlation-id', incomingId);
    this.correlationContext.run(incomingId, () => next());
  }
}
