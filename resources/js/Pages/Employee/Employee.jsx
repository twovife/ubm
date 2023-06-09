import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ActionModal from "./Partials/ActionModal";
import CreateModal from "./Partials/CreateModal";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import ModalAlert from "@/Components/ModalAlert";
import LinkButton from "@/Components/LinkButton";

const Employee = ({ branch, employee, ...props }) => {
    const firstData = employee.from;
    const employees = employee.data;
    const [filterData, setFilterData] = useState({
        branch_id: "",
        is_active: "",
        search: "",
        ...props.filters,
    });

    const [loadings, setLoadings] = useState(false);

    const [showModalAction, setShowModalAction] = useState({
        show: false,
        data: "",
    });
    const onSelectChange = (e) => {
        setLoadings(true);
        const data = {
            ...filterData,
            [e.target.name]: e.target.value,
        };

        router.get(
            route("employee.index", {
                data,
            })
        );
    };
    const branchList = branch.sort().map((unit) => {
        return {
            id: unit.id,
            display: unit.unit,
            value: unit.id,
        };
    });

    const hideModalAction = (e) => {
        setShowModalAction({
            show: false,
            data: "",
        });
    };

    const filterFillChange = (e) => {
        setFilterData({
            ...filterData,
            search: e.target.value,
        });
    };

    const searchsubmit = (e) => {
        setLoadings(true);
        e.preventDefault();
        const dataValue = document.getElementById("searchFill");
        const data = {
            ...filterData,
            search: dataValue.value,
        };
        router.get(
            route("employee.index", {
                data,
                onProgress: (progress) => {
                    console.log("asd");
                },
            })
        );
    };

    const [alertModal, setAlertModal] = useState({
        show: false,
        textAlert: null,
        typeAlert: null,
    });

    const hideAlertModal = (e) => {
        setAlertModal(false);
    };

    useEffect(() => {
        if (props.flash.message) {
            setAlertModal({
                show: true,
                textAlert: props.flash.message,
                typeAlert: "success",
            });
        }
        if (props.errors[0]) {
            setAlertModal({
                show: true,
                textAlert: props.errors[0],
                typeAlert: "danger",
            });
        }
    }, []);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Daftar Karyawan
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            as="a"
                            href={route("employee.create")}
                            icon={<IoMdAdd />}
                            size={"md"}
                            title={"Tambah"}
                        ></LinkButton>
                    </div>
                </>
            }
        >
            <ModalAlert alertParams={alertModal} onClose={hideAlertModal} />
            <Head title="Dashboard" />
            <Loading show={loadings} />

            <div className="py-3">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border p-6 text-main-800">
                            <div className="flex justify-between w-full items-center mb-6">
                                <div className="flex gap-3 items-center">
                                    <InputLabel
                                        value={"Unit :"}
                                        className="font-semibold"
                                    />
                                    <SelectList
                                        value={filterData.branch_id}
                                        name="branch_id"
                                        onChange={onSelectChange}
                                        nullValue={true}
                                        options={branchList}
                                    />
                                </div>

                                <div className="ml-3 flex gap-3 items-center">
                                    <InputLabel
                                        value={"Status Karyawan :"}
                                        className="font-semibold"
                                    />
                                    <SelectList
                                        value={filterData.is_active}
                                        name="is_active"
                                        onChange={onSelectChange}
                                        nullValue={true}
                                        options={[
                                            {
                                                id: 1,
                                                value: 1,
                                                display: "Aktiv",
                                            },
                                            {
                                                id: 2,
                                                value: 2,
                                                display: "Keluar",
                                            },
                                        ]}
                                    />
                                </div>

                                <div className="ml-auto">
                                    <form
                                        className="flex gap-3"
                                        onSubmit={searchsubmit}
                                    >
                                        <TextInput
                                            placeholder={"Cari Nama"}
                                            id="searchFill"
                                            className={`px-6`}
                                            onChange={filterFillChange}
                                            value={filterData.search}
                                        />
                                        <PrimaryButton
                                            type="submit"
                                            title={"search"}
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6">
                                <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                    <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                        <tr>
                                            <th className="px-6 py-3">Nomor</th>
                                            <th className="px-6 py-3">
                                                Action
                                            </th>
                                            <th className="px-6 py-3">NIP</th>
                                            <th className="px-6 py-3">
                                                Nama Karyawan
                                            </th>
                                            <th className="px-6 py-3">NIK</th>
                                            <th className="px-6 py-3">
                                                <span className="px-32">
                                                    Alamat
                                                </span>
                                            </th>
                                            <th className="px-6 py-3">
                                                Tanggal&nbsp;Masuk
                                            </th>
                                            <th className="px-6 py-3">
                                                Lama&nbsp;Bekerja
                                            </th>
                                            <th className="px-6 py-3">
                                                Jabatan
                                            </th>
                                            <th className="px-6 py-3">
                                                Wilayah
                                            </th>
                                            <th className="px-6 py-3">
                                                Cabang
                                            </th>
                                            <th className="px-6 py-3">
                                                Jenis&nbsp;Jaminan
                                            </th>
                                            <th className="px-6 py-3 bg-gray-200">
                                                Tanggal Perpindahan
                                            </th>
                                            <th className="px-6 py-3 bg-gray-200">
                                                History Perpindahan
                                            </th>
                                            <th className="px-6 py-3 bg-gray-200">
                                                Keterangan&nbsp;Perpindahan
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Tanggal Berhenti
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Keterangan Berhenti
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Tanggal
                                                Pengambilan&nbsp;S.Sukarela
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Petugas
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Tanggal Pengambilan&nbsp;S.Wajib
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Petugas
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Pengambilan Jaminan
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Petugas
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees &&
                                            employees.map((employee, key) => (
                                                <tr
                                                    key={employee.id}
                                                    className={`border-b dark:bg-gray-900 dark:border-gray-700 ${
                                                        employee.resign_status ==
                                                        "Resign"
                                                            ? "bg-yellow-200"
                                                            : employee.resign_status ==
                                                              "Pecat"
                                                            ? "bg-red-200"
                                                            : employee.janis_jaminan ==
                                                                  null ||
                                                              employee.janis_jaminan ==
                                                                  ""
                                                            ? "bg-blue-200"
                                                            : "bg-white"
                                                    }`}
                                                >
                                                    <td className="px-6 py-4">
                                                        {key + firstData}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <LinkButton
                                                                as="a"
                                                                href={route(
                                                                    "employee.action",
                                                                    employee.id
                                                                )}
                                                                theme="yellow"
                                                                size={"sm"}
                                                                title={"Edit"}
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
                                                        {employee.alamat}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {dayjs(
                                                            employee.hire_date
                                                        ).format("DD/MM/YYYY")}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Math.floor(
                                                            dayjs().diff(
                                                                employee.hire_date,
                                                                "year",
                                                                true
                                                            )
                                                        )}
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
                                                        {employee.history &&
                                                            employee.history
                                                                .history_date}
                                                    </td>
                                                    <td className="px-6 py-4 uppercase">
                                                        {employee.history &&
                                                            employee.history
                                                                .keterangan}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.history &&
                                                            employee.history
                                                                .record}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.date_resign}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.resign_status}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            employee.pencairan_simpanan_date
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.ttdss
                                                            ? employee.ttdss
                                                                  .nama_karyawan
                                                            : ""}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            employee.pencairan_simpanan_w_date
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.ttdsw
                                                            ? employee.ttdsw
                                                                  .nama_karyawan
                                                            : ""}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            employee.handover_jaminan
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {employee.ttdjaminan
                                                            ? employee
                                                                  .ttdjaminan
                                                                  .nama_karyawan
                                                            : ""}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination data={employee} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Employee;
