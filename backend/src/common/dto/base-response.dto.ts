import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  message: string;

  constructor(data: T, message: string = 'Success') {
    this.data = data;
    this.message = message;
  }
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ type: [Object] })
  data: T[];

  @ApiProperty()
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };

  constructor(
    data: T[],
    meta: { total: number; page: number; limit: number; totalPages: number },
  ) {
    this.data = data;
    this.meta = meta;
  }
}
