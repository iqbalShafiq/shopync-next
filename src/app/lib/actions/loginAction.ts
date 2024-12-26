"use server";
import { authService } from "@/app/lib/services/auth";
import { hasErrorResult } from "@/app/lib/utils";
import { redirect, RedirectType } from "next/navigation";

export async function loginAction(_: { message: string }, formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const response = await authService.login({
		email,
		password,
	});

	if (hasErrorResult(response)) {
		return { message: response.message };
	}

	redirect("/products", RedirectType.push);
}
