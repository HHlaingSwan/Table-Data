import React from "react";
import DataTable from "./_components/DataTable";
import CreateForm from "./_components/CreateForm";

const StudentListPage = () => {
	return (
		<>
			<div className='my-6 w-full flex justify-center items-center'>
				<CreateForm />
			</div>
			<div>
				<DataTable />
			</div>
		</>
	);
};

export default StudentListPage;
