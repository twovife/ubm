import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import BranchCreate from "./Partials/BranchCreate";

const Branches = ({ branch, ...props }) => {
    const { data } = branch;
    const [showCreate, setShowCreate] = useState(false);
    const onHideCreate = (e) => {
        setShowCreate(false);
    };
    const [search, setSearch] = useState();
    console.log(search);
    console.log(props);

    const onClickSearch = (e) => {
        router.get(route("administrator.branches.index"), {
            search: search,
        });
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Daftar Unit UBM
                    </h2>
                    <div className="ml-auto flex items-center">
                        <PrimaryButton
                            icon={<IoMdAdd />}
                            size={"md"}
                            title={"Tambah"}
                            onClick={() => setShowCreate(true)}
                        ></PrimaryButton>
                    </div>
                </>
            }
        >
            <Head title="Dashboard" />

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
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <PrimaryButton
                                        size={"box"}
                                        icon={<AiOutlineSearch />}
                                        className="ml-2"
                                        onClick={onClickSearch}
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
                                                Wilayah
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Unit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Is Active
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((branch, key) => (
                                                <tr
                                                    className="text-center"
                                                    key={key}
                                                >
                                                    <td className="px-6 py-4">
                                                        {key + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {branch.wilayah}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {branch.unit}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {branch.isactive == 1
                                                            ? "Aktiv"
                                                            : "Tutup"}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                first_page_url={branch.first_page_url}
                                last_page_url={branch.last_page_url}
                                last_page={branch.last_page}
                                current_page={branch.current_page}
                                links={branch.links}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <BranchCreate show={showCreate} onClose={onHideCreate} />
        </Authenticated>
    );
};

export default Branches;
