import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'users:create' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Create users', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'users' })
  @IsString()
  @IsNotEmpty()
  resource: string;

  @ApiProperty({ example: 'create' })
  @IsString()
  @IsNotEmpty()
  action: string;
}
