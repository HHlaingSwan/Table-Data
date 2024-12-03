"use client";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";
// import { columns } from "./columns";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DeleteButton from "./DeleteButton";

const columnHelper = createColumnHelper();
const DataTable = ({ data, setData }) => {
	const columns = [
		columnHelper.accessor("Number", {
			header: "No",
			cell: (info) => info.row.index + 1,
		}),
		columnHelper.accessor("username", {
			cell: (info) => info.getValue(),
			header: "Name",
		}),
		columnHelper.accessor("email", {
			cell: (info) => info.getValue(),
			header: "Email",
		}),
		columnHelper.accessor("createdAt", {
			header: "Created At",
			cell: (info) => {
				const dateValue = info.getValue();
				const date = new Date(dateValue);
				return (
					<p>
						{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
					</p>
				);
			},
		}),
		{
			id: "delete",
			header: "#",
			cell: ({ row }) => (
				<DeleteButton
					row={row}
					data={data}
					setData={setData}
				/>
			),
		},
	];
	const table = useReactTable({
		data: data || [],
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default DataTable;
