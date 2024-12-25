import Register from "@/app/(auth)/register/register";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Register",
	description: "ProductEditor a new account",
};

const Page = () => <Register />;
export default Page;
