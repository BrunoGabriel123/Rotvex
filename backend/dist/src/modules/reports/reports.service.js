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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDeliveriesReport(companyId, params) {
        const where = {
            order: { companyId },
        };
        if (params.startDate || params.endDate) {
            where.createdAt = {};
            if (params.startDate)
                where.createdAt.gte = new Date(params.startDate);
            if (params.endDate)
                where.createdAt.lte = new Date(params.endDate);
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
    async getFleetReport(companyId) {
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
    async getDriversReport(companyId) {
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
    async getCostsReport(companyId, params) {
        const where = {
            companyId,
        };
        if (params.startDate || params.endDate) {
            where.date = {};
            if (params.startDate)
                where.date.gte = new Date(params.startDate);
            if (params.endDate)
                where.date.lte = new Date(params.endDate);
        }
        return this.prisma.expense.findMany({
            where,
            orderBy: { date: 'desc' },
        });
    }
    async getClientsReport(companyId) {
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
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map