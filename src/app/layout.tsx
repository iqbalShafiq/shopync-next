import type React from "react";
import "./globals.css";
import { AuthProvider } from "@/app/lib/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Geist } from "next/font/google";

const plusJakartaSans = Geist({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-plus-jakarta-sans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${plusJakartaSans.className}`}>
			<body className={"bg-blue-100"}>
				<AuthProvider>{children}</AuthProvider>
				<Toaster />
			</body>
		</html>
	);
}
