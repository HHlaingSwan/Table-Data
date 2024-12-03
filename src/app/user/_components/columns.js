import DeleteButton from "./DeleteButton";

const { createColumnHelper } = require("@tanstack/react-table");

const columnHelper = createColumnHelper();

export const columns = [
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
        id: 'delete',
        header: '#',
        cell: ({ row }) => <DeleteButton row={row} />,
    },
];