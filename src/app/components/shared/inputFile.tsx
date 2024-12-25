import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React from "react";

type InputFileProps = {
	className?: string;
};

const InputFile = ({ className }: InputFileProps) => {
	return (
		<div
			className={cn(
				"relative mb-8 flex h-full items-center justify-center rounded-xl border-4 border-slate-400 border-dotted py-12 transition-all focus-within:border-slate-900 focus-within:border-solid hover:bg-white/30",
				className,
			)}
		>
			<Input
				type={"file"}
				name={"file"}
				id={"file"}
				className={
					"absolute top-0 right-0 bottom-0 left-0 h-full w-full cursor-pointer p-0 opacity-0"
				}
			/>
			<div className={"flex flex-col items-center space-y-2"}>
				<PlusIcon size={32} className={"text-slate-400"} />
				<p className={"w-full flex-1 font-light text-lg text-slate-400"}>
					Add Product Image
				</p>
			</div>
		</div>
	);
};

export default InputFile;
