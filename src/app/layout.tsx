import type React from "react";
import { AuthProvider } from "@/app/lib/contexts/AuthContext";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={"h-screen"}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
