"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import BaseLayout from "@/components/layouts/base-layout";
import { type AdminLoginSchema, adminLoginSchema } from "@/schemas/auth.schema";
import { api } from "@/utils/api";

export default function LEDMain() {
	const router = useRouter();

	const adminLoginMutation = api.auth.adminLogin.useMutation({
		onSuccess: (data) => {
			localStorage.setItem("token", data.token);
			router.push("/admin/moderation");
		},
		onError: (error) => {
			if (error.data?.code === "UNAUTHORIZED") {
				console.log("Wrong password");
			}
		},
	});

	const form = useForm<AdminLoginSchema>({
		resolver: zodResolver(adminLoginSchema),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit = form.handleSubmit((data) => {
		adminLoginMutation.mutate(data);
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
						Password
						<input type="password" {...form.register("password")} />
					</label>

					<button disabled={adminLoginMutation.isPending} type="submit">
						Kirim
					</button>
				</form>
			</div>
		</BaseLayout>
	);
}
