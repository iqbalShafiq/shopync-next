import { LoadingSpinner } from "@/app/components/ui/loading-spinner";

const LoadingProducts = () => {
	return (
		<div className={"flex w-full justify-center"}>
			<LoadingSpinner />
		</div>
	);
};

export default LoadingProducts;
