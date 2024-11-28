import { Link, usePage } from "@inertiajs/react";
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
import FormatNumbering from "@/Components/FormatNumbering";
import Create from "../Create";

const TabelUnit = ({ triggeredWilayah, loading, setLoading }) => {
    const { batch_datas } = usePage().props;
    // console.log(batch_datas);
    const [data, setData] = useState([]);

    const [onOpenCreate, setOnOpenCreate] = useState(false);
    const [triggeredBranchId, setTriggeredBranchId] = useState("");
    const [triggeredBranch, setTriggeredBranch] = useState("");
    const handleOpenCreate = (id, branch) => {
        setOnOpenCreate(true);
        setTriggeredBranchId(id);
        setTriggeredBranch(branch);
    };
    const handleCloseCreate = (e) => {
        setOnOpenCreate(false);
        setTriggeredBranch("");
    };

    useEffect(() => {
        const filtered = batch_datas.filter(
            (item) => item.wilayah == triggeredWilayah
        )?.[0]?.data;
        setData(filtered);
    }, [triggeredWilayah, batch_datas]);

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, item) => {
                acc.total += item.total || 0;

                return acc;
            },
            {
                total: 0,
            }
        );
    };

    const totals = calculateTotals(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: "button_type",
                id: "button_type",
                type: "action",
                cell: (info) => info.getValue(),
                header: () => "Action",
            },
            {
                accessorKey: "unit",
                id: "unit",
                cell: (info) => info.getValue(),
                header: () => "Unit",
            },
            {
                accessorKey: "total",
                id: "total",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Total",
                footer: (info) => (
                    <FormatNumbering value={totals.totalNominal} />
                ),
            },
            {
                accessorKey: "tanggungan",
                id: "tanggungan",
                cell: (info) => info.getValue(),
                header: () => "Keterangan",
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
        <Table className="border">
            <Create
                branch={triggeredBranch}
                branchId={triggeredBranchId}
                open={onOpenCreate}
                onClosed={handleCloseCreate}
            />
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup, i) => (
                    <TableRow key={i}>
                        {headerGroup.headers.map((header, i) => {
                            return (
                                <TableHead key={i} className="text-center">
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
                                  {row.getVisibleCells().map((cell, i) => (
                                      <TableCell
                                          key={i}
                                          className={
                                              cell.column.columnDef.className
                                          }
                                      >
                                          {cell.column.columnDef.type ==
                                          "action" ? (
                                              <div className="flex items-center justify-center-center">
                                                  <div className="w-full">
                                                      {flexRender(
                                                          cell.row.original
                                                              .button_type
                                                      ) == 2 ? (
                                                          <button
                                                              onClick={() =>
                                                                  handleOpenCreate(
                                                                      cell.row
                                                                          .original
                                                                          .branch_id,
                                                                      cell.row
                                                                          .original
                                                                          .unit
                                                                  )
                                                              }
                                                              className="px-2 py-1 text-white bg-green-500 rounded-lg"
                                                          >
                                                              Baru
                                                          </button>
                                                      ) : flexRender(
                                                            cell.row.original
                                                                .button_type
                                                        ) == 3 ? (
                                                          <Link
                                                              href={route(
                                                                  "unitsaving.savingdetails",
                                                                  cell.row
                                                                      .original
                                                                      .id
                                                              )}
                                                              className="px-2 py-1 text-white bg-gray-500 rounded-lg"
                                                          >
                                                              Tutup
                                                              {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                                          </Link>
                                                      ) : flexRender(
                                                            cell.row.original
                                                                .button_type
                                                        ) == 4 ? (
                                                          <div className="px-2 py-1 rounded-lg">
                                                              Non Aktif
                                                              {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                                          </div>
                                                      ) : flexRender(
                                                            cell.row.original
                                                                .button_type
                                                        ) == 1 ? (
                                                          <Link
                                                              href={route(
                                                                  "unitsaving.savingdetails",
                                                                  cell.row
                                                                      .original
                                                                      .id
                                                              )}
                                                              className="px-2 py-1 text-white bg-indigo-500 rounded-lg"
                                                          >
                                                              Setor
                                                              {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                                          </Link>
                                                      ) : flexRender(
                                                            cell.row.original
                                                                .button_type
                                                        ) == 5 ? (
                                                          <Link
                                                              href={route(
                                                                  "unitsaving.savingdetails",
                                                                  cell.row
                                                                      .original
                                                                      .id
                                                              )}
                                                              className="px-2 py-1 text-white rounded-lg bg-amber-500"
                                                          >
                                                              Nihil
                                                              {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                                          </Link>
                                                      ) : (
                                                          "invalid"
                                                      )}

                                                      {/* {flexRender(
                                                          cell.row.original
                                                              .button_type
                                                      ) == 1 ? (
                                                          <button
                                                              className="p-2 text-white bg-red-500 rounded"
                                                              onClick={() =>
                                                                  handleOpenCreate(
                                                                      cell.row
                                                                          .original
                                                                          .branch_id
                                                                  )
                                                              }
                                                          >
                                                              <FaTrash />
                                                          </button>
                                                      ) : (
                                                          "2"
                                                      )} */}
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
    );
};

export default TabelUnit;
