import { PartialType } from '@nestjs/swagger';
import { CreatePickupDto } from './create-pickup.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdatePickupDto extends PartialType(CreatePickupDto) {
  @ApiProperty({ example: 'completed', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
