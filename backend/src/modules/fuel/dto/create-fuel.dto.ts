import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateFuelDto {
  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsNotEmpty()
  liters: number;

  @ApiProperty({ example: 300 })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({ example: 'gasoline' })
  @IsString()
  @IsNotEmpty()
  fuelType: string;

  @ApiProperty({ example: 'Shell Station', required: false })
  @IsString()
  @IsOptional()
  station?: string;

  @ApiProperty({ example: 50000, required: false })
  @IsNumber()
  @IsOptional()
  odometer?: number;

  @ApiProperty({ example: 'vehicle-id' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;
}
