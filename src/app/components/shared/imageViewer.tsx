import { cn } from "@/lib/utils";
import type React from "react";

const ImageViewer = ({
	src,
	alt,
	className,
	...props
}: React.ComponentProps<"img">) => {
	return (
		// biome-ignore lint/a11y/useAltText: bug from biome
		<img
			src={src}
			alt={alt}
			className={cn(
				"rounded-xl border-slate-900 object-cover object-center drop-shadow-lg",
				className,
			)}
			{...props}
		/>
	);
};

export default ImageViewer;
