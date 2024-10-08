import LinkButton from "@/Components/LinkButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";
import Card from "@/Components/Card";
import Search from "@/Components/Search";
import useFilter from "@/Hooks/useFilter";
import DefaultTable from "@/Components/DefaultTable";
import TabelUnit from "./Components/TabelUnit";
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

const Index = ({ branch, server_filters, datas, batch_datas, ...props }) => {
    const [loading, setLoading] = useState(false);

    const [activeTab, setActiveTab] = useState(batch_datas[0]?.wilayah ?? null); // Mengatur tab pertama sebagai aktif
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const [data, setData] = useState(() => datas);
    useEffect(() => {
        setData(datas);
    }, [datas]);

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
                accessorKey: "wilayah",
                id: "wilayah",
                cell: (info) => info.getValue(),
                header: () => "Wilayah",
            },
            {
                accessorKey: "total",
                id: "total",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Total",
                footer: (info) => <FormatNumbering value={totals.total} />,
            },
            {
                accessorKey: "last_month_payment",
                id: "last_month_payment",
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
        <Authenticated loading={loading}>
            <Card judul="Tabungan 1JT Unit">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.startContent
                            className={`flex-wrap mb-3 lg:mb-0`}
                        ></Card.startContent>
                        <Card.endContent className={`flex-wrap`}>
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("unitsaving.index")}
                                localState={"unitsaving_index"}
                                availableMonth={true}
                            ></Search>
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
                                                          <div className="flex items-center justify-center-center">
                                                              <div className="w-full">
                                                                  {flexRender(
                                                                      cell.row
                                                                          .original
                                                                          .button_type
                                                                  ) == 2 ? (
                                                                      <button
                                                                          onClick={() =>
                                                                              handleOpenCreate(
                                                                                  cell
                                                                                      .row
                                                                                      .original
                                                                                      .branch_id,
                                                                                  cell
                                                                                      .row
                                                                                      .original
                                                                                      .unit
                                                                              )
                                                                          }
                                                                          className="px-2 py-1 rounded-lg bg-green-500 text-white"
                                                                      >
                                                                          Baru
                                                                      </button>
                                                                  ) : flexRender(
                                                                        cell.row
                                                                            .original
                                                                            .button_type
                                                                    ) == 3 ? (
                                                                      <Link
                                                                          href={route(
                                                                              "unitsaving.savingdetails",
                                                                              cell
                                                                                  .row
                                                                                  .original
                                                                                  .id
                                                                          )}
                                                                          className="px-2 py-1 rounded-lg bg-gray-500 text-white"
                                                                      >
                                                                          Tutup
                                                                          {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                                                      </Link>
                                                                  ) : flexRender(
                                                                        cell.row
                                                                            .original
                                                                            .button_type
                                                                    ) == 4 ? (
                                                                      <div className="px-2 py-1 rounded-lg">
                                                                          Non
                                                                          Aktif
                                                                          {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                                                      </div>
                                                                  ) : flexRender(
                                                                        cell.row
                                                                            .original
                                                                            .button_type
                                                                    ) == 1 ? (
                                                                      <Link
                                                                          href={route(
                                                                              "unitsaving.savingdetails",
                                                                              cell
                                                                                  .row
                                                                                  .original
                                                                                  .id
                                                                          )}
                                                                          className="px-2 py-1 rounded-lg bg-indigo-500 text-white"
                                                                      >
                                                                          Setor
                                                                          {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                                                      </Link>
                                                                  ) : flexRender(
                                                                        cell.row
                                                                            .original
                                                                            .button_type
                                                                    ) == 5 ? (
                                                                      <Link
                                                                          href={route(
                                                                              "unitsaving.savingdetails",
                                                                              cell
                                                                                  .row
                                                                                  .original
                                                                                  .id
                                                                          )}
                                                                          className="px-2 py-1 rounded-lg bg-amber-500 text-white"
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
                                                              className="bg-red-500 text-white rounded p-2"
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
            <Card judul="Wilayah">
                <div className="w-full">
                    {batch_datas.length > 0 ? (
                        <>
                            <ul className="tab-list flex justify-start gap-3 flex-wrap">
                                {batch_datas.map((item) => (
                                    <li
                                        key={item.wilayah}
                                        className={`tab ${
                                            activeTab === item.wilayah
                                                ? "active bg-main-400 ring-2 ring-main-500"
                                                : ""
                                        } px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`}
                                        onClick={() =>
                                            handleTabClick(item.wilayah)
                                        }
                                    >
                                        {item.wilayah}
                                    </li>
                                ))}
                            </ul>
                            <div className="tab-content mt-3">
                                {batch_datas.map((item) => (
                                    <div
                                        key={item.wilayah}
                                        className={
                                            activeTab === item.wilayah
                                                ? "active"
                                                : "hidden"
                                        }
                                    >
                                        <TabelUnit
                                            triggeredWilayah={item.wilayah}
                                            loading={loading}
                                            setLoading={setLoading}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>Belum ada data yang di input di wilayah ini</div>
                    )}
                </div>
            </Card>
        </Authenticated>
    );
};

export default Index;
