import FormatNumbering from "@/Components/FormatNumbering";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import { usePage } from "@inertiajs/react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import dayjs from "dayjs";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";

const DetailPerUnitGoro = ({ triggerId }) => {
    const { server_filter } = usePage().props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewTr, setShowNewTr] = useState();

    const getThisParentTr = (id) => {
        setShowNewTr((prevId) => (prevId === id ? null : id));
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "transaction_date",
                id: "transaction_date",
                cell: (info) => (
                    <div className="text-center">
                        {info.getValue() &&
                            dayjs(info.getValue()).format("DD-MM-YYYY")}
                    </div>
                ),
                header: () => "Tanggal Transaksi",
            },
            {
                accessorKey: "nominal",
                id: "nominal",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Nominal Bayar",
            },
            {
                accessorKey: "total_pembayaran",
                id: "total_pembayaran",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Total Goro",
            },
        ],
        []
    );

    useEffect(() => {
        if (triggerId === null) {
            return;
        }

        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("goroumrah.requestUnitTransaction"),
                    {
                        params: {
                            branch_id: triggerId,
                            bulan: server_filter.bulan,
                        },
                        signal: controller.signal,
                    }
                );
                // console.log();
                setData(response.data.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    setError(error);
                    setLoading(false);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function to abort the request if triggerId changes
        return () => {
            controller.abort();
        };
    }, [triggerId]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    return (
        <div className="p-3">
            <Table className="border shadow lg:text-sm text-xs ">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="text-center"
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
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan="3">
                                SILAHKAN TUNGGU DATA MASIH DIMUAT
                            </TableCell>
                        </TableRow>
                    ) : table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row, i) => (
                            <React.Fragment key={row.id}>
                                <TableRow key={row.id} id={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={
                                                cell.column.columnDef.className
                                            }
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </React.Fragment>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="3">
                                Belum Ada Data Pembayaran Goro Umrah
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailPerUnitGoro;
