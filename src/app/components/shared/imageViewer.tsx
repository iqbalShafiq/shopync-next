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
		// have used alt prop and should be valid : https://biomejs.dev/linter/rules/use-alt-text/
		<img
			src={src}
			alt={alt}
			className={cn(
				"w-full rounded-md border-slate-900 object-cover object-center drop-shadow-sm focus-visible:rounded-lg",
				className,
			)}
			{...props}
		/>
	);
};

export default ImageViewer;
