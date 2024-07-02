import React, { useEffect, useMemo, useRef, useState } from "react";
import FormatNumbering from "@/Components/FormatNumbering";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
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

import { FaPlay } from "react-icons/fa6";

const DetailKasbon = ({ triggerId }) => {
    const { server_filter } = usePage().props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewTr, setShowNewTr] = useState();

    const [totals, setTotals] = useState({
        totalPinjaman: 0,
        totalPembayaran: 0,
    });

    const getThisParentTr = (id) => {
        setShowNewTr((prevId) => (prevId === id ? null : id));
    };

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, item) => {
                acc.totalPinjaman += item.pinjaman || 0;
                acc.totalPembayaran += item.bayar || 0;

                return acc;
            },
            {
                totalPinjaman: 0,
                totalPembayaran: 0,
            }
        );
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
                footer: "Total",
                header: () => "Tanggal Transaksi",
            },
            {
                accessorKey: "pinjaman",
                id: "pinjaman",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "",
                footer: (info) => (
                    <FormatNumbering value={totals.totalPinjaman} />
                ),
            },
            {
                accessorKey: "bayar",
                id: "bayar",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "",
                footer: (info) => (
                    <FormatNumbering value={totals.totalPembayaran} />
                ),
            },
            {
                accessorKey: "sisa",
                id: "sisa",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "",
            },
        ],
        [totals]
    );

    useEffect(() => {
        if (triggerId === null) {
            return;
        }

        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("goroumrah.requestPinjamanUnit"),
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
                const newTotal = calculateTotals(response.data.data);
                setTotals(newTotal);
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
        <div className="max-h-[40vh] overflow-auto">
            <Table className="lg:text-sm text-xs bg-gray-50">
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
                            <TableCell colSpan="4">
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
                                            className={`w-1/4 ${cell.column.columnDef.className}`}
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
                            <TableCell colSpan="4">
                                Belum Ada Data Pembayaran Goro Umrah
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    {table.getFooterGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="text-center bg-white text-blue-600 py-5"
                                    >
                                        {flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableFooter>
            </Table>
        </div>
    );
};

export default DetailKasbon;
