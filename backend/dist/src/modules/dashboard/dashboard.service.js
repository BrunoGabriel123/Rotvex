"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMetrics(companyId) {
        const [totalDeliveries, pendingDeliveries, completedDeliveries, totalVehicles, activeVehicles, totalDrivers, activeDrivers, totalClients,] = await Promise.all([
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
    async getDeliveriesByStatus(companyId) {
        return await this.prisma.delivery.groupBy({
            by: ['status'],
            where: { order: { companyId } },
            _count: true,
        });
    }
    async getMonthlyCosts(companyId) {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map