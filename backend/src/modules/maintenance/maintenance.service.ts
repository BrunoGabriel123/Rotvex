import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async create(createMaintenanceDto: CreateMaintenanceDto) {
    return await this.prisma.maintenance.create({
      data: createMaintenanceDto,
    });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    vehicleId?: string;
  }) {
    const { page = 1, limit = 10, status, vehicleId } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (status) where.status = status;
    if (vehicleId) where.vehicleId = vehicleId;

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

  async findOne(id: string) {
    const maintenance = await this.prisma.maintenance.findUnique({
      where: { id, deletedAt: null },
      include: {
        vehicle: true,
      },
    });

    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    return maintenance;
  }

  async update(id: string, updateMaintenanceDto: UpdateMaintenanceDto) {
    const maintenance = await this.prisma.maintenance.findUnique({
      where: { id, deletedAt: null },
    });

    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    return this.prisma.maintenance.update({
      where: { id },
      data: updateMaintenanceDto,
    });
  }

  async remove(id: string) {
    const maintenance = await this.prisma.maintenance.findUnique({
      where: { id, deletedAt: null },
    });

    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    return this.prisma.maintenance.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
