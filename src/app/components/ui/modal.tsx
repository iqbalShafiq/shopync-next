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
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
	defaultOpen?: boolean;
	open?: boolean;
	title: string;
	children: React.ReactNode;
}

const overlayVariants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.2,
		},
	},
};

const contentVariants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
		y: 20,
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: "spring",
			duration: 0.3,
			delay: 0.1,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: 20,
		transition: {
			duration: 0.2,
		},
	},
};

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
		<AnimatePresence mode="wait">
			{open && (
				<Dialog
					defaultOpen={defaultOpen}
					open={open}
					onOpenChange={handleCloseDialog}
				>
					<motion.div
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<DialogOverlay>
							<motion.div
								variants={contentVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								<DialogContent
									className={"h-fit max-h-screen max-w-2xl overflow-y-auto"}
								>
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
									>
										<DialogTitle className={"text-center"}>{title}</DialogTitle>
									</motion.div>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.3 }}
									>
										<ScrollArea className="rounded-md">{children}</ScrollArea>
									</motion.div>
								</DialogContent>
							</motion.div>
						</DialogOverlay>
					</motion.div>
				</Dialog>
			)}
		</AnimatePresence>
	);
};

export default Modal;
