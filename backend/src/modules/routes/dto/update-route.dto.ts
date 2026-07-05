import { PartialType } from '@nestjs/swagger';
import { CreateRouteDto } from './create-route.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateRouteDto extends PartialType(CreateRouteDto) {
  @ApiProperty({ example: 'active', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
