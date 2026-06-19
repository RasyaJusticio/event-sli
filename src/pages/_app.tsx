import type { AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { sunlifeNT } from "@/fonts/Sunlife-NT/Sunlife-NT";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<div className={sunlifeNT.className}>
			<Component {...pageProps} />
		</div>
	);
};

export default api.withTRPC(MyApp);
