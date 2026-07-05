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
exports.DeliveriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let DeliveriesService = class DeliveriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDeliveryDto) {
        return await this.prisma.delivery.create({
            data: createDeliveryDto,
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
            this.prisma.delivery.findMany({
                where,
                skip,
                take: limit,
                include: {
                    order: true,
                    vehicle: true,
                    driver: true,
                    route: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.delivery.count({ where }),
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
        const delivery = await this.prisma.delivery.findUnique({
            where: { id, deletedAt: null },
            include: {
                order: true,
                vehicle: true,
                driver: true,
                route: true,
            },
        });
        if (!delivery) {
            throw new common_1.NotFoundException(`Delivery with ID ${id} not found`);
        }
        return delivery;
    }
    async update(id, updateDeliveryDto) {
        const delivery = await this.prisma.delivery.findUnique({
            where: { id, deletedAt: null },
        });
        if (!delivery) {
            throw new common_1.NotFoundException(`Delivery with ID ${id} not found`);
        }
        return this.prisma.delivery.update({
            where: { id },
            data: updateDeliveryDto,
        });
    }
    async remove(id) {
        const delivery = await this.prisma.delivery.findUnique({
            where: { id, deletedAt: null },
        });
        if (!delivery) {
            throw new common_1.NotFoundException(`Delivery with ID ${id} not found`);
        }
        return this.prisma.delivery.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.DeliveriesService = DeliveriesService;
exports.DeliveriesService = DeliveriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeliveriesService);
//# sourceMappingURL=deliveries.service.js.map