"use client";
import React, { useState } from "react";
import DataTable from "../_components/DataTable";
import CreateForm from "../_components/CreateForm";

const egData = [
	{
		id: "1",
		username: "John Doe",
		email: "2g6R5@example.com",
		createdAt: "09-05-2022",
	},
	{
		id: "2",
		username: "John Doe",
		email: "2g6R5@example.com",
		createdAt: "02-11-2023",
	},
];
const UserListPage = () => {
	const [data, setData] = useState(egData);
	return (
		<div>
			<CreateForm
				data={data}
				setData={setData}
			/>
			<DataTable
				data={data}
				setData={setData}
			/>
		</div>
	);
};

export default UserListPage;
