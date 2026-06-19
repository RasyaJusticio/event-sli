import Image from "next/image";
import type React from "react";

interface Props {
	className?: string;
	lightweight?: boolean;
	children?: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ className, lightweight, children }) => {
	return (
		<>
			<main
				className={`flex min-h-screen flex-col items-center justify-center p-8 ${className}`}
			>
				{children}
			</main>

			{lightweight ? (
				<>
					<Image
						className="fixed top-0 left-0 h-full w-full object-cover -z-10 hidden sm:block"
						src={"/assets/images/plain-background.webp"}
						alt=""
						width={2560}
						height={1280}
					/>
					<Image
						className="fixed top-0 left-0 h-full w-full object-cover -z-10 sm:hidden"
						src={"/assets/images/plain-background-vert.webp"}
						alt=""
						width={2560}
						height={1280}
					/>
				</>
			) : (
				<>
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
			)}
		</>
	);
};

export default BaseLayout;
