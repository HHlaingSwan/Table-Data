"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
	username: z.string().nonempty({ message: "Username is required" }),
	email: z.string().nonempty({ message: "Email is required" }),
	major: z.string().nonempty({ message: "Major is required" }),
	avatar: z.string().nonempty({ message: "Avatar is required" }),
});

const CreateForm = () => {
	const queryClient = useQueryClient();
	const createStudent = async (newStudent) => {
		try {
			const res = await fetch(
				"https://st-api.kaungmyatsoe.dev/api/v1/students",
				{
					method: "POST",
					headers: {
						key: "43/UgWoJWW8pXKRmM48xYp8uuIXXLaBM1USAblj50X5GrVUdaluW36lEjoAbylSL6m4g9OXOxb9p7teXUyph5w",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newStudent),
				}
			);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const data = await res.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
	};
	const addStudentMutation = useMutation({
		mutationKey: ["create-student"],
		mutationFn: createStudent,
		onSuccess: (data) => {
			console.log(data);
			toast.dismiss();
			toast.success("Successfully Create Student!");
			form.reset();
			queryClient.invalidateQueries({ queryKey: ["students"] });
		},
		onError: (error) => {
			console.log(error);
			toast.error(error.message);
		},
	});
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			major: "0",
			avatar: "",
		},
		disabled: addStudentMutation.isPending,
	});
	const onSubmit = (value) => {
		console.log(value);
		toast.loading("Create Processing.....");
		addStudentMutation.mutateAsync(value);
	};

	return (
		<>
			<div className='w-1/2 mx-auto'>
				<h1 className='text-3xl font-bold text-center my-6'>Create Form</h1>
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
											placeholder='Your Name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='ZqSxu@example.com'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='avatar'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image Link</FormLabel>
									<FormControl>
										<Input
											placeholder='Your Image Link'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='major'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Major</FormLabel>
									<FormControl>
										<Select
											defaultValue='english'
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger className='w-[180px]'>
												<SelectValue placeholder='Major' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='0'>Select Major</SelectItem>
												<SelectItem value='english'>English</SelectItem>
												<SelectItem value='mathematics'>Mathematics</SelectItem>
												<SelectItem value='chemistry'>Chemistry</SelectItem>
												<SelectItem value='physics'>Physics</SelectItem>
												<SelectItem value='mechanics'>Mechanics</SelectItem>
												<SelectItem value='zoology'>Zoology</SelectItem>
												<SelectItem value='computer science'>
													Computer Science
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							disabled={addStudentMutation.isPending}
							type='submit'>
							{addStudentMutation.isPending && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default CreateForm;
