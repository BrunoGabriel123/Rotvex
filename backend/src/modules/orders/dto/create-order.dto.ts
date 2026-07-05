import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'ORD-001' })
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @ApiProperty({ example: 'Delivery order for client A', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'pending', required: false })
  @IsString()
  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed', 'cancelled'])
  status?: string;

  @ApiProperty({ example: 'normal', required: false })
  @IsString()
  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'urgent'])
  priority?: string;

  @ApiProperty({ example: 'client-id' })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ example: 'company-id' })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
