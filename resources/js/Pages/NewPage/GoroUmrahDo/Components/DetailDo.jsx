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

const DetailDo = ({ triggerId }) => {
    const { server_filter, datas } = usePage().props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewTr, setShowNewTr] = useState();

    const [totals, setTotals] = useState({
        totalPinjaman: 0,
        totalPembayaran: 0,
    });

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, item) => {
                acc.totalNominal += item.nominal || 0;

                return acc;
            },
            {
                totalNominal: 0,
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
                accessorKey: "nominal",
                id: "nominal",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Pembayaran",
                footer: (info) => (
                    <FormatNumbering value={totals.totalNominal} />
                ),
            },
            {
                accessorKey: "total_pembayaran",
                id: "total_pembayaran",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Total Stor DO",
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
                    route("goroumrah.requestDoUnit"),
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
    }, [triggerId, datas]);

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
            <Table className="text-xs lg:text-sm">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-gray-100">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="text-center "
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
                                        className="py-5 text-center text-blue-600 bg-gray-100"
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

export default DetailDo;
