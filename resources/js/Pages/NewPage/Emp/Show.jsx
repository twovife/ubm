import Card from "@/Components/Card";
import InputLabel from "@/Components/InputLabel";
import SelectList from "@/Components/SelectList";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { BiEdit, BiUser } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { NumericFormat } from "react-number-format";
import Perpindahan from "./Components/Perpindahan";

const Show = ({ employee, deposit_sksw, branches, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [isShowPerpindahan, setIsShowPerpindahan] = useState(false);
    const onPerpindahanButtonClicked = () => {
        setIsShowPerpindahan(!isShowPerpindahan);
    };

    return (
        <Authenticated loading={loading}>
            <Card judul={`Profil Karyawan`}>
                <div className="lg:flex mt-2 gap-3">
                    <div className="flex-1">
                        <div className="p-2">
                            <div className="rounded-full border bg-red-400 h-32 w-32 mx-auto flex items-center justify-center overflow-hidden text-white mb-3">
                                <BiUser className="w-full h-full" />
                            </div>
                            <div className="flex gap-3 mb-3 items-center justify-center">
                                {employee.resign_status == null ||
                                employee.resign_status == "" ? (
                                    <span className="bg-green-400 text-white text-sm px-2 py-1 rounded-full">
                                        # Active
                                    </span>
                                ) : employee.resign_status == "Resign" ? (
                                    <span className="bg-yellow-400 text-white text-sm px-2 py-1 rounded-full">
                                        # Resign
                                    </span>
                                ) : (
                                    <span className="bg-black text-white text-sm px-2 py-1 rounded-full">
                                        # Pecat
                                    </span>
                                )}
                                {employee.janis_jaminan == "" ||
                                employee.janis_jaminan == null ? (
                                    <span className="bg-blue-400 text-white text-sm px-2 py-1 rounded-full">
                                        # Jaminan Belum Lengkap
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="rounded-md shadow p-3 border space-y-3 mb-3 text-sm">
                                <div className="text-end space-x-2">
                                    <button
                                        onClick={onPerpindahanButtonClicked}
                                        className="text-xs bg-roman-400 hover:bg-roman-600 text-white px-2 py-1 rounded ring ring-roman-200 hover:ring-roman-400"
                                    >
                                        Pindah Karyawan
                                    </button>
                                    <button className="text-xs border border-green-400 hover:bg-green-600 text-green-500 hover:text-white px-2 py-1 rounded ring ring-green-100 hover:ring-green-300">
                                        Edit Profil
                                    </button>
                                </div>
                                <div className="flex gap-1">
                                    <div className="basis-2/6 break-all">
                                        Nama
                                    </div>
                                    <div className="basis-1/6 text-center">
                                        :
                                    </div>
                                    <div className="basis-3/6 break-all">
                                        {employee.nama_karyawan}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="basis-2/6 break-all">
                                        NIK
                                    </div>
                                    <div className="basis-1/6 text-center">
                                        :
                                    </div>
                                    <div className="basis-3/6 break-all">
                                        {employee.nik}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="basis-2/6 break-all">
                                        Alamat
                                    </div>
                                    <div className="basis-1/6 text-center">
                                        :
                                    </div>
                                    <div className="basis-3/6 break-all text-xs">
                                        {employee.alamat}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="basis-2/6 break-all">
                                        Tanggal Masuk
                                    </div>
                                    <div className="basis-1/6 text-center">
                                        :
                                    </div>
                                    <div className="basis-3/6 break-all">
                                        {dayjs(employee.hire_Date).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="basis-2/6 break-all">
                                        Jabatan
                                    </div>
                                    <div className="basis-1/6 text-center">
                                        :
                                    </div>
                                    <div className="basis-3/6 break-all">
                                        {employee.jabatan == "mantri"
                                            ? `${employee.jabatan} ${employee.area}`
                                            : employee.jabatan}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="basis-2/6 break-all">
                                        Unit
                                    </div>
                                    <div className="basis-1/6 text-center">
                                        :
                                    </div>
                                    <div className="basis-3/6 break-all">
                                        {employee.branch.unit}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="basis-2/6 break-all">
                                        Jenis Jaminan
                                    </div>
                                    <div className="basis-1/6 text-center">
                                        :
                                    </div>
                                    <div className="basis-3/6 break-all">
                                        {employee.janis_jaminan}
                                    </div>
                                </div>
                            </div>
                            {employee.date_resign && (
                                <div className="rounded-md shadow p-3 border space-y-3 text-sm">
                                    <div className="flex gap-1">
                                        <div className="basis-2/6 break-all">
                                            Tanggal Resign
                                        </div>
                                        <div className="basis-1/6 text-center">
                                            :
                                        </div>
                                        <div className="basis-3/6 break-all">
                                            {dayjs(employee.date_resign).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="basis-2/6 break-all">
                                            Resign Status
                                        </div>
                                        <div className="basis-1/6 text-center">
                                            :
                                        </div>
                                        <div className="basis-3/6 break-all">
                                            {employee.resign_status}
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="basis-2/6 break-all">
                                            Tanggal Resign
                                        </div>
                                        <div className="basis-1/6 text-center">
                                            :
                                        </div>
                                        <div className="basis-3/6 break-all">
                                            {employee.resign_reson}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-[4]">
                        <div className="p-2 flex lg:flex-row flex-col gap-3">
                            <div className="border shadow rounded-md p-3 flex-1">
                                <div className="text-2xl font-semibold text-gray-400 mb-2">
                                    SKSW
                                </div>
                                <div className="overflow-auto rounded">
                                    <table className="w-full border-2 shadow text-xs">
                                        <thead className="bg-gray-200 text-center">
                                            <tr>
                                                <td className="px-2 py-1">
                                                    Show
                                                </td>
                                                <td className="px-2 py-1">
                                                    Saldo SK
                                                </td>
                                                <td className="px-2 py-1">
                                                    Saldo Sw
                                                </td>
                                                <td className="px-2 py-1">
                                                    Total Saldo
                                                </td>
                                                <td className="px-2 py-1">
                                                    Tanggal Terakhir Angsuran
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            <tr>
                                                <td className="px-2 py-1">
                                                    <Link className="bg-green-500 hover:bg-green-600 text-white p-1 rounded">
                                                        Edit
                                                    </Link>
                                                </td>
                                                <td className="px-2 py-1">
                                                    <NumericFormat
                                                        value={
                                                            deposit_sksw.saldo_sk
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={","}
                                                    />
                                                </td>
                                                <td className="px-2 py-1">
                                                    <NumericFormat
                                                        value={
                                                            deposit_sksw.saldo_sw
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={","}
                                                    />
                                                </td>
                                                <td className="px-2 py-1">
                                                    <NumericFormat
                                                        value={
                                                            deposit_sksw.saldo_sw +
                                                            deposit_sksw.saldo_sk
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={","}
                                                    />
                                                </td>
                                                <td className="px-2 py-1">
                                                    {deposit_sksw.max_tanggal
                                                        ? dayjs(
                                                              deposit_sksw.max_tanggal
                                                          ).format("DD-MM-YYYY")
                                                        : "-"}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="border shadow rounded-md p-3 flex-1">
                                <div className="text-2xl font-semibold text-gray-400 mb-2">
                                    History
                                </div>
                                <div className="overflow-auto rounded">
                                    <table className="w-full border-2 shadow text-xs">
                                        <thead className="bg-gray-200 text-center">
                                            <tr>
                                                <td className="px-2 py-1">
                                                    Tanggal
                                                </td>
                                                <td className="px-2 py-1">
                                                    Keterangan
                                                </td>
                                                <td className="px-2 py-1">
                                                    Record
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {employee.histories?.map((item) => (
                                                <tr>
                                                    <td className="px-2 py-1">
                                                        {dayjs(
                                                            item.history_date
                                                        ).format("DD/MM/YYYY")}
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        {item.keterangan}
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        {item.record}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="border shadow rounded-md p-3 flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-2xl font-semibold text-gray-400">
                                        PENGAMBILAN
                                    </div>
                                    <div>
                                        <button
                                            onClick={onPerpindahanButtonClicked}
                                            className="text-xs bg-roman-400 hover:bg-roman-600 text-white px-2 py-1 rounded ring ring-roman-200 hover:ring-roman-400"
                                        >
                                            Pindah Karyawan
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-auto rounded">
                                    <table className="w-full border-2 shadow text-xs">
                                        <thead className="bg-gray-200 text-center">
                                            <tr>
                                                <td className="px-2 py-1">
                                                    Pengambilan SW
                                                </td>
                                                <td className="px-2 py-1">
                                                    Petugas
                                                </td>
                                                <td className="px-2 py-1">
                                                    Pengambilan SK
                                                </td>
                                                <td className="px-2 py-1">
                                                    Petugas
                                                </td>
                                                <td className="px-2 py-1">
                                                    Pengembalian Jaminan
                                                </td>
                                                <td className="px-2 py-1">
                                                    Petugas
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            <tr>
                                                <td className="px-2 py-2">
                                                    {employee.pencairan_simpanan_w_date ? (
                                                        dayjs(
                                                            employee.pencairan_simpanan_w_date
                                                        ).format("DD-MM-YYYY")
                                                    ) : (
                                                        <button
                                                            onClick={
                                                                onPerpindahanButtonClicked
                                                            }
                                                            className="text-xs bg-roman-400 hover:bg-roman-600 text-white px-2 py-1 rounded ring ring-roman-200 hover:ring-roman-400"
                                                        >
                                                            Pengambilan SW
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-2 py-1">
                                                    {
                                                        employee.pencairan_simpanan_by
                                                    }
                                                </td>
                                                <td className="px-2 py-1">
                                                    {employee.pencairan_simpanan_date ? (
                                                        dayjs(
                                                            employee.pencairan_simpanan_date
                                                        ).format("DD-MM-YYYY")
                                                    ) : (
                                                        <button
                                                            onClick={
                                                                onPerpindahanButtonClicked
                                                            }
                                                            className="text-xs bg-roman-400 hover:bg-roman-600 text-white px-2 py-1 rounded ring ring-roman-200 hover:ring-roman-400"
                                                        >
                                                            Pengambilan SK
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-2 py-1">
                                                    {
                                                        employee.pencairan_simpanan_by
                                                    }
                                                </td>
                                                <td className="px-2 py-1">
                                                    {employee.handover_jaminan ? (
                                                        dayjs(
                                                            employee.handover_jaminan
                                                        ).format("DD-MM-YYYY")
                                                    ) : (
                                                        <button
                                                            onClick={
                                                                onPerpindahanButtonClicked
                                                            }
                                                            className="text-xs bg-roman-400 hover:bg-roman-600 text-white px-2 py-1 rounded ring ring-roman-200 hover:ring-roman-400"
                                                        >
                                                            Pengembalian Jaminan
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-2 py-1">
                                                    {
                                                        employee.handover_jaminan_by
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Pengambilan SKSW belum ada editnya</li>
                        <li>Edit Profil</li>
                        <li>Ganti Status Saja</li>
                    </ul>
                </div>
            </Card>
            <Perpindahan
                show={isShowPerpindahan}
                setShow={onPerpindahanButtonClicked}
                isActive={employee.resign_status == ""}
            />
        </Authenticated>
    );
};

export default Show;