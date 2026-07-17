# Mapa de Integração do Núcleo Operacional

Este documento resume o estado atual do repositório para suportar o plano paralelo de qualidade, destacando arquivos relevantes, convenções, riscos e pontos dependentes do Plano 1.

## 1. Backend (NestJS)

### Estrutura principal
- `backend/src/app.module.ts`: agrega todos os módulos de domínio já versionados (auth, users, companies, roles, permissions, vehicles, drivers, clients, orders, deliveries, pickups, routes, maintenance, fuel, expenses, dashboard, reports, notifications, audit-logs etc.).
- `backend/src/modules/**`: cada módulo segue o padrão controller + service + dto + module. Alguns serviços (ex.: vehicles, drivers, orders) já usam Prisma com paginação e filtros básicos.
- `backend/src/common/database/prisma.service.ts` e `backend/src/common/database/database.module.ts`: abstraem o client Prisma para injeção.

### Compartilhados e convenções
- **Interceptors globais** (`backend/src/main.ts`): `LoggingInterceptor`, `TransformInterceptor`, `TimeoutInterceptor` e `HttpExceptionFilter` já estão aplicados globalmente. Respostas de sucesso seguem `{ data, success, timestamp }`, erros seguem `{ success: false, timestamp, path, error }`, mas mensagens e metadados ainda variam por controller.
- **DTOs utilitários** (`backend/src/common/dto/*.ts`): `BaseResponseDto`, `PaginatedResponseDto`, `PaginationDto`, `FilterDto` servem de referência, porém nem todos os módulos os utilizam.
- **Guards/Decorators** (`backend/src/common/guards`, `backend/src/common/decorators`):
  - `JwtAuthGuard` usa `IS_PUBLIC_KEY` para liberar rotas públicas e injeta `request.user` com payload JWT (contém `companyId`).
  - `RolesGuard` e `PermissionsGuard` consultam metadados de decorators, mas carecem de integração consistente com todos os controllers.
  - `CurrentUser` decorator facilita acesso ao usuário logado.

### Multi-tenant e autenticação
- JWT payload inclui `companyId`, mas a validação multi-tenant está pulverizada: vários serviços filtram por `companyId` manualmente, enquanto controllers como `dashboard` ainda recebem `companyId` via query string.
- Não há guard específico que valide se os IDs presentes no body/params pertencem ao tenant corrente. Este é um foco do checklist multi-tenant.

### Swagger e documentação de API
- Configuração central em `backend/src/main.ts` via `DocumentBuilder`. Atualmente expõe título/descrição parametrizados por ENV e adiciona bearer auth. Falta organização fina por tags, descrições detalhadas e exemplos dos DTOs operacionais.

### Seeds e dados operacionais
- `backend/src/database/seed.ts` já popula:
  - Roles (`admin`, `manager`, `driver`, `operator`) + permissões base e relacionamento role-permission.
  - Usuários padrões (admin, gestor, operador, motorista) e `company` padrão (`default-company`).
  - Cenários iniciais para rotas, veículos, motoristas, clientes, pedidos, entregas, coletas, manutenções, abastecimentos, despesas e notificações.
- Gaps: apenas um tenant está populado; faltam estados adicionais (atrasada, conflito, multiempresa) exigidos no plano; entidade `Operation` ainda não está disponível.

### Testes backend
- `backend/package.json` define scripts com Jest (`test`, `test:e2e` etc.), mas quase não há `*.spec.ts` em `src` além do boilerplate.
- `backend/test/app.e2e-spec.ts` cobre apenas o endpoint raiz `GET /`.
- Não existe separação entre testes unitários, integração e e2e para módulos críticos; nenhum setup de banco isolado está configurado.

### Observabilidade e health
- Interceptor de logging e filtro de exceções já estruturam logs básicos, porém sem `correlationId`/`companyId` explícitos.
- `backend/src/modules/audit-logs/audit-logs.interceptor.ts` grava auditorias assíncronas quando o decorator é usado, mas poucos controllers o aplicam.
- Health check limitado a `GET /health` retornando status estático; não há `/live` ou `/ready`, nem validação de banco/Redis.
- Métricas não estão instrumentadas.

### Configuração de ambiente
- `.env.example` na raiz e em cada pacote listam variáveis básicas, porém não existe validação automática (ex.: `@nestjs/config` + schema) e algumas variáveis recebem fallback estático (ex.: `JWT_REFRESH_SECRET`).

## 2. Frontend (Next.js 15)

- Estrutura modular documentada em `frontend/FRONTEND.md` e presente em `frontend/src/{app,components,features,...}`.
- Features usam mocks em `frontend/src/mocks` e serviços placeholders; integração real com o backend ainda não ocorre.
- Scripts disponíveis: `dev`, `build`, `start`, `lint`. Não há `test`, `typecheck` ou `check` configurado.
- Componentes já contemplam elementos visuais (sidebar, header, cards, drawers), mas telas da Central de Operações seguem com dados mockados.

## 3. Pipelines e scripts

- Workflows atuais (`.github/workflows/*.yml`):
  - `lint.yml`, `test.yml`, `build-frontend.yml`, `build-backend.yml`, `docker-build.yml`, `pr-check.yml`.
  - Eles fazem `npm ci` + lint/test/build por workspace, mas **não** executam typecheck, validação Prisma, seeds, testes de integração com banco ou docker compose completo.
- Scripts npm:
  - Backend: `build`, `lint`, `test`, `test:e2e`, `seed`; faltam `typecheck`, `test:unit`, `test:integration`, `test:e2e` realista e `check` agregado.
  - Frontend: apenas `dev/build/start/lint`.
- Scripts bash (`scripts/*.sh`) cobrem operações básicas (dev, build, lint), sem pipeline completo.

## 4. Convenções já existentes

- **Padrão de resposta**: TransformInterceptor + HttpExceptionFilter definem wrappers globais, mas é preciso alinhar mensagens e uso de `meta` para evitar wrappers duplicados.
- **Paginação/filtros**: DTOs prontos, porém nem todos os endpoints os expõem; algumas listagens fazem paginação manual.
- **Erros**: exceções de domínio ainda são genéricas (`ConflictException`, `NotFoundException` etc.) sem catálogo formal de códigos/erros para Swagger e frontend.

## 5. Lacunas e riscos mapeados

1. **Dependência do Plano 1**: entidades `Operation`, `Route`, `Order`, `Delivery`, `Pickup`, `Vehicle`, `Driver` podem mudar — contratos/testes precisam ser marcados como provisórios.
2. **Multi-tenant**: ausência de guard dedicado e validação automática dos IDs recebidos pode permitir leitura/criação cruzada entre empresas.
3. **RBAC**: decorators existem, mas falta matriz oficial de permissões por ação e testes garantindo enforcement.
4. **Seeds**: apenas um tenant; precisamos adicionar Empresa B e cenários descritos (motorista indisponível, veículo em manutenção, operações em vários estados) sem remover dados úteis.
5. **Testes**: cobertura praticamente inexistente; não há utilitários para banco isolado ou factories.
6. **Swagger**: documentação superficial; faltam descrições, exemplos, erros e restrições multi-tenant/RBAC.
7. **Observabilidade**: logs não incluem campos obrigatórios e não há métricas/health completos.
8. **Pipelines/scripts**: inexistência de comando `check` consolidado; workflows não sobem banco para testes de integração.
9. **Frontend integração**: aplicações usam mocks, sem checklist de integração e sem testes de UI específicos para operações.

## 6. Próximos passos alinhados ao plano

- Documentar contratos provisórios (`docs/operations-api-contract.md`) baseados no estado atual e sinalizar dependências do Plano 1.
- Criar catálogo de erros, matriz RBAC, checklist multi-tenant, checklist de integração e guia funcional conforme solicitado.
- Evoluir seeds para cenários completos (incluindo Empresa B) preservando dados atuais.
- Preparar suites de testes unitários/integrados/e2e e testes frontend considerando as restrições atuais, marcando casos que dependem da implementação definitiva.
- Atualizar Swagger, health checks, logs estruturados e pipelines/scripts conforme descrito no plano paralelo.

> **Nota:** qualquer alteração em `schema.prisma`, migrations ou na máquina de estados deve ser proposta de forma incremental e validada com o agente principal antes da implementação.
