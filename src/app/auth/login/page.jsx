"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

const formSchema = z.object({
	username: z.string().nonempty({ message: "Username is required" }).min(3),
	password: z.string().nonempty({ message: "Password is required" }).min(3),
});
const LoginPage = () => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const onSubmit = (values) => {
		console.log(values);
		signIn("credentials", { ...values, callbackUrl: "/" });
		form.reset();
	};

	return (
		<>
			<h1 className='text-2xl font-bold p-10 text-center'>Login Page</h1>
			<div className='mx-auto w-[60vw]'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter Your Name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Enter Your Password'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type='submit'>Submit</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default LoginPage;
