import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import CustomerCreateModal from "./Partials/CustomerCreateModal";

const CustomerGlobal = ({ branch, employees, customers, ...props }) => {
    const { data } = customers;
    const [showCreateCustomer, setShowCreateCustomer] = useState(false);

    const hideCreateCustomer = (e) => {
        setShowCreateCustomer(false);
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Management User
                    </h2>
                    <div className="ml-auto flex items-center">
                        <PrimaryButton
                            icon={<IoMdAdd />}
                            size={"md"}
                            title={"Tambah Customer"}
                            onClick={() => setShowCreateCustomer(true)}
                        ></PrimaryButton>
                    </div>
                </>
            }
        >
            <Head title="Management User" />

            <div className="py-3">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border p-6 text-main-800">
                            <div className="flex justify-between w-full items-center mb-6">
                                <div className="ml-auto">
                                    <TextInput
                                        name="search"
                                        placeholder={"Cari Nama"}
                                        className={`px-6`}
                                        // value={search}
                                        // onChange={(e) =>
                                        //     setSearch(e.target.value)
                                        // }
                                    />
                                </div>
                                <div>
                                    <PrimaryButton
                                        size={"box"}
                                        icon={<AiOutlineSearch />}
                                        className="ml-2"
                                        // onClick={onClickSearch}
                                    />
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6">
                                <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                    <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                        <tr className="text-center">
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nomor
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama Nasabah
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                No KK Nasabah
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                NIK Nasabah
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Jumlah Pinjaman
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Area
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                History
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((customer, key) => (
                                                <tr
                                                    className="text-center"
                                                    key={key}
                                                >
                                                    <td className="px-6 py-4">
                                                        {key + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {customer.nama}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {customer.nik}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {customer.no_kk}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {customer.alamat}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                first_page_url={customers.first_page_url}
                                last_page_url={customers.last_page_url}
                                last_page={customers.last_page}
                                current_page={customers.current_page}
                                links={customers.links}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <CustomerCreateModal
                show={showCreateCustomer}
                onClose={hideCreateCustomer}
                employees={employees}
            />
        </Authenticated>
    );
};

export default CustomerGlobal;
