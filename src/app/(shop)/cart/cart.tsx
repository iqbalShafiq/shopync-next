import React from "react";
import CartItem from "@/app/(shop)/cart/_component/CartItem";

const Cart = () => {
	return (
		<div>
			<CartItem
				id={"asd"}
				name={"sad"}
				description={"asd"}
				price={1_500_000}
				quantityOnCart={1}
				quantity={10}
				image={
					"https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				}
			/>
			<CartItem
				id={"asd"}
				name={"sad"}
				description={"asd"}
				price={1_500_000}
				quantityOnCart={1}
				quantity={12}
				image={
					"https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				}
			/>
		</div>
	);
};

export default Cart;
