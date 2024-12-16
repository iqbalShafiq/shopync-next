import type React from "react";
import { SessionProvider } from "@/app/components/providers/session-provider";
import { type AuthResponse, authService } from "@/app/lib/services/auth";
import type { Failure, User } from "@/app/lib/types";
import { hasErrorResult } from "@/app/lib/utils";

export async function getUser(): Promise<AuthResponse | Failure> {
	return await authService.me();
}

export async function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	let user: AuthResponse | User | Failure | null = await getUser();
	if (hasErrorResult(user)) {
		user = null;
	} else {
		user = {
			id: user.data.id,
			email: user.data.email,
			name: user.data.name,
		};
	}
	return <SessionProvider initialUser={user}>{children}</SessionProvider>;
}
