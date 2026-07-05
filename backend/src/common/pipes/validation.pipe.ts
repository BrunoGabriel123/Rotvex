import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const object = plainToInstance(metatype, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors.map((error) => {
        return error.constraints
          ? Object.values(error.constraints).join(', ')
          : 'Validation error';
      });
      throw new BadRequestException(messages);
    }

    return value;
  }

  private toValidate(metatype: unknown): boolean {
    const types: unknown[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
