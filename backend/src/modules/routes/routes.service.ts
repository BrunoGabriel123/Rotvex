import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async create(createRouteDto: CreateRouteDto) {
    return await this.prisma.route.create({
      data: createRouteDto,
    });
  }

  async findAll(
    companyId: string,
    params: { page?: number; limit?: number; search?: string; status?: string },
  ) {
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      companyId,
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) where.status = status;

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

  async findOne(id: string) {
    const route = await this.prisma.route.findUnique({
      where: { id, deletedAt: null },
      include: {
        deliveries: true,
      },
    });

    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    return route;
  }

  async update(id: string, updateRouteDto: UpdateRouteDto) {
    const route = await this.prisma.route.findUnique({
      where: { id, deletedAt: null },
    });

    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    return this.prisma.route.update({
      where: { id },
      data: updateRouteDto,
    });
  }

  async remove(id: string) {
    const route = await this.prisma.route.findUnique({
      where: { id, deletedAt: null },
    });

    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    return this.prisma.route.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
