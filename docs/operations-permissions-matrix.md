# Matriz de Permissões das Operações

Perfis iniciais: `Admin`, `Gestor`, `Operador`, `Visualizador`. Ajustar conforme RBAC definitivo.

| Ação | Descrição | Admin | Gestor | Operador | Visualizador | Dependências |
| --- | --- | --- | --- | --- | --- | --- |
| Visualizar operação | Acessar listagens e detalhes | ✅ | ✅ | ✅ | ✅ | `operations:read` |
| Criar operação | Cadastro manual / importação | ✅ | ✅ | ✅ | ❌ | `operations:create` |
| Editar dados antes do planejamento | Atualizar campos enquanto status < `PLANNED` | ✅ | ✅ | ✅ | ❌ | `operations:update` |
| Planejar (paradas, sequências) | Definir sequências, janelas e recursos | ✅ | ✅ | ✅ | ❌ | `operations:plan` + `operations:updateStop` |
| Alocar motorista | Associar motorista a uma operação | ✅ | ✅ | ✅ | ❌ | `operations:assignDriver` |
| Alocar veículo | Associar veículo a uma operação | ✅ | ✅ | ✅ | ❌ | `operations:assignVehicle` |
| Publicar planejamento | Tornar operação pronta para iniciar | ✅ | ✅ | ⚠️ (configurável) | ❌ | `operations:publish` |
| Iniciar operação | Registrar início efetivo | ✅ | ✅ | ✅ | ❌ | `operations:start` |
| Atualizar status em trânsito | Avançar paradas/status (IN_TRANSIT, IN_DELIVERY etc.) | ✅ | ✅ | ✅ | ❌ | `operations:changeStatus` |
| Registrar ocorrência | Criar incidentes ou alertas | ✅ | ✅ | ✅ | ❌ | `operations:reportOccurrence` |
| Encerrar operação | Alterar status para `COMPLETED` | ✅ | ✅ | ⚠️ (apenas quando iniciada pela equipe dele) | ❌ | `operations:complete` |
| Cancelar operação | Cancelamento em qualquer estágio | ✅ | ✅ | ⚠️ (somente antes de iniciar) | ❌ | `operations:cancel` |
| Reabrir operação | Voltar status após conclusão/cancelamento | ✅ | ⚠️ (restrito) | ❌ | ❌ | `operations:reopen` |
| Ignorar conflito | Forçar publicação/início com conflitos pendentes | ✅ | ⚠️ | ❌ | ❌ | `operations:overrideConflict` |
| Visualizar custos operacionais | Acessar estimativas/valores reais | ✅ | ✅ | ⚠️ (configurável) | ❌ | `operations:viewCosts` |
| Aprovar exceções | Autorizar ações especiais (ex: troca de recurso em trânsito) | ✅ | ⚠️ | ❌ | ❌ | `operations:approveException` |

Legenda: ✅ permitido, ❌ bloqueado, ⚠️ permissões condicionais definidas por políticas adicionais.

### Próximos passos
- Mapear `permissions` no Prisma para garantir correspondência 1:1 com cada ação.
- Ajustar guards dos controllers (`@Permissions(['operations:create'])`) e cobrir com testes.
- Documentar no Swagger quais perfis podem acessar cada rota.
