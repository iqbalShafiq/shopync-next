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
	children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
	const router = useRouter();

	const handleOpenChange = () => {
		router.back();
	};

	return (
		<Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
			<DialogOverlay>
				<DialogContent className={"overflow-y-hidden"}>
					<DialogTitle className={"text-center"}>Cart</DialogTitle>
					{children}
				</DialogContent>
			</DialogOverlay>
		</Dialog>
	);
};

export default Modal;
