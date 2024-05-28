import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import LinkButton from "@/Components/LinkButton";
import SelectList from "@/Components/SelectList";
import { router } from "@inertiajs/react";
import { BiRefresh } from "react-icons/bi";
import useBulanFilter from "@/Hooks/useBulanFilter";
import PrimaryButton from "@/Components/PrimaryButton";
import TableDetailPerbulan from "./Components/TableDetailPerbulan";
import Card from "@/Components/Card";
import Search from "@/Components/Search";

const Unit = ({ branch, server_filters, batch_datas, ...props }) => {
    const [activeTab, setActiveTab] = useState(
        batch_datas[0]?.branch_id ?? null
    ); // Mengatur tab pertama sebagai aktif
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const [loading, setLoading] = useState(false);

    return (
        <Authenticated loading={loading}>
            <Card judul="SKSW Per Unit">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <div className="flex items-center justify-start flex-1">
                            {batch_datas.length > 0 ? (
                                <>
                                    <ul className="tab-list flex justify-start gap-3 flex-wrap w-full">
                                        {batch_datas.map((item) => (
                                            <li
                                                key={item.branch_id}
                                                className={`tab ${
                                                    activeTab === item.branch_id
                                                        ? "active bg-main-400 ring-2 ring-main-500"
                                                        : ""
                                                } px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`}
                                                onClick={() =>
                                                    handleTabClick(
                                                        item.branch_id
                                                    )
                                                }
                                            >
                                                {item.unit}
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
                                urlLink={route("sksw.unit")}
                                localState={"sksw_unit"}
                                FilterWilayahOnly={true}
                                availableMonth={true}
                            />
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <div className="tab-content mt-3">
                    {batch_datas.map((item) => (
                        <div
                            key={item.branch_id}
                            className={
                                activeTab === item.branch_id
                                    ? "active"
                                    : "hidden"
                            }
                        >
                            <TableDetailPerbulan
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

export default Unit;
