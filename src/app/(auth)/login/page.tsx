import { Button } from "@/app/components/shared/Button";
import InputText from "@/app/components/shared/InputText";
import { authService } from "@/app/lib/services/auth";
import { redirect, RedirectType } from "next/navigation";
import type React from "react";
import { hasErrorResult } from "@/app/lib/utils";
import {getCookie, removeCookie, setCookie} from "@/app/lib/cookies";

async function loginAction(formData: FormData) {
	"use server";

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const response = await authService.login({
		email,
		password,
	});

	console.log({ response });
	if (hasErrorResult(response.data)) {
		console.log(`Login error: ${response.data.message}`);
		await setCookie("error_message", response.data.message);
		redirect("/login", RedirectType.push);
	}

	redirect("/products", RedirectType.push);
}

const Login = async () => {
	const errorMessage = await getCookie("error_message");

	if (errorMessage) {
		// await removeCookie("error_message");
	}

	return (
		<div
			className={
				"p-8 text-slate-900 bg-white/30 rounded-2xl flex justify-center items-center backdrop-blur-sm shadow-lg"
			}
		>
			<div className={"md:w-96"}>
				<h1 className={"text-2xl font-semibold text-center mb-6"}>
					Login into your account
				</h1>
				<form>
					<InputText
						label={"Email"}
						type={"email"}
						id={"email"}
						name={"email"}
					/>
					<InputText
						className={"mb-6"}
						label={"Password"}
						type={"password"}
						id={"password"}
						name={"password"}
					/>
					{errorMessage && (
						<p className={"text-red-500 text-center mb-4"}>{errorMessage}</p>
					)}
					<Button formAction={loginAction} type={"submit"} variant={"primary"}>
						Login
					</Button>

					<Button type={"button"} variant={"secondary"} className={"mt-4"}>
						Register
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Login;
