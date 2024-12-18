import { LoadingSpinner } from "@/app/components/ui/loading-spinner";

const LoadingProducts = () => {
	return (
		<div className={"w-full flex justify-center"}>
			<LoadingSpinner />
		</div>
	);
};

export default LoadingProducts;
