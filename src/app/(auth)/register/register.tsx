"use client";

import InputText from "@/app/components/shared/inputText";
import SubmitButton from "@/app/components/shared/submitButton";
import { registerAction } from "@/app/lib/actions/registerAction";
import Link from "next/link";
import React, { useActionState } from "react";

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
			<h1 className={"mb-6 text-center font-semibold text-2xl"}>
				Register for an account
			</h1>
			<form action={formAction}>
				<div className={"mb-4"}>
					<InputText
						defaultValue={formState.name}
						required={true}
						className={"mt-1"}
						placeholder={"Name"}
						label={"Name"}
						type={"text"}
						id={"name"}
						name={"name"}
					/>
				</div>
				<div className={"mb-4"}>
					<InputText
						defaultValue={formState.email}
						required={true}
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
						defaultValue={formState.password}
						required={true}
						placeholder={"Password"}
						className={"mt-1"}
						label={"Password"}
						type={"password"}
						id={"password"}
						name={"password"}
					/>
				</div>
				<div className={"mb-4"}>
					<InputText
						defaultValue={formState.password_confirmation}
						required={true}
						placeholder={"Password Confirmation"}
						className={"mt-1"}
						label={"Password Confirmation"}
						type={"password"}
						id={"password-confirmation"}
						name={"password-confirmation"}
					/>
				</div>
				{formState?.message && (
					<p className={"mt-2 mb-4 text-red-500 text-sm"}>
						{formState.message}
					</p>
				)}
				<SubmitButton
					className={`w-full ${!formState?.message && "mt-2"}`}
					text={"Register"}
					loadingText={"Registering ..."}
				/>
			</form>

			<Link href={"/login"}>
				<p
					className={
						"mt-5 block text-center text-slate-500 text-sm transition-all duration-300 hover:text-slate-900"
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
