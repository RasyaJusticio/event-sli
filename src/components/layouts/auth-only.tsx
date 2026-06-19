"use client";

import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import type React from "react";

interface Props {
	children?: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
	const authVerifyQuery = api.auth.verify.useQuery(undefined, {
    retry: 2,
  });

	const router = useRouter();

	if (authVerifyQuery.isPending) {
		return <>Loading...</>;
	}

	if (authVerifyQuery.isError) {
		router.push("/admin/login");
		return;
	}

	return children;
};

export default AuthLayout;
