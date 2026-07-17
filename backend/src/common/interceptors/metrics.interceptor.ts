import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from '../metrics/metrics.service';
import type { Request } from 'express';
import { HttpException } from '@nestjs/common';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest<Request & { route?: { path?: string } }>();
    const method = request.method ?? 'UNKNOWN';
    const route = request.route?.path ?? request.url ?? '/unknown';
    const startedAt = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startedAt;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const statusCode = context.switchToHttp().getResponse().statusCode ?? 200;
          this.metricsService.recordRequest(method, route, duration, statusCode);
        },
        error: (error: unknown) => {
          const duration = Date.now() - startedAt;
          let statusCode = 500;
          let errorCode: string | undefined;
          if (error instanceof HttpException) {
            statusCode = error.getStatus();
            const response = error.getResponse();
            if (typeof response === 'object' && response !== null && 'code' in response) {
              errorCode = String((response as Record<string, unknown>).code);
            }
          }
          this.metricsService.recordRequest(method, route, duration, statusCode, errorCode);
        },
      }),
    );
  }
}
