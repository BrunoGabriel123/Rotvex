import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class IndicatorQueryFiltersDto {
  @ApiPropertyOptional({ description: 'Filtro de base operacional' })
  @IsOptional()
  @IsString()
  baseId?: string;

  @ApiPropertyOptional({ description: 'Filtro de rota' })
  @IsOptional()
  @IsString()
  routeId?: string;

  @ApiPropertyOptional({ description: 'Filtro de motorista' })
  @IsOptional()
  @IsString()
  driverId?: string;

  @ApiPropertyOptional({ description: 'Filtro de veículo' })
  @IsOptional()
  @IsString()
  vehicleId?: string;

  @ApiPropertyOptional({ description: 'Filtro de cliente' })
  @IsOptional()
  @IsString()
  clientId?: string;
}

export class IndicatorQueryDto extends IndicatorQueryFiltersDto {
  @ApiPropertyOptional({
    description: 'Data/hora inicial do período (ISO 8601)',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Data/hora final do período (ISO 8601)',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Timezone IANA',
    default: 'America/Sao_Paulo',
  })
  @IsOptional()
  @IsString()
  timezone?: string;
}

export class IndicatorBatchQueryDto extends IndicatorQueryDto {
  @ApiProperty({
    description: 'Chaves dos indicadores a serem consultados',
    isArray: true,
    example: ['operations_total', 'operations_completed'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  keys: string[];
}
