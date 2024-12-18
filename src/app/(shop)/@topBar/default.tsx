import React from "react";
import { authService } from "@/app/lib/services/auth";
import { hasErrorResult } from "@/app/lib/utils";
import TopBar from "@/app/(shop)/@topBar/topbar";

const DefaultTopBar = async () => {
	const user = await authService.me();
	if (hasErrorResult(user)) throw new Error("User not found");

	return <TopBar />;
};

export default DefaultTopBar;
