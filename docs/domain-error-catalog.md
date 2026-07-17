# Catálogo de Erros de Domínio

Formato de erro (`HttpExceptionFilter`):
```json
{
  "success": false,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "path": "/operations/123",
  "error": {
    "code": "DRIVER_UNAVAILABLE",
    "message": "Motorista indisponível para o período informado"
  }
}
```

Cada erro abaixo especifica código, descrição e HTTP status recomendado.

## 1. Autenticação e autorização
| Código | Status | Descrição |
| --- | --- | --- |
| `UNAUTHENTICATED` | 401 | Token ausente ou inválido. |
| `INVALID_REFRESH_TOKEN` | 401 | Refresh token inválido/expirado. |
| `USER_INACTIVE` | 403 | Usuário desativado tentando autenticar. |
| `FORBIDDEN` | 403 | Usuário não possui permissão para executar a ação. |
| `ROLE_NOT_ALLOWED` | 403 | Perfil não autorizado para a operação. |

## 2. Tenant
| Código | Status | Descrição |
| --- | --- | --- |
| `TENANT_RESOURCE_MISMATCH` | 403 | ID informado pertence a outra empresa. |
| `TENANT_HEADER_REQUIRED` | 400 | Contexto multi-tenant não encontrado. |
| `TENANT_NOT_FOUND` | 404 | Empresa inexistente ou desativada. |

## 3. Operação
| Código | Status | Descrição |
| --- | --- | --- |
| `OPERATION_NOT_FOUND` | 404 | Operação inexistente ou removida. |
| `OPERATION_CODE_ALREADY_EXISTS` | 422 | Código já utilizado pela mesma empresa. |
| `OPERATION_EDIT_BLOCKED` | 409 | Operação não pode ser editada após publicação/início. |
| `INVALID_OPERATION_STATUS_TRANSITION` | 409 | Transição de status não permitida. |
| `OPERATION_ALREADY_STARTED` | 409 | Não é possível repetir ação de início. |
| `OPERATION_ALREADY_COMPLETED` | 409 | Operação concluída; reabertura necessária. |
| `OPERATION_NOT_PLANNED` | 409 | Tentativa de publicar ou iniciar sem planejamento. |
| `RESOURCES_MISSING` | 409 | Planejamento sem motorista/veículo válidos. |
| `OPERATION_HAS_PENDING_STOPS` | 409 | Conclusão bloqueada por paradas pendentes. |
| `OPERATION_CANCEL_REASON_REQUIRED` | 422 | Cancelamento sem motivo. |
| `OPERATION_REOPEN_FORBIDDEN` | 403 | Perfil atual não pode reabrir. |

## 4. Planejamento e paradas
| Código | Status | Descrição |
| --- | --- | --- |
| `STOP_SEQUENCE_DUPLICATED` | 422 | Sequências repetidas dentro da operação. |
| `STOP_WINDOW_CONFLICT` | 409 | Janela de parada conflita com recursos. |
| `STOP_NOT_FOUND` | 404 | Parada inexistente. |
| `STOP_UPDATE_FORBIDDEN` | 403 | Parada não pode ser alterada no status atual. |

## 5. Motoristas
| Código | Status | Descrição |
| --- | --- | --- |
| `DRIVER_NOT_FOUND` | 404 | Motorista inexistente. |
| `DRIVER_UNAVAILABLE` | 409 | Motorista está indisponível (férias, bloqueio etc.). |
| `DRIVER_SCHEDULE_CONFLICT` | 409 | Motorista já alocado no período informado. |
| `DRIVER_LICENSE_INCOMPATIBLE` | 422 | Categoria da CNH não suporta o veículo/rota. |
| `DRIVER_LICENSE_EXPIRED` | 422 | CNH vencida. |
| `DRIVER_TENANT_MISMATCH` | 403 | Motorista de outra empresa. |

## 6. Veículos
| Código | Status | Descrição |
| --- | --- | --- |
| `VEHICLE_NOT_FOUND` | 404 | Veículo inexistente. |
| `VEHICLE_UNAVAILABLE` | 409 | Veículo em manutenção/inativo. |
| `VEHICLE_SCHEDULE_CONFLICT` | 409 | Veículo alocado em outra operação no período. |
| `VEHICLE_CAPACITY_EXCEEDED` | 422 | Volume/peso excede capacidade. |
| `VEHICLE_DOCUMENT_EXPIRED` | 422 | Documentação vencida. |
| `VEHICLE_TENANT_MISMATCH` | 403 | Veículo de outra empresa. |

## 7. Clientes, pedidos e recursos
| Código | Status | Descrição |
| --- | --- | --- |
| `CLIENT_NOT_FOUND` | 404 | Cliente inexistente. |
| `ORDER_NOT_FOUND` | 404 | Pedido inexistente. |
| `ORDER_TENANT_MISMATCH` | 403 | Pedido pertence a outra empresa. |
| `ROUTE_NOT_FOUND` | 404 | Rota inexistente. |
| `DELIVERY_NOT_FOUND` | 404 | Entrega inexistente. |
| `PICKUP_NOT_FOUND` | 404 | Coleta inexistente. |

## 8. Conflitos e validação
| Código | Status | Descrição |
| --- | --- | --- |
| `CONFLICT_DETECTED` | 409 | Há conflitos de agenda/rota. |
| `PLANNING_PENDING` | 409 | Planejamento precisa ser revisado antes da ação. |
| `VALIDATION_FAILED` | 422 | Dados inválidos segundo regras de negócio. |

## 9. Observabilidade e infraestrutura
| Código | Status | Descrição |
| --- | --- | --- |
| `SERVICE_UNAVAILABLE` | 503 | Dependência externa indisponível. |
| `DATABASE_UNHEALTHY` | 503 | Banco inacessível durante health check. |

> Documentar cada erro no Swagger e alinhar com o frontend via `docs/operations-integration-checklist.md`.
