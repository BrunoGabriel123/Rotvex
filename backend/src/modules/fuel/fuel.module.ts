import { Module } from '@nestjs/common';
import { FuelController } from './fuel.controller';
import { FuelService } from './fuel.service';
import { PrismaService } from '../../common/database/prisma.service';

@Module({
  controllers: [FuelController],
  providers: [FuelService, PrismaService],
  exports: [FuelService],
})
export class FuelModule {}
