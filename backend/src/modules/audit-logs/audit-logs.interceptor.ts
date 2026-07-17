import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuditLogsService } from './audit-logs.service';
import { AUDIT_LOG_KEY, AuditLogMetadata } from './audit-logs.decorator';

@Injectable()
export class AuditLogsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditLogsInterceptor.name);

  constructor(
    private reflector: Reflector,
    private auditLogsService: AuditLogsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const metadata = this.reflector.get<AuditLogMetadata>(
      AUDIT_LOG_KEY,
      context.getHandler(),
    );

    if (!metadata) {
      return next.handle();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    const { user, params, body } = request as {
      user?: { id: string; companyId: string };
      params: Record<string, string>;
      body: Record<string, unknown>;
    };

    // Log assíncrono não bloqueante
    this.logAsync(metadata, user, params, body).catch((error) => {
      this.logger.error(
        `Failed to create audit log: ${(error as Error).message}`,
        (error as Error).stack,
      );
    });

    return next.handle();
  }

  private async logAsync(
    metadata: AuditLogMetadata,
    user: { id: string; companyId: string } | undefined,
    params: Record<string, string>,
    body: Record<string, unknown>,
  ) {
    try {
      const entityId = metadata.entityIdParam
        ? params[metadata.entityIdParam]
        : undefined;

      await this.auditLogsService.create({
        action: metadata.action,
        entity: metadata.entity,
        entityId,
        userId: user?.id,
        companyId: user?.companyId,
        metadata: {
          method: this.getRequestMethod(),
          path: this.getRequestPath(),
          body: this.sanitizeBody(body),
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to create audit log: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }

  private getRequestMethod(): string {
    return 'HTTP'; // Pode ser expandido para pegar o método real
  }

  private getRequestPath(): string {
    return 'request'; // Pode ser expandido para pegar o path real
  }

  private sanitizeBody(
    body: Record<string, unknown>,
  ): Record<string, unknown> | undefined {
    if (!body) return undefined;

    const sanitized = { ...body };

    // Remove dados sensíveis
    const sensitiveFields = [
      'password',
      'currentPassword',
      'newPassword',
      'token',
    ];
    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    });

    return sanitized;
  }
}
