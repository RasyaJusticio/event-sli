import Head from "next/head";
import BaseLayout from "@/components/layouts/base-layout";
import Image from "next/image";
import { sunlifeND } from "@/fonts/Sunlife-ND/Sunlife-ND";

export default function LEDSide() {
	return (
		<div className="max-w-lg mx-auto relative">
			<BaseLayout>
				<Head>
					<title>Side LED</title>
					<meta content="The screen that shows LED" name="description" />
					<link href="/favicon.ico" rel="icon" />
				</Head>

				<div className="flex flex-col items-center justify-center gap-6 -mt-24">
					<div className="w-full flex justify-center gap-8 p-10 h-32 shadow-[0_0_20px_32px_var(--color-primary)] bg-background/90 shadow-background rounded-full overflow-visible">
						<Image
							className="h-full w-auto"
							src={"/assets/images/logo-sunlife.png"}
							alt=""
							width={336}
							height={97}
						/>
						<Image
							className="h-full w-auto"
							src={"/assets/images/logo-bank-muamalat.png"}
							alt=""
							width={340}
							height={102}
						/>
					</div>

					<Image
						className="w-[80%] rounded-2xl border-4 border-primary shadow-lg"
						src={"/assets/images/qrcode.png"}
						alt=""
						width={1155}
						height={1155}
					/>

					<h2 className={`text-4xl text-center ${sunlifeND.className}`}>
						Scan. Share.
						<br />
						Be part of the radiance
					</h2>

					<div className="flex flex-col w-full gap-4 mt-8 shadow-[0_0_20px_32px_var(--color-primary)] bg-background/90 shadow-background rounded-full overflow-visible">
						<p className="text-center text-lg font-semibold uppercase tracking-wider">
							Tata cara mengirim pesan:
						</p>
						<div className="grid grid-cols-3">
							<div className="flex flex-col items-center">
								<span className="text-lg font-extrabold">1</span>
								<p className="text-center  uppercase tracking-tighter">
									Scan QR
								</p>
							</div>

							<div className="flex flex-col items-center">
								<span className="text-lg font-extrabold">2</span>
								<p className="text-center  uppercase tracking-tighter">
									Ketik Pesan
								</p>
							</div>

							<div className="flex flex-col items-center">
								<span className="text-lg font-extrabold">3</span>
								<p className="text-center  uppercase tracking-tighter">
									Pesan muncul
								</p>
							</div>
						</div>
					</div>
				</div>
			</BaseLayout>
		</div>
	);
}
