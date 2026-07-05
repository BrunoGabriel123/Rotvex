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
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let RoutesService = class RoutesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRouteDto) {
        return await this.prisma.route.create({
            data: createRouteDto,
        });
    }
    async findAll(companyId, params) {
        const { page = 1, limit = 10, search, status } = params;
        const skip = (page - 1) * limit;
        const where = {
            companyId,
            deletedAt: null,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status)
            where.status = status;
        const [data, total] = await Promise.all([
            this.prisma.route.findMany({
                where,
                skip,
                take: limit,
                include: {
                    deliveries: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.route.count({ where }),
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
        const route = await this.prisma.route.findUnique({
            where: { id, deletedAt: null },
            include: {
                deliveries: true,
            },
        });
        if (!route) {
            throw new common_1.NotFoundException(`Route with ID ${id} not found`);
        }
        return route;
    }
    async update(id, updateRouteDto) {
        const route = await this.prisma.route.findUnique({
            where: { id, deletedAt: null },
        });
        if (!route) {
            throw new common_1.NotFoundException(`Route with ID ${id} not found`);
        }
        return this.prisma.route.update({
            where: { id },
            data: updateRouteDto,
        });
    }
    async remove(id) {
        const route = await this.prisma.route.findUnique({
            where: { id, deletedAt: null },
        });
        if (!route) {
            throw new common_1.NotFoundException(`Route with ID ${id} not found`);
        }
        return this.prisma.route.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.RoutesService = RoutesService;
exports.RoutesService = RoutesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoutesService);
//# sourceMappingURL=routes.service.js.map