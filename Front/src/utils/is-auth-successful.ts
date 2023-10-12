import { LoginSuccessResponse, RegistrationErrorResponse } from "types/api-types/response";

export const hasRegistrationError = (value: any): value is RegistrationErrorResponse => {
	if (value.errors) return true;

	return false;
};

export const isLoginSuccessful = (value: any): value is LoginSuccessResponse => {
	if (!value.user && !value.accessToken) return false;
	return true;
};
