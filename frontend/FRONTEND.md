# Frontend - Rotvex

## Visão Geral

Frontend do Rotvex desenvolvido com Next.js 15, TypeScript e TailwindCSS. Interface minimalista e empresarial para gestão logística.

## Stack

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Shadcn/UI** - Componentes base
- **React Hook Form** - Formulários
- **Zod** - Validação
- **TanStack Query** - Gerenciamento de dados
- **Lucide Icons** - Ícones

## Estrutura de Diretórios

```
src/
├── app/              # Rotas e páginas Next.js
├── components/       # Componentes reutilizáveis
│   ├── layout/      # Layout components (AppSidebar, AppHeader, MainLayout)
│   └── ui/          # Componentes UI base
├── features/        # Módulos de negócio
│   ├── dashboard/
│   ├── pedidos/
│   ├── entregas/
│   ├── coletas/
│   ├── rotas/
│   ├── frota/
│   ├── motoristas/
│   ├── clientes/
│   ├── custos/
│   ├── relatorios/
│   └── configuracoes/
├── hooks/           # Hooks customizados
├── services/        # Serviços de API
├── types/           # Tipos TypeScript
├── schemas/         # Schemas Zod
├── utils/           # Funções utilitárias
├── mocks/           # Dados mockados
├── config/          # Configurações
├── lib/             # Bibliotecas auxiliares
└── providers/       # React providers
```

## Padrões de Componentes

### Componentes UI Base

Localização: `src/components/ui/`

Componentes reutilizáveis que não possuem lógica de negócio:
- **AppSidebar** - Sidebar principal de navegação
- **AppHeader** - Header com busca e usuário
- **PageHeader** - Header de páginas com título e descrição
- **MetricCard** - Card para métricas do dashboard
- **DataTable** - Tabela reutilizável com paginação
- **StatusBadge** - Badge de status com cores configuráveis
- **EmptyState** - Estado vazio para listas
- **SearchInput** - Input de busca padronizado
- **FilterBar** - Barra de filtros reutilizável
- **SectionCard** - Card para seções de conteúdo
- **DetailsDrawer** - Drawer lateral para detalhes
- **MockMap** - Componente de mapa mockado

### Componentes de Layout

Localização: `src/components/layout/`

- **AppSidebar** - Sidebar fixa com navegação
- **AppHeader** - Header fixo com busca e perfil
- **MainLayout** - Layout principal com header e conteúdo

### Estrutura de Features

Cada feature em `src/features/` deve conter:
```
feature-name/
├── components/    # Componentes específicos da feature
├── hooks/         # Hooks específicos da feature
├── services/      # Serviços de API da feature
├── types/         # Tipos específicos da feature
├── schemas/       # Schemas Zod da feature
└── page.tsx       # Página principal (se aplicável)
```

## Convenções de Código

### Nomenclatura

- **Arquivos**: kebab-case (ex: `metric-card.tsx`)
- **Componentes**: PascalCase (ex: `MetricCard`)
- **Variáveis**: camelCase (ex: `userCount`)
- **Constantes**: UPPER_CASE (ex: `API_URL`)
- **Tipos/Interfaces**: PascalCase (ex: `User`, `Delivery`)
- **Pastas**: kebab-case (ex: `motoristas/`)

### Componentes

- Componentes pequenos e focados
- Máximo de 300 linhas por componente
- Tipagem explícita para props
- Interfaces em português, código em inglês
- Evitar duplicação de código
- Priorizar reutilização

### Estilo

- Empresarial e minimalista
- Poucas cores (branco, cinza, azul)
- Muito espaçamento
- Cards claros
- Tabelas objetivas
- Responsivo

## Tipos Comuns

Localização: `src/types/index.ts`

Tipos globais utilizados em todo o projeto:
- `User` - Usuário do sistema
- `Vehicle` - Veículo
- `Driver` - Motorista
- `Client` - Cliente
- `Delivery` - Entrega
- `Pickup` - Coleta
- `Order` - Pedido
- `Route` - Rota
- `Status` - Status genérico

## Hooks Customizados

Localização: `src/hooks/`

- `use-query.ts` - Hook base para TanStack Query
- Hooks específicos por feature

## Serviços de API

Localização: `src/services/`

- `api.ts` - Cliente API base
- Serviços específicos por feature

## Validação

Localização: `src/schemas/`

Schemas Zod para validação de formulários e dados:
- Schemas globais
- Schemas específicos por feature

## Dados Mockados

Localização: `src/mocks/`

Dados mockados para desenvolvimento:
- `index.ts` - Export centralizado
- Mocks específicos por feature

## Configurações

Localização: `src/config/`

- `index.ts` - Configurações globais (URLs, constantes)

## Providers

Localização: `src/providers/`

- `QueryProvider.tsx` - Provider do TanStack Query

## Desenvolvimento

### Comandos

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Lint
npm run lint

# Formatação
npm run format
```

### Fluxo de Trabalho

1. Criar feature structure em `src/features/`
2. Criar componentes reutilizáveis em `src/components/ui/`
3. Criar hooks em `src/hooks/`
4. Criar serviços em `src/services/`
5. Criar tipos em `src/types/`
6. Criar schemas em `src/schemas/`
7. Criar mocks em `src/mocks/`
8. Implementar páginas em `src/app/`
9. Rodar lint e build
10. Commit com mensagem descritiva

## Padrões de UI

### Cores

- Primária: Azul (blue-600, blue-700)
- Sucesso: Verde (green-600)
- Atenção: Amarelo (yellow-600)
- Erro: Vermelho (red-600)
- Neutro: Cinza (gray-50 a gray-900)

### Espaçamento

- Padding padrão: 4 (1rem)
- Gap padrão: 4 (1rem)
- Cards: padding-6
- Seções: gap-6

### Tipografia

- Títulos: text-xl, font-semibold, text-gray-900
- Subtítulos: text-sm, text-gray-500
- Corpo: text-sm, text-gray-700

### Componentes

- Cards: bg-white, border border-gray-200, rounded-lg
- Botões: bg-blue-600, hover:bg-blue-700, text-white
- Inputs: border border-gray-300, rounded-md
- Tabelas: border border-gray-200, divide-y divide-gray-200

## Boas Práticas

- Usar TypeScript estrito
- Componentes pequenos e focados
- Evitar prop drilling (use context quando necessário)
- Lazy loading para rotas pesadas
- Memoização apenas quando necessário
- Tratamento de erros adequado
- Loading states para operações assíncronas
- Responsividade mobile-first
- Acessibilidade (ARIA labels, etc.)

## Integrações

### TanStack Query

Gerenciamento de estado servidor com cache automático:
- Queries para busca de dados
- Mutations para alterações
- Cache automático
- Revalidação automática

### React Hook Form

Gerenciamento de formulários:
- Validação com Zod
- Performance otimizada
- Tipagem automática

## Roadmap Frontend

### Fase 1 - Base ✅
- Estrutura inicial
- Layout principal
- Componentes base
- Dashboard inicial

### Fase 2 - Cadastros
- Clientes
- Motoristas
- Veículos
- Rotas

### Fase 3 - Operação
- Pedidos
- Coletas
- Entregas
- Status operacional

### Fase 4 - Custos
- Abastecimentos
- Manutenções
- Pedágios
- Relatórios de custos

### Fase 5 - Indicadores
- Dashboard executivo
- Gráficos
- Relatórios avançados

### Fase 6 - Segurança
- Login
- Usuários
- Perfis
- Permissões
