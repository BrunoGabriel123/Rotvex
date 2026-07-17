import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  OPERATION_PRIORITY_VALUES,
  OPERATION_STATUS_VALUES,
} from '../constants/operation.constants';

export class FilterOperationsDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Busca textual por código ou cliente' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Status das operações',
    enum: OPERATION_STATUS_VALUES,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsIn(OPERATION_STATUS_VALUES, { each: true })
  status?: string[];

  @ApiPropertyOptional({
    description: 'Prioridade',
    enum: OPERATION_PRIORITY_VALUES,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsIn(OPERATION_PRIORITY_VALUES, { each: true })
  priority?: string[];

  @ApiPropertyOptional({ description: 'Cliente específico' })
  @IsOptional()
  @IsString()
  clientId?: string;

  @ApiPropertyOptional({ description: 'Motorista específico' })
  @IsOptional()
  @IsString()
  driverId?: string;

  @ApiPropertyOptional({ description: 'Veículo específico' })
  @IsOptional()
  @IsString()
  vehicleId?: string;

  @ApiPropertyOptional({
    description: 'Data inicial planejada',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Data final planejada',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
