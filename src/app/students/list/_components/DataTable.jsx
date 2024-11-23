"use client";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { columns } from "./columns";

const DataTable = () => {
	const [pagination, setPagination] = useState({
		pageIndex: 0, //custom initial page index
		pageSize: 10, //custom default page size
	});
	const fetchData = async () => {
		const res = await fetch("https://st-api.kaungmyatsoe.dev/api/v1/students", {
			method: "GET",
			headers: {
				key: "43/UgWoJWW8pXKRmM48xYp8uuIXXLaBM1USAblj50X5GrVUdaluW36lEjoAbylSL6m4g9OXOxb9p7teXUyph5w",
			},
		});
		const data = await res.json();
		return data.students;

		// const response = await fetch("https://dummyapi.online/api/users", {
		// 	method: "GET",
		// });
		// const data = await response.json();
		// return data;
	};
	const { data, isLoading } = useQuery({
		queryKey: ["students"],
		queryFn: fetchData,
	});

	const table = useReactTable({
		data: !isLoading ? data : [],
		columns,
		getCoreRowModel: getCoreRowModel(), //row model
		getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
		onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
		state: {
			pagination,
		},
	});

	return (
		<>
			<div className=' '>
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
										className='cursor-pointer h-16'
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
										{isLoading ? "Loading..." : "No results."}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				{/******* pagination ********/}
				<div className='flex justify-between items-center p-4 '>
					<div className='flex gap-3'>
						<Button
							onClick={() => table.firstPage()}
							disabled={!table.getCanPreviousPage()}>
							{"<<"}
						</Button>
						<Button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							{"<"}
						</Button>
					</div>
					<div className='flex gap-3'>
						<Button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							{">"}
						</Button>
						<Button
							onClick={() => table.lastPage()}
							disabled={!table.getCanNextPage()}>
							{">>"}
						</Button>
					</div>
					{/* <select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option
								key={pageSize}
								value={pageSize}>
								{pageSize}
							</option>
						))}
					</select> */}
				</div>
			</div>
		</>
	);
};

export default DataTable;
