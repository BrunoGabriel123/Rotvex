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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.logger.log(`${method} ${url} ${response.statusCode} - ${delay}ms`);
      }),
    );
  }
}
