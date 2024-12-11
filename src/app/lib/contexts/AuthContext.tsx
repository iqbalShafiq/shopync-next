import { cookies } from "next/headers";
import type React from "react";
import { SessionProvider } from "@/app/components/providers/session-provider";

async function getUser() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");

	if (!token) return null;

	try {
		const response = await fetch(`${process.env.BASE_URL}/auth/me`, {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		});

		if (!response.ok) {
			return null;
		}

		return response.json();
	} catch (error) {
		return null;
	}
}

export async function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUser();
	return <SessionProvider initialUser={user}>{children}</SessionProvider>;
}
