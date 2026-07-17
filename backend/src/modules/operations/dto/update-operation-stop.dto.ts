import { PartialType } from '@nestjs/swagger';
import { CreateOperationStopDto } from './create-operation-stop.dto';

export class UpdateOperationStopDto extends PartialType(
  CreateOperationStopDto,
) {}
