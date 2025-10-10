# Auth Refresh Token

Este projeto é uma prova de conceito (POC) para autenticação de usuários com refresh-token utilizando Node.js, JWT, Argon2 e Prisma ORM.

### Melhorias para serem implementadas. 

Revisão feita por IA, algumas coisas poderam ser removidas ou nem implementada.</p>
Referencia: auth-review-2.md

# Tabela de Status de Implementação - Auth API v2

| Categoria | Item | Status |
|-----------|------|:------:|
| **🔴 SEGURANÇA CRÍTICA** | Corrigir exposição de senhas nos endpoints | ✅ |
| | Implementar validação de entrada (Joi/Yup/Zod) | ✅ |
| | Ajustar tempo de expiração dos tokens (15-30min) | ✅ |
| | Implementar rate limiting | ✅ |
| | Melhorar gerenciamento de refresh tokens | ⬜ |
| | Adicionar rotação segura de tokens | ⬜ |
| | Adicionar sistema de auditoria | ⬜ |
| | Implementar validação de força de senha | ✅ |
| | Adicionar sanitização de dados de entrada | ⬜ |
| **🟡 CLEAN CODE** | Padronizar tratamento de erros | ⬜ |
| | Criar middleware de tratamento de erros | ⬜ |
| | Eliminar código duplicado | ⬜ |
| | Renomear variáveis confusas (`userAlreadyExists`) | ⬜ |
| | Padronizar formato de resposta entre endpoints | ⬜ |
| **🟠 PERFORMANCE** | Implementar paginação em `getAllUsers()` | ⬜ |
| | Adicionar índices no banco (email, refresh tokens) | ⬜ |
| | Implementar cache com Redis | ⬜ |
| | Configurar connection pooling no Prisma | ⬜ |
| **🔵 ARQUITETURA** | Criar middleware de validação reutilizável | ⬜ |
| | Implementar testes unitários | ⬜ |
| | Implementar testes de integração | ⬜ |
| | Adicionar monitoramento | ⬜ |
| | Implementar métricas de performance | ⬜ |

---

**Legenda:**
- ✅ = Implementado
- ⬜ = Pendente

**Nota:** À medida que você implementar cada melhoria, marque com ✅ na coluna Status para acompanhar o progresso do projeto.

