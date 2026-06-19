import { LoaderCircle } from "lucide-react";
import type React from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
	loading?: boolean;
}

const Button: React.FC<Props> = ({
	loading,
	disabled,
	className,
	children,
	...props
}) => {
	return (
		<button
			className="cursor-pointer rounded-lg bg-linear-to-r bg-primary from-primary to-primary-2 px-4 py-3 font-bold text-white uppercase tracking-wider shadow transition-all hover:brightness-95 active:scale-95"
			disabled={disabled || loading}
			{...props}
		>
			{loading ? <LoaderCircle /> : children}
		</button>
	);
};

export default Button;
