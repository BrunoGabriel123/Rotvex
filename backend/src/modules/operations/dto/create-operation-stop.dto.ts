import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { OPERATION_STOP_TYPE_VALUES } from '../constants/operation.constants';

export class CreateOperationStopDto {
  @ApiPropertyOptional({ description: 'Sequência na rota (1-n)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  sequence?: number;

  @ApiProperty({
    description: 'Tipo da parada',
    enum: OPERATION_STOP_TYPE_VALUES,
  })
  @IsIn(OPERATION_STOP_TYPE_VALUES)
  type: (typeof OPERATION_STOP_TYPE_VALUES)[number];

  @ApiPropertyOptional({ description: 'Cliente relacionado à parada' })
  @IsOptional()
  @IsString()
  clientId?: string;

  @ApiProperty({ description: 'Nome do local de atendimento' })
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @ApiProperty({ description: 'Endereço completo' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ description: 'Latitude do ponto' })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude do ponto' })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Janela inicial de atendimento',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  windowStartAt?: string;

  @ApiPropertyOptional({
    description: 'Janela final de atendimento',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  windowEndAt?: string;

  @ApiPropertyOptional({
    description: 'Horário previsto de chegada',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  plannedArrivalAt?: string;

  @ApiPropertyOptional({
    description: 'Tempo de atendimento estimado (minutos)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  serviceTimeMinutes?: number;

  @ApiPropertyOptional({ description: 'Quantidade atendida' })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({ description: 'Volume atendido' })
  @IsOptional()
  @IsNumber()
  volume?: number;

  @ApiPropertyOptional({ description: 'Peso atendido' })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({ description: 'Observações adicionais' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Instruções específicas' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiPropertyOptional({ description: 'Contato no local' })
  @IsOptional()
  @IsString()
  contactName?: string;

  @ApiPropertyOptional({ description: 'Telefone do contato' })
  @IsOptional()
  @IsString()
  contactPhone?: string;
}
