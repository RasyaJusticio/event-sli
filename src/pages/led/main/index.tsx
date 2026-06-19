"use client";

import Head from "next/head";
import BaseLayout from "@/components/layouts/base-layout";
import { api } from "@/utils/api";
import { sunlifeND } from "@/fonts/Sunlife-ND/Sunlife-ND";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

	// Track which comment is actually being displayed — separate from data
	// so we can control when the animation fires
	const [displayed, setDisplayed] = useState(data?.comment ?? null);
	const [animKey, setAnimKey] = useState(0);
	const prevIdRef = useRef<string | null>(null);

	useEffect(() => {
		if (!data?.comment) return;
		// Only trigger transition when the comment actually changes
		if (data.comment.id === prevIdRef.current) return;

		prevIdRef.current = data.comment.id;
		setDisplayed(data.comment);
		// Bump key to remount the element and restart the animation
		setAnimKey((k) => k + 1);
	}, [data?.comment]);

	return (
		<BaseLayout className="pt-32">
			<Head>
				<title>Main LED</title>
				<meta content="The screen show LED" name="description" />
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<style>{`
        @keyframes revealUp {
          0%   { opacity: 0; transform: translateY(32px) scale(0.88); }
          60%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        .comment-enter {
          animation: revealUp 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
      `}</style>

			<div>
				<div className="flex flex-col justify-center items-center max-w-1/2 mx-auto gap-12">
					{displayed ? (
						<div
							key={animKey}
							className="comment-enter flex flex-col items-center gap-12"
						>
							<h2
								className={`text-center text-5xl font-extrabold text-primary shadow-primary [text-shadow:-2px_0px_1px_rgba(0,0,0,0.6),0_0_2px_] ${sunlifeND.className}`}
							>
								{displayed.name}
							</h2>
							<p className="text-center text-6xl uppercase">
								{displayed.message}
							</p>
						</div>
					) : null}
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
