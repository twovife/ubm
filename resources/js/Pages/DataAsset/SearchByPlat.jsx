import React, { useEffect, useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import Edit from "./Edit";

const SearchByPlat = ({ datas }) => {
    const [data, setData] = useState(() => datas);
    useEffect(() => {
        setData(datas);
    }, [datas]);

    const [onEditShow, setOnEditShow] = useState(false);
    const [editData, setEditData] = useState();
    const showEditHandler = (data) => {
        setOnEditShow(true);
        setEditData(data);
    };
    const closedEditHandle = (e) => {
        setOnEditShow(false);
        setEditData();
    };

    useEffect(() => {
        setData(datas);
    }, [datas]);
    const columns = useMemo(
        () => [
            {
                accessorKey: "unit",
                id: "unit",
                cell: (info) => info.getValue(),
                header: () => "Unit",
            },
            {
                accessorKey: "asset_name",
                id: "asset_name",
                cell: (info) => info.getValue(),
                header: () => "Nama Aset",
            },
            {
                accessorKey: "plat_nomor",
                id: "plat_nomor",
                type: "button",
                cell: (info) => info.getValue(),
                header: () => "Plat Nomor",
            },
            {
                accessorKey: "nama_stnk",
                id: "nama_stnk",
                cell: (info) => info.getValue(),
                header: () => "Atas Nama",
            },
            {
                accessorKey: "tanggal_stnk",
                id: "tanggal_stnk",
                cell: (info) => (
                    <div className="whitespace-nowrap">
                        {dayjs(info.getValue()).format("DD-MM-YY")}
                    </div>
                ),
                header: () => "Tanggal STNK",
            },
            {
                accessorKey: "tanggal_pajak_tahunan",
                id: "tanggal_pajak_tahunan",
                cell: (info) => (
                    <div className="whitespace-nowrap">
                        {dayjs(info.getValue()).format("DD-MM-YY")}
                    </div>
                ),
                header: () => "Pajak Tahunan",
            },
            {
                accessorKey: "keterangan",
                id: "keterangan",
                cell: (info) => info.getValue(),
                header: () => "Keterangan",
            },
        ],
        [datas]
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead
                                    key={header.id}
                                    className="text-center bg-gray-100 whitespace-nowrap"
                                >
                                    {flexRender(
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
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row, i) => (
                        <React.Fragment key={row.id}>
                            <TableRow
                                key={row.id}
                                id={row.id}
                                className={`text-center ${
                                    row.original.is_active == 2
                                        ? "bg-red-200 hover:bg-red-300"
                                        : ""
                                }`}
                            >
                                {row.getVisibleCells().map((cell, i) =>
                                    cell.column.columnDef.type == "button" ? (
                                        <TableCell
                                            key={i}
                                            className={`${cell.column.columnDef.className} w-[14,28571428571429%]`}
                                        >
                                            {row.original.is_active == 2 ? (
                                                <span>
                                                    {" "}
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </span>
                                            ) : (
                                                <button
                                                    className="px-2 py-1 border rounded-md border-roman-500 hover:bg-roman-500 hover:text-white focus:bg-roman-600 focus:text-white"
                                                    onClick={() =>
                                                        showEditHandler(
                                                            cell.row.original
                                                        )
                                                    }
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </button>
                                            )}
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            key={i}
                                            className={`${cell.column.columnDef.className} w-1/6`}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        </React.Fragment>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan="3">
                            Tidak Ada Data Ditemukan
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <Edit
                open={onEditShow}
                onClosed={closedEditHandle}
                dataDetail={editData}
            />
        </Table>
    );
};

export default SearchByPlat;
