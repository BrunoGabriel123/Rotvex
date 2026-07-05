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
exports.PickupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let PickupsService = class PickupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPickupDto) {
        return await this.prisma.pickup.create({
            data: createPickupDto,
        });
    }
    async findAll(params) {
        const { page = 1, limit = 10, status, orderId } = params;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
        };
        if (status)
            where.status = status;
        if (orderId)
            where.orderId = orderId;
        const [data, total] = await Promise.all([
            this.prisma.pickup.findMany({
                where,
                skip,
                take: limit,
                include: {
                    order: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.pickup.count({ where }),
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
        const pickup = await this.prisma.pickup.findUnique({
            where: { id, deletedAt: null },
            include: {
                order: true,
            },
        });
        if (!pickup) {
            throw new common_1.NotFoundException(`Pickup with ID ${id} not found`);
        }
        return pickup;
    }
    async update(id, updatePickupDto) {
        const pickup = await this.prisma.pickup.findUnique({
            where: { id, deletedAt: null },
        });
        if (!pickup) {
            throw new common_1.NotFoundException(`Pickup with ID ${id} not found`);
        }
        return this.prisma.pickup.update({
            where: { id },
            data: updatePickupDto,
        });
    }
    async remove(id) {
        const pickup = await this.prisma.pickup.findUnique({
            where: { id, deletedAt: null },
        });
        if (!pickup) {
            throw new common_1.NotFoundException(`Pickup with ID ${id} not found`);
        }
        return this.prisma.pickup.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.PickupsService = PickupsService;
exports.PickupsService = PickupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PickupsService);
//# sourceMappingURL=pickups.service.js.map