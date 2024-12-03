"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();
const Provider = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>{children}</SessionProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Provider;
