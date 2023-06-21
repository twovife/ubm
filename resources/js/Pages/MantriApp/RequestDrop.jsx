import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import MobileLayout from "@/Layouts/MobileLayout";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import CreateNewCustomerModal from "./CreateNewCustomerModal";
import CreateOldCustomerModal from "./CreateOldCustomerModal";
import { Head, router } from "@inertiajs/react";
import OldCustomer from "./Partials/OldCustomer";
import NewCustomer from "./Partials/NewCustomer";

const RequestDrop = ({ customer, ...props }) => {
    const [customerData, setCustomerData] = useState(customer);
    const [loading, setLoading] = useState(false);
    const [searchNik, setSearchNik] = useState(props.keyword ?? "");

    const employeeLists = props.employees.map((emp) => {
        return {
            id: emp.id,
            value: emp.id,
            display: `${emp.nama_karyawan} - ${emp.jabatan} ${emp.area}`,
        };
    });
    const onKeywordChange = (e) => {
        setSearchNik(e.target.value);
    };
    const onSubmitKtp = (e) => {
        e.preventDefault();
        router.get(
            route("mantriapps.pinjaman.requestDrop"),
            { nik: searchNik },
            {
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
            }
        );
    };
    return (
        <MobileLayout
            auth={props.auth}
            errors={props.errors}
            header={<h1>Tambah Permohonan Drop / Pinjaman</h1>}
        >
            <Head title="Data Pinjaman" />
            <div className="py-3">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="py-3 px-6 text-main-800 rounded-md border mb-3">
                        <form onSubmit={onSubmitKtp}>
                            <InputLabel value={"Masukkan Nomor KTP"} />
                            <div className="flex items-baseline gap-3">
                                <TextInput
                                    className="mt-1 block w-full"
                                    name={"cek_ktp"}
                                    value={searchNik}
                                    onChange={onKeywordChange}
                                    id={"cek_ktp"}
                                />
                                <PrimaryButton
                                    size={"sm"}
                                    className="whitespace-nowrap"
                                    title={"Cek KTP"}
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                    {customerData && (
                        <>
                            <div className="py-3 px-6 text-main-800 rounded-md border mb-3">
                                <h1 className="text-lg font-semibold">
                                    Data Customer
                                </h1>
                                <div className="flex w-full justify-between border-b border-black/40 mb-2">
                                    <div>NIK</div>
                                    <div>{customerData.nik}</div>
                                </div>
                                <div className="flex w-full justify-between border-b border-black/40 mb-2">
                                    <div>Nomor KK</div>
                                    <div>{customerData.no_kk}</div>
                                </div>
                                <div className="flex w-full justify-between border-b border-black/40 mb-2">
                                    <div>Nama</div>
                                    <div>{customerData.nama}</div>
                                </div>
                            </div>
                            {props.request.length !== 0 && (
                                <div className="py-3 px-6 text-main-800 rounded-md border mb-3">
                                    <h1 className="text-lg font-semibold mb-3">
                                        Request Berjalan
                                    </h1>
                                    <div className="max-h-[30vh] overflow-y-auto">
                                        <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                            <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                                <tr>
                                                    <th className="px-6 py-3">
                                                        Drop
                                                    </th>
                                                    <th className="px-6 py-3">
                                                        Unit
                                                    </th>
                                                    <th className="px-6 py-3">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.request.map(
                                                    (req, key) => (
                                                        <tr key={key}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {
                                                                    req.tanggal_drop
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {
                                                                    req.branch
                                                                        .unit
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {req.status}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {props.pinjaman.length !== 0 ? (
                                <div className="py-3 px-6 text-main-800 rounded-md border mb-3">
                                    <h1 className="text-lg font-semibold mb-3">
                                        History Pinjaman
                                    </h1>
                                    <div className="max-h-[30vh] overflow-y-auto">
                                        <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                            <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                                <tr className="text-center">
                                                    <th className="px-6 py-3">
                                                        Drop
                                                    </th>
                                                    <th className="px-6 py-3">
                                                        Unit
                                                    </th>
                                                    <th className="px-6 py-3">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3">
                                                        Ket
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                {props.pinjaman.map(
                                                    (req, key) => (
                                                        <tr key={key}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {
                                                                    req.tanggal_drop
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {
                                                                    req.branch
                                                                        .unit
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 uppercase whitespace-nowrap">
                                                                {req.status}
                                                            </td>
                                                            <td className="px-6 py-4 uppercase  whitespace-nowrap">
                                                                {req.saldo == 0
                                                                    ? "Lunas"
                                                                    : "Belum Lunas"}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-3 px-6 rounded-md border mb-3 text-red-500 font-semibold">
                                    Customer Belum Pernah Melakukan Pinjaman
                                </div>
                            )}

                            <OldCustomer
                                nik={searchNik}
                                auth={props.auth}
                                employees={employeeLists}
                            />
                        </>
                    )}

                    {props.keyword && !customerData && (
                        <>
                            <div className="py-3 px-6 rounded-md border mb-3 text-red-500 font-semibold">
                                Data Customer Tidak Ditemukan
                            </div>

                            <div>
                                <NewCustomer
                                    nik={searchNik}
                                    auth={props.auth}
                                    employees={employeeLists}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
};

export default RequestDrop;
