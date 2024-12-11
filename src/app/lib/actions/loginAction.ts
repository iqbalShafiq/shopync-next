"use server";
import { authService } from "@/app/lib/services/auth";
import { hasErrorResult } from "@/app/lib/utils";
import { redirect, RedirectType } from "next/navigation";

export async function loginAction(
	currentState: { message: string },
	formData: FormData,
) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const response = await authService.login({
		email,
		password,
	});

	console.log({ response });
	if (hasErrorResult(response.data)) {
		console.log(`Login error: ${response.data.message}`);
		return { message: response.data.message };
	}

	redirect("/products", RedirectType.push);
}
