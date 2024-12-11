import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
	(await cookies()).set({
		name,
		value,
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: 86400, // 24 hours
	});
}

export async function getCookie(name: string) {
	const cookieStore = cookies();
	const token = (await cookieStore).get(name);
	return token?.value;
}

export async function removeCookie(name: string) {
	const cookieStore = await cookies();
	cookieStore.delete(name);
}
