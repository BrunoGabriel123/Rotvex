import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 'oil_change' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'Regular oil change', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 500, required: false })
  @IsNumber()
  @IsOptional()
  cost?: number;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', required: false })
  @IsString()
  @IsOptional()
  scheduledAt?: string;

  @ApiProperty({ example: 'vehicle-id' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;
}
