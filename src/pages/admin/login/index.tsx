"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import BaseLayout from "@/components/layouts/base-layout";
import { type AdminLoginSchema, adminLoginSchema } from "@/schemas/auth.schema";
import { api } from "@/utils/api";
import Button from "@/components/ui/button";
import Image from "next/image";

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
				<title>Admin Login</title>
				<meta content="Login into the admin panel" name="description" />
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<div className="flex flex-col items-center justify-center gap-2 w-full max-w-lg">
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

				<h1 className="font-bold text-2xl">Admin Login</h1>

				<p className="text-center">
					Login sebagai admin untuk mengakses admin panel
				</p>
				<form className="mt-4 flex w-full flex-col gap-4" onSubmit={onSubmit}>
					<label className="flex flex-col gap-1">
						<span className="font-semibold text-neutral-600 text-xs uppercase tracking-wider">
							Password
						</span>
						<input
							className="rounded-lg border border-primary bg-white/50 px-4 py-2"
							type="password"
							{...form.register("password")}
						/>
						{form.formState.errors.password && (
							<span className="text-red-500 text-sm">
								{form.formState.errors.password.message}
							</span>
						)}
					</label>

					<Button loading={adminLoginMutation.isPending} type="submit">
						Kirim
					</Button>
				</form>
			</div>
		</BaseLayout>
	);
}
