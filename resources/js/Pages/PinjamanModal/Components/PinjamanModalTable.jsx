import DefaultTable from "@/Components/DefaultTable";
import useFilter from "@/Hooks/useFilter";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

const PinjamanModalTable = ({ data, loading, setLoading }) => {
    const datas = data.data;
    const { returnedData, totals } = useFilter(datas, 10000, "pinjaman_modal");

    const headers = [
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Nomor",
                column: "wilayah",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Unit",
                column: "branch",
                class_name: "whitespace-nowrap",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Wilayah",
                column: "wilayah",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Action Pinjaman Owner",
                column: "id_pinjaman_owner",
                class_name: "bg-green-100/80 whitespace-nowrap",
                format: "action",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Tanggal Transaksi Terakhir",
                column: "transaksi_terakhir_owner",
                class_name: "bg-green-100/80 whitespace-nowrap",
                format: "date",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Pinjaman",
                column: "nominal_pinjaman_owner",
                class_name: "bg-green-100/80 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Setoran Pinjaman",
                column: "total_setoran_pinjaman_owner",
                class_name: "bg-green-100/80 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Saldo Pinjaman",
                column: "saldo_pinjaman_owner",
                class_name: "bg-green-100/80 whitespace-nowrap",
                format: "currency",
            },
        },

        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Action Pinjaman Pusat",
                column: "id_pinjaman_pusat",
                class_name: "bg-yellow-100/60 whitespace-nowrap",
                format: "action",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Tanggal Transaksi Terakhir",
                column: "transaksi_terakhir_pusat",
                class_name: "bg-yellow-100/60 whitespace-nowrap",
                format: "date",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Pinjaman",
                column: "nominal_pinjaman_pusat",
                class_name: "bg-yellow-100/60 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Setoran Pinjaman",
                column: "total_setoran_pinjaman_pusat",
                class_name: "bg-yellow-100/60 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Saldo Pinjaman",
                column: "saldo_pinjaman_pusat",
                class_name: "bg-yellow-100/60 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Pinjaman",
                column: "total_pinjaman",
                class_name: "bg-blue-100 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Saldo Pinjaman",
                column: "total_saldo_pinjaman",
                class_name: "bg-blue-100 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Jasa Modala",
                column: "jasa_modal_owner",
                class_name: "bg-blue-100 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Pinjaman",
                column: "total_pinjaman",
                class_name: "bg-blue-100 whitespace-nowrap",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filteranble: "no",
                name: "Total Saldo",
                column: "total_saldo_pinjaman",
                class_name: "bg-blue-100 whitespace-nowrap",
                format: "currency",
            },
        },
    ];

    return (
        <DefaultTable>
            <DefaultTable.thead>
                {headers.map((item, key) => (
                    <DefaultTable.th
                        key={key}
                        type={item.type}
                        headers={item.headers}
                    />
                ))}
            </DefaultTable.thead>
            <DefaultTable.tbody>
                {returnedData?.map((item, key) => (
                    <DefaultTable.tr key={key}>
                        <DefaultTable.td className={`text-center`}>
                            {key + 1}
                        </DefaultTable.td>

                        <DefaultTable.td
                            className={`text-center whitespace-nowrap`}
                        >
                            {item.branch}
                        </DefaultTable.td>
                        <DefaultTable.td className={`text-center`}>
                            {item.wilayah}
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-center bg-yellow-200`}
                        >
                            <div className={`px-6 py-1`}>
                                {item.type_pinjaman_owner == 3 ? (
                                    <Link
                                        href={route(
                                            "pinjamanmodal.pinjaman_modal_create"
                                        )}
                                        className="px-2 py-1 rounded-lg bg-blue-500 text-white"
                                    >
                                        Baru
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </Link>
                                ) : item.type_pinjaman_owner == 1 ? (
                                    <>
                                        <Link
                                            href={route(
                                                "pinjamanmodal.pinjaman_modal_create"
                                            )}
                                            className="px-2 py-1 rounded-lg bg-blue-500 text-white mr-3"
                                        >
                                            Baru
                                            {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                        </Link>
                                        <Link
                                            href={route(
                                                "pinjamanmodal.pinjaman_modal_show",
                                                item.id_pinjaman_owner
                                            )}
                                            className="px-2 py-1 rounded-lg bg-green-500 text-white"
                                        >
                                            Lunas
                                            {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href={route(
                                            "pinjamanmodal.pinjaman_modal_show",
                                            item.id_pinjaman_owner
                                        )}
                                        className="px-2 py-1 rounded-lg bg-red-500 text-white"
                                    >
                                        Bayar
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </Link>
                                )}
                            </div>
                            {/* {dayjs(item.bulan).format("MMM/YYYY")} */}
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-center bg-yellow-200`}
                        >
                            {item.transaksi_terakhir_owner !== "-"
                                ? dayjs(item.transaksi_terakhir_owner).format(
                                      "DD/MM/YYYY"
                                  )
                                : ""}
                        </DefaultTable.td>

                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-yellow-200`}
                        >
                            <NumericFormat
                                value={item.nominal_pinjaman_owner}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-yellow-200`}
                        >
                            <NumericFormat
                                value={item.total_setoran_pinjaman_owner}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-yellow-200`}
                        >
                            <NumericFormat
                                value={item.saldo_pinjaman_owner}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>

                        <DefaultTable.td
                            noSpace
                            className={`text-center bg-green-200`}
                        >
                            <div className={`px-6 py-1`}>
                                {item.type_pinjaman_pusat == 3 ? (
                                    <Link
                                        href={route(
                                            "pinjamanmodal.pinjaman_modal_create"
                                        )}
                                        className="px-2 py-1 rounded-lg bg-blue-500 text-white"
                                    >
                                        Baru
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </Link>
                                ) : item.type_pinjaman_pusat == 1 ? (
                                    <Link
                                        href={route(
                                            "pinjamanmodal.pinjaman_modal_show",
                                            item.id_pinjaman_pusat
                                        )}
                                        className="px-2 py-1 rounded-lg bg-green-500 text-white"
                                    >
                                        Lunas
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </Link>
                                ) : (
                                    <Link
                                        href={route(
                                            "pinjamanmodal.pinjaman_modal_show",
                                            item.id_pinjaman_pusat
                                        )}
                                        className="px-2 py-1 rounded-lg bg-red-500 text-white"
                                    >
                                        Bayar
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </Link>
                                )}
                            </div>
                            {/* {dayjs(item.bulan).format("MMM/YYYY")} */}
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-center bg-green-200`}
                        >
                            {item.transaksi_terakhir_pusat !== "-"
                                ? dayjs(item.transaksi_terakhir_pusat).format(
                                      "DD/MM/YYYY"
                                  )
                                : ""}
                        </DefaultTable.td>

                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-green-200`}
                        >
                            <NumericFormat
                                value={item.nominal_pinjaman_pusat}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-green-200`}
                        >
                            <NumericFormat
                                value={item.total_setoran_pinjaman_pusat}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-green-200`}
                        >
                            <NumericFormat
                                value={item.saldo_pinjaman_pusat}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>

                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-200`}
                        >
                            <NumericFormat
                                value={item.total_pinjaman}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>

                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-200`}
                        >
                            <NumericFormat
                                value={item.total_saldo_pinjaman}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>

                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-200`}
                        >
                            <NumericFormat
                                value={item.jasa_modal_owner}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>

                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-200`}
                        >
                            <NumericFormat
                                value={item.total_pinjaman}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>

                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-200`}
                        >
                            <NumericFormat
                                value={item.total_saldo_pinjaman}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                    </DefaultTable.tr>
                ))}
            </DefaultTable.tbody>
            <tfoot className="sticky bottom-0 left-0 w-full bg-gray-300 shadow border-t border-t-white">
                <tr className="bg-blue-200 font-semibold text-black">
                    <td className={`px-3 py-1`} colSpan={5}>
                        TOTAL
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.nominal_pinjaman_owner}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.total_setoran_pinjaman_owner}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white `}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.saldo_pinjaman_owner}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>

                    <td className={`px-3 py-1`} colSpan={2}>
                        TOTAL
                    </td>

                    <td className={`px-3 py-1 bg-green-500 text-white `}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.nominal_pinjaman_pusat}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.total_setoran_pinjaman_pusat}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.saldo_pinjaman_pusat}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.total_pinjaman}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.total_saldo_pinjaman}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.jasa_modal_owner}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>

                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.total_pinjaman}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.total_saldo_pinjaman}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                </tr>
            </tfoot>
        </DefaultTable>
        //     <>
        //         <div className="p-3 bg-white rounded shadow">
        //             <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3">
        //                 <div></div>
        //                 <div className="flex items-center gap-3">
        //                     <PrimaryButton
        //                         onClick={onResetPage}
        //                         size={"sm"}
        //                         theme="other"
        //                         icon={<BiRefresh />}
        //                         title={"Reset"}
        //                     />

        //                     <LinkButton
        //                         as="button"
        //                         href={route("simpanan.create")}
        //                         icon={<IoMdAdd />}
        //                         size={"md"}
        //                         title={"Tambah"}
        //                     ></LinkButton>
        //                 </div>
        //             </div>
        //             {filters && (
        //                 <div className="inline-block mt-3">
        //                     {filters.map((item) => {
        //                         if (item.column == "") {
        //                             return null;
        //                         }
        //                         return (
        //                             <div className="flex items-center justify-start space-y-2">
        //                                 <div className="border rounded flex items-center">
        //                                     <div className="p-2 text-lg bg-green-400 text-white">
        //                                         <AiFillFilter />
        //                                     </div>
        //                                     <div className="px-3 text-sm text-main-500">
        //                                         <span className="mr-1 capitalize ">
        //                                             {item.column}
        //                                         </span>
        //                                         <span className="mr-1 capitalize ">
        //                                             {item.operators == 1
        //                                                 ? "Contains"
        //                                                 : "="}
        //                                         </span>
        //                                         <span>'{item.values}'</span>
        //                                     </div>
        //                                 </div>
        //                                 <div
        //                                     className="hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2"
        //                                     onClick={() =>
        //                                         decrementFilter(item.column)
        //                                     }
        //                                 >
        //                                     <AiOutlineClose />
        //                                 </div>
        //                             </div>
        //                         );
        //                     })}
        //                 </div>
        //             )}
        //         </div>

        // {
        /* <div className="h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap">
                        <tr>
                            <th className="px-6 py-4">Nomor</th>
                            {headers.map((header, key) => (
                                <th
                                    key={key}
                                    data-item={header.column}
                                    data-format={header.format ?? "text"}
                                    scope="col"
                                    className="px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer"
                                >
                                    {header.title}
                                    {orderData.column == header.column && (
                                        <span className="ml-1 text-blue-400 italic">
                                            {orderData.orderby}
                                        </span>
                                    )}

                                    {showFilter.column == header.column &&
                                        filterModal()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {tBodyGenerator()}
                    <tfoot>
                        <tr className="bg-blue-200 font-semibold text-black">
                            <td className={`px-6 py-1`} colSpan={4}>
                                TOTAL
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.balance_before_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.balance_before_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.debit_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.debit_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.kredit_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.kredit_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.balance_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.balance_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.saldo_global}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>

                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.D_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.D_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>

                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.DM_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>

                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.DM_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>

                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.K_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.K_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>

                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.KM_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.KM_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>

                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.KRMD_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.KRMD_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div> */
        // }
        // </>
    );
};

export default PinjamanModalTable;
