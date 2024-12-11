import { Button } from "@/app/components/shared/Button";
import InputText from "@/app/components/shared/InputText";

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
