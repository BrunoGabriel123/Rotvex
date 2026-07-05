# Rotvex Backend

Backend do Rotvex - SaaS de gerenciamento logístico.

## Tecnologias

- **Framework**: NestJS
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT + Passport
- **Documentação**: Swagger
- **Cache/Filas**: Redis + BullMQ
- **Containerização**: Docker

## Estrutura do Projeto

```
src/
├── modules/           # Módulos de negócio
│   ├── auth/         # Autenticação
│   ├── users/        # Usuários
│   ├── companies/    # Empresas (multi-tenant)
│   ├── roles/        # Perfis (RBAC)
│   ├── permissions/  # Permissões
│   ├── vehicles/     # Veículos
│   ├── drivers/      # Motoristas
│   ├── clients/      # Clientes
│   ├── orders/       # Pedidos
│   ├── deliveries/   # Entregas
│   ├── pickups/      # Coletas
│   ├── routes/       # Rotas
│   ├── maintenance/  # Manutenções
│   ├── fuel/         # Abastecimentos
│   ├── expenses/     # Despesas
│   ├── dashboard/    # Dashboard
│   ├── reports/      # Relatórios
│   └── notifications/# Notificações
├── common/           # Código compartilhado
│   ├── database/     # Configurações do banco
│   ├── config/       # Configurações
│   ├── decorators/   # Decoradores customizados
│   ├── guards/       # Guards de autorização
│   ├── filters/      # Filtros de exceção
│   ├── interceptors/ # Interceptors
│   ├── middlewares/  # Middlewares
│   ├── pipes/        # Pipes de validação
│   ├── exceptions/   # Exceções customizadas
│   ├── dto/          # DTOs compartilhados
│   ├── entities/     # Entidades compartilhadas
│   ├── interfaces/   # Interfaces
│   └── utils/        # Utilitários
└── prisma/           # Schema e migrations do Prisma
```

## Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Variáveis obrigatórias:

- `DATABASE_URL`: URL de conexão com PostgreSQL
- `JWT_SECRET`: Segredo para JWT
- `JWT_REFRESH_SECRET`: Segredo para refresh token
- `PORT`: Porta do servidor (default: 3001)

## Instalação

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Executar migrations
npx prisma migrate dev
```

## Execução

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## Docker

```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Parar serviços
docker-compose down
```

Serviços disponíveis:
- **Backend**: http://localhost:3001
- **Swagger**: http://localhost:3001/api
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **PgAdmin**: http://localhost:5050

## Scripts

```bash
# Lint
npm run lint

# Format
npm run format

# Build
npm run build

# Testes
npm run test
npm run test:e2e
npm run test:cov
```

## Arquitetura

O backend segue uma arquitetura modular com:

- **SOLID**: Princípios de design orientado a objetos
- **Clean Code**: Código limpo e legível
- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid

Cada módulo é independente e contém:
- Controller: Camada de apresentação
- Service: Camada de negócio
- DTOs: Data Transfer Objects
- Module: Configuração do módulo

## Multi-tenant

O sistema é preparado para multi-empresa através da entidade `Company`, permitindo isolar dados por empresa.

## RBAC

Controle de acesso baseado em roles (RBAC) com:
- Roles: Perfis de usuário
- Permissions: Permissões granulares
- Guards: Proteção de rotas
- Decorators: Anotações de autorização

## API Documentation

A documentação da API está disponível via Swagger em `/api` quando o servidor está rodando.

## Prisma Commands

```bash
# Gerar cliente
npx prisma generate

# Criar migration
npx prisma migrate dev --name nome_da_migration

# Abrir Prisma Studio
npx prisma studio

# Resetar banco (cuidado em produção)
npx prisma migrate reset

# Format schema
npx prisma format
```

## Próximos Passos

- Implementar lógica de autenticação completa
- Implementar CRUDs completos para cada módulo
- Adicionar testes unitários e e2e
- Configurar CI/CD
- Implementar filas com BullMQ
- Implementar WebSocket para tempo real
