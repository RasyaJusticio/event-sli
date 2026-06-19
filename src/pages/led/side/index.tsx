import Head from "next/head";
import Image from "next/image";
import BaseLayout from "@/components/layouts/base-layout";
import { sunlifeND } from "@/fonts/Sunlife-ND/Sunlife-ND";

export default function LEDSide() {
	return (
		<div className="relative mx-auto max-w-lg">
			<BaseLayout>
				<Head>
					<title>Side LED</title>
					<meta content="The screen that shows LED" name="description" />
					<link href="/favicon.ico" rel="icon" />
				</Head>

				<div className="-mt-24 flex flex-col items-center justify-center gap-6">
					<div className="flex h-32 w-full justify-center gap-8 overflow-visible rounded-full bg-background/90 p-10 shadow-[0_0_20px_32px_var(--color-primary)] shadow-background">
						<Image
							alt=""
							className="h-full w-auto"
							height={97}
							src={"/assets/images/logo-sunlife.png"}
							width={336}
						/>
						<Image
							alt=""
							className="h-full w-auto"
							height={102}
							src={"/assets/images/logo-bank-muamalat.png"}
							width={340}
						/>
					</div>

					<Image
						alt=""
						className="w-[80%] rounded-2xl border-4 border-primary shadow-lg"
						height={1155}
						src={"/assets/images/qrcode.png"}
						width={1155}
					/>

					<h2 className={`text-center text-4xl ${sunlifeND.className}`}>
						Scan. Share.
						<br />
						Be part of the radiance
					</h2>

					<div className="mt-8 flex w-full flex-col gap-4 overflow-visible rounded-full bg-background/90 shadow-[0_0_20px_32px_var(--color-primary)] shadow-background">
						<p className="text-center font-semibold text-lg uppercase tracking-wider">
							Tata cara mengirim pesan:
						</p>
						<div className="grid grid-cols-3">
							<div className="flex flex-col items-center">
								<span className="font-extrabold text-lg">1</span>
								<p className="text-center uppercase tracking-tighter">
									Scan QR
								</p>
							</div>

							<div className="flex flex-col items-center">
								<span className="font-extrabold text-lg">2</span>
								<p className="text-center uppercase tracking-tighter">
									Ketik Pesan
								</p>
							</div>

							<div className="flex flex-col items-center">
								<span className="font-extrabold text-lg">3</span>
								<p className="text-center uppercase tracking-tighter">
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
