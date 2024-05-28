import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import Card from "@/Components/Card";
import Search from "@/Components/Search";
import TableGlobalPerbulan from "./Components/TableGlobalPerbulan";

const Wilayah = ({ server_filter, batch_datas, ...props }) => {
    const [activeTab, setActiveTab] = useState(batch_datas[0]?.wilayah ?? null); // Mengatur tab pertama sebagai aktif
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const [loading, setLoading] = useState(false);

    return (
        <Authenticated loading={loading}>
            <Card judul="SKSW Per Wilayah">
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
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("sksw.wilayah")}
                                localState={"sksw_wilayah"}
                                availableMonth={true}
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
                            <TableGlobalPerbulan
                                data={item}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        </div>
                    ))}
                </div>
            </Card>
            <div className="mx-auto sm:px-6 lg:px-8 mb-6"></div>
        </Authenticated>
    );
};

export default Wilayah;
