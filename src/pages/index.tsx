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

export default function Home() {
	const submitComment = api.comments.submit.useMutation();

	const form = useForm<SubmitCommentSchemaInput>({
		resolver: zodResolver(submitCommentSchema),
		defaultValues: {
			name: "",
			message: "",
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

			<div className="flex flex-col items-center justify-center gap-2">
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

					<p className="text-neutral-600 text-xs">
						Setiap pesan harus melalui proses review sebelum bisa ditampilkan di
						layar
					</p>
					<button
						className="cursor-pointer rounded-lg bg-gradient-to-r bg-primary from-primary to-primary-2 px-4 py-3 font-bold text-white uppercase tracking-wider shadow transition-all hover:brightness-95 active:scale-95"
						disabled={submitComment.isPending}
						type="submit"
					>
						Kirim
					</button>
				</form>
			</div>
		</BaseLayout>
	);
}
