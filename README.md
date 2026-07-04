# Rotvex

SaaS de gerenciamento logístico para controle de operações, frotas, entregas, coletas, rotas, motoristas, clientes, custos e relatórios.

## Stack

### Frontend
- Next.js 15
- TypeScript
- TailwindCSS
- Shadcn/UI
- React Hook Form
- Zod
- TanStack Query

### Backend
- NestJS
- TypeScript
- PostgreSQL
- Prisma

### Infraestrutura
- Docker
- Docker Compose
- Redis
- GitHub Actions

## Pré-requisitos

- Node.js 20+
- npm 10+ ou pnpm
- Docker
- Docker Compose

## Início Rápido

### Opção 1: Docker (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/BrunoGabriel123/Rotvex.git
cd Rotvex
```

2. Copie o arquivo de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` com suas configurações reais

4. Inicie os containers:
```bash
docker-compose up -d
```

5. Acesse os serviços:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- PgAdmin: http://localhost:5050

### Opção 2: Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/BrunoGabriel123/Rotvex.git
cd Rotvex
```

2. Execute o script de setup:
```bash
./scripts/setup.sh
```

3. Edite o arquivo `.env` com suas configurações

4. Inicie o ambiente de desenvolvimento:
```bash
npm run dev
```

Ou inicie frontend e backend separadamente:
```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

## Scripts Disponíveis

### Scripts Bash

- `./scripts/setup.sh` - Configuração inicial do projeto
- `./scripts/dev.sh` - Inicia ambiente de desenvolvimento
- `./scripts/build.sh` - Build do projeto
- `./scripts/lint.sh` - Executa linting
- `./scripts/test.sh` - Executa testes
- `./scripts/clean.sh` - Limpa artefatos de build e cache
- `./scripts/reset-db.sh` - Reseta o banco de dados
- `./scripts/seed.sh` - Popula o banco de dados

### Scripts NPM (Raiz)

- `npm run dev` - Inicia frontend e backend
- `npm run dev:frontend` - Inicia apenas frontend
- `npm run dev:backend` - Inicia apenas backend
- `npm run build` - Build de frontend e backend
- `npm run build:frontend` - Build do frontend
- `npm run build:backend` - Build do backend
- `npm run lint` - Lint de frontend e backend
- `npm run lint:frontend` - Lint do frontend
- `npm run lint:backend` - Lint do backend
- `npm run test` - Testes de frontend e backend
- `npm run test:frontend` - Testes do frontend
- `npm run test:backend` - Testes do backend
- `npm run docker:up` - Inicia containers Docker
- `npm run docker:down` - Para containers Docker
- `npm run docker:build` - Build de imagens Docker
- `npm run docker:clean` - Limpa containers, volumes e imagens
- `npm run format` - Formata código com Prettier
- `npm run format:check` - Verifica formatação

## Docker Compose

### Serviços

- **frontend** - Aplicação Next.js (porta 3000)
- **backend** - API NestJS (porta 3001)
- **postgres** - Banco de dados PostgreSQL (porta 5432)
- **redis** - Cache Redis (porta 6379)
- **pgadmin** - Interface de administração PostgreSQL (porta 5050)

### Comandos Docker

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Reiniciar serviços
docker-compose restart

# Ver logs
docker-compose logs -f

# Reconstruir imagens
docker-compose build

# Limpar tudo (volumes incluídos)
docker-compose down -v
docker system prune -f
```

## Acesso aos Serviços

### Frontend
- URL: http://localhost:3000
- Desenvolvimento: `npm run dev:frontend`

### Backend
- URL: http://localhost:3001
- Health check: http://localhost:3001/health
- Desenvolvimento: `npm run dev:backend`

### PostgreSQL
- Host: localhost
- Porta: 5432
- Usuário: rotvex (configurável no .env)
- Senha: (configurável no .env)
- Banco: rotvex (configurável no .env)

### PgAdmin
- URL: http://localhost:5050
- Email: (configurável no .env)
- Senha: (configurável no .env)

### Redis
- Host: localhost
- Porta: 6379
- Senha: (configurável no .env)

## Variáveis de Ambiente

As variáveis de ambiente devem ser configuradas no arquivo `.env`:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
FRONTEND_PORT=3000

# Backend
BACKEND_PORT=3001
DATABASE_URL=postgresql://rotvex:password@postgres:5432/rotvex
REDIS_URL=redis://:password@redis:6379
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# PostgreSQL
POSTGRES_USER=rotvex
POSTGRES_PASSWORD=password
POSTGRES_DB=rotvex
POSTGRES_PORT=5432

# Redis
REDIS_PASSWORD=password
REDIS_PORT=6379

# PgAdmin
PGADMIN_DEFAULT_EMAIL=admin@rotvex.com
PGADMIN_DEFAULT_PASSWORD=password
PGADMIN_PORT=5050

# Uploads
UPLOAD_DIR=/app/uploads

# Timezone
TZ=America/Sao_Paulo

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

## Estrutura do Projeto

```
rotvex/
├── frontend/          # Aplicação Next.js
├── backend/           # API NestJS
├── docker/            # Dockerfiles
│   ├── frontend/
│   └── backend/
├── scripts/           # Scripts de automação
├── docs/              # Documentação
├── .github/           # GitHub Actions
├── logs/              # Logs da aplicação
├── uploads/           # Arquivos de upload
├── temp/              # Arquivos temporários
├── cache/             # Cache da aplicação
├── docker-compose.yml # Composição Docker
├── .env.example       # Exemplo de variáveis de ambiente
└── package.json       # Dependências raiz
```

## Qualidade de Código

O projeto utiliza ferramentas de qualidade de código:

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Husky** - Git hooks
- **lint-staged** - Lint em arquivos staged
- **Commitlint** - Validação de mensagens de commit

### Git Hooks

- **pre-commit** - Executa lint-staged antes do commit
- **commit-msg** - Valida formato da mensagem de commit

## CI/CD

O projeto utiliza GitHub Actions para automação:

- **Lint** - Valida código em push e PRs
- **Build Frontend** - Build do frontend
- **Build Backend** - Build do backend
- **Test** - Executa testes
- **Docker Build** - Build de imagens Docker
- **PR Check** - Validação completa em PRs

## Troubleshooting

### Docker

**Containers não iniciam:**
```bash
docker-compose down -v
docker-compose up -d
```

**Problemas de permissão:**
```bash
sudo chown -R $USER:$USER .
```

### Backend

**Porta já em uso:**
```bash
# Altere a porta no .env
BACKEND_PORT=3002
```

**Erro de conexão com banco:**
```bash
# Verifique se o PostgreSQL está rodando
docker-compose ps postgres

# Reset o banco de dados
./scripts/reset-db.sh
```

### Frontend

**Erro de build:**
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run build
```

## Desenvolvimento

### Padrões de Commit

Use commits curtos e naturais:
- `inicia estrutura do projeto`
- `adiciona listagem de veículos`
- `cria módulo de motoristas`
- `melhora filtros das entregas`
- `corrige estado vazio da tabela`

Evite:
- `update`
- `fix`
- `ajustes`
- `ia`
- `gpt`

### Fluxo de Trabalho

1. Crie uma branch para sua feature
2. Faça as alterações
3. Commit com mensagem descritiva
4. Push e crie Pull Request
5. Aguarde aprovação e merge

## Licença

UNLICENSED

## Suporte

Para questões e suporte, abra uma issue no repositório.