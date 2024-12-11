import { Button } from "@/app/components/shared/Button";
import InputText from "@/app/components/shared/InputText";
import { authService } from "@/app/lib/services/auth";

async function loginAction(formData: FormData) {
	"use server";

	try {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		console.log({ email, password });

		const response = await authService.login({
			email,
			password,
		});

		console.log({ response });
	} catch (error) {
		console.error("Login error:", error);
	}
}

const Login = () => {
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
				<form action={loginAction}>
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
					<Button type={"submit"} variant={"primary"}>
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
