# Checklist de Integração Operações (Frontend ↔ Backend)

Use esta lista em cada endpoint/tela relacionada às operações.

## 1. Contratos
- [ ] Rota e método conferem com `docs/operations-api-contract.md`.
- [ ] DTO do frontend (React Hook Form + Zod) espelha tipos/enum do backend.
- [ ] Enviar datas em ISO 8601 (sempre timezone UTC-3 configurado no backend).
- [ ] Valores numéricos mantêm unidades (km, minutos, R$) alinhadas.

## 2. Autenticação e permissões
- [ ] Requisições incluem `Authorization: Bearer token`.
- [ ] Frontend esconde botões/ações quando usuário não possui permissão (ver `docs/operations-permissions-matrix.md`).
- [ ] Backend valida RBAC e retorna `FORBIDDEN` quando necessário.

## 3. Filtros e paginação
- [ ] Query params `page`, `limit`, `sortBy`, `sortOrder` sincronizados.
- [ ] Campos de filtro (`status`, `priority`, `driverId`, `vehicleId`, `dateFrom`, `dateTo`) usam nomes idênticos.
- [ ] Estados vazios tratados (sem dados, sem resultados após filtro, erro).

## 4. Estados e mensagens
- [ ] Loading states durante fetch/mutações.
- [ ] Mensagens de sucesso em português, alinhadas com respostas do backend.
- [ ] Erros do catálogo exibidos com tradução amigável (ex.: `DRIVER_UNAVAILABLE` → "Motorista indisponível...").
- [ ] Conflitos (409) exibem badge/banner informativo.

## 5. DTOs específicos
- [ ] Formulário de criação usa `CreateOperationDto` (code, clientId, origin/destination, stops...).
- [ ] Planejamento envia `stops` ordenados com `sequence`, `type`, janelas.
- [ ] Alocação de motorista/veículo envia somente IDs válidos.
- [ ] Atualização de status envia `{ toStatus, reason?, metadata? }`.

## 6. Data e timezone
- [ ] Backend retorna datas em ISO; frontend converte para timezone do usuário apenas na apresentação.
- [ ] Campos `plannedStartAt`, `plannedEndAt`, `windowStartAt`, `windowEndAt` mantêm precisão segundos.

## 7. Cache e invalidação
- [ ] TanStack Query inclui `['operations', filters, companyId]` como chave.
- [ ] Invalidar caches relevantes ao criar/atualizar/cancelar (lista, detalhe, recursos, dashboard).
- [ ] Atualização otimista apenas quando operação ainda está em `DRAFT` ou `AWAITING_PLANNING`.

## 8. Resiliência
- [ ] Requisições canceladas ao trocar de rota/aba (AbortController).
- [ ] Retry limitado para erros de rede 5xx; não repetir em 4xx.

## 9. Acessibilidade
- [ ] Formularios com labels, campos obrigatórios sinalizados.
- [ ] Drawer/detalhes possui foco gerenciável e atalhos para fechar (Esc).
- [ ] Tabelas com `aria-sort` nas colunas ordenáveis.

## 10. Multi-tenant
- [ ] Frontend não permite selecionar `companyId`; contexto vem do token.
- [ ] Ao trocar usuário/tenant, limpar caches e resets.
- [ ] Backend valida IDs recebidos (motorista/veículo) conforme checklist multi-tenant.

## 11. Observabilidade e métricas
- [ ] Frontend envia `X-Correlation-Id` quando disponível (compartilhado com logs backend).
- [ ] Eventos críticos registram telemetry (quando disponível) sem dados sensíveis.

Documente exceções ou dependências diretamente no PR e atualize este checklist quando novos fluxos surgirem.
