import type React from "react";
import "./globals.css";
import { AuthProvider } from "@/app/lib/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={"bg-blue-100"}>
				<AuthProvider>{children}</AuthProvider>
				<Toaster />
			</body>
		</html>
	);
}
