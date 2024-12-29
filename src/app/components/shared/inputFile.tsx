"use client";

import ImageViewer from "@/app/components/shared/imageViewer";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React from "react";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
	imageUrl?: string | null;
}

const InputFile = ({ imageUrl, className, ...props }: InputFileProps) => {
	const { toast } = useToast();
	const [imageSrc, setImageSrc] = React.useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Check if the file is an image
			if (!file.type.startsWith("image/")) {
				toast({
					variant: "destructive",
					title: "Invalid file type",
					description: "Please select an image file.",
				});
				return;
			}

			// Check if the file size is less than 500KB
			if (file.size > 500 * 1024) {
				toast({
					variant: "destructive",
					title: "File size too large",
					description: "Please select an image file less than 500KB.",
				});
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setImageSrc(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div
			className={cn(
				"relative mb-8 flex h-full items-center justify-center rounded-xl border-4 border-slate-400 border-dotted py-12 transition-all focus-within:border-slate-900 focus-within:border-solid hover:bg-white/30",
				className,
			)}
		>
			{imageSrc ? (
				<ImageViewer
					src={imageSrc}
					alt="Selected image"
					className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden object-cover"
				/>
			) : (
				imageUrl && (
					<ImageViewer
						src={`http://localhost:8000${imageUrl}`}
						alt="Selected image"
						className="absolute top-0 right-0 bottom-0 left-0 h-full w-full rounded-lg object-cover"
					/>
				)
			)}
			<Input
				type={"file"}
				className={
					"absolute top-0 right-0 bottom-0 left-0 h-full w-full cursor-pointer p-0 opacity-0"
				}
				onChange={handleFileChange}
				{...props}
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
