import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import RegisterUserModal from "./Partials/RegisterUserModal";

export default function Index({ users, employees, unit, ...props }) {
    console.log(props);
    const { data } = users;
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const onHideRegisterModal = () => {
        setShowRegisterModal(false);
    };
    return (
        <AuthenticatedLayout
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
                            title={"Register"}
                            onClick={() => setShowRegisterModal(true)}
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
                                                Username
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama Karyawan
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
                                                Jabatan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Role
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.map((user, key) => (
                                                <tr
                                                    className="text-center"
                                                    key={key}
                                                >
                                                    <td className="px-6 py-4">
                                                        {key + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user.username}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            user.employee
                                                                .nama_karyawan
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            user.employee.branch
                                                                .unit
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {`${
                                                            user.employee
                                                                .jabatan
                                                        } ${
                                                            user.employee
                                                                .area == 0
                                                                ? ""
                                                                : user.employee
                                                                      .area
                                                        } `}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                first_page_url={users.first_page_url}
                                last_page_url={users.last_page_url}
                                last_page={users.last_page}
                                current_page={users.current_page}
                                links={users.links}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <RegisterUserModal
                show={showRegisterModal}
                onClose={onHideRegisterModal}
                employees={employees}
                unit={unit}
            />
        </AuthenticatedLayout>
    );
}
