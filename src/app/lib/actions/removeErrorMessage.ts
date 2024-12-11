"use server";

import { removeCookie } from "@/app/lib/cookies";

export async function removeErrorMessage() {
	await removeCookie("error_message");
}
