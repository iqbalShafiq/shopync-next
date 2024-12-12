import type React from "react";
import "./globals.css";
import { AuthProvider } from "@/app/lib/context/AuthContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={"bg-blue-100"}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
