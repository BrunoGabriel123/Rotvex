import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { PrismaService } from '../../common/database/prisma.service';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveriesService, PrismaService],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
