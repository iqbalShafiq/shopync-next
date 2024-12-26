"use client";

import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import type React from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
	defaultOpen?: boolean;
	open?: boolean;
	title: string;
	children: React.ReactNode;
}

const Modal = ({
	title,
	defaultOpen = true,
	open = true,
	children,
}: ModalProps) => {
	const router = useRouter();

	const handleCloseDialog = () => {
		router.back();
	};

	return (
		<Dialog
			defaultOpen={defaultOpen}
			open={open}
			onOpenChange={handleCloseDialog}
		>
			<DialogOverlay>
				<DialogContent className={"overflow-y-hidden"}>
					<DialogTitle className={"text-center"}>{title}</DialogTitle>
					{children}
				</DialogContent>
			</DialogOverlay>
		</Dialog>
	);
};

export default Modal;
