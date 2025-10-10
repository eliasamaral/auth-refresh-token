import * as z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //"Aa1@password"

export const UserSchema = z.object({
	name: z.string().min(3, "Nome muito curto"),
	email: z.email("Email inválido"),
	password: z.string().min(8, "Senha deve ter pelo menos 6 caracteres").regex(passwordRegex,"Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"),
	role: z.enum(["ADMIN", "USER"]), 
	
	
});

export const LoginSchema = z.object({
	email: z.email("Email inválido"),
	password: z.string().min(8, "Senha deve ter pelo menos 6 caracteres").regex(passwordRegex,"Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"),
});

export const RefreshTokenSchema = z.object({
	refresh_token: z.string("RefreshToken invalido"),
});
