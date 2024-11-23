import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/Search";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import Outcome from "./Outcome";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import FormatNumbering from "@/Components/FormatNumbering";
import { FaTrash } from "react-icons/fa6";
import DeleteDialogContent from "@/Components/DeleteDialogContent";

const Dashboard = ({ server_filter, datas, saldo_akhir, ...props }) => {
    const [loading, setLoading] = useState(false);
    // const { filter, removeFilter, returnedData, totals } = useFilter(
    //     datas,
    //     10000,
    //     "1juta_transaksi"
    // );

    const [data, setData] = useState(() => datas);
    useEffect(() => {
        setData(datas);
    }, [datas]);

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, item) => {
                acc.saldo += item.saldo || 0;
                acc.debit += item.debit || 0;
                acc.kredit += item.kredit || 0;
                acc.bop += item.bop || 0;

                return acc;
            },
            {
                saldo: 0,
                debit: 0,
                kredit: 0,
                bop: 0,
            }
        );
    };

    const totals = calculateTotals(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: "deletable",
                id: "deletable",
                type: "action",
                cell: (info) => info.getValue(),
                header: () => "Action",
            },
            {
                accessorKey: "transaction_date",
                id: "transaction_date",
                cell: (info) => (
                    <div className="text-center">
                        {dayjs(info.getValue()).format("DD-MM-YY")}
                    </div>
                ),
                header: () => "Tanggal",
            },
            {
                accessorKey: "type_transaksi",
                id: "type_transaksi",
                cell: (info) => info.getValue(),
                header: () => "Keterangan",
            },
            {
                accessorKey: "wilayah",
                id: "wilayah",
                cell: (info) => info.getValue(),
                header: () => "Wilayah",
            },
            {
                accessorKey: "unit",
                id: "unit",
                cell: (info) => info.getValue(),
                header: () => "Unit",
            },
            {
                accessorKey: "nama_karyawan",
                id: "nama_karyawan",
                cell: (info) => info.getValue(),
                header: () => "Nama Karyawan",
            },
            {
                accessorKey: "bop",
                id: "bop",
                className: "bg-green-100",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "TB 1JT",
                footer: (info) => <FormatNumbering value={totals.bop} />,
            },
            {
                accessorKey: "debit",
                id: "debit",
                className: "bg-green-200",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Debit",
                footer: (info) => <FormatNumbering value={totals.debit} />,
            },
            {
                accessorKey: "kredit",
                id: "kredit",
                className: "bg-red-100",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Kredit",
                footer: (info) => <FormatNumbering value={totals.kredit} />,
            },
            {
                accessorKey: "saldo",
                id: "saldo",
                className: "bg-blue-100",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Saldo",
                footer: (info) => <FormatNumbering value={saldo_akhir} />,
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const [showMutasi, setShowMutasi] = useState(false);
    const showMutasiHandler = (e) => {
        setShowMutasi(true);
    };
    const hideMutasiHandler = (e) => {
        setShowMutasi(false);
    };

    const [onOpenDelete, setOnOpenDelete] = useState(false);
    const [triggeredDeletedId, setTriggeredDeletedId] = useState("");
    const handleOpenDelete = (id) => {
        setOnOpenDelete(true);
        setTriggeredDeletedId(route("unitsaving.delete_mutasi", id));
    };
    const handleCloseDelete = (e) => {
        setOnOpenDelete(false);
    };

    return (
        <Authenticated loading={loading}>
            <Outcome open={showMutasi} onClosed={hideMutasiHandler} />
            <Card judul="Buku Transaksi 1JT">
                <Card.subTitle>
                    <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
                        <Card.startContent
                            className={`flex-wrap mb-3 lg:mb-0`}
                        ></Card.startContent>
                        <Card.endContent className={`flex-wrap`}>
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("unitsaving.dashboard")}
                                localState={"1juta_transaksi"}
                                availableMonth={true}
                            >
                                <PrimaryButton
                                    onClick={showMutasiHandler}
                                    title={'Lain"'}
                                    size={"sm"}
                                    type="button"
                                    className="block whitespace-nowrap"
                                    theme="primary"
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
                                      <TableRow key={i} className="text-center">
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
                                                          <div className="flex items-center justify-center">
                                                              <div>
                                                                  {flexRender(
                                                                      cell.row
                                                                          .original
                                                                          .deletable
                                                                  ) ==
                                                                  "true" ? (
                                                                      <button
                                                                          className="p-2 text-white bg-red-500 rounded"
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
                                            className="text-center text-black bg-gray-100"
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
                <DeleteDialogContent
                    open={onOpenDelete}
                    onClosed={handleCloseDelete}
                    url={triggeredDeletedId}
                />
            </Card>
        </Authenticated>
    );
};

export default Dashboard;
