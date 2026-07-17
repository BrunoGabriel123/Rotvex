import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    const { method, url } = request as {
      method: string;
      url: string;
      correlationId?: string;
      user?: { id?: string; companyId?: string };
    };
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const logPayload = {
          method,
          url,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          statusCode: response.statusCode,
          durationMs: delay,
          correlationId: request?.correlationId,
          companyId: request?.user?.companyId,
          userId: request?.user?.id,
        };
        this.logger.log(JSON.stringify(logPayload));
      }),
    );
  }
}
