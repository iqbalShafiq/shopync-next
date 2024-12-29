// src/components/shared/HtmlContent.tsx
"use client";

import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

interface HtmlContentProps {
	showAsHtml: boolean;
	content: string;
	limitCharacter?: number | null;
	className?: string;
}

const HtmlContent = ({
	showAsHtml,
	content,
	limitCharacter = null,
	className = "",
}: HtmlContentProps) => {
	const [sanitizedContent, setSanitizedContent] = useState(content);

	useEffect(() => {
		const initDOMPurify = async () => {
			const DOMPurify = (await import("dompurify")).default;
			const sanitized = DOMPurify.sanitize(content);
			setSanitizedContent(sanitized);
		};

		initDOMPurify().then((r) => console.log(r));
	}, [content]);

	return (
		<div className={"html-content"}>
			<div className={cn(showAsHtml ? "ql-editor" : "", className)}>
				{limitCharacter
					? parse(sanitizedContent.slice(0, limitCharacter))
					: parse(sanitizedContent)}
			</div>
		</div>
	);
};

export default HtmlContent;
