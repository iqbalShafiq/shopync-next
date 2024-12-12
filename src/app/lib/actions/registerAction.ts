"use server";
import { authService } from "@/app/lib/services/auth";
import { hasErrorResult } from "@/app/lib/utils";
import { redirect, RedirectType } from "next/navigation";

export async function registerAction(
	currentState: { message: string },
	formData: FormData,
) {
	const email = formData.get("email") as string;
	const name = formData.get("name") as string;
	const password = formData.get("password") as string;
	const passwordConfirmation = formData.get("password-confirmation") as string;

	if (password !== passwordConfirmation) {
		return {
			message: "Passwords do not match",
			email,
			name,
			password,
			password_confirmation: "",
		};
	}

	const response = await authService.register({
		email,
		name,
		password,
	});

	if (hasErrorResult(response)) {
		return {
			message: response.message,
			email,
			name,
			password,
			password_confirmation: passwordConfirmation,
		};
	}

	redirect("/login", RedirectType.push);
}
