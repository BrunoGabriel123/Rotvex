import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignVehicleDto {
  @ApiProperty({ description: 'Identificador do veículo' })
  @IsString()
  vehicleId: string;
}
