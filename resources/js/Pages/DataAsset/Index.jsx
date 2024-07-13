import ButtonWrapper from "@/Components/ButtonWrapper";
import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useMemo, useState } from "react";
import Create from "./Create";
import useServerFilter from "@/Hooks/useServerFilter";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
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
import axios from "axios";
import Loading from "@/Components/Loading";
import dayjs from "dayjs";
import Search from "@/Components/Search";
import { FaPlay } from "react-icons/fa6";
import DataDetail from "./DataDetail";

const Index = ({ datas, ...props }) => {
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
    const [typeShow, setTypeShow] = useState();
    const [detailData, setDetailData] = useState();

    const getThisParentTr = (type, id, datas) => {
        console.log(type);

        if (showNewTr == id && typeShow == type) {
            setDetailData();
            setShowNewTr();
            setTypeShow();
        } else {
            setShowNewTr(id);
            const data = datas.filter((item) =>
                type == "active" ? item.is_active === 1 : item.is_active !== 1
            );
            setDetailData(data);
            setTypeShow(type);
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "branch",
                id: "branch",
                cell: (info) => info.getValue(),
                header: () => "Unit",
            },
            {
                accessorKey: "total_asset_aktif",
                id: "total_asset_aktif",
                type: "collapse",
                dataColapse: "active",
                cell: (info) => info.getValue(),
                header: () => "Asset Aktif",
            },
            {
                accessorKey: "total_asset_non_aktif",
                id: "total_asset_non_aktif",
                type: "collapse",
                dataColapse: "non",
                cell: (info) => info.getValue(),
                header: () => "Asset Non Aktif",
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
                                urlLink={route("asset.kendaraan.index")}
                                localState={"asset_kendaraan_index"}
                                FilterWilayahOnly={true}
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
                                                      className={`${cell.column.columnDef.className} w-1/3`}
                                                  >
                                                      {cell.column.columnDef
                                                          .type ==
                                                      "collapse" ? (
                                                          <div className="flex w-full items-center justify-center gap-3">
                                                              <button
                                                                  onClick={() =>
                                                                      getThisParentTr(
                                                                          cell
                                                                              .column
                                                                              .columnDef
                                                                              .dataColapse,
                                                                          row
                                                                              .original
                                                                              .branch_id,
                                                                          row
                                                                              .original
                                                                              .datas
                                                                      )
                                                                  }
                                                                  className={`flex justify-center items-start hover:text-roman-500 ${
                                                                      showNewTr ==
                                                                          row
                                                                              .original
                                                                              .branch_id &&
                                                                      typeShow ==
                                                                          cell
                                                                              .column
                                                                              .columnDef
                                                                              .dataColapse
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
                                                        row.original
                                                            .branch_id ? (
                                                          <div className="grid lg:grid-cols-2 grid-cols-1">
                                                              {flexRender(
                                                                  cell.column
                                                                      .columnDef
                                                                      .cell,
                                                                  cell.getContext()
                                                              )}
                                                              {typeShow ==
                                                              "non" ? (
                                                                  <span className="ml-1 px-2 py-1 bg-red-400 text-white rounded-full text-xs">
                                                                      Non Active
                                                                  </span>
                                                              ) : (
                                                                  <span className="ml-1 px-2 py-1 bg-green-400 text-white rounded-full text-xs">
                                                                      Active
                                                                  </span>
                                                              )}
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
                                      {showNewTr == row.original.branch_id && (
                                          <TableRow
                                              key={`newrow${i}`}
                                              className="p-0 hover:bg-transparent"
                                          >
                                              <TableCell
                                                  colSpan="3"
                                                  className="p-2 border-0"
                                              >
                                                  <div className="flex max-w-full relative overflow-auto w-full h-[50vh]">
                                                      <DataDetail
                                                          datas={detailData}
                                                      />
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

export default Index;

{
    /* <div className="max-h-[50vh] overflow-auto sticky w-[50%]">

</div> */
}
