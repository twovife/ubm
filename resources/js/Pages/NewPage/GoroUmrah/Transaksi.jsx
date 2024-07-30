import ButtonWrapper from "@/Components/ButtonWrapper";
import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useMemo, useState } from "react";
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
import { FaTrash } from "react-icons/fa6";
import DeleteTransaksi from "./Components/DeleteTransaksi";
import { router } from "@inertiajs/react";

const Transaksi = ({ datas, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(() => datas);
    useEffect(() => {
        setData(datas);
    }, [datas]);

    console.log(data.length);

    const [onOpenCreate, setOnOpenCreate] = useState(false);
    const handleOpenCreate = (e) => {
        setOnOpenCreate(true);
    };
    const handleCloseCreate = (e) => {
        setOnOpenCreate(false);
    };

    const [onOpenDelete, setOnOpenDelete] = useState(false);
    const [triggeredDeletedId, setTriggeredDeletedId] = useState("");
    const handleOpenDelete = (id) => {
        setOnOpenDelete(true);
        setTriggeredDeletedId(id);
    };
    const handleCloseDelete = (e) => {
        setOnOpenDelete(false);
    };

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, item) => {
                acc.debitGoro += item.debit_goro || 0;
                acc.totalDebit += item.debit || 0;
                acc.totalKredit += item.kredit || 0;

                return acc;
            },
            {
                debitGoro: 0,
                totalDebit: 0,
                totalKredit: 0,
            }
        );
    };

    const totals = calculateTotals(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: "transaction",
                id: "transaction",
                type: "action",
                cell: (info) => info.getValue(),
                header: () => "Type",
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
                accessorKey: "debit_goro",
                id: "debit_goro",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Debit Goro",
                footer: (info) => <FormatNumbering value={totals.debitGoro} />,
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
                        {table.getHeaderGroups().map((headerGroup, i) => (
                            <TableRow key={i}>
                                {headerGroup.headers.map((header, i) => {
                                    return (
                                        <TableHead
                                            key={i}
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
                                  <React.Fragment key={i}>
                                      <TableRow key={i}>
                                          {row
                                              .getVisibleCells()
                                              .map((cell, i) => (
                                                  <TableCell
                                                      key={i}
                                                      className={
                                                          cell.column.columnDef
                                                              .className
                                                      }
                                                  >
                                                      {cell.column.columnDef
                                                          .type == "action" ? (
                                                          <div className="flex gap-2 items-center">
                                                              <div className="flex-1 text-end">
                                                                  {flexRender(
                                                                      cell.row
                                                                          .original
                                                                          .transaction
                                                                  ) ==
                                                                  "LAIN" ? (
                                                                      <button
                                                                          className="bg-red-500 text-white rounded p-2"
                                                                          onClick={() =>
                                                                              handleOpenDelete(
                                                                                  cell
                                                                                      .row
                                                                                      .original
                                                                                      .id
                                                                              )
                                                                          }
                                                                      >
                                                                          <FaTrash />
                                                                      </button>
                                                                  ) : (
                                                                      ""
                                                                  )}
                                                              </div>
                                                              <div className="flex-1 text-start">
                                                                  {flexRender(
                                                                      cell
                                                                          .column
                                                                          .columnDef
                                                                          .cell,
                                                                      cell.getContext()
                                                                  )}
                                                              </div>
                                                          </div>
                                                      ) : (
                                                          flexRender(
                                                              cell.column
                                                                  .columnDef
                                                                  .cell,
                                                              cell.getContext()
                                                          )
                                                      )}
                                                  </TableCell>
                                              ))}
                                      </TableRow>
                                  </React.Fragment>
                              ))
                            : null}
                    </TableBody>
                    <TableFooter>
                        {table.getFooterGroups().map((headerGroup, i) => (
                            <TableRow key={i}>
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
            <DeleteTransaksi
                open={onOpenDelete}
                onClosed={handleCloseDelete}
                triggeredId={triggeredDeletedId}
            />
        </Authenticated>
    );
};

export default Transaksi;
