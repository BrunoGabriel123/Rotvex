import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({ example: 'Rua A, 123' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '01234-567' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ example: -23.5505, required: false })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: -46.6333, required: false })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', required: false })
  @IsString()
  @IsOptional()
  scheduledAt?: string;

  @ApiProperty({ example: 'order-id' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ example: 'vehicle-id', required: false })
  @IsString()
  @IsOptional()
  vehicleId?: string;

  @ApiProperty({ example: 'driver-id', required: false })
  @IsString()
  @IsOptional()
  driverId?: string;

  @ApiProperty({ example: 'route-id', required: false })
  @IsString()
  @IsOptional()
  routeId?: string;
}
