import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import TabelUnit from "./Components/TabelUnit";
import useFilter from "@/Hooks/useFilter";
import Card from "@/Components/Card";
import Search from "@/Components/Search";
import DefaultTable from "@/Components/DefaultTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

const Index = ({ branch, server_filters, datas, batch_datas, ...props }) => {
    const [loading, setLoading] = useState(false);
    const { filter, removeFilter, returnedData, totals } = useFilter(
        datas,
        100,
        "bop_index"
    );

    const [displayUnitData, setDisplayUnitData] = useState([]);
    useEffect(() => {
        setDisplayUnitData(batch_datas);
    }, [batch_datas, datas]);

    const [savedTabs, setSavedTabs] = useState(0);

    const saveToLocalStorage = (value) => {
        localStorage.setItem("tabsActive_bop_index", value);
        setSavedTabs(value);
    };

    useEffect(() => {
        const loadedText = localStorage.getItem("tabsActive_bop_index");
        setSavedTabs(parseInt(loadedText) || 0);
    }, []);

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

    return (
        <Authenticated loading={loading}>
            <Card judul="Setoran BOP Pusat">
                <Card.subTitle>
                    <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
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
                        <tr className="font-semibold text-black bg-blue-200">
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
                    <Tabs
                        // defaultValue={savedTabs}
                        className="w-full"
                        value={savedTabs}
                    >
                        <TabsList>
                            {displayUnitData.length > 0
                                ? displayUnitData.map((item, i) => (
                                      <TabsTrigger
                                          onClick={() =>
                                              saveToLocalStorage(item.wilayah)
                                          }
                                          value={item.wilayah}
                                          className="ml-3 first:ml-0"
                                      >
                                          {item.wilayah}
                                      </TabsTrigger>
                                  ))
                                : null}
                        </TabsList>
                        <>
                            {displayUnitData.length > 0
                                ? displayUnitData.map((item, i) => (
                                      <TabsContent value={item.wilayah}>
                                          <TabelUnit
                                              data={item}
                                              // branch={branch}
                                              loading={loading}
                                              setLoading={setLoading}
                                          />
                                      </TabsContent>
                                  ))
                                : null}
                        </>
                    </Tabs>
                </div>
            </Card>
        </Authenticated>
    );
};

export default Index;
