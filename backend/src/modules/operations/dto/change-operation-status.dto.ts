import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { OPERATION_STATUS_VALUES } from '../constants/operation.constants';

export class ChangeOperationStatusDto {
  @ApiProperty({ description: 'Novo status', enum: OPERATION_STATUS_VALUES })
  @IsIn(OPERATION_STATUS_VALUES)
  toStatus: (typeof OPERATION_STATUS_VALUES)[number];

  @ApiProperty({ description: 'Motivo da transição', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
