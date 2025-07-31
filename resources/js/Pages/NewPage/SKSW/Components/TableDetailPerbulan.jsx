import DefaultTable from "@/Components/DefaultTable";
import useFilter from "@/Hooks/useFilter";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

const TableDetailPerbulan = ({ data }) => {
    const datas = data.data;
    // console.log(datas);
    const { returnedData, totals } = useFilter(datas, 100, "sksw_unit");

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
                name: "Nama Karyawan",
                column: "nama_karyawan",
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
                            <Link
                                href={route("sksw.transaksi", item.id_tabungan)}
                                // href={route("emp.show", item.id)}
                                className="text-blue-500 hover:bg-blue-500 hover:text-white  focus:bg-blue-500 focus:text-white text-center px-1 py-0.5 rounded"
                            >
                                <span>{key + 1}</span>
                                <span className="hidden ml-2 lg:inline-block">
                                    Edit
                                </span>
                            </Link>
                        </DefaultTable.td>
                        <DefaultTable.td
                            className={`text-center whitespace-nowrap`}
                        >
                            {item.nama_karyawan}
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
            <tfoot className="sticky bottom-0 left-0 w-full bg-gray-300 border-t shadow border-t-white">
                <tr className="font-semibold text-black bg-blue-200">
                    <td className={`px-3 py-1`} colSpan={5}>
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
                    <td
                        className={`px-3 py-1 bg-green-400 text-white text-end`}
                    >
                        <div className={`whitespace-nowrap`}>
                            <NumericFormat
                                value={totals.debit_sw}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td
                        className={`px-3 py-1 bg-green-500 text-white text-end`}
                    >
                        <div className={`whitespace-nowrap`}>
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
                    <td
                        className={`px-3 py-1 bg-green-500 text-white text-end`}
                    >
                        <div className={`whitespace-nowrap`}>
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
    );
};

export default TableDetailPerbulan;
