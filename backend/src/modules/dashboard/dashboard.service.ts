import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics(companyId: string) {
    const [
      totalDeliveries,
      pendingDeliveries,
      completedDeliveries,
      totalVehicles,
      activeVehicles,
      totalDrivers,
      activeDrivers,
      totalClients,
    ] = await Promise.all([
      this.prisma.delivery.count({ where: { order: { companyId } } }),
      this.prisma.delivery.count({
        where: { order: { companyId }, status: 'pending' },
      }),
      this.prisma.delivery.count({
        where: { order: { companyId }, status: 'completed' },
      }),
      this.prisma.vehicle.count({ where: { companyId } }),
      this.prisma.vehicle.count({ where: { companyId, status: 'active' } }),
      this.prisma.driver.count({ where: { companyId } }),
      this.prisma.driver.count({ where: { companyId, status: 'active' } }),
      this.prisma.client.count({ where: { companyId } }),
    ]);

    return {
      deliveries: {
        total: totalDeliveries,
        pending: pendingDeliveries,
        completed: completedDeliveries,
      },
      vehicles: {
        total: totalVehicles,
        active: activeVehicles,
      },
      drivers: {
        total: totalDrivers,
        active: activeDrivers,
      },
      clients: totalClients,
    };
  }

  async getDeliveriesByStatus(companyId: string) {
    return await this.prisma.delivery.groupBy({
      by: ['status'],
      where: { order: { companyId } },
      _count: true,
    });
  }

  async getMonthlyCosts(companyId: string) {
    const currentYear = new Date().getFullYear();
    const expenses = await this.prisma.expense.findMany({
      where: {
        companyId,
        date: {
          gte: new Date(`${currentYear}-01-01`),
          lte: new Date(`${currentYear}-12-31`),
        },
      },
    });

    const monthlyCosts = Array(12).fill(0);
    expenses.forEach((expense) => {
      const month = new Date(expense.date).getMonth();
      monthlyCosts[month] += expense.amount;
    });

    return monthlyCosts;
  }
}
