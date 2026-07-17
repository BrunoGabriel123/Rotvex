import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOperationStopDto } from './create-operation-stop.dto';
import { OPERATION_PRIORITY_VALUES } from '../constants/operation.constants';

export class CreateOperationDto {
  @ApiProperty({ description: 'Código único da operação dentro da empresa' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @ApiPropertyOptional({ description: 'Título ou identificação amigável' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @ApiProperty({ description: 'Cliente relacionado à operação' })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiPropertyOptional({ description: 'Pedido relacionado' })
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiPropertyOptional({ description: 'Rota planejada' })
  @IsOptional()
  @IsString()
  routeId?: string;

  @ApiPropertyOptional({ description: 'Motorista alocado' })
  @IsOptional()
  @IsString()
  driverId?: string;

  @ApiPropertyOptional({ description: 'Veículo alocado' })
  @IsOptional()
  @IsString()
  vehicleId?: string;

  @ApiPropertyOptional({
    description: 'Prioridade da operação',
    enum: OPERATION_PRIORITY_VALUES,
  })
  @IsOptional()
  @IsIn(OPERATION_PRIORITY_VALUES)
  priority?: (typeof OPERATION_PRIORITY_VALUES)[number];

  @ApiProperty({ description: 'Nome da origem' })
  @IsString()
  @IsNotEmpty()
  originName: string;

  @ApiProperty({ description: 'Endereço da origem' })
  @IsString()
  @IsNotEmpty()
  originAddress: string;

  @ApiPropertyOptional({ description: 'Latitude da origem' })
  @IsOptional()
  @IsNumber()
  originLatitude?: number;

  @ApiPropertyOptional({ description: 'Longitude da origem' })
  @IsOptional()
  @IsNumber()
  originLongitude?: number;

  @ApiPropertyOptional({ description: 'Nome do destino' })
  @IsOptional()
  @IsString()
  destinationName?: string;

  @ApiPropertyOptional({ description: 'Endereço do destino' })
  @IsOptional()
  @IsString()
  destinationAddress?: string;

  @ApiPropertyOptional({ description: 'Latitude do destino' })
  @IsOptional()
  @IsNumber()
  destinationLatitude?: number;

  @ApiPropertyOptional({ description: 'Longitude do destino' })
  @IsOptional()
  @IsNumber()
  destinationLongitude?: number;

  @ApiPropertyOptional({
    description: 'Início previsto',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  plannedStartAt?: string;

  @ApiPropertyOptional({
    description: 'Fim previsto',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  plannedEndAt?: string;

  @ApiPropertyOptional({ description: 'Distância estimada (km)' })
  @IsOptional()
  @IsNumber()
  estimatedDistanceKm?: number;

  @ApiPropertyOptional({ description: 'Duração estimada (minutos)' })
  @IsOptional()
  @IsNumber()
  estimatedDurationMin?: number;

  @ApiPropertyOptional({ description: 'Custo estimado' })
  @IsOptional()
  @IsNumber()
  estimatedCost?: number;

  @ApiPropertyOptional({ description: 'Valor do frete' })
  @IsOptional()
  @IsNumber()
  freightValue?: number;

  @ApiPropertyOptional({ description: 'Quantidade total transportada' })
  @IsOptional()
  @IsNumber()
  quantityTotal?: number;

  @ApiPropertyOptional({ description: 'Volume total transportado' })
  @IsOptional()
  @IsNumber()
  volumeTotal?: number;

  @ApiPropertyOptional({ description: 'Peso total transportado' })
  @IsOptional()
  @IsNumber()
  weightTotal?: number;

  @ApiPropertyOptional({ description: 'Observações gerais' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    description: 'Paradas planejadas para a operação',
    type: () => [CreateOperationStopDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOperationStopDto)
  stops?: CreateOperationStopDto[];
}
