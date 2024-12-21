"use client";

import InputText from "@/app/components/shared/inputText";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import type React from "react";
import { usePathname } from "next/navigation";

const SearchBar = () => {
	const pathName = usePathname();

	if (pathName !== "/products") return null;

	return (
		<form>
			<InputText
				placeholder={"Search Products"}
				name={"search"}
				className={"rounded-3xl bg-white/30"}
				startIcon={
					<MagnifyingGlassIcon
						width={20}
						height={20}
						className="text-slate-900"
					/>
				}
			/>
		</form>
	);
};

export default SearchBar;
