import { PartialType } from '@nestjs/swagger';
import { CreateMaintenanceDto } from './create-maintenance.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {
  @ApiProperty({ example: 'completed', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
