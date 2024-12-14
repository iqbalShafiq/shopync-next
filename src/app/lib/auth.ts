import { cookies } from "next/headers";

export async function setToken(token: string) {
	(await cookies()).set({
		name: "auth",
		value: token,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 86400, // 24 hours
	});
}

export async function getToken() {
	const cookieStore = cookies();
	const token = (await cookieStore).get("auth");
	return token?.value;
}

export async function removeToken() {
	(await cookies()).delete("auth");
}
