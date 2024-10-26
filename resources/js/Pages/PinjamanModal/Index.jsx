import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import PinjamanModalTable from "./Components/PinjamanModalTable";
import LinkButton from "@/Components/LinkButton";
import DefaultTable from "@/Components/DefaultTable";
import { NumericFormat } from "react-number-format";
import ButtonWrapper from "@/Components/ButtonWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

const Index = ({ branch, server_filters, batch_datas, ...props }) => {
    const [savedTabs, setSavedTabs] = useState(0);

    const saveToLocalStorage = (value) => {
        localStorage.setItem("tabsActive_pinjamanmodal_index", value);
        setSavedTabs(value);
    };

    useEffect(() => {
        const loadedText = localStorage.getItem(
            "tabsActive_pinjamanmodal_index"
        );
        setSavedTabs(parseInt(loadedText) || 0);
    }, []);

    const [loading, setLoading] = useState(false);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        setDatas(batch_datas);
    }, [batch_datas]);

    const calculateTotals = (data) => {
        return data.reduce(
            (acc, wilayah) => {
                const totalPinjamanOwner = wilayah.data.reduce(
                    (sum, item) => sum + item.nominal_pinjaman_owner,
                    0
                );
                const totalPinjamanPusat = wilayah.data.reduce(
                    (sum, item) => sum + item.nominal_pinjaman_pusat,
                    0
                );
                const totalSaldoPinjamanOwner = wilayah.data.reduce(
                    (sum, item) => sum + item.saldo_pinjaman_owner,
                    0
                );
                const totalSaldoPinjamanPusat = wilayah.data.reduce(
                    (sum, item) => sum + item.saldo_pinjaman_pusat,
                    0
                );

                const totalPinjaman = wilayah.data.reduce(
                    (sum, item) => sum + item.total_pinjaman,
                    0
                );
                const totalSaldo = wilayah.data.reduce(
                    (sum, item) => sum + item.total_saldo_pinjaman,
                    0
                );

                acc[wilayah.wilayah] = {
                    pinjamanOwner: totalPinjamanOwner,
                    pinjamanPusat: totalPinjamanPusat,
                    saldoOwner: totalSaldoPinjamanOwner,
                    saldoPusat: totalSaldoPinjamanPusat,
                    pinjaman: totalPinjaman,
                    saldo: totalSaldo,
                };

                acc.totalPinjamanOwner += totalPinjamanOwner;
                acc.totalPinjamanPusat += totalPinjamanPusat;
                acc.totalSaldoPinjamanOwner += totalSaldoPinjamanOwner;
                acc.totalSaldoPinjamanPusat += totalSaldoPinjamanPusat;
                acc.totalPinjaman += totalPinjaman;
                acc.totalSaldo += totalSaldo;

                return acc;
            },
            {
                wilayahs: {},
                totalPinjamanOwner: 0,
                totalPinjamanPusat: 0,
                totalSaldoPinjamanOwner: 0,
                totalSaldoPinjamanPusat: 0,
                totalPinjaman: 0,
                totalSaldo: 0,
            }
        );
    };

    const totals = calculateTotals(datas);
    return (
        <Authenticated loading={loading}>
            <Card judul="Pinjaman Modal ">
                <Card.subTitle>
                    <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
                        <Card.endContent className={`flex-wrap`}>
                            <ButtonWrapper>
                                <LinkButton
                                    href={route(
                                        "pinjamanmodal.pinjaman_modal_create"
                                    )}
                                    title={"Tambah Baru"}
                                    size={"sm"}
                                    type="button"
                                    className="block whitespace-nowrap"
                                    theme="green"
                                />
                            </ButtonWrapper>
                        </Card.endContent>
                    </div>
                </Card.subTitle>

                <DefaultTable>
                    <DefaultTable.thead>
                        <th
                            scope="col"
                            className="px-6 py-1.5 whitespace-nowrap text-center"
                        >
                            Wilayah
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-1.5 whitespace-nowrap text-center"
                        >
                            Pinjaman Pak Hertawan
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-1.5 whitespace-nowrap text-center"
                        >
                            Saldo Pak Hertawan
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-1.5 whitespace-nowrap text-center"
                        >
                            Pinjaman Pusat
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-1.5 whitespace-nowrap text-center"
                        >
                            Saldo Pusat
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-1.5 whitespace-nowrap text-center"
                        >
                            Global Pinjaman
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-1.5 whitespace-nowrap text-center"
                        >
                            Global Saldo
                        </th>
                    </DefaultTable.thead>
                    <DefaultTable.tbody>
                        {datas.map((item) => (
                            <tr
                                className={`odd:bg-white even:bg-gray-100 hover:bg-roman-50/50 group`}
                            >
                                <td className="px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit">
                                    {item.wilayah}
                                </td>
                                <td className="px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit text-end">
                                    <NumericFormat
                                        value={
                                            totals[item.wilayah].pinjamanOwner
                                        }
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit text-end">
                                    <NumericFormat
                                        value={totals[item.wilayah].saldoOwner}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>

                                <td className="px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit text-end">
                                    <NumericFormat
                                        value={
                                            totals[item.wilayah].pinjamanPusat
                                        }
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit text-end">
                                    <NumericFormat
                                        value={totals[item.wilayah].saldoPusat}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>

                                <td className="px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit text-end">
                                    <NumericFormat
                                        value={totals[item.wilayah].pinjaman}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit text-end">
                                    <NumericFormat
                                        value={totals[item.wilayah].saldo}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                            </tr>
                        ))}
                    </DefaultTable.tbody>
                    <tfoot>
                        <tr className="font-semibold text-black bg-blue-200">
                            <td className={`px-3 py-1`}>TOTAL</td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.totalPinjamanOwner}
                                        totalSaldoPinjamanOwner
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.totalSaldoPinjamanOwner}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>

                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.totalPinjamanPusat}
                                        totalSaldoPinjamanOwner
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.totalSaldoPinjamanPusat}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>

                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.totalPinjamanOwner}
                                        totalSaldoPinjamanOwner
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.totalSaldoPinjamanOwner}
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
            <Card judul="Per Wilayah ">
                <div className="w-full">
                    <Tabs
                        // defaultValue={savedTabs}
                        className="w-full"
                        value={savedTabs}
                    >
                        <TabsList>
                            {datas.length > 0
                                ? datas.map((item, i) => (
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
                            {datas.length > 0
                                ? datas.map((item, i) => (
                                      <TabsContent value={item.wilayah}>
                                          <PinjamanModalTable
                                              data={item}
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
