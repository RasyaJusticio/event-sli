import localFont from "next/font/local";

export const sunlifeNT = localFont({
	src: [
		{
			path: "./Sunlife-NT-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./Sunlife-NT-Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "./Sunlife-NT-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./Sunlife-NT-BoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
	],
	variable: "--font-sunlife-nt",
	display: "swap",
});
