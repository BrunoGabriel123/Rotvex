import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { correlationId?: string; user?: { id?: string; companyId?: string } }>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const logPayload = {
      method: request.method,
      url: request.url,
      status,
      correlationId: request.correlationId,
      companyId: request.user?.companyId,
      userId: request.user?.id,
    };
    this.logger.error(
      JSON.stringify(logPayload),
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      correlationId: request.correlationId,
      error: message,
    });
  }
}
