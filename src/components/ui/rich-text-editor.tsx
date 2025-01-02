"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
	ssr: false,
	loading: () => (
		<div className="min-h-[600px] rounded-lg border-2 border-slate-200 p-4">
			Loading editor...
		</div>
	),
});

export interface RichTextEditorProps {
	label?: string;
	labelFontWeight?: "normal" | "medium" | "semibold" | "bold";
	defaultValue?: string;
	name?: string;
	id?: string;
	required?: boolean;
	placeholder?: string;
}

const modules = {
	toolbar: [
		["bold", "italic", "underline"],
		[{ list: "ordered" }, { list: "bullet" }],
	],
};

const formats = ["bold", "italic", "underline", "list"];

export const RichTextEditor = ({
	label,
	labelFontWeight = "medium",
	defaultValue = "",
	name,
	id,
	required,
	placeholder,
}: RichTextEditorProps) => {
	const [value, setValue] = React.useState(defaultValue);
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleChange = (content: string) => {
		setValue(content);
	};

	return (
		<div className={"flex flex-1 flex-col"}>
			{label && (
				<Label
					htmlFor={id}
					className={cn(
						"block text-slate-900 text-sm",
						`font-${labelFontWeight}`,
					)}
				>
					{label}
					{required && <span className="ml-1 text-red-500">*</span>}
				</Label>
			)}

			<div className="mt-2 flex flex-1 flex-col">
				{isMounted && (
					<>
						<div className="rich-text-editor flex flex-1 flex-col">
							<ReactQuill
								theme="snow"
								value={value}
								onChange={handleChange}
								modules={modules}
								formats={formats}
								placeholder={placeholder}
							/>
						</div>

						<input
							type="hidden"
							name={name}
							id={id}
							value={value}
							required={required}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default RichTextEditor;
