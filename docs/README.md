# Auth Refresh Token API

API de autenticação com sistema de refresh token JWT, desenvolvida em Node.js com Express.

## 🚀 Funcionalidades

### Autenticação
- **Login** com email e senha
- **Registro** de novos usuários
- **Refresh Token** para renovação automática de tokens
- **Hash de senhas** com Argon2
- **Middleware de autenticação** JWT

### Segurança
- **Rate Limiting** - 5 requisições por minuto
- **Validação de dados** com Zod
- **Senhas seguras** - mínimo 8 caracteres com maiúscula, minúscula, número e caractere especial

### Logs e Monitoramento
- **Sistema de logs** com timestamp e duração das requisições
- **Status do banco** com informações de conexão
- **Tratamento de erros** centralizado

### Documentação
- **OpenAPI 3.0** completa
- **Interface interativa** com Scalar
- **Schemas** detalhados para todas as rotas

## 🛠️ Tecnologias

- **Node.js** + **Express**
- **Prisma** + **PostgreSQL**
- **JWT** para autenticação
- **Argon2** para hash de senhas
- **Zod** para validação
- **Docker** para banco de dados

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (via Docker)

## 🚀 Como executar

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd auth-refresh-token
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auth"
JWT_ACCESS_SECRET="seu_jwt_secret_aqui"
JWT_REFRESH_SECRET="seu_refresh_secret_aqui"
```

4. **Suba o banco de dados**
```bash
docker-compose up -d
```

5. **Execute as migrações**
```bash
npm run migrate
```

6. **Popule o banco com dados de teste**
```bash
npm run seed
```

7. **Inicie o servidor**
```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## 📚 Documentação

Acesse a documentação interativa em: `http://localhost:3000/openapi`

## 🔗 Endpoints

### Autenticação
- `POST /login` - Realizar login
- `POST /register` - Registrar usuário
- `POST /refresh-token` - Renovar token

### Usuários (Protegido)
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário por ID

### Sistema
- `GET /status` - Status do banco de dados

## 🧪 Testes

Execute o teste de força bruta:
```bash
npm run brute-force
```

## 📁 Estrutura do Projeto

```
src/
├── config/          # Configurações
├── controllers/     # Controladores das rotas
├── middlewares/     # Middlewares (auth, logs, rate limit)
├── services/        # Lógica de negócio
├── utils/          # Utilitários e schemas
└── index.js        # Entrada da aplicação
```

## ⚙️ Configurações

As configurações podem ser ajustadas em `src/config/index.js`:

- `enable_logs`: Ativar/desativar logs
- `rate_limit`: Ativar/desativar rate limiting
- `access_token_expire`: Tempo de expiração do access token
- `refresh_token_expire`: Tempo de expiração do refresh token

## 🔒 Segurança

- Senhas são hasheadas com Argon2
- Tokens JWT com expiração configurável
- Rate limiting para prevenir ataques
- Validação rigorosa de dados de entrada
- Middleware de autenticação em rotas protegidas

# Tabela de Status de Melhorias

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