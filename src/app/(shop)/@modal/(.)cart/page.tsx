"use client";

import Modal from "@/app/components/ui/modal";
import Cart from "@/app/(shop)/cart/cart";

const Page = () => {
	return (
		<Modal title={"Cart"}>
			<Cart />
		</Modal>
	);
};

export default Page;
