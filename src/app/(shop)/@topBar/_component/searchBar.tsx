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
				className={"bg-white/30 text-xs md:text-sm"}
				startIcon={
					<MagnifyingGlassIcon className="h-3 w-3 text-slate-900 md:h-4 md:w-4" />
				}
			/>
		</form>
	);
};

export default SearchBar;
