# Guia Funcional de Operações

Este guia descreve conceitos de operação logística no Moventra para devs e produto.

## 1. O que é uma Operação
- Representa o ciclo completo de coleta/entrega associado a um cliente e, opcionalmente, a um pedido.
- Agrupa rotas, paradas, motorista, veículo, documentos e ocorrências.
- Identificada por `code` único por empresa, podendo ter `title` amigável.

## 2. Fluxo de Status (alto nível)
1. **DRAFT** — operação criada, aguardando dados mínimos.
2. **AWAITING_PLANNING** — falta definir paradas/recursos.
3. **PLANNED** — sequência de paradas pronta, recursos reservados.
4. **READY_TO_START** — planejamento publicado, aguardando início.
5. **IN_PICKUP / IN_TRANSIT / IN_DELIVERY** — execução em andamento (coletas, tráfico, entregas).
6. **DELIVERED** — todas as entregas concluídas, validações pendentes.
7. **COMPLETED** — ciclo encerrado com registros finais.
8. **CANCELLED** — interrompida com motivo registrado.

Transições válidas serão definidas pelo Plano 1, mas devem sempre registrar `OperationStatusHistory`.

## 3. Planejamento
- Composto por `OperationStop` ordenadas (coletas, entregas, suportes, retorno).
- Cada parada possui janela (`windowStartAt`, `windowEndAt`), quantidade/volume/peso, contatos e instruções.
- Planejamento calcula duração e distância estimadas, alimentando KPI de custo.

## 4. Recursos
- **Motorista**: precisa estar ativo, com CNH válida e categoria compatível.
- **Veículo**: precisa estar ativo, sem manutenção/confliots agendados e com capacidade suficiente.
- **Rota**: opcional, facilita agrupamento geográfico.
- Recursos pertencem ao mesmo tenant que a operação.

## 5. Paradas
- Tipo (`PICKUP`, `DELIVERY`, `SUPPORT`, `RETURN`).
- Statuses (`PENDING`, `ARRIVED`, `IN_SERVICE`, `COMPLETED`, `FAILED`, `SKIPPED`).
- Podem gerar comprovantes (`DeliveryProof`) e ocorrências específicas.

## 6. Conflitos
- Surgem ao planejar com recursos indisponíveis ou janelas sobrepostas.
- Podem ser tratados automaticamente (reordenar) ou manualmente (ação "ignorar conflito").
- Sempre registrar justificativa e listar conflitos visíveis para os operadores.

## 7. Cancelamento e reabertura
- Cancelar exige motivo obrigatório.
- Reabrir retorna para status anterior (ex.: `CANCELLED` → `PLANNED`) e exige autorização de perfil elevado.

## 8. Conclusão
- Exige todas as paradas finalizadas e ausência de ocorrências abertas.
- Atualiza `actualEndAt`, `actualDurationMin`, `actualDistanceKm`, `actualCost`.
- Pode disparar integrações financeiras (ex.: faturamento, rateio de custos).

## 9. Histórico e auditoria
- `OperationStatusHistory` registra cada transição com `changedBy`, timestamps e motivo.
- `OperationOccurrence` captura incidentes (atrasos, avarias, bloqueios) com severidade e status.
- Audit logs complementam trilha (quem fez o quê e quando).

## 10. Permissões
- Perfis e ações mapeados em `docs/operations-permissions-matrix.md`.
- Frontend deve ocultar ações não permitidas; backend sempre valida.

## 11. Integração com outros módulos
- **Pedidos (Order)**: operações podem consumir um ou mais pedidos, atualizando status conforme avança.
- **Entregas/Coletas**: podem ser vinculadas às paradas ou gerenciadas separadamente e associadas por ID.
- **Custos (Fuel/Maintenance/Expense)**: operações alimentam visões de rentabilidade.
- **Notificações**: eventos críticos disparam alertas para operadores.

## 12. Exemplos
- **Operação padrão**: criar pedido → gerar operação draft → planejar paradas SP → publicar → iniciar → executar paradas → concluir.
- **Fluxo de erro**: planejar com motorista indisponível → API retorna `DRIVER_SCHEDULE_CONFLICT` → operador escolhe outro motorista → publicação reprocessada.

## 13. Dependências do Plano 1
- Definição oficial da máquina de estados e regras de transição.
- Interação final entre paradas e entregas/pedidos.
- Automação de publicação/início via Central de Operações.

Atualize este guia conforme novos fluxos ou requisitos forem confirmados.
