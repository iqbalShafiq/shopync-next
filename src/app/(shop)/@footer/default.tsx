import Link from "next/link";

const Footer = () => {
	return (
		<footer className="border-t-2 border-t-gray-200 bg-white dark:bg-gray-900">
			<div className="mx-auto w-full max-w-screen-xl px-8 py-6 lg:py-8">
				<div className="text-center sm:flex sm:items-center sm:justify-between lg:text-start">
					<span className="text-gray-500 text-sm sm:text-center dark:text-gray-400">
						<Link href="/" className="font-semibold text-md hover:underline">
							Shopyc
						</Link>{" "}
						• Built with ❤️ by Shafiq
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
