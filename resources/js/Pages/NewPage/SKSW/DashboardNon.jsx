import Card from "@/Components/Card";
import DefaultTable from "@/Components/DefaultTable";
import FilterBox from "@/Components/FilterBox";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/Search";
import useFilter from "@/Hooks/useFilter";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import Create from "./Create";

const DashboardNon = ({ branch, server_filters, datas, ...props }) => {
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(datas);
    }, [datas]);

    const {
        showFilter,
        setShowFilter,
        filter,
        whenFilterrAdding,
        addFilter,
        setAddFilter,
        removeFilter,
        returnedData,
        totals,
    } = useFilter(data, 100, "sksw_dashboardnon");

    const headers = [
        {
            type: "nested",
            sticky: true,
            headers: [
                { name: "No", filterable: "no" },
                {
                    name: "Nama",
                    filterable: "yes",
                    column: "nama",
                    type_date: "text",
                },
            ],
        },
        {
            type: "default",
            headers: {
                name: "Wilayah",
                filterable: "yes",
                column: "wilayah",
                type_date: "number",
            },
        },
        {
            type: "default",
            headers: {
                name: "Unit",
                filterable: "yes",
                column: "unit",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                name: "Status Karyawan",
                filterable: "no",
                column: "status_karyawan",
            },
        },
        {
            type: "default",
            headers: {
                name: "Tanggal Masuk",
                filterable: "yes",
                column: "hiredate",
                type_date: "date",
            },
        },
        {
            type: "default",
            headers: {
                name: "Jabatan",
                filterable: "yes",
                column: "jabatan",
                type_date: "date",
            },
        },
        {
            type: "default",
            headers: {
                name: "Tanggal Tabungan",
                filterable: "yes",
                column: "tanggal_tabungan",
                type_date: "date",
            },
        },
        {
            type: "default",
            headers: {
                name: "Simpanan Wajib Terakhir",
                filterable: "yes",
                column: "saldo_sw",
                type_date: "number",
            },
        },
        {
            type: "default",
            headers: {
                name: "Simpanan Sukarela Terakhir",
                filterable: "yes",
                column: "saldo_sk",
                type_date: "number",
            },
        },
        {
            type: "default",
            headers: {
                name: "Total Simpanan Terakhir",
                filterable: "yes",
                column: "total_saldo",
                type_date: "number",
            },
        },
    ];

    const [onShowCreate, setOnShowCreate] = useState(false);
    const showCreateHandler = (e) => {
        // e.preventDefault();
        setOnShowCreate(!onShowCreate);
    };
    return (
        <Authenticated loading={loading}>
            <FilterBox
                show={showFilter}
                setShow={setShowFilter}
                whenFilterrAdding={whenFilterrAdding}
                addFilter={addFilter}
                setAddFilter={setAddFilter}
            />
            <Card judul="SKSW Non Aktif">
                <Card.subTitle>
                    <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
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
                                urlLink={route("sksw.dashboard_nonaktif")}
                                localState={"sksw_dashboardnon"}
                                availableBranch={true}
                            >
                                <PrimaryButton
                                    onClick={showCreateHandler}
                                    className="block"
                                    title={"Tambah Baru"}
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
                                <DefaultTable.td nested={true}>
                                    <div className="col-span-1 px-3 py-1.5 whitespace-nowrap text-center ">
                                        <Link
                                            href={route(
                                                "sksw.transaksi",
                                                item.id
                                            )}
                                            // href={route("emp.show", item.id)}
                                            className="text-blue-500 hover:bg-blue-500 hover:text-white  focus:bg-blue-500 focus:text-white text-center px-1 py-0.5 rounded"
                                        >
                                            <span>{key + 1}</span>
                                            <span className="hidden ml-2 lg:inline-block">
                                                Edit
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="col-span-4 px-3 py-1.5 whitespace-nowrap">
                                        {item.nama}
                                    </div>
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.wilayah}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.unit}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.status_karyawan}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {dayjs(item.hiredate).format("DD/MM/YYYY")}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.jabatan}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {dayjs(item.tanggal_tabungan).format(
                                        "DD/MM/YYYY"
                                    )}
                                </DefaultTable.td>
                                <DefaultTable.td
                                    className={`text-end bg-green-200 border`}
                                >
                                    <NumericFormat
                                        value={item.saldo_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>
                                <DefaultTable.td
                                    className={`text-end bg-green-200 border`}
                                >
                                    <NumericFormat
                                        value={item.saldo_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>
                                <DefaultTable.td
                                    className={`text-end bg-green-200 border`}
                                >
                                    <NumericFormat
                                        value={item.total_saldo}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>
                            </DefaultTable.tr>
                        ))}
                    </DefaultTable.tbody>
                    <tfoot className="sticky bottom-0 left-0 w-full bg-gray-300 border-t shadow border-t-white">
                        <tr>
                            <td
                                className="px-2 py-1.5 text-center font-bold"
                                colSpan={7}
                            >
                                Total
                            </td>
                            <td className="px-2 py-1.5 text-end bg-green-300 border">
                                <NumericFormat
                                    value={totals.saldo_sw}
                                    displayType={"text"}
                                    thousandSeparator={","}
                                    prefix="Rp. "
                                />
                            </td>
                            <td className="px-2 py-1.5 text-end bg-green-300 border">
                                <NumericFormat
                                    value={totals.saldo_sk}
                                    displayType={"text"}
                                    thousandSeparator={","}
                                    prefix="Rp. "
                                />
                            </td>
                            <td className="px-2 py-1.5 text-end text-white font-semibold bg-green-600 border">
                                <NumericFormat
                                    value={totals.total_saldo}
                                    displayType={"text"}
                                    thousandSeparator={","}
                                    prefix="Rp. "
                                />
                            </td>
                        </tr>
                    </tfoot>
                </DefaultTable>
            </Card>
            <Create show={onShowCreate} showHandler={showCreateHandler} />;
        </Authenticated>
    );
};

export default DashboardNon;
