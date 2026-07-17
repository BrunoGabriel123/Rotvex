# Sistema de Audit Logs

Sistema de logging para registrar todas as ações importantes que ocorrem no backend.

## Estrutura

- **audit-logs.module.ts**: Módulo principal
- **audit-logs.service.ts**: Serviço para criar e consultar logs
- **audit-logs.controller.ts**: Controller para expor logs via API
- **audit-logs.decorator.ts**: Decorator para logging automático
- **audit-logs.interceptor.ts**: Interceptor para capturar requisições HTTP

## Uso

### 1. Logging Manual

```typescript
import { AuditLogsService } from './audit-logs/audit-logs.service';

constructor(private auditLogsService: AuditLogsService) {}

async someMethod() {
  await this.auditLogsService.create({
    action: 'CREATE',
    entity: 'Vehicle',
    entityId: 'vehicle-id',
    userId: 'user-id',
    companyId: 'company-id',
    metadata: { additionalInfo: 'value' },
  });
}
```

### 2. Logging Automático com Decorator

```typescript
import { AuditLog } from './audit-logs/audit-logs.decorator';
import { UseInterceptors } from '@nestjs/common';
import { AuditLogsInterceptor } from './audit-logs/audit-logs.interceptor';

@Controller('vehicles')
export class VehiclesController {
  @Post()
  @AuditLog({ action: 'CREATE', entity: 'Vehicle', entityIdParam: 'id' })
  @UseInterceptors(AuditLogsInterceptor)
  async create(@Body() dto: CreateVehicleDto) {
    // O log será criado automaticamente
  }
}
```

### 3. Consultar Logs

#### Por empresa
```
GET /audit-logs?companyId=xxx&skip=0&take=50
```

#### Por usuário
```
GET /audit-logs/user/xxx?skip=0&take=50
```

#### Por entidade
```
GET /audit-logs/entity?entity=Vehicle&entityId=xxx&skip=0&take=50
```

## Campos do Log

- **action**: Ação realizada (CREATE, UPDATE, DELETE, etc.)
- **entity**: Tipo da entidade (Vehicle, Driver, Order, etc.)
- **entityId**: ID da entidade afetada
- **userId**: ID do usuário que realizou a ação
- **companyId**: ID da empresa
- **metadata**: Dados adicionais (opcional)
- **createdAt**: Data/hora do log (automático)

## Segurança

O interceptor remove automaticamente dados sensíveis do body antes de salvar:
- password
- currentPassword
- newPassword
- token
