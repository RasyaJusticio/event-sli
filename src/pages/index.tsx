"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm } from "react-hook-form";
import BaseLayout from "@/components/layouts/base-layout";
import {
	type SubmitCommentSchemaInput,
	submitCommentSchema,
} from "@/schemas/comments";
import { api } from "@/utils/api";
import Button from "@/components/ui/button";
import Image from "next/image";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

export default function Home() {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const form = useForm<SubmitCommentSchemaInput>({
		resolver: zodResolver(submitCommentSchema),
		defaultValues: {
			name: "",
			message: "",
		},
	});

	const submitComment = api.comments.submit.useMutation({
		onSuccess: () => {
			setIsDialogOpen(true);
			form.reset();
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await submitComment.mutateAsync(data);
	});

	return (
		<BaseLayout lightweight>
			<Head>
				<title>Submit your comment</title>
				<meta content="Comment your thoughts" name="description" />
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<div className="flex flex-col items-center justify-center gap-2 max-w-lg">
				<div className="flex w-full justify-between gap-20">
					<Image
						alt=""
						className="h-fit w-full"
						height={97}
						src={"/assets/images/logo-sunlife.png"}
						width={336}
					/>
					<Image
						alt=""
						className="h-fit w-full"
						height={102}
						src={"/assets/images/logo-bank-muamalat.png"}
						width={340}
					/>
				</div>

				<Image
					alt=""
					className="mb-4"
					height={130}
					src={"/assets/images/logo-barakah-light.png"}
					width={320}
				/>

				<h1 className="font-bold text-2xl">Kirim Pesan</h1>

				<p className="text-center">
					Nama dan pesan Anda akan segera ditampilkan di layar setelah beberapa
					saat
				</p>

				<form className="mt-4 flex w-full flex-col gap-4" onSubmit={onSubmit}>
					<label className="flex flex-col gap-1">
						<span className="font-semibold text-neutral-600 text-xs uppercase tracking-wider">
							Nama Anda
						</span>
						<input
							className="rounded-lg border border-primary bg-white/50 px-4 py-2"
							{...form.register("name")}
						/>
						{form.formState.errors.name && (
							<span className="text-red-500 text-sm">
								{form.formState.errors.name.message}
							</span>
						)}
					</label>

					<label className="flex flex-col gap-1">
						<span className="font-semibold text-neutral-600 text-xs uppercase tracking-wider">
							Pesan Anda
						</span>
						<textarea
							className="rounded-lg border border-primary bg-white/50 px-4 py-2"
							{...form.register("message")}
						/>
						{form.formState.errors.message && (
							<span className="text-red-500 text-sm">
								{form.formState.errors.message.message}
							</span>
						)}
					</label>

					<p className="text-neutral-600 text-xs text-center">
						Setiap pesan harus melalui proses review sebelum bisa ditampilkan di
						layar
					</p>
					<Button loading={submitComment.isPending} type="submit">
						Kirim
					</Button>
				</form>
			</div>

			<div
				className={cn(
					"fixed inset-0 z-20 flex justify-center items-center bg-black/60 opacity-0 px-4 transition-opacity",
					isDialogOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none",
				)}
			>
				<div className="bg-white border border-primary px-6 py-8 shadow rounded-xl flex flex-col gap-2 w-full max-w-lg">
					<div className="rounded-full p-4 bg-green-500/50 w-fit h-fit aspect-square mx-auto">
						<Check size={32} />
					</div>
					<p className="text-center font-bold text-2xl tracking-tight">
						Pesan Anda berhasil dikirim
					</p>

					<p className="text-center max-w-sm mx-auto mb-4 tracking-wide">
						Pesan Anda telah kami terima dan akan segera ditampilkan di layar
					</p>

					<Button onClick={() => setIsDialogOpen(false)}>Oke</Button>
				</div>
			</div>
		</BaseLayout>
	);
}
