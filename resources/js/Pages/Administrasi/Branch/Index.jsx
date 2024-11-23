import Card from "@/Components/Card";
import DefaultTable from "@/Components/DefaultTable";
import Search from "@/Components/Search";
import useFilter from "@/Hooks/useFilter";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

const Index = ({ datas }) => {
    const [loading, setLoading] = useState(false);
    const { returnedData } = useFilter(datas, 100, "branch_index");

    const headers = [
        {
            type: "default",
            headers: {
                name: "Nomor",
                filterable: "no",
                column: "id",
                type_date: "number",
            },
        },
        {
            type: "default",
            headers: {
                name: "Wilayah",
                filterable: "no",
                column: "wilayah",
                type_date: "number",
            },
        },
        {
            type: "default",
            headers: {
                name: "Unit",
                filterable: "no",
                column: "unit",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                name: "Status",
                filterable: "no",
                column: "isactive",
            },
        },
        {
            type: "default",
            headers: {
                name: "Total Karyawan Non Aktiv",
                filterable: "no",
                column: "resign_employee",
                type_date: "date",
            },
        },
        {
            type: "default",
            headers: {
                name: "Total Karyawan Aktiv",
                filterable: "no",
                column: "active_employee",
                type_date: "date",
            },
        },
        {
            type: "default",
            headers: {
                name: "Total Karyawan",
                filterable: "no",
                column: "active_employee",
                type_date: "date",
            },
        },
    ];
    return (
        <Authenticated loading={loading}>
            <Card judul="Daftar Kantor UBM">
                <Card.subTitle>
                    <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
                        <Card.endContent className={`flex-wrap`}>
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("controlpanel.daftar_unit")}
                                localState={"branch_index"}
                                FilterWilayahOnly={true}
                            />
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
                            <DefaultTable.tr
                                className={`text-center`}
                                key={key}
                            >
                                <DefaultTable.td>{key + 1}</DefaultTable.td>
                                <DefaultTable.td>
                                    {item.wilayah}
                                </DefaultTable.td>
                                <DefaultTable.td>{item.unit}</DefaultTable.td>
                                <DefaultTable.td
                                    className={`${
                                        item.isactive == "Tutup"
                                            ? "bg-red-300"
                                            : ""
                                    }`}
                                >
                                    {item.isactive}
                                </DefaultTable.td>
                                <DefaultTable.td>
                                    <NumericFormat
                                        value={item.resign_employee}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                    &nbsp;Karyawan
                                </DefaultTable.td>
                                <DefaultTable.td>
                                    <NumericFormat
                                        value={item.active_employee}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                    &nbsp;Karyawan
                                </DefaultTable.td>
                                <DefaultTable.td>
                                    <NumericFormat
                                        value={
                                            item.active_employee +
                                            item.resign_employee
                                        }
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                    &nbsp;Karyawan
                                </DefaultTable.td>
                            </DefaultTable.tr>
                        ))}
                    </DefaultTable.tbody>
                </DefaultTable>
            </Card>
        </Authenticated>
    );
};

export default Index;
