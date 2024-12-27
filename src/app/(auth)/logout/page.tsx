"use server";

import { cookies } from "next/headers";
import LogoutAction from "@/app/lib/actions/logoutAction";
import { redirect, RedirectType } from "next/navigation";

const Page = async () => {
	async function deleteTokens() {
		"use server";

		(await cookies()).delete("auth");
		redirect("/", RedirectType.replace);
	}

	return <LogoutAction deleteTokens={deleteTokens} />;
};

export default Page;
