import React from "react";
import type { Metadata } from "next";
import Register from "@/app/(auth)/register/register";

export const metadata: Metadata = {
	title: "Register",
	description: "Create a new account",
};

const Page = () => <Register />;
export default Page;
