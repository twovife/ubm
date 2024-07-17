import ButtonWrapper from "@/Components/ButtonWrapper";
import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
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
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import FormatNumbering from "@/Components/FormatNumbering";
import Search from "@/Components/Search";
import CreateTransaksi from "./Components/CreateTransaksi";

const Transaksi = ({ datas, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(() => datas);

    const [onOpenCreate, setOnOpenCreate] = useState(false);
    const handleOpenCreate = (e) => {
        setOnOpenCreate(true);
    };
    const handleCloseCreate = (e) => {
        setOnOpenCreate(false);
    };

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, item) => {
                acc.totalDebit += item.debit || 0;
                acc.totalKredit += item.kredit || 0;

                return acc;
            },
            {
                totalDebit: 0,
                totalKredit: 0,
            }
        );
    };

    const totals = calculateTotals(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: "bulan",
                id: "bulan",
                cell: (info) => (
                    <div className="text-center">{info.getValue()}</div>
                ),
                header: () => "Bulan",
            },

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
                accessorKey: "unit",
                id: "unit",
                cell: (info) => (
                    <div className="text-center">{info.getValue()}</div>
                ),
                header: () => "Unit",
            },
            {
                accessorKey: "keterangan",
                id: "keterangan",
                cell: (info) => (
                    <div className="text-center">{info.getValue()}</div>
                ),
                header: () => "Keterangan",
            },
            {
                accessorKey: "debit",
                id: "debit",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Debit",
                footer: (info) => <FormatNumbering value={totals.totalDebit} />,
            },
            {
                accessorKey: "kredit",
                id: "kredit",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Kredit",
                footer: (info) => (
                    <FormatNumbering value={totals.totalKredit} />
                ),
            },
            {
                accessorKey: "saldo",
                id: "saldo",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Saldo",
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Authenticated>
            <Card judul="Transaksi Goro">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.startContent className={`flex-wrap mb-3 lg:mb-0`}>
                            {/* <Card.filterItem
                                filter={filter}
                                removeFilter={removeFilter}
                            /> */}
                        </Card.startContent>
                        <Card.endContent className={`flex-wrap`}>
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("goroumrah.goro_transaksi")}
                                localState={"goroumrah_goro_transaksi"}
                                availableMonth={true}
                            >
                                <PrimaryButton
                                    onClick={handleOpenCreate}
                                    theme="green"
                                    title={"Create"}
                                />
                            </Search>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <Table className="border">
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
                        {table.getRowModel().rows.length
                            ? table.getRowModel().rows.map((row, i) => (
                                  <React.Fragment key={row.id}>
                                      <TableRow key={row.id} id={row.id}>
                                          {row.getVisibleCells().map((cell) => (
                                              <TableCell
                                                  key={cell.id}
                                                  className={
                                                      cell.column.columnDef
                                                          .className
                                                  }
                                              >
                                                  {flexRender(
                                                      cell.column.columnDef
                                                          .cell,
                                                      cell.getContext()
                                                  )}
                                              </TableCell>
                                          ))}
                                      </TableRow>
                                  </React.Fragment>
                              ))
                            : null}
                    </TableBody>
                    <TableFooter>
                        {table.getFooterGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-center bg-gray-100 text-black"
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
            </Card>
            <CreateTransaksi open={onOpenCreate} onClosed={handleCloseCreate} />
        </Authenticated>
    );
};

export default Transaksi;
