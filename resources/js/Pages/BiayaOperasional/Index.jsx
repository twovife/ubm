import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import TabelUnit from "./Components/TabelUnit";
import useFilter from "@/Hooks/useFilter";
import Card from "@/Components/Card";
import Search from "@/Components/Search";
import DefaultTable from "@/Components/DefaultTable";

const Index = ({ branch, server_filters, datas, batch_datas, ...props }) => {
    const [loading, setLoading] = useState(false);
    const { filter, removeFilter, returnedData, totals } = useFilter(
        datas,
        100,
        "bop_index"
    );

    const headers = [
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
                name: "Saldo Tabungan",
                column: "total",
                format: "currency",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Setoran Terakhir",
                column: "last_month_payment",
            },
        },
    ];

    const [activeTab, setActiveTab] = useState(batch_datas[0]?.wilayah ?? null); // Mengatur tab pertama sebagai aktif
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <Authenticated loading={loading}>
            <Card judul="Setoran BOP Pusat">
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
                                urlLink={route("bop.index")}
                                localState={"bop_index"}
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
                        {returnedData?.map((item, index) => (
                            <DefaultTable.tr key={index}>
                                <DefaultTable.td className={`text-center`}>
                                    {item.wilayah}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-end`}>
                                    <NumericFormat
                                        value={item.total}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-center`}>
                                    {item.last_month_payment}
                                </DefaultTable.td>
                            </DefaultTable.tr>
                        ))}
                    </DefaultTable.tbody>
                    <tfoot>
                        <tr className="bg-blue-200 font-semibold text-black">
                            <td className={`px-3 py-1`}>TOTAL</td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.total}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1`}></td>
                        </tr>
                    </tfoot>
                </DefaultTable>
            </Card>
            <Card judul="Wilayah">
                <div className="w-full">
                    {batch_datas.length > 0 ? (
                        <>
                            <ul className="tab-list flex justify-start gap-3 flex-wrap">
                                {batch_datas.map((item) => (
                                    <li
                                        key={item.wilayah}
                                        className={`tab ${
                                            activeTab === item.wilayah
                                                ? "active bg-main-400 ring-2 ring-main-500"
                                                : ""
                                        } px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`}
                                        onClick={() =>
                                            handleTabClick(item.wilayah)
                                        }
                                    >
                                        {item.wilayah}
                                    </li>
                                ))}
                            </ul>
                            <div className="tab-content mt-3">
                                {batch_datas.map((item) => (
                                    <div
                                        key={item.wilayah}
                                        className={
                                            activeTab === item.wilayah
                                                ? "active"
                                                : "hidden"
                                        }
                                    >
                                        <TabelUnit
                                            data={item}
                                            // branch={branch}
                                            loading={loading}
                                            setLoading={setLoading}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>Belum ada data yang di input di wilayah ini</div>
                    )}
                </div>
            </Card>
        </Authenticated>
    );
};

export default Index;
