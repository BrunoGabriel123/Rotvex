import { Controller, Get, Query } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  async findByCompany(
    @Query('companyId') companyId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;

    return this.auditLogsService.findByCompany(companyId, skipNum, takeNum);
  }

  @Get('user/:userId')
  async findByUser(
    @Query('userId') userId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;

    return this.auditLogsService.findByUser(userId, skipNum, takeNum);
  }

  @Get('entity')
  async findByEntity(
    @Query('entity') entity: string,
    @Query('entityId') entityId?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 50;

    return this.auditLogsService.findByEntity(
      entity,
      entityId,
      skipNum,
      takeNum,
    );
  }
}
