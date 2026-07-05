import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    return await this.prisma.delivery.create({
      data: createDeliveryDto,
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

  async findOne(id: string) {
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
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }

    return delivery;
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id, deletedAt: null },
    });

    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }

    return this.prisma.delivery.update({
      where: { id },
      data: updateDeliveryDto,
    });
  }

  async remove(id: string) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id, deletedAt: null },
    });

    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }

    return this.prisma.delivery.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
