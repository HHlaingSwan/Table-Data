"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
	username: z.string().nonempty({ message: "Username is required" }).min(3),
	email: z.string().email().nonempty({ message: "Email is required" }),
});

const CreateForm = ({ data, setData }) => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
		},
	});
	const onSubmit = (values) => {
		// Get current date and time
		const now = new Date();
		const dateTime = `${now.getDate()}/${
			now.getMonth() + 1
		}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

		// Add current time to the values
		const newDataEntry = {
			...values,
			createdAt: dateTime,
		};

		setData([...data, newDataEntry]);

		form.reset();
	};

	return (
		<>
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
											placeholder='username'
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
											type='email'
											placeholder='w6N8v@example.com'
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

export default CreateForm;
