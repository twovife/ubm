import Card from "@/Components/Card";
import DefaultTable from "@/Components/DefaultTable";
import LinkButton from "@/Components/LinkButton";
import Search from "@/Components/Search";
import useFilter from "@/Hooks/useFilter";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

const Dashboard = ({ server_filter, datas, saldo_akhir, ...props }) => {
    const [loading, setLoading] = useState(false);
    const { filter, removeFilter, returnedData, totals } = useFilter(
        datas,
        10000,
        "1juta_transaksi"
    );

    const headers = [
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Bulan",
                column: "bulan",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Tanggal",
                column: "transaction_date",
                class_name: "whitespace-nowrap",
                format: "date",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Keterangan",
                column: "type_transaksi",
                class_name: "whitespace-nowrap",
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
                column: "unit",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Nama Karyawan",
                column: "nama_karyawan",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "TB 1jt",
                column: "bop",
                format: "currency",
                class_name: "whitespace-nowrap bg-gray-100",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Debit",
                column: "debit",
                format: "currency",
                class_name: "whitespace-nowrap bg-green-100",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Kredit",
                column: "kredit",
                format: "currency",
                class_name: "whitespace-nowrap bg-red-100",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Saldo",
                column: "saldo",
                format: "currency",
                class_name: "whitespace-nowrap bg-blue-100",
            },
        },
    ];

    return (
        <Authenticated loading={loading}>
            <Card judul="Buku Transaksi 1JT">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.startContent className={`flex-wrap mb-3 lg:mb-0`}>
                            <Card.filterItem
                                filter={filter}
                                removeFilter={removeFilter}
                            />
                        </Card.startContent>
                        <Card.endContent className={`flex-wrap`}>
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("unitsaving.dashboard")}
                                localState={"1juta_transaksi"}
                                availableMonth={true}
                            >
                                <LinkButton
                                    href={route("unitsaving.create_mutasi")}
                                    title={'Lain"'}
                                    size={"sm"}
                                    type="button"
                                    className="block whitespace-nowrap"
                                    theme="primary"
                                />
                            </Search>
                        </Card.endContent>
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
                        {returnedData?.map((item, key) => (
                            <DefaultTable.tr key={key}>
                                <DefaultTable.td className={`text-center`}>
                                    {item.bulan}
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-center`}>
                                    {dayjs(item.transaction_date).format(
                                        "DD/MM/YYYY"
                                    )}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.type_transaksi}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.wilayah}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.unit}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.nama_karyawan}
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-green-200`}
                                >
                                    <NumericFormat
                                        value={item.bop}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-emerald-300`}
                                >
                                    <NumericFormat
                                        value={item.debit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-red-200`}
                                >
                                    <NumericFormat
                                        value={item.kredit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-blue-200`}
                                >
                                    <NumericFormat
                                        value={item.saldo}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>
                            </DefaultTable.tr>
                        ))}
                    </DefaultTable.tbody>
                    <tfoot>
                        <tr className="bg-blue-200 font-semibold text-black">
                            <td className={`px-3 py-1`} colSpan={"6"}>
                                TOTAL
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.bop}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.debit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-red-600 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.kredit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-blue-600 text-white`}>
                                <div
                                    className={`whitespace-nowrap text-right `}
                                >
                                    <NumericFormat
                                        value={saldo_akhir}
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

export default Dashboard;
