import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { CreatePickupDto } from './dto/create-pickup.dto';
import { UpdatePickupDto } from './dto/update-pickup.dto';

@Injectable()
export class PickupsService {
  constructor(private prisma: PrismaService) {}

  async create(createPickupDto: CreatePickupDto) {
    return await this.prisma.pickup.create({
      data: createPickupDto,
    });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: string;
    orderId?: string;
  }) {
    const { page = 1, limit = 10, status, orderId } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (status) where.status = status;
    if (orderId) where.orderId = orderId;

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

  async findOne(id: string) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id, deletedAt: null },
      include: {
        order: true,
      },
    });

    if (!pickup) {
      throw new NotFoundException(`Pickup with ID ${id} not found`);
    }

    return pickup;
  }

  async update(id: string, updatePickupDto: UpdatePickupDto) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id, deletedAt: null },
    });

    if (!pickup) {
      throw new NotFoundException(`Pickup with ID ${id} not found`);
    }

    return this.prisma.pickup.update({
      where: { id },
      data: updatePickupDto,
    });
  }

  async remove(id: string) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id, deletedAt: null },
    });

    if (!pickup) {
      throw new NotFoundException(`Pickup with ID ${id} not found`);
    }

    return this.prisma.pickup.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
