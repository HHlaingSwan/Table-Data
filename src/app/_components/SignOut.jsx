"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const SignOut = () => {
	const { data } = useSession();

	return (
		<div className='flex flex-col gap-10 items-center   '>
			{data && (
				<div className='font-bold text-2xl'>
					Hello <span className='text-blue-500'>{data.user.name}</span>
				</div>
			)}
			<Button onClick={() => signOut()}>Sign Out</Button>
		</div>
	);
};

export default SignOut;
