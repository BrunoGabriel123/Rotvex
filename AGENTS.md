# AGENTS.md

## Regra principal

Trabalhe sempre com escopo pequeno. Não tente construir o sistema inteiro de uma vez.

## Projeto

Nome: Moventra  
Tipo: SaaS de gerenciamento logístico  
Objetivo: controlar operação logística, frota, entregas, coletas, rotas, motoristas, clientes, custos e relatórios.

## Stack

Frontend:
- Next.js
- TypeScript
- TailwindCSS
- Shadcn/UI
- React Hook Form
- Zod
- TanStack Query

Backend:
- NestJS ou API interna inicialmente
- PostgreSQL
- Prisma

Infra futura:
- Docker
- Redis
- BullMQ
- WebSocket

## Padrões de código

- Usar TypeScript.
- Componentes pequenos.
- Evitar arquivos gigantes.
- Nomear variáveis em inglês.
- Textos da interface em português.
- Evitar duplicação.
- Priorizar legibilidade.
- Não criar abstrações desnecessárias.
- Não instalar bibliotecas sem justificar.

## UI/UX

Estilo:
- Empresarial
- Minimalista
- Limpo
- Profissional
- Poucas cores
- Muito espaçamento
- Cards claros
- Tabelas objetivas

## Commits

Usar commits curtos, naturais e humanos.

Exemplos:
- inicia estrutura do projeto
- ajusta layout do dashboard
- adiciona listagem de veículos
- cria módulo de motoristas
- melhora filtros das entregas
- corrige estado vazio da tabela
- organiza componentes da página inicial

Evitar:
- commit gerado por IA
- implementa tudo
- update
- fix
- mudanças gerais

## Fluxo de trabalho

Para cada tarefa:
1. Ler os documentos do projeto.
2. Entender o escopo.
3. Implementar somente o necessário.
4. Rodar lint/build/test se existir.
5. Fazer commit com mensagem humana.
6. Resumir alterações.

## Autonomia do agente

Durante o desenvolvimento, o agente deve assumir que possui autorização para:

- executar comandos locais
- instalar dependências do projeto
- executar pnpm/npm
- executar lint
- executar build
- executar testes
- criar branches
- criar commits
- reorganizar arquivos
- criar componentes
- criar páginas
- criar migrations quando necessário

O agente NÃO deve solicitar confirmação para essas ações.

Somente deve interromper o usuário quando:

- houver risco de perda de dados
- for necessária alguma credencial
- existir uma decisão funcional não documentada
- houver uma operação destrutiva fora do projeto