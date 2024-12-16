import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
	(await cookies()).set({
		name,
		value,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 86400,
	});
}

export async function getCookie(name: string) {
	const cookieStore = cookies();
	const token = (await cookieStore).get(name);
	return token?.value;
}

export async function removeCookie(name: string) {
	(await cookies()).delete(name);
}
