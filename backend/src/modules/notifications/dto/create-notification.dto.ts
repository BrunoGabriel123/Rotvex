import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ example: 'New order assigned' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Order #123 has been assigned to you' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'info', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ example: 'company-id', required: false })
  @IsString()
  @IsOptional()
  companyId?: string;

  @ApiProperty({ example: 'user-id', required: false })
  @IsString()
  @IsOptional()
  userId?: string;
}
