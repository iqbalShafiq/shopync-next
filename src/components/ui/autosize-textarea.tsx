"use client";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import * as React from "react";

interface UseAutosizeTextAreaProps {
	textAreaRef: React.RefObject<HTMLTextAreaElement>;
	value?: string;
	minHeight?: number;
	maxHeight?: number;
}

export const useAutosizeTextArea = ({
	textAreaRef,
	maxHeight = Number.MAX_SAFE_INTEGER,
	minHeight = 0,
}: UseAutosizeTextAreaProps) => {
	const adjustHeight = React.useCallback(() => {
		const textArea = textAreaRef?.current;
		if (!textArea) return;

		// Reset the height completely
		textArea.style.height = "auto";

		// Get the computed styles
		const style = window.getComputedStyle(textArea);
		const borderTop = Number.parseInt(style.borderTopWidth, 10);
		const borderBottom = Number.parseInt(style.borderBottomWidth, 10);

		// Calculate the height needed
		const contentHeight = textArea.scrollHeight - borderTop - borderBottom;
		const finalHeight = Math.min(Math.max(contentHeight, minHeight), maxHeight);

		// Set the new height
		textArea.style.height = `${finalHeight}px`;
	}, [textAreaRef, minHeight, maxHeight]);

	// Use useLayoutEffect for synchronous DOM updates
	React.useLayoutEffect(() => {
		adjustHeight();
	}, [adjustHeight]);

	return adjustHeight;
};

export type AutosizeTextAreaRef = {
	textArea: HTMLTextAreaElement;
	focus: () => void;
	maxHeight: number;
	minHeight: number;
};

type AutosizeTextAreaProps = {
	maxHeight?: number;
	minHeight?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const AutosizeTextarea = React.forwardRef<
	AutosizeTextAreaRef,
	AutosizeTextAreaProps
>(
	(
		{
			maxHeight = Number.MAX_SAFE_INTEGER,
			minHeight = 52,
			className,
			onChange,
			value,
			...props
		}: AutosizeTextAreaProps,
		ref,
	) => {
		const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

		const adjustTextAreaHeight = useAutosizeTextArea({
			textAreaRef,
			maxHeight,
			minHeight,
		});

		React.useImperativeHandle(ref, () => ({
			textArea: textAreaRef.current as HTMLTextAreaElement,
			focus: () => textAreaRef.current?.focus(),
			maxHeight,
			minHeight,
		}));

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			onChange?.(e);
			// Use requestAnimationFrame to ensure DOM update
			requestAnimationFrame(() => {
				adjustTextAreaHeight();
			});
		};

		// Initial height adjustment
		React.useEffect(() => {
			adjustTextAreaHeight();
		}, [adjustTextAreaHeight]);

		return (
			<Textarea
				{...props}
				value={value}
				ref={textAreaRef}
				onChange={handleChange}
				className={cn("overflow-hidden [&]:pt-2 [&]:pb-4", className)}
				style={{
					minHeight: `${minHeight}px`,
					maxHeight:
						maxHeight !== Number.MAX_SAFE_INTEGER
							? `${maxHeight}px`
							: undefined,
					resize: "none",
					boxSizing: "border-box",
				}}
			/>
		);
	},
);

AutosizeTextarea.displayName = "AutosizeTextarea";
