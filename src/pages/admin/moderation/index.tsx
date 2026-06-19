"use client";

import Head from "next/head";
import BaseLayout from "@/components/layouts/base-layout";
import { api } from "@/utils/api";
import AuthLayout from "@/components/layouts/auth-only";

export default function LEDMain() {
	const utils = api.useUtils();
	const { data, isPending } = api.comments.adminQueue.useQuery();
	const updateStatusMutation = api.comments.adminUpdateStatus.useMutation({
		onSuccess: () => {
			utils.comments.adminQueue.invalidate();
		},
	});

	return (
		<BaseLayout>
			<AuthLayout>
				<Head>
					<title>Review Komen</title>
					<meta content="Comment your thoughts" name="description" />
					<link href="/favicon.ico" rel="icon" />
				</Head>

				<table>
					<thead>
						<tr>
							<td>Nama</td>
							<td>Pesan</td>
							<td>Dikirim Pada</td>
							<td>Aksi</td>
						</tr>
					</thead>
					<tbody>
						{data && !isPending ? (
							data.pending.map((comment) => (
								<tr key={comment.id}>
									<td>{comment.name}</td>
									<td>{comment.message}</td>
									<td>{new Date(comment.createdAt).toLocaleString()}</td>
									<td>
										<button
											onClick={() =>
												updateStatusMutation.mutate({
													id: comment.id,
													status: "APPROVED",
												})
											}
											type="button"
										>
											Approve
										</button>

										<button
											onClick={() =>
												updateStatusMutation.mutate({
													id: comment.id,
													status: "REJECTED",
												})
											}
											type="button"
										>
											Reject
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4}>Getting comments</td>
							</tr>
						)}
					</tbody>
				</table>
			</AuthLayout>
		</BaseLayout>
	);
}
