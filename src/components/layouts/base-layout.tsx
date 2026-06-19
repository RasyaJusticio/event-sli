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
						alt=""
						className="fixed top-0 left-0 -z-10 hidden h-full w-full object-cover sm:block"
						height={1280}
						src={"/assets/images/plain-background.webp"}
						width={2560}
					/>
					<Image
						alt=""
						className="fixed top-0 left-0 -z-10 h-full w-full object-cover sm:hidden"
						height={1280}
						src={"/assets/images/plain-background-vert.webp"}
						width={2560}
					/>
				</>
			) : (
				<>
					<Image
						alt=""
						className="fixed top-0 left-0 -z-10 hidden h-full w-full object-cover sm:block"
						height={1280}
						src={"/assets/images/plain-background.png"}
						width={2560}
					/>
					<Image
						alt=""
						className="fixed top-0 left-0 -z-10 h-full w-full object-cover sm:hidden"
						height={1280}
						src={"/assets/images/plain-background-vert.png"}
						width={2560}
					/>
				</>
			)}
		</>
	);
};

export default BaseLayout;
