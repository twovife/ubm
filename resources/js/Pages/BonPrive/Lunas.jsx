import Card from "@/Components/Card";
import DefaultTable from "@/Components/DefaultTable";
import LinkButton from "@/Components/LinkButton";
import Search from "@/Components/Search";
import useFilter from "@/Hooks/useFilter";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

const Lunas = ({ branch, server_filters, datas, ...props }) => {
    const [loading, setLoading] = useState(false);
    const { filter, removeFilter, returnedData, totals } = useFilter(
        datas,
        100,
        "bonpriv_indexlunas"
    );

    const headers = [
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Nomor",
                column: "no",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Wilayah",
                column: "wilayah",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Unit",
                column: "branch",
                class_name: "whitespace-nowrap",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Nama Karyawan",
                column: "nama_karyawan",
                class_name: "whitespace-nowrap",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Jabatan",
                column: "jabatan",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Tanggal Pinjam",
                column: "tanggal_pinjaman",
                format: "date",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Tanggal Lunas",
                column: "note",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Nominal Bon",
                column: "nominal_pinjaman",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Saldo Terakhir",
                column: "saldo_bulan_lalu",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Angsuran Bulan Ini",
                column: "setoran_bulan_ini",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Total Angsuran",
                column: "total_setoran",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Saldo",
                column: "saldo",
                format: "currency",
            },
        },
    ];

    return (
        <Authenticated loading={loading}>
            <Card judul="Bon Prive Lunas">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.startContent className={`flex-wrap mb-3 lg:mb-0`}>
                            <Card.filterItem
                                filter={filter}
                                removeFilter={removeFilter}
                            />
                        </Card.startContent>
                        <Card.endContent
                            className={`flex-wrap`}
                        ></Card.endContent>
                    </div>
                </Card.subTitle>
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
                        {returnedData?.map((item, index) => (
                            <DefaultTable.tr key={index}>
                                <DefaultTable.td className={`text-center`}>
                                    <span className="mr-2">{index + 1}</span>
                                    <Link
                                        href={route("bonpriv.show", item.id)}
                                        className="px-2 py-1 rounded-lg bg-blue-500 text-white"
                                    >
                                        Detail
                                    </Link>
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.wilayah}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.branch}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.nama_karyawan}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.jabatan}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {dayjs(item.tanggal_pinjaman).format(
                                        "DD/MM/YYYY"
                                    )}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {dayjs(item.note).format("DD/MM/YYYY")}
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-end`}>
                                    <NumericFormat
                                        value={item.nominal_pinjaman}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-end`}>
                                    <NumericFormat
                                        value={item.saldo_bulan_lalu}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-end`}>
                                    <NumericFormat
                                        value={item.setoran_bulan_ini}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-end`}>
                                    <NumericFormat
                                        value={item.total_setoran}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-end`}>
                                    <NumericFormat
                                        value={item.saldo}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>
                            </DefaultTable.tr>
                        ))}
                    </DefaultTable.tbody>
                    <tfoot className="sticky bottom-0 left-0 w-full bg-gray-300 shadow border-t border-t-white text-end">
                        <tr className="bg-blue-200 font-semibold text-black">
                            <td
                                className={`px-3 py-1 text-start`}
                                colSpan={"7"}
                            >
                                TOTAL
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.nominal_pinjaman}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.saldo_bulan_lalu}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.setoran_bulan_ini}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td
                                className={`px-3 py-1 bg-green-500 text-white`}
                            ></td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.saldo}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </DefaultTable>
            </Card>
        </Authenticated>
    );
};

export default Lunas;
