import Link from "next/link";

const Footer = () => {
	return (
		<footer className="border-t border-t-gray-200 bg-white dark:bg-gray-900">
			<div className="mx-auto w-full max-w-screen-xl px-8 py-6 lg:py-8">
				<div className="w-full sm:flex sm:items-center sm:justify-between">
					<span className="inline-block w-full text-center text-gray-500 text-sm dark:text-gray-400">
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
