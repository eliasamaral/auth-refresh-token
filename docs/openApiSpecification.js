const OpenApiSpecification = {
	openapi: "3.0.3",
	info: {
		title: "Minha API",
		description:
			"API simples com rota raiz, rota de status do banco e gerenciamento de usuários.",
		version: "1.0.0",
	},
	servers: [{ url: "http://localhost:3000" }],
	paths: {
		"/status": {
			get: {
				summary: "Status do banco",
				responses: {
					200: {
						description: "Conexão com o banco está ok",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/StatusResponse" },
							},
						},
					},
					500: {
						description: "Erro na verificação do status",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
				},
			},
		},
		"/users": {
			get: {
				summary: "Lista todos os usuários",
				security: [{ bearerAuth: [] }],
				responses: {
					200: {
						description: "Lista de usuários",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/UsersResponse" },
							},
						},
					},
					401: {
						description: "Token de acesso inválido",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
					500: {
						description: "Erro ao buscar usuários",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
				},
			},
			post: {
				summary: "Cria um novo usuário",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/UserInput" },
						},
					},
				},
				responses: {
					201: {
						description: "Usuário criado com sucesso",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/UserCreatedResponse" },
							},
						},
					},
					400: {
						description: "Usuário já existe ou dados inválidos",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
					500: {
						description: "Erro ao criar usuário",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
				},
			},
		},
		"/users/{id}": {
			get: {
				summary: "Busca usuário por ID",
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						schema: { type: "string", format: "uuid" },
						description: "ID do usuário",
					},
				],
				responses: {
					200: {
						description: "Usuário encontrado",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/UserResponse" },
							},
						},
					},
					400: {
						description: "ID do usuário é obrigatório",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
					401: {
						description: "Token de acesso inválido",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
					404: {
						description: "Usuário não encontrado",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
					500: {
						description: "Erro interno",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
				},
			},
		},
		"/register": {
			post: {
				summary: "Registra um novo usuário",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/UserInput" },
						},
					},
				},
				responses: {
					201: {
						description: "Usuário registrado com sucesso",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/UserCreatedResponse" },
							},
						},
					},
					400: {
						description: "Usuário já existe ou dados inválidos",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
					500: {
						description: "Erro ao registrar usuário",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
				},
			},
		},
		"/login": {
			post: {
				summary: "Realiza login e retorna tokens JWT",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["email", "password"],
								properties: {
									email: { type: "string", example: "joao@email.com" },
									password: { type: "string", example: "senha123" },
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: "Login realizado com sucesso",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/AuthTokensResponse" },
							},
						},
					},
					401: {
						description: "Credenciais inválidas",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
					500: {
						description: "Erro interno",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
				},
			},
		},
		"/refresh-token": {
			post: {
				summary: "Gera novo access token usando refresh token JWT",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["refresh_token"],
								properties: {
									refresh_token: {
										type: "string",
										example: "jwt_refresh_token",
									},
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: "Tokens renovados com sucesso",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/RefreshTokensResponse" },
							},
						},
					},
					401: {
						description: "Refresh token inválido ou expirado",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
					500: {
						description: "Erro interno",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/ErrorResponse" },
							},
						},
					},
				},
			},
		},
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
		schemas: {
			StatusResponse: {
				type: "object",
				required: ["status", "database", "now"],
				properties: {
					status: { type: "string", example: "ok" },
					database: { type: "string", example: "psql" },
					version: { type: "string", example: "PostgreSQL 15.2" },
					now: {
						type: "string",
						format: "date-time",
						example: "2025-09-18T00:00:00Z",
					},
					connections: {
						type: "object",
						properties: {
							total: { type: "integer", example: 3 },
							byUserState: {
								type: "array",
								items: {
									type: "object",
									properties: {
										user: { type: "string", example: "postgres" },
										state: { type: "string", example: "active" },
										count: { type: "integer", example: 2 },
									},
								},
							},
						},
					},
					uptime: { type: "number", example: 12345.67 },
				},
			},
			ErrorResponse: {
				type: "object",
				required: ["status", "message"],
				properties: {
					status: { type: "string", example: "error" },
					message: { type: "string", example: "could not connect to server" },
				},
			},
			User: {
				type: "object",
				properties: {
					id: {
						type: "string",
						format: "uuid",
						example: "123e4567-e89b-12d3-a456-426614174000",
					},
					name: { type: "string", example: "João Silva" },
					email: { type: "string", example: "joao@email.com" },
					password: { type: "string", example: "$argon2id$v=19$..." }, // hash
					role: { type: "string", enum: ["ADMIN", "USER"], example: "USER" },
					createdAt: {
						type: "string",
						format: "date-time",
						example: "2025-01-10T00:00:00Z",
					},
					updatedAt: {
						type: "string",
						format: "date-time",
						example: "2025-01-10T00:00:00Z",
					},
				},
			},
			UserResponse: {
				type: "object",
				properties: {
					status: { type: "string", example: "success" },
					data: { $ref: "#/components/schemas/User" },
				},
			},
			UserInput: {
				type: "object",
				required: ["name", "email", "password", "role"],
				properties: {
					name: {
						type: "string",
						minLength: 3,
						example: "João Silva",
						description: "Nome do usuário (mínimo 3 caracteres)",
					},
					email: {
						type: "string",
						format: "email",
						example: "joao@email.com",
						description: "Email válido do usuário",
					},
					password: {
						type: "string",
						minLength: 8,
						pattern:
							"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
						example: "Senha123@",
						description:
							"Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial",
					},
					role: {
						type: "string",
						enum: ["ADMIN", "USER"],
						example: "USER",
						description: "Papel do usuário no sistema",
					},
				},
			},
			UsersResponse: {
				type: "object",
				properties: {
					status: { type: "string", example: "success" },
					data: {
						type: "array",
						items: { $ref: "#/components/schemas/User" },
					},
				},
			},
			UserCreatedResponse: {
				type: "object",
				properties: {
					status: { type: "string", example: "success" },
					data: {
						type: "string",
						format: "uuid",
						example: "123e4567-e89b-12d3-a456-426614174000",
					},
				},
			},
			AuthTokensResponse: {
				type: "object",
				properties: {
					status: { type: "string", example: "success" },
					data: {
						type: "object",
						properties: {
							token: { type: "string", example: "jwt_access_token" },
							refreshToken: { type: "string", example: "jwt_refresh_token" },
						},
					},
				},
			},
			RefreshTokensResponse: {
				type: "object",
				properties: {
					token: { type: "string", example: "jwt_access_token" },
					refreshToken: { type: "string", example: "jwt_refresh_token" },
				},
			},
		},
	},
};

export default OpenApiSpecification;
