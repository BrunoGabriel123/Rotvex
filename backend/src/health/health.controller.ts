import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    const database = await this.checkDatabase();
    const status = database.healthy ? 'ok' : 'degraded';
    return {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      details: {
        database,
      },
    };
  }

  @Get('live')
  live() {
    return {
      status: 'live',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  async readiness() {
    const database = await this.checkDatabase();
    if (!database.healthy) {
      throw new ServiceUnavailableException('Database not ready');
    }
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
      details: {
        database,
      },
    };
  }

  private async checkDatabase() {
    const startedAt = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        healthy: true,
        latencyMs: Date.now() - startedAt,
        checkedAt: new Date().toISOString(),
      };
    } catch (error) {
      return {
        healthy: false,
        latencyMs: Date.now() - startedAt,
        checkedAt: new Date().toISOString(),
        error: (error as Error).message,
      };
    }
  }
}
