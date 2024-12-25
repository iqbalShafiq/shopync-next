import type React from "react";

export interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
	return (
		<div
			className={
				"flex·items-center·justify-center·rounded-2xl·bg-white/30·p-8·text-slate-900·shadow-lg·backdrop-blur-sm"
			}
		>
			{children}
		</div>
	);
};

export default AuthCard;
