"use client";

import InputText from "@/app/components/shared/inputText";
import SubmitButton from "@/app/components/shared/submitButton";
import { loginAction } from "@/app/lib/actions/loginAction";
import Link from "next/link";
import React, { useActionState } from "react";

const Login = () => {
	const initialState = {
		message: "",
	};
	const [formState, formAction] = useActionState(loginAction, initialState);

	return (
		<>
			<h1 className={"mb-6 text-center font-semibold text-2xl"}>
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
					<p className={"mt-2 mb-4 text-red-500 text-sm"}>
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
						"mt-5 block text-center text-slate-500 text-sm transition-all duration-300 hover:text-slate-900"
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
