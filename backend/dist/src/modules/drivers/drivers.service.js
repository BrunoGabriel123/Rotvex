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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let DriversService = class DriversService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDriverDto) {
        try {
            return await this.prisma.driver.create({
                data: createDriverDto,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('CPF already exists');
            }
            throw error;
        }
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
                { cpf: { contains: search, mode: 'insensitive' } },
                { cnh: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status) {
            where.status = status;
        }
        const [data, total] = await Promise.all([
            this.prisma.driver.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.driver.count({ where }),
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
        const driver = await this.prisma.driver.findUnique({
            where: { id, deletedAt: null },
        });
        if (!driver) {
            throw new common_1.NotFoundException(`Driver with ID ${id} not found`);
        }
        return driver;
    }
    async update(id, updateDriverDto) {
        const driver = await this.prisma.driver.findUnique({
            where: { id, deletedAt: null },
        });
        if (!driver) {
            throw new common_1.NotFoundException(`Driver with ID ${id} not found`);
        }
        return this.prisma.driver.update({
            where: { id },
            data: updateDriverDto,
        });
    }
    async remove(id) {
        const driver = await this.prisma.driver.findUnique({
            where: { id, deletedAt: null },
        });
        if (!driver) {
            throw new common_1.NotFoundException(`Driver with ID ${id} not found`);
        }
        return this.prisma.driver.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map