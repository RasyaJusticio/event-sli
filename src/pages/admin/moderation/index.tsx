"use client";

import Head from "next/head";
import AuthLayout from "@/components/layouts/auth-only";
import BaseLayout from "@/components/layouts/base-layout";
import { api } from "@/utils/api";
import Button from "@/components/ui/button";
import { Check, X } from "lucide-react";

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

				<div className="w-full max-w-xl rounded-lg bg-white shadow overflow-hidden">
					<div className="min-h-[90vh] max-h-[90vh] overflow-auto">
						<table className="w-full table-fixed">
							<thead className="sticky top-0 shadow">
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
												<div className="flex gap-1.5 flex-wrap">
													<Button
														className="bg-none bg-green-500 px-3 py-2"
														onClick={() =>
															updateStatusMutation.mutate({
																id: comment.id,
																status: "APPROVED",
															})
														}
														type="button"
													>
														<Check />
													</Button>

													<Button
														className="bg-none bg-red-500 px-3 py-2"
														onClick={() =>
															updateStatusMutation.mutate({
																id: comment.id,
																status: "REJECTED",
															})
														}
														type="button"
													>
														<X />
													</Button>
												</div>
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
					</div>
				</div>
			</AuthLayout>
		</BaseLayout>
	);
}
