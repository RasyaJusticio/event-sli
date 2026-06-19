"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import BaseLayout from "@/components/layouts/base-layout";
import {
	submitCommentSchema,
	type SubmitCommentSchemaInput,
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
		<BaseLayout>
			<Head>
				<title>Submit your comment</title>
				<meta content="Comment your thoughts" name="description" />
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<div className="">
				<form onSubmit={onSubmit}>
					<label>
						Nama
						<input {...form.register("name")} />
					</label>

					<label>
						Pesan
						<textarea {...form.register("message")} />
					</label>

					<button disabled={submitComment.isPending} type="submit">
						Kirim
					</button>
				</form>
			</div>
		</BaseLayout>
	);
}
