# Checklist Multi-tenant

Objetivo: garantir que usuários de uma empresa não acessem/alterem dados de outra. Use este checklist em code reviews, testes e auditorias.

## 1. Autenticação e contexto
- [ ] JWT inclui `companyId` e expira adequadamente.
- [ ] Guards (`JwtAuthGuard`) sempre populam `request.user.companyId`.
- [ ] Decorators/helpers (`CurrentUser`) expõem `companyId` sem permitir override.

## 2. Controllers
- [ ] Nenhum endpoint aceita `companyId` por query/body; sempre usar o do token.
- [ ] IDs recebidos (`driverId`, `vehicleId`, `clientId`, etc.) são validados contra o tenant antes de prosseguir.
- [ ] Respostas não incluem dados de outra empresa (inclusive em relacionamentos).

## 3. Services/Repositórios
- [ ] Toda consulta Prisma inclui filtro `where: { companyId: currentCompanyId }` ou equivalente (inclusive relações `order: { companyId }`).
- [ ] Métodos que buscam por `id` usam `findFirst` com `companyId` para evitar vazamento.
- [ ] Soft deletes consideram tenant (`deletedAt` + `companyId`).
- [ ] Operações em lote (ex.: `updateMany`) aplicam `companyId` no filtro.

## 4. Seeds e testes
- [ ] Seeds criam ao menos duas empresas com dados completos (usuários, recursos, operações).
- [ ] Testes unitários/integrados têm cenários que tentam acessar dados da empresa B com usuário da empresa A → devem falhar com `TENANT_RESOURCE_MISMATCH`.
- [ ] e2e valida que filtros/paginação não contam registros de outro tenant.

## 5. Frontend
- [ ] Serviços não enviam `companyId`; dependem do token/contexto.
- [ ] Componentes listam apenas dados retornados da API; sem caches globais compartilhados entre tenants.
- [ ] Ao trocar de empresa (futuro), invalidar queries do TanStack Query usando `companyId` no `queryKey`.

## 6. Logs, Jobs e Cache
- [ ] Logs estruturados incluem `companyId` para cada ação relevante.
- [ ] Jobs (fila/BullMQ) carregam `companyId` nos dados para processamentos assíncronos.
- [ ] Qualquer cache (Redis) usa chave namespaced por `companyId`.

## 7. Paginação e métricas
- [ ] `meta.total` e demais contagens consideram somente registros do tenant.
- [ ] Gráficos/métricas agregadas filtram por `companyId` antes do agrupamento.

## 8. Observabilidade e auditoria
- [ ] Audit logs armazenam `companyId` e podem ser filtrados por empresa.
- [ ] Alertas/notifications incluem `companyId` e nunca são enviados para outro tenant.

## 9. Revisão contínua
- [ ] Checklist aplicado em PRs que tocam módulos multi-tenant.
- [ ] Documentar violações e correções em `docs/operational-core-integration-map.md`.
