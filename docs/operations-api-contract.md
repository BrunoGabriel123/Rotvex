# Contratos da API de Operações

> **Status:** rascunho alinhado ao Plano Paralelo 2. Ajustes finais dependem da implementação do núcleo operacional no Plano 1. Sempre validar nomes de campos e enums antes do merge final.

## 1. Convenções gerais
- Base URL backend: `https://api.moventra.com` (ajustar por ambiente).
- Todas as rotas exigem autenticação JWT (`Authorization: Bearer <token>`), salvo menção contrária.
- Tenant identificado por `companyId` presente no token; nenhum endpoint aceita `companyId` arbitrário.
- Headers recomendados: `X-Correlation-Id` para rastreabilidade.
- Resposta padrão aplica `TransformInterceptor`: `{ "data": <payload>, "success": true, "timestamp": "ISO" }`.
- Erros seguem catálogo `docs/domain-error-catalog.md` com formato `{ "success": false, "timestamp": "ISO", "path": "/rota", "error": { "code": "DRIVER_UNAVAILABLE", "message": "..." } }`.
- Paginação usa `page`, `limit`, `sortBy`, `sortOrder` conforme `PaginationDto`.

## 2. Recursos e enums relevantes
| Enum | Valores | Observações |
| --- | --- | --- |
| `OperationStatus` | `DRAFT`, `AWAITING_PLANNING`, `PLANNED`, `READY_TO_START`, `IN_PICKUP`, `IN_TRANSIT`, `IN_DELIVERY`, `DELIVERED`, `COMPLETED`, `CANCELLED` | Transições controladas pelo Plano 1. |
| `OperationPriority` | `LOW`, `NORMAL`, `HIGH`, `CRITICAL` | Default `NORMAL`. |
| `OperationStopType` | `PICKUP`, `DELIVERY`, `SUPPORT`, `RETURN` | Sequência definida em planejamento. |
| `OperationStopStatus` | `PENDING`, `ARRIVED`, `IN_SERVICE`, `COMPLETED`, `FAILED`, `SKIPPED` | Utilizado em paradas. |

## 3. Endpoints
Cada endpoint apresenta: método, rota, autenticação, permissão, parâmetros, corpo, resposta, erros e notas.

### 3.1 Criar operação
- **POST** `/operations`
- **Permissão**: `operations:create`
- **Body**: `CreateOperationDto` (ver `backend/src/modules/operations/dto/create-operation.dto.ts`).
- **Resposta**: operação criada com status inicial `DRAFT`.
- **Erros**:
  - `422 OPERATION_CODE_ALREADY_EXISTS`
  - `404 CLIENT_NOT_FOUND`
  - `409 ORDER_TENANT_MISMATCH`
  - `409 DRIVER_UNAVAILABLE` (se `driverId` informado e já alocado)
- **Notas**: `code` deve ser único por empresa; `stops` opcionais enquanto planejamento não estiver ativo.

### 3.2 Listar operações
- **GET** `/operations`
- **Permissão**: `operations:read`
- **Query**:
  - `page`, `limit`, `sortBy`, `sortOrder`
  - Filtros: `status`, `priority`, `driverId`, `vehicleId`, `routeId`, `clientId`, `dateFrom`, `dateTo`, `search` (código/título).
- **Resposta**: `PaginatedResponseDto<OperationListItem>` contendo `meta.total`, `meta.totalPages`.
- **Notas**: listar somente dados do tenant do usuário; garantir que `meta.total` não inclua outras empresas.

### 3.3 Detalhar operação
- **GET** `/operations/:id`
- **Permissão**: `operations:read`
- **Resposta**: objeto completo com `stops`, `deliveries`, `statusHistory`, `occurrences` (paginadas opcionalmente).
- **Erros**: `404 OPERATION_NOT_FOUND`, `403 FORBIDDEN` (quando operação não pertence ao tenant).

### 3.4 Atualizar campos editáveis
- **PATCH** `/operations/:id`
- **Permissão**: `operations:update`
- **Body**: subconjunto de `CreateOperationDto` exceto `code`, `companyId`, `createdById`.
- **Regra**: permitido apenas se status estiver em `DRAFT`, `AWAITING_PLANNING` ou `PLANNED`. Caso contrário retornar `409 OPERATION_EDIT_BLOCKED`.

### 3.5 Planejamento de paradas
- **PUT** `/operations/:id/stops`
- **Permissão**: `operations:plan`
- **Body**: lista ordenada de `OperationStopDto` contendo sequência, janela, quantidades.
- **Regras**:
  - Sequência única (`operationId + sequence`).
  - Validação de conflito de janela com motorista/veículo se já alocados.
  - Atualização registra histórico (`OperationStatusHistory`) com `toStatus = PLANNED` quando aplicável.

### 3.6 Alocar motorista
- **POST** `/operations/:id/assign-driver`
- **Permissão**: `operations:assignDriver`
- **Body**: `{ "driverId": "uuid" }`
- **Validações**:
  - Motorista deve pertencer ao mesmo tenant.
  - Status permitido: `DRAFT`, `AWAITING_PLANNING`, `PLANNED`, `READY_TO_START`.
  - Verificar disponibilidade (sem conflito com outras operações nas janelas planejadas).
- **Erros**: `404 DRIVER_NOT_FOUND`, `409 DRIVER_UNAVAILABLE`, `409 DRIVER_SCHEDULE_CONFLICT`, `422 DRIVER_LICENSE_INCOMPATIBLE`.

### 3.7 Alocar veículo
- **POST** `/operations/:id/assign-vehicle`
- **Permissão**: `operations:assignVehicle`
- **Body**: `{ "vehicleId": "uuid" }`
- **Erros comuns**: `404 VEHICLE_NOT_FOUND`, `409 VEHICLE_UNAVAILABLE`, `409 VEHICLE_SCHEDULE_CONFLICT`, `422 VEHICLE_CAPACITY_EXCEEDED`, `422 VEHICLE_DOCUMENT_EXPIRED`.

### 3.8 Publicar planejamento
- **POST** `/operations/:id/publish`
- **Permissão**: `operations:publish`
- **Pré-condições**: status `PLANNED`, todas as paradas com sequência válida, motorista/veículo atribuídos.
- **Efeito**: status → `READY_TO_START`, notificar operadores/motoristas.
- **Erros**: `409 OPERATION_NOT_PLANNED`, `409 RESOURCES_MISSING`.

### 3.9 Iniciar operação
- **POST** `/operations/:id/start`
- **Permissão**: `operations:start`
- **Pré-condições**: status `READY_TO_START`, motorista/veículo com check-in confirmado.
- **Efeito**: status → `IN_PICKUP` ou `IN_TRANSIT` dependendo das paradas configuradas; registra `actualStartAt`.

### 3.10 Atualizar status (genérico)
- **POST** `/operations/:id/status`
- **Permissão**: `operations:changeStatus`
- **Body**: `{ "toStatus": "IN_DELIVERY", "reason": "...", "metadata": {}}`
- **Validações**: matriz de transições autorizadas definida pelo Plano 1. Registrar histórico.
- **Erros**: `409 INVALID_OPERATION_STATUS_TRANSITION`, `403 FORBIDDEN_STATUS_ACTION`.

### 3.11 Cancelar operação
- **POST** `/operations/:id/cancel`
- **Permissão**: `operations:cancel`
- **Body**: `{ "reason": "Cliente solicitou cancelamento" }`
- **Pré-condições**: status não pode ser `COMPLETED` ou `CANCELLED`; se já iniciou, exigir perfil administrador/gestor.
- **Erros**: `409 OPERATION_ALREADY_COMPLETED`, `422 CANCEL_REASON_REQUIRED`.

### 3.12 Concluir operação
- **POST** `/operations/:id/complete`
- **Permissão**: `operations:complete`
- **Pré-condições**: todas as paradas devem estar `COMPLETED` ou `SKIPPED`; sem ocorrências abertas.
- **Efeito**: status → `COMPLETED`, define `actualEndAt`, gera registro financeiro.

### 3.13 Gerenciar paradas individuais
- **PATCH** `/operations/:id/stops/:stopId`
- **Permissão**: `operations:updateStop`
- **Uso**: atualizar status, horário real, comprovantes.

### 3.14 Consultar recursos disponíveis
- **GET** `/operations/resources`
- **Permissão**: `operations:read`
- **Query**: `dateFrom`, `dateTo`, `type` (`drivers`/`vehicles`), `location`.
- **Resposta**: lista de motoristas/veículos com agenda agregada e indicações de conflito.

### 3.15 Validar conflitos
- **POST** `/operations/validation/conflicts`
- **Permissão**: `operations:plan`
- **Body**: `{ "driverId": "...", "vehicleId": "...", "windowStart": "ISO", "windowEnd": "ISO" }`
- **Resposta**: `{ "hasConflict": true, "conflicts": [ { "operationId": "...", "status": "IN_TRANSIT" } ] }`

## 4. Histórico e auditoria
- Cada ação relevante deve publicar `OperationStatusHistory` e opcionalmente `OperationOccurrence`.
- Decorator `@AuditLog` deve ser aplicado nos controllers após definição final.

## 5. Multi-tenant
- Todos os repositórios devem filtrar por `companyId` derivado do token; IDs informados no corpo/params devem ser validados antes de prosseguir.
- Seeds e testes devem considerar ao menos duas empresas para validar isolamento.

## 6. Dependências do Plano 1
- Máquina de estados definitiva (transições permitidas, mensagens) ainda será entregue pelo agente principal.
- Regras finais de planejamento, publicação automática e integração com pedidos/coletas devem ser confirmadas.
- Estrutura de ocorrências, comprovantes e métricas poderá evoluir; manter contratos flexíveis e documentados.
