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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let MaintenanceService = class MaintenanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMaintenanceDto) {
        return await this.prisma.maintenance.create({
            data: createMaintenanceDto,
        });
    }
    async findAll(params) {
        const { page = 1, limit = 10, status, vehicleId } = params;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
        };
        if (status)
            where.status = status;
        if (vehicleId)
            where.vehicleId = vehicleId;
        const [data, total] = await Promise.all([
            this.prisma.maintenance.findMany({
                where,
                skip,
                take: limit,
                include: {
                    vehicle: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.maintenance.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const maintenance = await this.prisma.maintenance.findUnique({
            where: { id, deletedAt: null },
            include: {
                vehicle: true,
            },
        });
        if (!maintenance) {
            throw new common_1.NotFoundException(`Maintenance with ID ${id} not found`);
        }
        return maintenance;
    }
    async update(id, updateMaintenanceDto) {
        const maintenance = await this.prisma.maintenance.findUnique({
            where: { id, deletedAt: null },
        });
        if (!maintenance) {
            throw new common_1.NotFoundException(`Maintenance with ID ${id} not found`);
        }
        return this.prisma.maintenance.update({
            where: { id },
            data: updateMaintenanceDto,
        });
    }
    async remove(id) {
        const maintenance = await this.prisma.maintenance.findUnique({
            where: { id, deletedAt: null },
        });
        if (!maintenance) {
            throw new common_1.NotFoundException(`Maintenance with ID ${id} not found`);
        }
        return this.prisma.maintenance.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map