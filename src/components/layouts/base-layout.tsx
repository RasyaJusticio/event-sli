import type React from "react";

interface Props {
	children?: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-center">
				{children}
			</main>
		</>
	);
};

export default BaseLayout;
