import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignDriverDto {
  @ApiProperty({ description: 'Identificador do motorista' })
  @IsString()
  driverId: string;
}
