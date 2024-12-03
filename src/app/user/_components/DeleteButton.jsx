import React from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeleteButton = ({ row, data, setData }) => {
	const deleteHandler = () => {
		const checkId = row.index;
		setData(data.filter((item, index) => index !== checkId));
	};
	return (
		<>
			<Dialog>
				<DialogTrigger>
					<Trash2Icon className='h-4 w-4 text-red-500' />
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<Button
							onClick={() => {}}
							variant='secondary'>
							Cancel
						</Button>
						<Button
							onClick={deleteHandler}
							variant='destructive'>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DeleteButton;
