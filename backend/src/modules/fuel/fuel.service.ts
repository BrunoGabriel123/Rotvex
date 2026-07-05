import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';

@Injectable()
export class FuelService {
  constructor(private prisma: PrismaService) {}

  async create(createFuelDto: CreateFuelDto) {
    return await this.prisma.fuel.create({
      data: createFuelDto,
    });
  }

  async findAll(params: { page?: number; limit?: number; vehicleId?: string }) {
    const { page = 1, limit = 10, vehicleId } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (vehicleId) where.vehicleId = vehicleId;

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

  async findOne(id: string) {
    const fuel = await this.prisma.fuel.findUnique({
      where: { id, deletedAt: null },
      include: {
        vehicle: true,
      },
    });

    if (!fuel) {
      throw new NotFoundException(`Fuel record with ID ${id} not found`);
    }

    return fuel;
  }

  async update(id: string, updateFuelDto: UpdateFuelDto) {
    const fuel = await this.prisma.fuel.findUnique({
      where: { id, deletedAt: null },
    });

    if (!fuel) {
      throw new NotFoundException(`Fuel record with ID ${id} not found`);
    }

    return this.prisma.fuel.update({
      where: { id },
      data: updateFuelDto,
    });
  }

  async remove(id: string) {
    const fuel = await this.prisma.fuel.findUnique({
      where: { id, deletedAt: null },
    });

    if (!fuel) {
      throw new NotFoundException(`Fuel record with ID ${id} not found`);
    }

    return this.prisma.fuel.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
