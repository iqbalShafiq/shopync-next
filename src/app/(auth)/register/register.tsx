"use client";

import React, { useActionState } from "react";
import { registerAction } from "@/app/lib/actions/registerAction";
import InputText from "@/app/components/shared/InputText";
import Link from "next/link";
import SubmitButton from "@/app/components/shared/SubmitButton";

const Register = () => {
	const initialState = {
		message: "",
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};
	const [formState, formAction] = useActionState(registerAction, initialState);

	return (
		<>
			<h1 className={"text-2xl font-semibold text-center mb-6"}>
				Register for an account
			</h1>
			<form action={formAction}>
				<InputText
					defaultValue={formState.name}
					required={true}
					placeholder={"Name"}
					label={"Name"}
					type={"text"}
					id={"name"}
					name={"name"}
				/>
				<InputText
					defaultValue={formState.email}
					required={true}
					placeholder={"Email"}
					label={"Email"}
					type={"email"}
					id={"email"}
					name={"email"}
				/>
				<InputText
					defaultValue={formState.password}
					required={true}
					placeholder={"Password"}
					className={"mb-4"}
					label={"Password"}
					type={"password"}
					id={"password"}
					name={"password"}
				/>
				<InputText
					defaultValue={formState.password_confirmation}
					required={true}
					placeholder={"Password Confirmation"}
					className={"mb-4"}
					label={"Password Confirmation"}
					type={"password"}
					id={"password-confirmation"}
					name={"password-confirmation"}
				/>
				{formState?.message && (
					<p className={"text-red-500 text-sm mt-2 mb-4"}>
						{formState.message}
					</p>
				)}
				<SubmitButton
					className={`${!formState?.message && "mt-2"}`}
					text={"Register"}
					loadingText={"Registering ..."}
				/>
			</form>

			<Link href={"/login"}>
				<p
					className={
						"text-slate-500 hover:text-slate-900 transition-all duration-300 text-sm block mt-5 text-center"
					}
				>
					Already have an account?{" "}
					<span className={"font-semibold"}>Sign In</span>
				</p>
			</Link>
		</>
	);
};

export default Register;
