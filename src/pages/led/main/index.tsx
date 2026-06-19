"use client";

import Head from "next/head";
import BaseLayout from "@/components/layouts/base-layout";
import { api } from "@/utils/api";
import { sunlifeND } from "@/fonts/Sunlife-ND/Sunlife-ND";
import Image from "next/image";

export default function LEDMain() {
	const { data } = api.comments.wallCurrent.useQuery(undefined, {
		refetchInterval: (query) => {
			const displayUntil = query.state.data?.displayUntil;

			if (!displayUntil) return 5000;

			return Math.max(
				new Date(displayUntil).getTime() - Date.now() + 100,
				1000,
			);
		},
	});

	return (
		<BaseLayout className="pt-32">
			<Head>
				<title>Main LED</title>
				<meta content="The screen show LED" name="description" />
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<div className="">
				<div className="flex flex-col justify-center items-center max-w-1/2 mx-auto gap-12">
					{data?.comment ? (
						<>
							<h2
								className={`text-center text-5xl font-extrabold text-primary shadow-primary [text-shadow:-2px_0px_1px_rgba(0,0,0,0.6),0_0_2px_] ${sunlifeND.className}`}
							>
								{data.comment.name}
							</h2>
							<p className="text-center text-6xl uppercase">
								{data.comment.message}
							</p>
						</>
					) : (
						<></>
					)}
					{/* <h2
						className={`text-center text-5xl font-extrabold text-primary shadow-primary [text-shadow:-2px_0px_1px_rgba(0,0,0,0.6),0_0_2px_] ${sunlifeND.className}`}
					>
						Lorem Ipsum
					</h2>
					<p className="text-center text-6xl uppercase tracking-tighter">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
						efficitur est at lacinia cursus. Nulla ac congue lacus. Duis non
						tortor malesuada, imperdiet justo at, euismod libero. Fusce laoreet
						nulla quis neque feugiat, sed commodo felis faucibus.
					</p> */}
				</div>
			</div>

			<div className="fixed top-0 inset-x-0 w-full flex justify-center gap-8 mt-12 p-10 h-32">
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
		</BaseLayout>
	);
}
