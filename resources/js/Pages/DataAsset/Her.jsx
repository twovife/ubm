import ButtonWrapper from "@/Components/ButtonWrapper";
import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useMemo, useState } from "react";
import Create from "./Create";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import Search from "@/Components/Search";
import { FaPlay } from "react-icons/fa6";
import DetailHer from "./DetailHer";
import { ScrollArea, ScrollBar } from "@/shadcn/ui/scroll-area";

const Her = ({ datas, ...props }) => {
    // console.log(datas);
    const [data, setData] = useState(() => datas);
    const [loading, setLoading] = useState(false);

    const [onCreteaShow, setOnCreteaShow] = useState(false);
    const showCreateHandler = (e) => {
        setOnCreteaShow(true);
    };
    const closedCreateHandle = (e) => {
        setOnCreteaShow(false);
    };
    const [showNewTr, setShowNewTr] = useState();

    const getThisParentTr = (id, datas) => {
        if (showNewTr == id) {
            setShowNewTr();
        } else {
            setShowNewTr(id);
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "bulan",
                id: "bulan",
                type: "collapse",
                cell: (info) => info.getValue(),
                header: () => "Bulan",
            },
            {
                accessorKey: "total_asset_aktif",
                id: "total_asset_aktif",
                cell: (info) => info.getValue(),
                header: () => "Total Asset",
            },
            {
                accessorKey: "total_asset_her",
                id: "total_asset_her",
                cell: (info) => info.getValue(),
                header: () => "Total Her",
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
            <Card judul="Aset Kendaraan">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        {/* <Card.startContent className={`flex-wrap mb-3 lg:mb-0`}>
                            <Card.filterItem
                                filter={filter}
                                removeFilter={removeFilter}
                            />
                        </Card.startContent> */}
                        <Card.endContent className={`flex-wrap`}>
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("asset.kendaraan.her")}
                                localState={"asset_kendaraan_her"}
                                availableMonth={true}
                            >
                                <PrimaryButton
                                    type="button"
                                    onClick={showCreateHandler}
                                >
                                    Tambah Baru
                                </PrimaryButton>
                            </Search>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <Table className="border text-xs lg:text-sm">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, i) => (
                            <TableRow key={i}>
                                {headerGroup.headers.map((header, i) => {
                                    return (
                                        <TableHead
                                            key={i}
                                            className={`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${
                                                showNewTr
                                                    ? "bg-green-200 text-black"
                                                    : ""
                                            }`}
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
                    <TableBody className="text-center">
                        {table.getRowModel().rows.length
                            ? table.getRowModel().rows.map((row, i) => (
                                  <React.Fragment key={i}>
                                      <TableRow
                                          key={i}
                                          className={`${
                                              row.original.is_active == 2
                                                  ? `bg-red-100 even:bg-red-50 hover:bg-red-200`
                                                  : ``
                                          }`}
                                      >
                                          {row
                                              .getVisibleCells()
                                              .map((cell, i) => (
                                                  <TableCell
                                                      key={i}
                                                      className={`${
                                                          cell.column.columnDef
                                                              .className
                                                      } ${
                                                          showNewTr ==
                                                          row.original.id
                                                              ? `bg-gray-100`
                                                              : ""
                                                      } w-1/3`}
                                                  >
                                                      {cell.column.columnDef
                                                          .type ==
                                                      "collapse" ? (
                                                          <div className="flex w-full items-center justify-center gap-3">
                                                              <button
                                                                  onClick={() =>
                                                                      getThisParentTr(
                                                                          row
                                                                              .original
                                                                              .id,
                                                                          row
                                                                              .original
                                                                              .datas
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
                                          <TableRow
                                              key={`newrow${i}`}
                                              className="p-0 hover:bg-transparent"
                                          >
                                              <TableCell
                                                  colSpan="3"
                                                  className="p-2 border-0"
                                              >
                                                  <div className="flex max-w-full relative overflow-auto w-full z-10 h-[50vh]">
                                                      <div className="absolute top-0 w-full h-full z-20">
                                                          <ScrollArea className="h-full w-full">
                                                              <DetailHer
                                                                  branchShow={
                                                                      showNewTr
                                                                  }
                                                              />
                                                              <ScrollBar orientation="horizontal" />
                                                          </ScrollArea>
                                                      </div>
                                                  </div>
                                              </TableCell>
                                          </TableRow>
                                      )}
                                  </React.Fragment>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </Card>
            <Create open={onCreteaShow} onClosed={closedCreateHandle} />
        </Authenticated>
    );
};

export default Her;
