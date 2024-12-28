"use client";

import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

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
	const pathName = usePathname();
	const router = useRouter();

	React.useEffect(() => {
		if (pathName === "/") {
			router.back();
		}
	}, [pathName, router]);

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
				<DialogContent
					className={"h-fit max-h-screen max-w-2xl overflow-y-auto"}
				>
					<DialogTitle className={"text-center"}>{title}</DialogTitle>
					<ScrollArea className="rounded-md">{children}</ScrollArea>
				</DialogContent>
			</DialogOverlay>
		</Dialog>
	);
};

export default Modal;
