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
import DetailKasbon from "./Components/DetailKasbon";
import Create from "./Components/Create";
import ButtonWrapper from "@/Components/ButtonWrapper";
import PrimaryButton from "@/Components/PrimaryButton";
import CreateNew from "./Components/CreteNew";

const Index = ({ datas, ...props }) => {
    const bulan = dayjs(props.server_filter.bulan).format("MMM");
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(() => datas);
    useEffect(() => {
        setData(datas);
    }, [datas]);

    const [showNewTr, setShowNewTr] = useState();

    const getThisParentTr = (id) => {
        // console.log(id);
        setShowNewTr((prevId) => (prevId === id ? null : id));
    };

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, item) => {
                acc.totalPinjaman += item.total_pinjaman || 0;
                acc.totalPembayaran += item.bayar_on || 0;
                acc.totalSisa += item.sisa || 0;
                acc.totalBayar += item.total_bayar || 0;

                return acc;
            },
            {
                totalPinjaman: 0,
                totalPembayaran: 0,
                totalSisa: 0,
                totalBayar: 0,
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
                accessorKey: "total_pinjaman",
                id: "total_pinjaman",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Total Pinjaman",
                footer: (info) => (
                    <FormatNumbering value={totals.totalPinjaman} />
                ),
            },
            {
                accessorKey: "bayar_on",
                id: "bayar_on",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => `Pembayaran Bln ${bulan}`,
                footer: (info) => (
                    <FormatNumbering value={totals.totalPembayaran} />
                ),
            },
            {
                accessorKey: "total_bayar",
                id: "total_bayar",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => `Total Bayar`,
                footer: (info) => <FormatNumbering value={totals.totalBayar} />,
            },
            {
                accessorKey: "sisa",
                id: "sisa",
                cell: (info) => <FormatNumbering value={info.getValue()} />,
                header: () => "Sisa Pinjaman",
                footer: (info) => <FormatNumbering value={totals.totalSisa} />,
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
        console.log(id, unit, will);
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

    // this is newCreate Parameter
    const [isNewCreateOpen, setisNewCreateOpen] = useState(false);
    const openNewCreateHandler = (e) => {
        setisNewCreateOpen(true);
    };
    const closedNewCreateHandler = (e) => {
        setisNewCreateOpen(false);
    };

    useEffect(() => {
        getThisParentTr(parseInt(props.unit_show.branch));
    }, []);

    // console.log(table.getRowModel().rows[0].getVisibleCells()[1]);
    return (
        <Authenticated loading={loading}>
            <Card judul="Kasbon Goro Umroh">
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
                                urlLink={route("goroumrah.goro_pinjaman")}
                                localState={"goroumrah_goro_pinjaman"}
                                availableMonth={true}
                            >
                                <ButtonWrapper>
                                    <PrimaryButton
                                        title="Create New"
                                        onClick={openNewCreateHandler}
                                        type="button"
                                    />
                                </ButtonWrapper>
                            </Search>
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
                                                          className={`${cell.column.columnDef.className} w-1/5`}
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
                                                          colSpan="5"
                                                          className="p-0 border-0"
                                                      >
                                                          <DetailKasbon
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
            <CreateNew
                open={isNewCreateOpen}
                onClosed={closedNewCreateHandler}
            />
        </Authenticated>
    );
};

export default Index;
