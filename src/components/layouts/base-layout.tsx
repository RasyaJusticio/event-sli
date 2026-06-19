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
			<div>
				<Image
					className="fixed inset-0 -z-10"
					src={"/assets/images/plain-background.png"}
					alt=""
					width={2560}
					height={1280}
				/>
			</div>
		</>
	);
};

export default BaseLayout;
