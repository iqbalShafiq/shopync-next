"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import type { User } from "@/app/lib/types";

interface SessionContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({
	children,
	initialUser = null,
}: {
	children: React.ReactNode;
	initialUser?: User | null;
}) {
	const [user, setUser] = useState<User | null>(initialUser);
	const [loading, setLoading] = useState(false);

	return (
		<SessionContext.Provider
			value={{
				user,
				setUser,
				loading,
				setLoading,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
}

export const useSession = () => {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};
