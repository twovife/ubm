import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiFillEdit, AiFillSetting, AiOutlineDownload } from "react-icons/ai";
import ReactiveModal from "./Partials/ReactiveModal";

const ExEmployee = ({ branch, employee, ...props }) => {
    const firstData = employee.from;
    const linkPagination = () => {
        const maxPaginate = employee.last_page < 5 ? employee.last_page - 1 : 4;
        let generateLink = [];
        let startOn;
        if (employee.last_page < 5) {
            startOn = 1;
        }
        if (employee.current_page <= 3) {
            startOn = 1;
        } else if (employee.last_page - employee.current_page < 2) {
            startOn = employee.last_page - 4;
        } else {
            startOn = employee.current_page - 2;
        }

        for (let index = startOn; index <= startOn + maxPaginate; index++) {
            generateLink.push(employee.links[index]);
        }
        return generateLink;
    };

    const employees = employee.data;
    const [showReactiveModal, setshowReactiveModal] = useState({
        show: false,
        id: "",
    });

    const hideModalReactive = (e) => {
        setshowReactiveModal(false);
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Daftar Eks Karyawan
                    </h2>
                    <div className="ml-auto flex items-center">
                        <PrimaryButton
                            icon={<AiOutlineDownload />}
                            size={"md"}
                            title={"Tambah"}
                            onClick={() => alert("maaf menu ini belum ada")}
                        ></PrimaryButton>
                    </div>
                </>
            }
        >
            <Head title="Dashboard" />
            <ReactiveModal
                show={showReactiveModal.show}
                detailId={showReactiveModal.id}
                onClose={hideModalReactive}
                branch={branch}
            />

            <div className="py-3">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border p-6 text-main-800">
                            <div className="flex justify-between w-full items-center mb-6">
                                <div>
                                    <SelectList
                                        nullValue={true}
                                        options={[
                                            {
                                                id: 1,
                                                value: 1,
                                                display: "All",
                                            },
                                            {
                                                id: 2,
                                                value: 1,
                                                display: "Gresik 1",
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="ml-auto">
                                    <TextInput
                                        placeholder={"Cari Nama"}
                                        className={`px-6`}
                                    />
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6">
                                <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                    <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                        <tr>
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
                                                Action
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                NIP
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
                                                NIK
                                            </th>
                                            <th className="px-6 py-3">
                                                Alamat&nbsp;-&nbsp;Kota
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Tanggal&nbsp;Masuk
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
                                                Wilayah
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Cabang
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Jenis&nbsp;Jaminan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-rose-100"
                                            >
                                                Tanggal Berhenti
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-rose-100"
                                            >
                                                Keterangan Berhenti
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-rose-100"
                                            >
                                                Alasan Berhenti
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-rose-100"
                                            >
                                                Tanggal
                                                Pengambilan&nbsp;S.Sukarela
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-rose-100"
                                            >
                                                Petugas
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-rose-100"
                                            >
                                                Pengambilan
                                                Jaminan&nbsp;&&nbsp;S.Wajib
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-rose-100"
                                            >
                                                Petugas
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees &&
                                            employees.map((employee, key) => (
                                                <tr
                                                    key={employee.id}
                                                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                                >
                                                    <td className="px-6 py-4">
                                                        {key + firstData}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <PrimaryButton
                                                                onClick={() =>
                                                                    setshowReactiveModal(
                                                                        {
                                                                            show: true,
                                                                            id: employee.id,
                                                                        }
                                                                    )
                                                                }
                                                                theme="yellow"
                                                                size={"box"}
                                                                icon={
                                                                    <AiFillSetting />
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.nip}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {employee.nama_karyawan}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.nik}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {`${employee.alamat} - ${employee.kota}`}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {dayjs(
                                                            employee.hire_date
                                                        ).format("DD/MM/YYYY")}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {employee.area == 0
                                                            ? employee.jabatan
                                                            : `${employee.jabatan} ${employee.area}`}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {
                                                            employee.branch
                                                                .wilayah
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {employee.branch.unit}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.janis_jaminan}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.date_resign}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.resign_status}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.resign_reson}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            employee.pencairan_simpanan_date
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            employee.pencairan_simpanan_by
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            employee.handover_jaminan
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            employee.handover_jaminan_by
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                first_page_url={employee.first_page_url}
                                last_page_url={employee.last_page_url}
                                linkPagination={linkPagination()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default ExEmployee;
