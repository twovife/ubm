import Card from "@/Components/Card";
import DefaultTable from "@/Components/DefaultTable";
import FilterBox from "@/Components/FilterBox";
import LinkButton from "@/Components/LinkButton";
import Search from "@/Components/Search";
import useFilter from "@/Hooks/useFilter";
import useServerFilter from "@/Hooks/useServerFilter";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

const Transaksi = ({ server_filter, datas, saldo_akhir, ...props }) => {
    const [loading, setLoading] = useState(false);
    const {
        showFilter,
        setShowFilter,
        filter,
        whenFilterrAdding,
        addFilter,
        setAddFilter,
        removeFilter,
        returnedData,
        currentPage,
        totalPages,
        handlePageChange,
        totals,
    } = useFilter(datas, 10000, "pinjamanmodal_pinjaman_modal_transaksi");

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
                filterable: "yes",
                name: "Wilayah",
                column: "wilayah",
                type_date: "number",
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
                name: "Keluar Pak Hertawan",
                column: "nama_karyawan",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Masuk Pak Hertawan",
                column: "nama_karyawan",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Keluar Pusat",
                column: "nama_karyawan",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Masuk Pusat",
                column: "nama_karyawan",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Total Keluar",
                column: "nama_karyawan",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Total Masuk",
                column: "nama_karyawan",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Jasa Modal",
                column: "nama_karyawan",
            },
        },
    ];

    return (
        <Authenticated loading={loading}>
            <FilterBox
                show={showFilter}
                setShow={setShowFilter}
                whenFilterrAdding={whenFilterrAdding}
                addFilter={addFilter}
                setAddFilter={setAddFilter}
            />
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
                                urlLink={route(
                                    "pinjamanmodal.pinjaman_modal_transaksi"
                                )}
                                localState={
                                    "pinjamanmodal_pinjaman_modal_transaksi"
                                }
                                availableMonth={true}
                            ></Search>
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
                                    {dayjs(item.transaction_date).format(
                                        "MMM/YYYY"
                                    )}
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-center`}>
                                    {dayjs(item.transaction_date).format(
                                        "DD/MM/YYYY"
                                    )}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.keterangan}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.wilayah}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.branch}
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-red-200`}
                                >
                                    <NumericFormat
                                        value={item.KPO}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-green-300`}
                                >
                                    <NumericFormat
                                        value={item.DPO}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-red-200`}
                                >
                                    <NumericFormat
                                        value={item.KPP}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-green-300`}
                                >
                                    <NumericFormat
                                        value={item.DPP}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>
                                <DefaultTable.td
                                    className={`text-end bg-red-200`}
                                >
                                    <NumericFormat
                                        value={item.KPP + item.KPO}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-green-300`}
                                >
                                    <NumericFormat
                                        value={item.DPP + item.DPO}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-blue-300`}
                                >
                                    <NumericFormat
                                        value={item.jasamodal}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>
                            </DefaultTable.tr>
                        ))}
                    </DefaultTable.tbody>
                    <tfoot>
                        <tr className="bg-blue-200 font-semibold text-black">
                            <td className={`px-3 py-1`} colSpan={"5"}>
                                TOTAL
                            </td>
                            <td className={`px-3 py-1 bg-red-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.KPO}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.DPO}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-red-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.KPP}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.DPP}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-red-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.KPO + totals.KPP}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.DPO + totals.DPP}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-blue-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.jasamodal}
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

export default Transaksi;
