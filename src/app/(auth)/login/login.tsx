"use client";

import React, { useActionState } from "react";
import { loginAction } from "@/app/lib/actions/loginAction";
import InputText from "@/app/components/shared/InputText";
import Link from "next/link";
import SubmitButton from "@/app/components/shared/SubmitButton";

const Login = () => {
	const initialState = {
		message: "",
	};
	const [formState, formAction] = useActionState(loginAction, initialState);

	return (
		<>
			<h1 className={"text-2xl font-semibold text-center mb-6"}>
				Login into your account
			</h1>
			<form action={formAction}>
				<div className={"mb-4"}>
					<InputText
						className={"mt-1"}
						placeholder={"Email"}
						label={"Email"}
						type={"email"}
						id={"email"}
						name={"email"}
					/>
				</div>
				<div className={"mb-4"}>
					<InputText
						placeholder={"Password"}
						className={"mt-1"}
						label={"Password"}
						type={"password"}
						id={"password"}
						name={"password"}
					/>
				</div>
				{formState?.message && (
					<p className={"text-red-500 text-sm mt-2 mb-4"}>
						{formState.message}
					</p>
				)}
				<SubmitButton
					className={`w-full ${!formState?.message && "mt-2"}`}
					text={"Sign In"}
					loadingText={"Signing In ..."}
				/>
			</form>

			<Link href={"/register"}>
				<p
					className={
						"text-slate-500 hover:text-slate-900 transition-all duration-300 text-sm block mt-5 text-center"
					}
				>
					Don't have an account?{" "}
					<span className={"font-semibold"}>Register</span>
				</p>
			</Link>
		</>
	);
};

export default Login;
