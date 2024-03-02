import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import useBulanFilter from "@/Hooks/useBulanFilter";
import SelectList from "@/Components/SelectList";
import PrimaryButton from "@/Components/PrimaryButton";
import LinkButton from "@/Components/LinkButton";
import { BiRefresh } from "react-icons/bi";
import { router } from "@inertiajs/react";
import TableGlobalPerbulan from "./Components/TableGlobalPerbulan";

const Wilayah = ({ server_filters, batch_datas, ...props }) => {
    const [activeTab, setActiveTab] = useState(batch_datas[0]?.wilayah ?? null); // Mengatur tab pertama sebagai aktif

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const [loading, setLoading] = useState(false);

    const { bulanAngka, tahunAngka } = useBulanFilter();
    const [serverFilter, setServerFilter] = useState({
        transaction_month: parseInt(server_filters.transaction_month) ?? null,
        transaction_year: parseInt(server_filters.transaction_year) ?? null,
    });

    const onServerFilterChange = (e) => {
        const { value, name } = e.target;
        setServerFilter({ ...serverFilter, [name]: value });
    };
    const onBranchChange = (e) => {
        e.preventDefault();
        // console.log(serverFilter);
        setLoading(true);
        router.visit(route("sksw.wilayah"), {
            data: { ...serverFilter },
        });
    };

    return (
        <Authenticated
            loading={loading}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Daftar Simpanan Wajib Karyawan
                    </h2>
                    <form
                        onSubmit={onBranchChange}
                        className="ml-auto flex gap-3 items-center"
                    >
                        <SelectList
                            value={serverFilter.transaction_month}
                            options={bulanAngka}
                            name={"transaction_month"}
                            nullValue={true}
                            className={"text-sm"}
                            onChange={onServerFilterChange}
                        />
                        <SelectList
                            value={serverFilter.transaction_year}
                            options={tahunAngka}
                            name={"transaction_year"}
                            nullValue={true}
                            className={"text-sm"}
                            onChange={onServerFilterChange}
                        />

                        <PrimaryButton
                            href={route("sksw.wilayah")}
                            title={"Go"}
                            size={"sm"}
                            type="submit"
                            theme="green"
                        />

                        <LinkButton
                            href={route("sksw.wilayah")}
                            title={"Reset"}
                            size={"sm"}
                            theme="other"
                            type="submit"
                            icon={<BiRefresh />}
                        />
                    </form>
                </>
            }
        >
            <div className="mx-auto sm:px-6 lg:px-8 mb-6">
                {batch_datas.length > 0 ? (
                    <>
                        <ul className="tab-list flex justify-start gap-3">
                            {batch_datas.map((item) => (
                                <li
                                    key={item.wilayah}
                                    className={`tab ${
                                        activeTab === item.wilayah
                                            ? "active bg-main-400 ring-2 ring-main-500"
                                            : ""
                                    } px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`}
                                    onClick={() => handleTabClick(item.wilayah)}
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
                                    <TableGlobalPerbulan
                                        data={item}
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
        </Authenticated>
    );
};

export default Wilayah;
