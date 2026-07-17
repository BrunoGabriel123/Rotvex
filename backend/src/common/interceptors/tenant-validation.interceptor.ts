import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';
import { PrismaService } from '../database/prisma.service';
import type { CurrentUserData } from '../decorators/current-user.decorator';

const RESOURCE_FIELDS = ['clientId', 'orderId', 'routeId', 'driverId', 'vehicleId'] as const;
type ResourceField = (typeof RESOURCE_FIELDS)[number];

@Injectable()
export class TenantValidationInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    if (context.getType() !== 'http') {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest<
      Request & { user?: CurrentUserData; correlationId?: string }
    >();
    const user = request.user;
    if (!user) {
      return next.handle();
    }

    const collected = this.collectResourceIds(request);
    if (collected.length === 0) {
      return next.handle();
    }

    await this.validateResources(collected, user.companyId);
    return next.handle();
  }

  private collectResourceIds(request: Request) {
    const resources: { field: ResourceField; value: string }[] = [];
    const bodies = [request.body ?? {}, request.params ?? {}];

    for (const source of bodies) {
      if (source && typeof source === 'object' && !Array.isArray(source)) {
        for (const key of RESOURCE_FIELDS) {
          const value = (source as Record<string, unknown>)[key];
          if (typeof value === 'string' && value.trim().length) {
            resources.push({ field: key, value });
          }
        }
      }
    }

    // Deduplicate
    const deduped = new Map<string, { field: ResourceField; value: string }>();
    resources.forEach((item) => deduped.set(`${item.field}:${item.value}`, item));
    return Array.from(deduped.values());
  }

  private async validateResources(
    resources: { field: ResourceField; value: string }[],
    companyId: string,
  ) {
    await Promise.all(
      resources.map(async ({ field, value }) => {
        const exists = await this.lookup(field, value, companyId);
        if (!exists) {
          throw new ForbiddenException({
            code: 'TENANT_RESOURCE_MISMATCH',
            message: `${field} não pertence à empresa atual`,
          });
        }
      }),
    );
  }

  private lookup(field: ResourceField, value: string, companyId: string) {
    switch (field) {
      case 'clientId':
        return this.prisma.client.findFirst({ where: { id: value, companyId, deletedAt: null } });
      case 'orderId':
        return this.prisma.order.findFirst({ where: { id: value, companyId, deletedAt: null } });
      case 'routeId':
        return this.prisma.route.findFirst({ where: { id: value, companyId, deletedAt: null } });
      case 'driverId':
        return this.prisma.driver.findFirst({ where: { id: value, companyId, deletedAt: null } });
      case 'vehicleId':
        return this.prisma.vehicle.findFirst({ where: { id: value, companyId, deletedAt: null } });
      default:
        return Promise.resolve(true);
    }
  }
}
