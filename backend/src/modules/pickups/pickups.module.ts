import { Module } from '@nestjs/common';
import { PickupsController } from './pickups.controller';
import { PickupsService } from './pickups.service';
import { PrismaService } from '../../common/database/prisma.service';

@Module({
  controllers: [PickupsController],
  providers: [PickupsService, PrismaService],
  exports: [PickupsService],
})
export class PickupsModule {}
