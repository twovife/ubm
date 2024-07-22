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

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import axios from "axios";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import DetailPerUnitGoro from "./DetailPerUnitGoro";
import { usePage } from "@inertiajs/react";
import Create from "./Create";

const DetailGoro = ({ triggerId }) => {
    const { server_filter } = usePage().props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewTr, setShowNewTr] = useState();
    const [totals, setTotals] = useState({
        totalNominal: 0,
        totalPembayaran: 0,
    });

    // create parameters
    const [creatingBrachId, setCreatingBrachId] = useState();
    const [creatingBrach, setCreatingBrach] = useState();
    const [isCreateOpened, setIsCreateOpened] = useState(false);

    const openCreateDrawer = (id, unit) => {
        setIsCreateOpened(true);
        setCreatingBrachId(id);
        setCreatingBrach(unit);
    };
    const closedCreateDrawer = (id) => {
        setIsCreateOpened(false);
        setCreatingBrachId(null);
        setCreatingBrach(null);
    };

    const getThisParentTr = (id) => {
        setShowNewTr((prevId) => (prevId === id ? null : id));
    };

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, item) => {
                acc.totalNominal += item.sum_nominal_on || 0;
                acc.totalPembayaran += item.total_pembayaran || 0;

                return acc;
            },
            {
                totalNominal: 0,
                totalPembayaran: 0,
            }
        );
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "unit",
                id: "collapse",
                cell: (info) => info.getValue(),
                header: () => "Unit",
                className: "lg:w-64 whitespace-nowrap w-auto",
                footer: (info) => `TTL Wil ${triggerId}`,
            },
            {
                accessorKey: "sum_nominal_on",
                id: "sum_nominal_on",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Nominal",
                footer: (info) => (
                    <FormatNumbering value={totals.totalNominal} />
                ),
            },
            {
                accessorKey: "total_pembayaran",
                id: "total_pembayaran",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Saldo",
                footer: (info) => (
                    <FormatNumbering value={totals.totalPembayaran} />
                ),
            },
            {
                accessorKey: "sisa_goro",
                id: "sisa_goro",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Sisa",
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
                    route("goroumrah.requestWilayahTransaction"),
                    {
                        params: {
                            wilayah: triggerId,
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
        <div>
            <Table className="text-xs lg:text-sm">
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
                                <TableRow
                                    key={row.id}
                                    id={row.id}
                                    className={`${
                                        showNewTr == row.original.unit_id
                                            ? "bg-gray-100 hover:bg-gray-200"
                                            : ""
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`${cell.column.columnDef.className}`}
                                        >
                                            {cell.column.id == "collapse" ? (
                                                <div className="flex justify-center items-center gap-2">
                                                    <div className="flex-none lg:w-1/2 flex justify-end items-center">
                                                        <button
                                                            onClick={() =>
                                                                getThisParentTr(
                                                                    row.original
                                                                        .unit_id
                                                                )
                                                            }
                                                            className={`flex justify-center items-start hover:text-roman-500 ${
                                                                showNewTr ==
                                                                row.original
                                                                    .unit_id
                                                                    ? `rotate-90 text-roman-500`
                                                                    : ""
                                                            } `}
                                                        >
                                                            <FaPlay />
                                                        </button>
                                                    </div>
                                                    <div className="grow w-auto flex items-center justify-start">
                                                        <button
                                                            onClick={() =>
                                                                openCreateDrawer(
                                                                    row.original
                                                                        .unit_id,
                                                                    row.original
                                                                        .unit
                                                                )
                                                            }
                                                            className="px-2 py-1 text-xs border border-gray-400 rounded hover:bg-gray-400 hover:text-white"
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {showNewTr == row.original.unit_id && (
                                    <TableRow
                                        key={`newrow${row.id}`}
                                        className="p-0 hover:bg-transparent"
                                    >
                                        <TableCell
                                            colSpan="5"
                                            className="p-0 border-0"
                                        >
                                            <DetailPerUnitGoro
                                                triggerId={showNewTr}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))
                    ) : null}
                </TableBody>
                <TableFooter>
                    {table.getFooterGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="text-center bg-blue-400 text-black"
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
            <Create
                open={isCreateOpened}
                onClosed={closedCreateDrawer}
                triggeredId={creatingBrachId}
                triggeredBranch={creatingBrach}
            />
        </div>
    );
};

export default DetailGoro;
