import React, { useEffect, useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import dayjs from "dayjs";
import Edit from "./Edit";
import HerPayment from "./HerPayment";
import { usePage } from "@inertiajs/react";

const DetailHer = ({ branchShow }) => {
    console.log(branchShow);
    const { datas } = usePage().props;
    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        const filtered = datas.filter((item) => item.id == branchShow)?.[0]
            ?.datas;
        setData(filtered);
    }, [datas, branchShow]);

    const [onEditShow, setOnEditShow] = useState(false);
    const [triggeredId, setTriggeredId] = useState();

    const showEditHandler = (data) => {
        console.log(data);
        setOnEditShow(true);
        setTriggeredId(data);
        // console.log(data);
    };
    const closedEditHandle = (e) => {
        setOnEditShow(false);
        setTriggeredId();
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "wilayah",
                id: "wilayah",
                cell: (info) => info.getValue(),
                header: () => "Wilayah",
            },
            {
                accessorKey: "branch",
                id: "branch",
                cell: (info) => info.getValue(),
                header: () => "Unit",
            },
            {
                accessorKey: "asset_name",
                id: "asset_name",
                type: "button",
                cell: (info) => info.getValue(),
                header: () => "Nama Aset",
            },
            {
                accessorKey: "plat_nomor",
                id: "plat_nomor",
                cell: (info) => info.getValue(),
                header: () => "Plat Nomor",
            },
            {
                accessorKey: "tanggal_pajak_tahunan",
                id: "tanggal_pajak_tahunan",
                cell: (info) => (
                    <div className="whitespace-nowrap">
                        {dayjs(info.getValue()).format("DD-MM-YYYY")}
                    </div>
                ),
                header: () => "Tanggal Pajak",
            },
            {
                accessorKey: "jenis_pajak",
                id: "jenis_pajak",
                cell: (info) => info.getValue(),
                header: () => "Jenis Pajak",
            },

            {
                accessorKey: "nama_stnk",
                id: "nama_stnk",
                cell: (info) => info.getValue(),
                header: () => "Atas Nama",
            },
            {
                accessorKey: "is_finish",
                id: "is_finish",
                cell: (info) => (
                    <div>{info.getValue() == 1 ? "Sudah Di HER" : "Belum"}</div>
                ),
                header: () => "Keterangan",
            },
        ],
        [datas]
    );

    const [filtering, setFiltering] = useState("");
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter: filtering,
        },
        onGlobalFilterChange: setFiltering,
        // globalFilterFn: "fuzzy",

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    return (
        <>
            <div className="flex mb-2">
                <input
                    className="px-3 py-2 rounded border focus:ring-0 focus:outline-none focus:border-roman-500 shadow"
                    placeholder="Cari..."
                    value={filtering}
                    onChange={(event) => setFiltering(event.target.value)}
                />
                {/* Add additional filter inputs here for specific columns */}
            </div>
            <Table className=" lg:text-sm text-xs">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="text-center bg-gray-50 whitespace-nowrap"
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
                                    className={`${
                                        row.original.is_finish == 1
                                            ? "bg-green-200 hover:bg-green-100 border border-white"
                                            : ""
                                    } `}
                                    key={row.id}
                                    id={row.id}
                                >
                                    {row.getVisibleCells().map((cell, i) =>
                                        cell.column.columnDef.type ==
                                        "button" ? (
                                            <TableCell
                                                key={i}
                                                className={`${cell.column.columnDef.className} w-1/6`}
                                            >
                                                {row.original.is_finish == 1 ? (
                                                    <div>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="px-2 py-1 rounded-md border border-roman-500 hover:bg-roman-500 hover:text-white focus:bg-roman-600 focus:text-white"
                                                        onClick={() =>
                                                            showEditHandler(
                                                                cell.row
                                                                    .original.id
                                                            )
                                                        }
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </button>
                                                )}
                                            </TableCell>
                                        ) : (
                                            <TableCell
                                                key={i}
                                                className={`${cell.column.columnDef.className} w-1/8`}
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
                <HerPayment
                    open={onEditShow}
                    onClosed={closedEditHandle}
                    triggeredId={triggeredId}
                />
            </Table>
        </>
    );
};

export default DetailHer;
