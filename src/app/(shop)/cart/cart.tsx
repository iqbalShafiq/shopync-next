import CartItem from "@/app/(shop)/cart/_component/cartItem";
import React from "react";

const Cart = () => {
	return (
		<div>
			<CartItem
				id={"asd"}
				name={"sad"}
				description={"asd"}
				price={1500000}
				quantityOnCart={1}
				quantity={10}
				image={
					"https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				}
				mine={false}
			/>
			<CartItem
				id={"asd"}
				name={"sad"}
				description={"asd"}
				price={1500000}
				quantityOnCart={1}
				quantity={12}
				image={
					"https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				}
				mine={false}
			/>
		</div>
	);
};

export default Cart;
