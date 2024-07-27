import ButtonWrapper from "@/Components/ButtonWrapper";
import Card from "@/Components/Card";
import FormatNumbering from "@/Components/FormatNumbering";
import LinkButton from "@/Components/LinkButton";
import Search from "@/Components/Search";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/shadcn/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
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

import React, { useEffect, useMemo, useState } from "react";
import DetailGoro from "./Components/DetailGoro";
import { FaPlay } from "react-icons/fa6";
import dayjs from "dayjs";

const Index = ({ datas, ...props }) => {
    const bulan = dayjs(props.server_filter.bulan).format("MMM");
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(() => datas);
    useEffect(() => {
        setData(datas);
    }, [datas]);

    const [showNewTr, setShowNewTr] = useState();

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

    const totals = calculateTotals(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: "wilayah",
                id: "collapse",
                cell: (info) => info.getValue(),
                header: () => "Wilayah",
            },
            {
                accessorKey: "sum_nominal_on",
                id: "sum_nominal_on",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => `Bulan ${bulan}`,
                footer: (info) => (
                    <FormatNumbering value={totals.totalNominal} />
                ),
            },
            {
                accessorKey: "total_pembayaran",
                id: "total_pembayaran",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Total Goro",
                footer: (info) => (
                    <FormatNumbering value={totals.totalPembayaran} />
                ),
            },
            {
                accessorKey: "sisa_goro",
                id: "sisa_goro",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Sisa Goro",
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        getThisParentTr(parseInt(props.wilayah_show.wilayah));
    }, []);

    // console.log(table.getRowModel().rows[0].getVisibleCells()[1]);
    return (
        <Authenticated loading={loading}>
            <Card judul="Goro Umrah">
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
                                urlLink={route("goroumrah.goro_index")}
                                localState={"goroumrah_goro_index"}
                                availableMonth={true}
                            ></Search>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <div className="overflow-auto rounded-lg shadow">
                    <Table className="border">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${
                                                    showNewTr
                                                        ? "text-transparent"
                                                        : ""
                                                }`}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
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
                                          <TableRow
                                              key={row.id}
                                              id={row.id}
                                              className={`${
                                                  showNewTr == row.id
                                                      ? `border-b-0 bg-green-100`
                                                      : ``
                                              }`}
                                          >
                                              {row
                                                  .getVisibleCells()
                                                  .map((cell) => (
                                                      <TableCell
                                                          key={cell.id}
                                                          className={
                                                              cell.column
                                                                  .columnDef
                                                                  .className
                                                          }
                                                      >
                                                          {cell.column.id ==
                                                          "collapse" ? (
                                                              <div className="flex w-full items-center justify-center gap-3">
                                                                  <button
                                                                      onClick={() =>
                                                                          getThisParentTr(
                                                                              row.id
                                                                          )
                                                                      }
                                                                      className={`flex justify-center items-start hover:text-roman-500 ${
                                                                          showNewTr ==
                                                                          row.id
                                                                              ? `rotate-90 text-roman-500`
                                                                              : ""
                                                                      } `}
                                                                  >
                                                                      <FaPlay />
                                                                  </button>
                                                                  <div>
                                                                      {flexRender(
                                                                          cell
                                                                              .column
                                                                              .columnDef
                                                                              .cell,
                                                                          cell.getContext()
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          ) : showNewTr ==
                                                            row.id ? (
                                                              ""
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
                                          {showNewTr == row.id && (
                                              <TableRow
                                                  key={`newrow${row.id}`}
                                                  className="p-0 hover:bg-transparent"
                                              >
                                                  <TableCell
                                                      colSpan="4"
                                                      className="p-0 border-0"
                                                  >
                                                      <DetailGoro
                                                          triggerId={showNewTr}
                                                      />
                                                  </TableCell>
                                              </TableRow>
                                          )}
                                      </React.Fragment>
                                  ))
                                : null}
                        </TableBody>
                        {showNewTr ? (
                            ""
                        ) : (
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
                                                        header.column.columnDef
                                                            .footer,
                                                        header.getContext()
                                                    )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableFooter>
                        )}
                    </Table>
                </div>
            </Card>
        </Authenticated>
    );
};

export default Index;
