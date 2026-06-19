import localFont from "next/font/local";

export const sunlifeND = localFont({
	src: [
		{
			path: "./Sunlife-ND-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./Sunlife-ND-Bold.ttf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-sunlife-nt",
	display: "swap",
});
