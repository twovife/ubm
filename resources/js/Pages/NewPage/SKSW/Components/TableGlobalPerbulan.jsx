import DefaultTable from "@/Components/DefaultTable";
import useFilter from "@/Hooks/useFilter";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

const TableGlobalPerbulan = ({ data, loading, setLoading }) => {
    const datas = data.data;
    const { returnedData, totals } = useFilter(datas, 100, "sksw_wilayah");

    const headers = [
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Nomor",
                column: "no",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Wilayah",
                column: "wilayah",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Bulan",
                column: "bulan",
                class_name: "whitespace-nowrap",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Unit",
                column: "unit",
                class_name: "whitespace-nowrap",
                type_date: "text",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Simpanan SW",
                column: "balance_before_sw",
                format: "currency",
                class_name: "bg-gray-100 text-black font-semibold",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Simpanan SK",
                column: "balance_before_sk",
                format: "currency",
                class_name: "bg-gray-200 text-black font-semibold",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Debit SW",
                column: "debit_sw",
                format: "currency",
                class_name: "bg-green-100 text-black font-semibold",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Debit SK",
                column: "debit_sk",
                format: "currency",
                class_name: "bg-green-200 text-black font-semibold",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Kredit SW",
                column: "kredit_sw",
                format: "currency",
                class_name: "bg-red-100 text-black font-semibold",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Kredit SK",
                column: "kredit_sk",
                format: "currency",
                class_name: "bg-red-200 text-black font-semibold",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Saldo SW",
                column: "balance_sw",
                format: "currency",
                class_name: "bg-green-100 text-black font-semibold",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Saldo SK",
                column: "balance_sk",
                format: "currency",
                class_name: "bg-green-200 text-black font-semibold",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Saldo Global",
                column: "saldo_global",
                format: "currency",
                class_name: "bg-blue-200 text-black font-semibold",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Setoran SW (D)",
                column: "D_sw",
                format: "currency",
                class_name: "bg-emerald-50",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Setoran SK (D)",
                column: "D_sk",
                format: "currency",
                class_name: "bg-emerald-50",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Debit Mutasi SW (D)",
                column: "DM_sw",
                format: "currency",
                class_name: "bg-emerald-50",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Debit Mutasi SK (D)",
                column: "DM_sk",
                format: "currency",
                class_name: "bg-emerald-50",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Pengambilan SW (K)",
                column: "K_sw",
                format: "currency",
                class_name: "bg-rose-50",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Pengambilan SK (K)",
                column: "K_sk",
                format: "currency",
                class_name: "bg-rose-50",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Kredit Mutasi SW (K)",
                column: "KM_sw",
                format: "currency",
                class_name: "bg-rose-50",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Kredit Mutasi SK (K)",
                column: "KM_sk",
                format: "currency",
                class_name: "bg-rose-50",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Kredit Resign / M SW (K)",
                column: "KRMD_sw",
                format: "currency",
                class_name: "bg-rose-50",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Kredit Resign / MD SK (K)",
                column: "KRMD_sk",
                format: "currency",
                class_name: "bg-rose-50",
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
                        <DefaultTable.td className={`text-center`}>
                            {item.wilayah}
                        </DefaultTable.td>
                        <DefaultTable.td className={`text-center`}>
                            {dayjs(item.bulan).format("MMM/YYYY")}
                        </DefaultTable.td>
                        <DefaultTable.td noSpace className={`text-center`}>
                            {item.unit}
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-yellow-100`}
                        >
                            <NumericFormat
                                value={item.balance_before_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-yellow-200`}
                        >
                            <NumericFormat
                                value={item.balance_before_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-green-100`}
                        >
                            <NumericFormat
                                value={item.debit_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-green-200`}
                        >
                            <NumericFormat
                                value={item.debit_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-red-100`}
                        >
                            <NumericFormat
                                value={item.kredit_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-red-200`}
                        >
                            <NumericFormat
                                value={item.kredit_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-green-100`}
                        >
                            <NumericFormat
                                value={item.balance_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-green-200`}
                        >
                            <NumericFormat
                                value={item.balance_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-200`}
                        >
                            <NumericFormat
                                value={item.saldo_global}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.D_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.D_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.DM_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.DM_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.K_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.K_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.KM_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.KM_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.KRMD_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-blue-50`}
                        >
                            <NumericFormat
                                value={item.KRMD_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                    </DefaultTable.tr>
                ))}
            </DefaultTable.tbody>
            <tfoot className="sticky bottom-0 left-0 w-full bg-gray-300 shadow border-t border-t-white">
                <tr className="bg-blue-200 font-semibold text-black">
                    <td className={`px-3 py-1`} colSpan={4}>
                        TOTAL
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.balance_before_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.balance_before_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-400 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.debit_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.debit_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.kredit_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.kredit_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.balance_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.balance_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.saldo_global}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>

                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.D_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.D_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>

                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.DM_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>

                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.DM_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>

                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.K_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.K_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>

                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.KM_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.KM_sk}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>

                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
                            <NumericFormat
                                value={totals.KRMD_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}>
                        <div className={`whitespace-nowrap text-end`}>
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

export default TableGlobalPerbulan;
