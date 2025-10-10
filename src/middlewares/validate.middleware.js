export const validate = (req, schema) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		const formatted = result.error.flatten().fieldErrors;

		const validationError = new Error("Erro de validação");
		validationError.status = 400;
		validationError.details = formatted;

		throw validationError;
	}

	req.body = result.data;
};
