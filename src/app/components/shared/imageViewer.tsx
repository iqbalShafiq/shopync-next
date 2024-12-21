import type React from "react";

const ImageViewer = ({
	src,
	alt,
	className,
}: { src: string; alt: string; className?: string }) => {
	return (
		<img
			src={src}
			alt={alt}
			className={`rounded-xl w-full h-full object-cover object-center drop-shadow-lg border-slate-900 ${className}`}
		/>
	);
};

export default ImageViewer;
