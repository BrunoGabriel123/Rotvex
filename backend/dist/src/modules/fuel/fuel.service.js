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
exports.FuelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let FuelService = class FuelService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFuelDto) {
        return await this.prisma.fuel.create({
            data: createFuelDto,
        });
    }
    async findAll(params) {
        const { page = 1, limit = 10, vehicleId } = params;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
        };
        if (vehicleId)
            where.vehicleId = vehicleId;
        const [data, total] = await Promise.all([
            this.prisma.fuel.findMany({
                where,
                skip,
                take: limit,
                include: {
                    vehicle: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.fuel.count({ where }),
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
        const fuel = await this.prisma.fuel.findUnique({
            where: { id, deletedAt: null },
            include: {
                vehicle: true,
            },
        });
        if (!fuel) {
            throw new common_1.NotFoundException(`Fuel record with ID ${id} not found`);
        }
        return fuel;
    }
    async update(id, updateFuelDto) {
        const fuel = await this.prisma.fuel.findUnique({
            where: { id, deletedAt: null },
        });
        if (!fuel) {
            throw new common_1.NotFoundException(`Fuel record with ID ${id} not found`);
        }
        return this.prisma.fuel.update({
            where: { id },
            data: updateFuelDto,
        });
    }
    async remove(id) {
        const fuel = await this.prisma.fuel.findUnique({
            where: { id, deletedAt: null },
        });
        if (!fuel) {
            throw new common_1.NotFoundException(`Fuel record with ID ${id} not found`);
        }
        return this.prisma.fuel.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.FuelService = FuelService;
exports.FuelService = FuelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FuelService);
//# sourceMappingURL=fuel.service.js.map