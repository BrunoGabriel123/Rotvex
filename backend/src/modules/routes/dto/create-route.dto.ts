import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRouteDto {
  @ApiProperty({ example: 'Route A - Center' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Route covering downtown area', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'company-id' })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
