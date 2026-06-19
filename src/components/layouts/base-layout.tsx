import Image from "next/image";
import type React from "react";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ className, children }) => {
	return (
		<>
			<main
				className={`flex min-h-screen flex-col items-center justify-center p-8 ${className}`}
			>
				{children}
			</main>
			<Image
				className="fixed top-0 left-0 h-full w-full object-cover -z-10 hidden sm:block"
				src={"/assets/images/plain-background.png"}
				alt=""
				width={2560}
				height={1280}
			/>
			<Image
				className="fixed top-0 left-0 h-full w-full object-cover -z-10 sm:hidden"
				src={"/assets/images/plain-background-vert.png"}
				alt=""
				width={2560}
				height={1280}
			/>
		</>
	);
};

export default BaseLayout;
