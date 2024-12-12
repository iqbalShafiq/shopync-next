import React from "react";
import Login from "@/app/(auth)/login/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to your account",
};

const Page = () => <Login />;
export default Page;
