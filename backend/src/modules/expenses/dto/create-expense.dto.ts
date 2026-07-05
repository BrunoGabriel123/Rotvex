import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Office supplies' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 150.5 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'supplies' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 'company-id' })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
