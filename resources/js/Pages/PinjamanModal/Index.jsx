import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import PinjamanModalTable from "./Components/PinjamanModalTable";
import LinkButton from "@/Components/LinkButton";

const Index = ({ branch, server_filters, batch_datas, ...props }) => {
    const [activeTab, setActiveTab] = useState(batch_datas[0]?.wilayah ?? null); // Mengatur tab pertama sebagai aktif
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const [loading, setLoading] = useState(false);
    return (
        <Authenticated loading={loading}>
            <Card judul="Pinjaman Modal ">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <div className="flex flex-wrap items-center justify-around flex-1">
                            {batch_datas.length > 0 ? (
                                <>
                                    <ul className="tab-list flex justify-start gap-3 flex-wrap w-full">
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
                                </>
                            ) : (
                                <div>
                                    Belum ada data yang di input di wilayah ini
                                </div>
                            )}
                        </div>
                        <Card.endContent className={`flex-wrap`}>
                            <LinkButton
                                href={route("unitsaving.index")}
                                title={"Simpanan 1JT"}
                                size={"sm"}
                                type="button"
                                className="block whitespace-nowrap"
                                theme="primary"
                            />
                            <LinkButton
                                href={route("bonpanjer.bon_panjer")}
                                title={"Bon Panjer"}
                                size={"sm"}
                                type="button"
                                className="block whitespace-nowrap"
                                theme="primary"
                            />
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
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <div className="tab-content mt-3">
                    {batch_datas.map((item) => (
                        <div
                            key={item.wilayah}
                            className={
                                activeTab === item.wilayah ? "active" : "hidden"
                            }
                        >
                            <PinjamanModalTable
                                data={item}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </Authenticated>
    );
};

export default Index;
