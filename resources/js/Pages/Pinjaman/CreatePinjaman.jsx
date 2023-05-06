import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import ModalCreateNewCustomer from "./Partials/ModalCreateNewCustomer";
import ModalCreateOldCustomer from "./Partials/ModalCreateOldCustomer";

const CreatePinjaman = ({ customer, ...props }) => {
    console.log(props);
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
            route("unit.pinjaman.create"),
            { nik: searchNik },
            {
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
            }
        );
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Buat Pinjaman Baru
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            icon={<IoIosArrowBack />}
                            size={"md"}
                            title={"Kembali"}
                            type="a"
                            href={route(
                                "unit.pinjaman.request.requestPinjaman"
                            )}
                        ></LinkButton>
                    </div>
                </>
            }
        >
            <Loading show={loading} />
            <Head title="Data Pinjaman" />
            <div className="py-3">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border p-6 text-main-800">
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <form
                                        onSubmit={onSubmitKtp}
                                        className="max-w-md mb-3"
                                    >
                                        <InputLabel
                                            value={"Masukkan Nomor KTP"}
                                        />
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
                                    {customerData && (
                                        <>
                                            <div className="mb-6">
                                                <h1 className="text-lg font-semibold">
                                                    Data Customer
                                                </h1>
                                                <div className="flex w-full justify-between max-w-md border-b border-black/40 mb-2">
                                                    <div>NIK</div>
                                                    <div>
                                                        {customerData.nik}
                                                    </div>
                                                </div>
                                                <div className="flex w-full justify-between max-w-md border-b border-black/40 mb-2">
                                                    <div>Nomor KK</div>
                                                    <div>
                                                        {customerData.no_kk}
                                                    </div>
                                                </div>
                                                <div className="flex w-full justify-between max-w-md border-b border-black/40 mb-2">
                                                    <div>Nama</div>
                                                    <div>
                                                        {customerData.nama}
                                                    </div>
                                                </div>
                                            </div>
                                            {props.request && (
                                                <div className="mb-6">
                                                    <h1 className="text-lg font-semibold">
                                                        Request Berjalan
                                                    </h1>
                                                    <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                                        <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                                            <tr>
                                                                <th className="px-6 py-3">
                                                                    NIK
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Nama
                                                                    Customer
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Tanggal
                                                                    Permintaan
                                                                    Drop
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Hari
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Unit Pemberi
                                                                    Pinjaman
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {props.request.map(
                                                                (req) => (
                                                                    <tr>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req
                                                                                    .customer
                                                                                    .nik
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req
                                                                                    .customer
                                                                                    .nama
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req.tanggal_drop
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req.hari
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req
                                                                                    .branch
                                                                                    .unit
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req.status
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                            {props.pinjaman == null ? (
                                                <div className="mb-6">
                                                    <h1 className="text-lg font-semibold">
                                                        History Pinjaman
                                                    </h1>
                                                    <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                                        <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                                            <tr>
                                                                <th className="px-6 py-3">
                                                                    NIK
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Nama
                                                                    Customer
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Tanggal
                                                                    Permintaan
                                                                    Drop
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Hari
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Unit Pemberi
                                                                    Pinjaman
                                                                </th>
                                                                <th className="px-6 py-3">
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {props.pinjaman.map(
                                                                (req) => (
                                                                    <tr>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req
                                                                                    .customer
                                                                                    .nik
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req
                                                                                    .customer
                                                                                    .nama
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req.tanggal_drop
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req.hari
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req
                                                                                    .branch
                                                                                    .unit
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                req.status
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <div className="text-lg font-semibold">
                                                    Customer Belum Pernah
                                                    Melakukan Pinjaman
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {props.keyword && !customerData && (
                                        <div className="text-xl">
                                            Data Customer Tidak Ditemukan
                                        </div>
                                    )}
                                </div>
                                {props.keyword && !customerData && (
                                    <div className="flex-1">
                                        <ModalCreateNewCustomer
                                            nik={searchNik}
                                            auth={props.auth}
                                            employees={employeeLists}
                                        />
                                    </div>
                                )}
                                {customerData && (
                                    <div className="flex-1">
                                        <ModalCreateOldCustomer />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default CreatePinjaman;
