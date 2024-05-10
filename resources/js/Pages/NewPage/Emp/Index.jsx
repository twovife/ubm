import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import useServerFilter from "@/Hooks/useServerFilter";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import Search from "./Component/Search";
import { Link } from "@inertiajs/react";
import { AiFillEdit, AiFillFilter } from "react-icons/ai";
import dayjs from "dayjs";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import FilterBox from "./Component/FilterBox";
import useFilter from "@/Hooks/useFilter";
import { IoMdCloseCircle } from "react-icons/io";

const Index = ({ server_filter, employees, ...props }) => {
    const [loading, setLoading] = useState(false);
    const {
        showFilter,
        setShowFilter,
        filter,
        setFilter,
        addFilter,
        setAddFilter,
    } = useFilter({
        employees,
    });

    return (
        <Authenticated loading={loading}>
            <FilterBox
                show={showFilter}
                setShow={setShowFilter}
                filter={filter}
                setFilter={setFilter}
                addFilter={addFilter}
                setAddFilter={setAddFilter}
            />
            <Card judul="Daftar Karyawan">
                <Card.subTitle>
                    <div className="flex justify-between gap-3 items-center">
                        <Card.startContent className={`flex-wrap`}>
                            <Card.filterItem filter={filter} />
                        </Card.startContent>
                        <Card.endContent>
                            <Search loading={loading} setLoading={setLoading} />
                            <PrimaryButton
                                className="block"
                                title={"Tambah Baru"}
                            />
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <div className="overflow-auto max-h-[50vh] lg:max-h-[70vh]">
                    <table className="w-full divide-y divide-gray-200 text-xs lg:text-sm relative z-0">
                        <thead className="sticky top-0 left-0 z-10">
                            <tr className="bg-gray-300 shadow-sm">
                                <td
                                    scope="col"
                                    className="sticky left-0 top-0 z-10 bg-inherit"
                                >
                                    <div className="grid grid-cols-5 gap-1 lg:w-[20vw] w-[40vw]">
                                        <div className="col-span-1 px-3 py-1.5 text-center">
                                            No
                                        </div>
                                        <div className="col-span-4 px-3 py-1.5">
                                            Nama
                                        </div>
                                    </div>
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Status
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    NIK
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap filterthis hover:cursor-pointer hover:bg-gray-500 hover:text-white"
                                    data-type="text"
                                    data-name="alamat"
                                >
                                    Alamat
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap filterthis hover:cursor-pointer hover:bg-gray-500 hover:text-white"
                                    data-type="date"
                                    data-name="hire_date"
                                >
                                    Tanggal Masuk
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Masa Kerja
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Unit
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Jabatan
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Jenis Jaminan
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Tanggal Pindah
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Keterangan Pindah
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    History Pindah
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Tanggal Berhenti
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Keterangan Berhenti
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Pencairan Simp.Wajib
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Petugas
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Pencairan Simp.Sukarela
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Petugas
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Pengambilan Jaminan
                                </td>
                                <td
                                    scope="col"
                                    className="px-3 py-1.5 whitespace-nowrap"
                                >
                                    Petugas
                                </td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 relative z-0">
                            {employees &&
                                employees.map((item, key) => (
                                    <tr
                                        key={key}
                                        className="odd:bg-white even:bg-gray-100 hover:bg-roman-50"
                                    >
                                        <td className="sticky left-0 top-0 z-10 bg-inherit">
                                            <div className="grid grid-cols-5 gap-1">
                                                <div className="col-span-1 px-3 py-1.5 whitespace-nowrap text-center">
                                                    <Link
                                                        href={route(
                                                            "emp.index"
                                                        )}
                                                        className="text-blue-500 hover:bg-blue-500 hover:text-white  focus:bg-blue-500 focus:text-white text-center px-1 py-0.5 rounded"
                                                    >
                                                        <span>{key + 1}</span>
                                                        <span className="hidden lg:inline-block ml-2">
                                                            Edit
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="col-span-4 px-3 py-1.5 whitespace-nowrap">
                                                    {item.nama}
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            className={`px-3 py-1.5 whitespace-nowrap`}
                                        >
                                            {item.status_karyawan == "Aktif" ? (
                                                <div className="bg-green-500 text-white text-center px-2 py-1 rounded">
                                                    {item.status_karyawan}
                                                </div>
                                            ) : item.status_karyawan ==
                                              "Resign" ? (
                                                <div className="bg-amber-400 text-white text-center px-2 py-1 rounded">
                                                    {item.status_karyawan}
                                                </div>
                                            ) : item.status_karyawan ==
                                              "Pecat" ? (
                                                <div className="bg-black text-white text-center px-2 py-1 rounded">
                                                    {item.status_karyawan}
                                                </div>
                                            ) : item.status_karyawan ==
                                              "belum-lengkap" ? (
                                                <div className="bg-blue-500 text-white text-center px-2 py-1 rounded">
                                                    {item.status_karyawan}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap">
                                            {item.nik}
                                        </td>
                                        <td className="px-3 py-1.5">
                                            <div className="w-44">
                                                {item.alamat}
                                            </div>
                                        </td>
                                        <td className="px-3 py-1.5 w-36 whitespace-nowrap">
                                            {item.hire_date
                                                ? dayjs(item.hire_date).format(
                                                      "DD-MM-YYYY"
                                                  )
                                                : "-"}
                                        </td>
                                        <td className="px-3 py-1.5 w-36 whitespace-nowrap">
                                            {`${item.masa_kerja} Th`}
                                        </td>
                                        <td className="px-3 py-1.5 w-36 whitespace-nowrap">
                                            {item.unit}
                                        </td>
                                        <td className="px-3 py-1.5 w-36 whitespace-nowrap">
                                            {item.jabatan}
                                        </td>
                                        <td className="px-3 py-1.5 w-36 whitespace-nowrap text-xs">
                                            {item.janis_jaminan}
                                        </td>

                                        <td
                                            scope="col"
                                            className="px-3 py-1.5 whitespace-nowrap"
                                        >
                                            {item.tanggal_perpindahan
                                                ? dayjs(
                                                      item.tanggal_perpindahan
                                                  ).format("DD-MM-YYYY")
                                                : ""}
                                        </td>
                                        <td scope="col" className="px-3 py-1.5">
                                            {item.keterangan_perpindahan}
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-3 py-1.5 whitespace-nowrap"
                                        >
                                            {item.history_perpindahan}
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-3 py-1.5 whitespace-nowrap"
                                        >
                                            {item.date_resign
                                                ? dayjs(
                                                      item.date_resign
                                                  ).format("DD-MM-YYYY")
                                                : ""}
                                        </td>
                                        <td scope="col" className="px-3 py-1.5">
                                            {item.resign_status}
                                        </td>
                                        <td
                                            scope="col"
                                            className="px-3 py-1.5 whitespace-nowrap"
                                        >
                                            {item.pencairan_simpanan_date
                                                ? dayjs(
                                                      item.pencairan_simpanan_date
                                                  ).format("DD-MM-YYYY")
                                                : ""}
                                        </td>
                                        <td scope="col" className="px-3 py-1.5">
                                            {item.pencairan_simpanan_by}
                                        </td>

                                        <td
                                            scope="col"
                                            className="px-3 py-1.5 whitespace-nowrap"
                                        >
                                            {item.pencairan_simpanan_w_date
                                                ? dayjs(
                                                      item.pencairan_simpanan_w_date
                                                  ).format("DD-MM-YYYY")
                                                : ""}
                                        </td>
                                        <td scope="col" className="px-3 py-1.5">
                                            {item.pencairan_simpanan_w_by}
                                        </td>

                                        <td
                                            scope="col"
                                            className="px-3 py-1.5 whitespace-nowrap"
                                        >
                                            {item.handover_jaminan
                                                ? dayjs(
                                                      item.handover_jaminan
                                                  ).format("DD-MM-YYYY")
                                                : ""}
                                        </td>
                                        <td scope="col" className="px-3 py-1.5">
                                            {item.handover_jaminan_by}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Authenticated>
    );
};

export default Index;
