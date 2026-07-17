import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class ReorderOperationStopsDto {
  @ApiProperty({ description: 'Lista de IDs de paradas na nova ordem' })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  stopIds: string[];
}
