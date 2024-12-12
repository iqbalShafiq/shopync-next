"use client";

import { Button } from "@/app/components/shared/Button";
import InputText from "@/app/components/shared/InputText";
import React, { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/lib/actions/loginAction";

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
				<InputText
					placeholder={"Email"}
					label={"Email"}
					type={"email"}
					id={"email"}
					name={"email"}
				/>
				<InputText
					placeholder={"Password"}
					className={"mb-4"}
					label={"Password"}
					type={"password"}
					id={"password"}
					name={"password"}
				/>
				{formState?.message && (
					<p className={"text-red-500 text-sm mt-2 mb-4"}>
						{formState.message}
					</p>
				)}
				<Button
					className={`${!formState?.message && "mt-2"}`}
					type={"submit"}
					variant={"primary"}
				>
					Sign In
				</Button>

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
			</form>
		</>
	);
};

export default Login;
