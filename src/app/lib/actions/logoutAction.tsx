"use client";

import { useEffect, useRef } from "react";

export default ({ deleteTokens }: { deleteTokens: () => void }) => {
	const deleteTokensRef = useRef(deleteTokens);

	useEffect(() => {
		deleteTokensRef.current = deleteTokens;
	});

	useEffect(() => {
		deleteTokensRef.current();
	}, []);

	return (
		<div className="flex items-center justify-center">
			<h1 className="text-slate-900 text-xl">Logging out...</h1>
		</div>
	);
};
