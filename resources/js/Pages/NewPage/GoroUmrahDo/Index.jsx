import Card from "@/Components/Card";
import FormatNumbering from "@/Components/FormatNumbering";
import Search from "@/Components/Search";
import Authenticated from "@/Layouts/AuthenticatedLayout";
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
import { FaPlay } from "react-icons/fa6";
import dayjs from "dayjs";
import Create from "./Components/Create";
import DetailDo from "./Components/DetailDo";

const Index = ({ datas, unit_show, ...props }) => {
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
                acc.totalBefore += item.sum_nominal_before || 0;
                acc.totalOn += item.sum_nominal_on || 0;
                acc.totalAfter += item.total_pembayaran || 0;

                return acc;
            },
            {
                totalBefore: 0,
                totalOn: 0,
                totalAfter: 0,
            }
        );
    };

    const totals = calculateTotals(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: "unit",
                id: "collapse",
                cell: (info) => info.getValue(),
                header: () => "Unit",
                footer: (info) => <div>Total Keseluruhan</div>,
            },
            {
                accessorKey: "sum_nominal_on",
                id: "sum_nominal_on",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => `Pembayaran Bln ${bulan}`,
                footer: (info) => <FormatNumbering value={totals.totalOn} />,
            },
            {
                accessorKey: "total_pembayaran",
                id: "total_pembayaran",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Total Stor DO",
                footer: (info) => <FormatNumbering value={totals.totalAfter} />,
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // create parameters
    const [creatingBrachId, setCreatingBrachId] = useState();
    const [creatingBrach, setCreatingBrach] = useState();
    const [creatingWilayah, setCreatingWilayah] = useState();
    const [isCreateOpened, setIsCreateOpened] = useState(false);

    const openCreateDrawer = (id, unit, will) => {
        setIsCreateOpened(true);
        setCreatingBrachId(id);
        setCreatingBrach(unit);
        setCreatingWilayah(will);
    };
    const closedCreateDrawer = (id) => {
        setIsCreateOpened(false);
        setCreatingBrachId(null);
        setCreatingBrach(null);
    };

    useEffect(() => {
        getThisParentTr(parseInt(unit_show?.branch));
    }, []);

    return (
        <Authenticated loading={loading}>
            <Card judul="Stor DO Goro Umrah">
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
                                urlLink={route("goroumrah.goro_do")}
                                localState={"goroumrah_goro_do"}
                                availableMonth={true}
                            ></Search>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <div className="overflow-auto rounded-lg shadow">
                    <Table className="border text-xs">
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
                                                  showNewTr == row.original.id
                                                      ? `border-b-0`
                                                      : ``
                                              }`}
                                          >
                                              {row
                                                  .getVisibleCells()
                                                  .map((cell) => (
                                                      <TableCell
                                                          key={cell.id}
                                                          className={`${cell.column.columnDef.className} w-1/4`}
                                                      >
                                                          {cell.column.id ==
                                                          "collapse" ? (
                                                              <div className="flex w-full items-center justify-center gap-3">
                                                                  <button
                                                                      onClick={() =>
                                                                          getThisParentTr(
                                                                              row
                                                                                  .original
                                                                                  .id
                                                                          )
                                                                      }
                                                                      className={`flex justify-center items-start hover:text-roman-500 ${
                                                                          showNewTr ==
                                                                          row
                                                                              .original
                                                                              .id
                                                                              ? `rotate-90 text-roman-500`
                                                                              : ""
                                                                      } `}
                                                                  >
                                                                      <FaPlay />
                                                                  </button>

                                                                  <button
                                                                      className={`px-2 py-1 text-xs border border-gray-400 rounded hover:bg-gray-500 hover:text-white ${
                                                                          showNewTr ==
                                                                          row
                                                                              .original
                                                                              .id
                                                                              ? `bg-gray-400 text-white font-semibold`
                                                                              : ""
                                                                      }`}
                                                                      onClick={() =>
                                                                          openCreateDrawer(
                                                                              row
                                                                                  .original
                                                                                  .id,
                                                                              row
                                                                                  .original
                                                                                  .unit,
                                                                              row
                                                                                  .original
                                                                                  .wilayah
                                                                          )
                                                                      }
                                                                  >
                                                                      {flexRender(
                                                                          cell
                                                                              .column
                                                                              .columnDef
                                                                              .cell,
                                                                          cell.getContext()
                                                                      )}
                                                                  </button>
                                                              </div>
                                                          ) : showNewTr ==
                                                            row.original.id ? (
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
                                          {showNewTr == row.original.id && (
                                              <>
                                                  <TableRow
                                                      key={`newrow${row.id}`}
                                                      className="p-0 hover:bg-transparent"
                                                  >
                                                      <TableCell
                                                          colSpan="4"
                                                          className="p-0 border-0"
                                                      >
                                                          <DetailDo
                                                              triggerId={
                                                                  showNewTr
                                                              }
                                                          />
                                                      </TableCell>
                                                  </TableRow>
                                              </>
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
            <Create
                open={isCreateOpened}
                onClosed={closedCreateDrawer}
                triggeredId={creatingBrachId}
                triggeredBranch={creatingBrach}
                triggeredWilayah={creatingWilayah}
            />
        </Authenticated>
    );
};

export default Index;
