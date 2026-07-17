# Moventra — Visão Geral Completa

## 1. Propósito e Diretrizes
- Moventra é um SaaS para gestão logística cobrindo operações, frotas, entregas, coletas, rotas, motoristas, clientes, custos e relatórios.@README.md#1-4
- Princípios: escopo enxuto por tarefa, foco em escalabilidade, código limpo, baixo acoplamento, alta reutilização e UX empresarial minimalista.@docs/ARCHITECTURE.md#5-404 @docs/ARCHITECTURE.md#453-473

## 2. Stack Tecnológica
- **Frontend**: Next.js 15, TypeScript, TailwindCSS, Shadcn/UI, React Hook Form, Zod, TanStack Query, Lucide Icons.@README.md#5-15 @docs/ARCHITECTURE.md#18-29
- **Backend**: NestJS, TypeScript, PostgreSQL, Prisma, JWT/Passport, Swagger, Redis, BullMQ.@README.md#16-27 @backend/README.md#5-15
- **Infraestrutura**: Docker, Docker Compose, Redis, Cloudflare R2 (planejado), GitHub Actions, PgAdmin.@README.md#22-27 @docs/ARCHITECTURE.md#40-48 @README.md#125-185

## 3. Estrutura do Repositório
```
rotvex/
├── frontend/   # Next.js app
├── backend/    # NestJS API
├── docker/     # Dockerfiles frontend/backend
├── scripts/    # Automação (setup, dev, build, lint, test, seed, reset-db, clean)
├── docs/       # Documentação
├── .github/    # GitHub Actions
├── docker-compose.yml, .env.example, package.json
```
@README.md#228-247 @README.md#91-124

## 4. Frontend
- Visão geral, stack e convenções documentadas em `frontend/FRONTEND.md`.@frontend/FRONTEND.md#1-204
- Estrutura modular: `src/app`, `components` (layout + ui), `features/*`, `hooks`, `services`, `types`, `schemas`, `mocks`, `config`, `lib`, `providers`.@frontend/FRONTEND.md#18-88
- Componentes base incluem AppSidebar/AppHeader/MainLayout, MetricCard, DataTable, StatusBadge, EmptyState, FilterBar, SectionCard, DetailsDrawer e MockMap.@frontend/FRONTEND.md#55-88
- Padrões de UI: tema claro, cores azul/cinza, espaçamento generoso, máximo 300 linhas por componente, tipagem explícita, responsividade e acessibilidade.@frontend/FRONTEND.md#90-248
- Fluxo de trabalho: criar feature completa (componentes, hooks, serviços, tipos, schemas, mocks) e integrar na página correspondente, com comandos `npm run dev/build/lint/format`.@frontend/FRONTEND.md#176-206
- Roadmap frontend: Fase 1 (base) concluída; próximas fases cobrem cadastros, operação, custos, indicadores e segurança.@frontend/FRONTEND.md#266-302

## 5. Backend
- Arquitetura modular NestJS com diretório `src/modules` contendo auth, users, companies, roles, permissions, vehicles, drivers, clients, orders, deliveries, pickups, routes, maintenance, fuel, expenses, dashboard, reports, notifications, audit-logs etc.@backend/README.md#16-54
- Cada módulo agrupa `controller`, `service`, `dto` e `module`. Ex.: `VehiclesService` já implementa CRUD com paginação, busca, soft delete e validações de conflito/not found usando Prisma.@backend/src/modules/vehicles/vehicles.service.ts#1-112
- Shared layer em `src/common` oferece database module, config, decorators, guards, filters, interceptors, DTOs, utils etc.@backend/README.md#39-53
- Tecnologias auxiliares: Swagger em `/api`, autenticação JWT com refresh token, multi-tenant via entidade `Company`, RBAC com roles/permissions/guards.@backend/README.md#5-162

## 6. Banco de Dados (Prisma)
Principais modelos definidos em `backend/prisma/schema.prisma`:
- **Company** centraliza usuários, clientes, veículos, drivers, ordens, rotas, despesas e notificações.@backend/prisma/schema.prisma#13-30
- **User/Role/Permission/RolePermission/RefreshToken** implementam RBAC multiempresa e autenticação com refresh tokens.@backend/prisma/schema.prisma#32-88
- **Operação**: Vehicle, Driver, Client, Order, Delivery, Pickup, Route cobrem logística ponta a ponta.@backend/prisma/schema.prisma#90-213
- **Custos**: Maintenance, Fuel, Expense registram manutenção, abastecimento e despesas gerais.@backend/prisma/schema.prisma#215-253
- **Governança**: Notification e AuditLog registram comunicações e trilhas de auditoria.@backend/prisma/schema.prisma#255-279

## 7. Infraestrutura e Operações
- Docker Compose levanta frontend (3000), backend (3001), PostgreSQL (5432), Redis (6379) e PgAdmin (5050).@README.md#125-185
- Variáveis `.env` padronizam URLs, portas, credenciais, segredos JWT, diretórios de upload e timezone.@README.md#186-226
- Scripts npm/raiz e bash cobrem dev, build, lint, test, docker up/down, format, seeds e reset de banco.@README.md#91-124
- Troubleshooting documenta cenários como containers travados, conflitos de porta e rebuild de frontend.@README.md#275-315

## 8. Qualidade, CI/CD e Boas Práticas
- Ferramentas: ESLint, Prettier, Husky, lint-staged, Commitlint.@README.md#249-274
- Hooks: `pre-commit` (lint-staged) e `commit-msg` (formato).@README.md#259-263
- GitHub Actions: lint, build frontend/backend, testes, docker build e check completo em PRs.@README.md#264-274
- Guia de commits e fluxo de trabalho enfatiza mensagens curtas e branches por feature.@README.md#317-341
- Regras gerais reforçam SOLID, Clean Code, DRY, KISS e evitam componentes grandes, lógica na UI e SQL espalhado.@docs/ARCHITECTURE.md#205-254

## 9. Documentação, Roadmap e Tarefas
- `docs/ARCHITECTURE.md`: visão de camadas (UI → Hooks → Services → API → Services → Repository → Prisma → PostgreSQL), convenções de nomenclatura, estrutura de features, navegação planejada, autenticação (JWT + refresh + RBAC + multiempresa) e princípios de performance/qualidade.@docs/ARCHITECTURE.md#51-427
- `docs/ROADMAP.md`: fases 1–7 cobrindo base, cadastros, operação, custos, indicadores, segurança e qualidade (CI/CD, Docker, testes, Swagger, deploy).@docs/ROADMAP.md#3-53
- `docs/TASKS.md`: backlog curto de 5 tarefas (estrutura Next/Tailwind, layout base, dashboard com cards, páginas vazias por módulo, dados mockados).@docs/TASKS.md#3-33

## 10. Próximos Passos Recomendados
1. Implementar autenticação completa (JWT, refresh, RBAC) e expor endpoints via Swagger, conforme plano do backend.@backend/README.md#148-191
2. Completar CRUDs reais para módulos prioritários (clientes, motoristas, veículos, rotas) e conectar frontend aos serviços (substituindo mocks) seguindo a estrutura de features.@backend/README.md#183-191 @frontend/FRONTEND.md#18-88
3. Evoluir fases do roadmap: operação (pedidos/coletas/entregas), custos e indicadores, mantendo princípio de “uma tarefa resolve um problema” com dados mockados até a estabilização das telas.@docs/ROADMAP.md#17-53 @docs/ARCHITECTURE.md#455-463
