import type React from "react";
import Link from "next/link";
import TopBarLink from "@/app/(shop)/@topBar/_component/TopBarLink";
import {
	MagnifyingGlassIcon,
	ShoppingCartIcon,
} from "@heroicons/react/16/solid";
import InputText from "@/app/components/shared/InputText";

const DefaultTopBar = () => {
	return (
		<div
			className={
				"mx-8 px-8 py-5 text-slate-900 bg-white/30 rounded-xl flex justify-between items-center backdrop-blur-sm shadow-sm"
			}
		>
			<Link href={"/"} className={"font-semibold text-slate-900 text-2xl"}>
				Shopync
			</Link>
			<div className={"flex space-x-4"}>
				<form className={"flex-col content-center"}>
					<InputText
						placeholder={"Search Products"}
						name={"search"}
						startIcon={
							<MagnifyingGlassIcon
								width={20}
								height={20}
								className="text-slate-900"
							/>
						}
					/>
				</form>
				<Link
					href={"/cart"}
					className={
						"flex-col content-center text-slate-900 hover:text-slate-700 transition-all duration-300"
					}
				>
					<ShoppingCartIcon width={20} />
				</Link>
				<TopBarLink to={"/logout"} className={"flex-col content-center"}>
					Logout
				</TopBarLink>
			</div>
		</div>
	);
};

export default DefaultTopBar;
