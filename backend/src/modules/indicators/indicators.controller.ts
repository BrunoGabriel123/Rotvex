import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IndicatorsService } from './indicators.service';
import { IndicatorBatchQueryDto, IndicatorQueryDto } from './dto/query-indicator.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser, type CurrentUserData } from '../../common/decorators/current-user.decorator';

@ApiTags('indicators')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get('definitions')
  @Permissions('dashboard:read')
  @ApiOperation({ summary: 'Lista todas as definições de indicadores disponíveis' })
  listDefinitions() {
    return this.indicatorsService.listDefinitions();
  }

  @Get(':key/definition')
  @Permissions('dashboard:read')
  @ApiOperation({ summary: 'Obtém a definição detalhada de um indicador' })
  getDefinition(@Param('key') key: string) {
    return this.indicatorsService.getDefinition(key);
  }

  @Get(':key/value')
  @Permissions('dashboard:read')
  @ApiOperation({ summary: 'Obtém o valor calculado de um indicador' })
  getIndicatorValue(
    @Param('key') key: string,
    @Query() query: IndicatorQueryDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.indicatorsService.getIndicatorValue(key, query, user.companyId);
  }

  @Post('batch')
  @Permissions('dashboard:read')
  @ApiOperation({ summary: 'Obtém valores de múltiplos indicadores em lote' })
  getBatchValues(
    @Body() payload: IndicatorBatchQueryDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.indicatorsService.getBatchValues(payload.keys, payload, user.companyId);
  }
}
