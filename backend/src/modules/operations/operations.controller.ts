import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperationsService } from './operations.service';
import type { CreateOperationDto } from './dto/create-operation.dto';
import type { UpdateOperationDto } from './dto/update-operation.dto';
import type { FilterOperationsDto } from './dto/filter-operations.dto';
import type { ChangeOperationStatusDto } from './dto/change-operation-status.dto';
import type { AssignDriverDto } from './dto/assign-driver.dto';
import type { AssignVehicleDto } from './dto/assign-vehicle.dto';
import type { CreateOperationStopDto } from './dto/create-operation-stop.dto';
import type { UpdateOperationStopDto } from './dto/update-operation-stop.dto';
import type { ReorderOperationStopsDto } from './dto/reorder-operation-stops.dto';
import { CurrentUser, type CurrentUserData } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@ApiTags('operations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  @Permissions('operations:create')
  @ApiOperation({ summary: 'Cria uma nova operação logística' })
  create(
    @Body() dto: CreateOperationDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.createOperation(dto, user);
  }

  @Get()
  @Permissions('operations:read')
  @ApiOperation({ summary: 'Lista operações do tenant autenticado' })
  list(
    @Query() filters: FilterOperationsDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.listOperations(filters, user);
  }

  @Get(':id')
  @Permissions('operations:read')
  @ApiOperation({ summary: 'Recupera detalhes de uma operação' })
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.operationsService.getOperation(id, user);
  }

  @Patch(':id')
  @Permissions('operations:update')
  @ApiOperation({ summary: 'Atualiza campos editáveis de uma operação' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOperationDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.updateOperation(id, dto, user);
  }

  @Post(':id/change-status')
  @Permissions('operations:change_status')
  @ApiOperation({ summary: 'Altera o status da operação seguindo a máquina de estados' })
  changeStatus(
    @Param('id') id: string,
    @Body() dto: ChangeOperationStatusDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.changeStatus(id, dto, user);
  }

  @Post(':id/assign-driver')
  @Permissions('operations:assign_driver')
  @ApiOperation({ summary: 'Aloca um motorista na operação' })
  assignDriver(
    @Param('id') id: string,
    @Body() dto: AssignDriverDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.assignDriver(id, dto, user);
  }

  @Post(':id/assign-vehicle')
  @Permissions('operations:assign_vehicle')
  @ApiOperation({ summary: 'Aloca um veículo na operação' })
  assignVehicle(
    @Param('id') id: string,
    @Body() dto: AssignVehicleDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.assignVehicle(id, dto, user);
  }

  @Post(':id/stops')
  @Permissions('operations:plan')
  @ApiOperation({ summary: 'Adiciona uma parada ao planejamento da operação' })
  addStop(
    @Param('id') id: string,
    @Body() dto: CreateOperationStopDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.addStop(id, dto, user);
  }

  @Patch(':id/stops/:stopId')
  @Permissions('operations:plan')
  @ApiOperation({ summary: 'Atualiza uma parada planejada' })
  updateStop(
    @Param('id') id: string,
    @Param('stopId') stopId: string,
    @Body() dto: UpdateOperationStopDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.updateStop(id, stopId, dto, user);
  }

  @Post(':id/stops/reorder')
  @Permissions('operations:plan')
  @ApiOperation({ summary: 'Reordena a sequência das paradas planejadas' })
  reorderStops(
    @Param('id') id: string,
    @Body() dto: ReorderOperationStopsDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.operationsService.reorderStops(id, dto, user);
  }
}
