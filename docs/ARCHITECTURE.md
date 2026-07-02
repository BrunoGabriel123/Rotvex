# Arquitetura - Moventra

## Objetivo

O Moventra será uma plataforma SaaS de gerenciamento logístico desenvolvida com foco em:

- Escalabilidade
- Código limpo
- Manutenção simples
- Baixo acoplamento
- Alta reutilização
- Boa experiência do usuário

---

# Stack

## Front-end

- Next.js
- React
- TypeScript
- TailwindCSS
- Shadcn/UI
- TanStack Query
- React Hook Form
- Zod
- Lucide Icons

---

## Back-end

- NestJS
- Prisma ORM
- PostgreSQL

---

## Infraestrutura

- Docker
- Docker Compose
- Redis
- BullMQ
- Cloudflare R2
- GitHub Actions

---

# Arquitetura

Frontend

↓

API

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

---

# Estrutura do Projeto

```
src/

app/
components/
features/
layouts/
hooks/
lib/
services/
types/
utils/
styles/
```

---

# Organização

## Components

Componentes reutilizáveis.

Exemplo

```
components/ui
components/layout
components/table
components/forms
components/charts
components/cards
```

---

## Features

Cada módulo possui sua própria estrutura.

Exemplo

```
features/

dashboard/

vehicles/

drivers/

deliveries/

routes/

clients/

reports/

costs/
```

Cada feature deve conter:

```
components

hooks

services

types

schemas

pages
```

---

# Camadas

## UI

Responsável apenas pela interface.

Não possui regra de negócio.

---

## Hooks

Responsável pelo estado da tela.

---

## Services

Responsável por consumir APIs.

---

## API

Recebe requisições.

Valida.

Chama Services.

---

## Services (Backend)

Contém toda regra de negócio.

---

## Repository

Acesso ao banco.

Nenhuma regra de negócio.

---

# Padrões

Utilizar:

- SOLID
- Clean Code
- DRY
- KISS

Evitar:

- Arquivos gigantes
- Componentes acima de 300 linhas (preferencialmente)
- Duplicação
- Lógica dentro da UI
- SQL espalhado

---

# Convenções

Pastas

kebab-case

Arquivos

kebab-case

Componentes

PascalCase

Variáveis

camelCase

Constantes

UPPER_CASE

Interfaces

Prefixo I somente quando necessário.

Types

Utilizar type quando possível.

---

# Estrutura das Features

Exemplo

```
features/

vehicles/

components/

vehicle-table.tsx

vehicle-card.tsx

vehicle-form.tsx

hooks/

use-vehicles.ts

services/

vehicle.service.ts

schemas/

vehicle.schema.ts

types/

vehicle.ts

page.tsx
```

---

# Navegação

Dashboard

Operações

Pedidos

Entregas

Coletas

Rotas

Frota

Motoristas

Clientes

Custos

Relatórios

Configurações

---

# Banco de Dados

Entidades iniciais

Company

User

Role

Permission

Vehicle

Driver

Client

Route

Delivery

Pickup

Order

Maintenance

Fuel

Expense

Notification

AuditLog

---

# Autenticação

JWT

Refresh Token

RBAC

Multiempresa

---

# Dashboard

Sempre baseado em KPIs.

Evitar excesso de informação.

Priorizar:

- Indicadores
- Alertas
- Gráficos
- Tabelas resumidas

---

# Design

Tema claro.

Minimalista.

Empresarial.

Muito espaço entre elementos.

Poucas cores.

Uso predominante de:

- Branco
- Cinza
- Azul

---

# Performance

- Lazy Loading
- Memoização quando necessária
- Server Components quando fizer sentido
- Cache via React Query
- Paginação
- Virtualização em tabelas grandes

---

# Qualidade

Todo código deve:

- Compilar
- Passar no lint
- Não gerar warnings
- Ser reutilizável
- Possuir tipagem

---

# Commits

Sempre pequenos.

Exemplos

- cria estrutura inicial do dashboard
- adiciona sidebar principal
- implementa listagem de veículos
- organiza layout de motoristas
- melhora filtros de entregas

Nunca utilizar:

- update
- fix
- ajustes
- ia
- gpt
- refactor geral

---

# Escopo Atual

Nesta fase o projeto utilizará:

- Dados mockados
- Estrutura visual
- Componentização

Integrações reais serão implementadas apenas após a conclusão das telas principais.

---

# Princípio do Projeto

Cada tarefa deve resolver apenas um problema.

Não antecipar funcionalidades.

Não criar código "para o futuro".

Priorizar simplicidade, organização e legibilidade.