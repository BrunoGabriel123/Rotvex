import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDeliveriesReport(
    companyId: string,
    params: { startDate?: string; endDate?: string },
  ) {
    const where: any = {
      order: { companyId },
    };

    if (params.startDate || params.endDate) {
      where.createdAt = {};
      if (params.startDate) where.createdAt.gte = new Date(params.startDate);
      if (params.endDate) where.createdAt.lte = new Date(params.endDate);
    }

    return this.prisma.delivery.findMany({
      where,
      include: {
        order: true,
        vehicle: true,
        driver: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFleetReport(companyId: string) {
    return this.prisma.vehicle.findMany({
      where: { companyId },
      include: {
        _count: {
          select: {
            deliveries: true,
            maintenances: true,
            fuels: true,
          },
        },
      },
    });
  }

  async getDriversReport(companyId: string) {
    return this.prisma.driver.findMany({
      where: { companyId },
      include: {
        _count: {
          select: {
            deliveries: true,
          },
        },
      },
    });
  }

  async getCostsReport(
    companyId: string,
    params: { startDate?: string; endDate?: string },
  ) {
    const where: any = {
      companyId,
    };

    if (params.startDate || params.endDate) {
      where.date = {};
      if (params.startDate) where.date.gte = new Date(params.startDate);
      if (params.endDate) where.date.lte = new Date(params.endDate);
    }

    return this.prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async getClientsReport(companyId: string) {
    return this.prisma.client.findMany({
      where: { companyId },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });
  }
}
