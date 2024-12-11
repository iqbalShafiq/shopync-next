import type React from "react";

export interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
	return (
		<div
			className={
				"p-8 text-slate-900 bg-white/30 rounded-2xl flex justify-center items-center backdrop-blur-sm shadow-lg"
			}
		>
			{children}
		</div>
	);
};

export default AuthCard;
