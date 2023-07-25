import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import ContentWrap from "@/Components/ContentWrap";
import TextInput from "@/Components/TextInput";
import CurrencyInput from "react-currency-input-field";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import Loading from "@/Components/Loading";
import Checkbox from "@/Components/Checkbox";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import LinkButton from "@/Components/LinkButton";

const EditKeterangan = ({ loanrequest, ...props }) => {
    const { data, setData, put, processing, errors } = useForm({
        mantri: loanrequest.mantri,
        tanggal_drop: loanrequest.tanggal_drop,
        pinjaman: loanrequest.pinjaman,
        pembayaran_date: loanrequest.loan
            ? loanrequest.loan.last_angsuran
                ? loanrequest.loan.last_angsuran.pembayaran_date
                : ""
            : "",
        jumlah: loanrequest.loan
            ? loanrequest.loan.last_angsuran
                ? loanrequest.loan.last_angsuran.jumlah
                : ""
            : "",
        danatitipan: loanrequest.loan
            ? loanrequest.loan.last_angsuran
                ? loanrequest.loan.last_angsuran.danatitipan
                : ""
            : "",
    });

    const setValue = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const [showDelete, setShowDelete] = useState(false);
    const hideDelete = () => {
        setShowDelete(false);
    };

    const employeeLists = props.employees.map((emp) => {
        return {
            id: emp.id,
            value: emp.id,
            display: `${emp.nama_karyawan} - ${emp.jabatan} ${emp.area}`,
        };
    });

    const onSubmitRevisi = (e) => {
        e.preventDefault();
        put(route("unit.pinjaman.request.update", loanrequest.id));
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Revisi Pinjaman
                    </h2>
                    <Head title="Management User" />
                    <div className="ml-auto flex items-center gap-3">
                        <LinkButton
                            href={route("unit.pinjaman.request.bukutransaksi")}
                            title={"Back"}
                        />
                        <PrimaryButton
                            title={"Delete"}
                            onClick={() => setShowDelete(true)}
                            theme="red"
                        />
                    </div>
                </>
            }
        >
            <div className="p-4 relative">
                <div
                    onClick={hideDelete}
                    className={`w-full h-full fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center ${
                        showDelete ? "" : "hidden"
                    }`}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-md bg-white w-full shadow border border-gray-200 rounded p-6"
                    >
                        <div className="font-semibold">
                            Menghapus Data juga akan menghapus Angsuran dan
                            Pinjaman yang berkaitan.
                        </div>
                        <div className="flex gap-3 items-center justify-end">
                            <PrimaryButton
                                title={"Batal"}
                                onClick={hideDelete}
                            />
                            <LinkButton
                                as="button"
                                title={"Hapus"}
                                theme="red"
                                href={route(
                                    "unit.pinjaman.request.destroy",
                                    loanrequest.id
                                )}
                                method="delete"
                            />
                        </div>
                    </div>
                </div>
                <Loading show={processing} />
                <ContentWrap>
                    <div className="grid lg:grid-cols-3 gap-3 mb-6">
                        <form
                            onSubmit={onSubmitRevisi}
                            className="col-span-1 border p-4 shadow rounded relative"
                        >
                            {/* {loanrequest.loan.last_angsuran && (
                                <div className="w-full h-full absolute bg-white/20 top-0 left-0 flex justify-center items-center">
                                    <h1 className="text-3xl">
                                        Data Tidak Dapat Diubah
                                    </h1>
                                </div>
                            )} */}
                            <h1 className="mb-3 font-semibold">Revisi Data</h1>
                            <div className="mb-3">
                                <InputLabel
                                    value={"Tanggal Drop"}
                                    className="mb-1"
                                />
                                <TextInput
                                    name="tanggal_drop"
                                    type="date"
                                    onChange={setValue}
                                    className="w-full"
                                    value={data.tanggal_drop}
                                />
                            </div>
                            <div className="mb-3">
                                <InputLabel
                                    value={"Mantri & Kelompok"}
                                    className="mb-1"
                                />
                                <SelectList
                                    options={employeeLists}
                                    name="mantri"
                                    type="date"
                                    onChange={setValue}
                                    className="w-full"
                                    value={data.mantri}
                                />
                            </div>
                            <div className="mb-3">
                                <PrimaryButton
                                    title={"Update"}
                                    type="submit"
                                    className="ml-auto"
                                />
                            </div>
                            <div className="mb-3 text-sm text-gray-400 italic">
                                NB:
                                <ul className="list-disc px-4">
                                    <li>
                                        Merubah Mantri akan mempengaruhi
                                        perubahan area.
                                    </li>
                                    <li>
                                        Hanya dapat diubah ketika pinjaman belum
                                        pernah diangsur.
                                    </li>
                                </ul>
                            </div>
                        </form>

                        <form
                            onSubmit={onSubmitRevisi}
                            className="col-span-1 border p-4 shadow rounded relative"
                        >
                            {loanrequest.loan && (
                                <>
                                    {/* {loanrequest.loan.last_angsuran && (
                                        <div className="w-full h-full absolute bg-white/20 top-0 left-0 flex justify-center items-center">
                                            <h1 className="text-3xl">
                                                Data Tidak Dapat Diubah
                                            </h1>
                                        </div>
                                    )} */}
                                    <h1 className="mb-3 font-semibold">
                                        Revisi Drop
                                    </h1>
                                    <div className="mb-3">
                                        <InputLabel
                                            value={"Tanggal Drop"}
                                            className="mb-1"
                                        />
                                        <CurrencyInput
                                            name="pinjaman"
                                            id="pinjaman"
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full mt-2`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={1}
                                            required
                                            onValueChange={
                                                onHandleCurencyChange
                                            }
                                            value={data.pinjaman}
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <PrimaryButton
                                            type="submit"
                                            title={"Update"}
                                            className="ml-auto"
                                        />
                                    </div>
                                    <div className="mb-3 text-sm text-gray-400 italic">
                                        NB:
                                        <ul className="list-disc px-4">
                                            <li>
                                                Merubah DROP akan mempengaruhi
                                                Besar Pinjaman.
                                            </li>
                                            <li>
                                                Drop Hanya dapat diubah ketika
                                                pinjaman belum pernah diangsur.
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </form>
                        <form
                            onSubmit={onSubmitRevisi}
                            className="col-span-1 border p-4 shadow rounded"
                        >
                            {loanrequest.loan &&
                                loanrequest.loan.last_angsuran && (
                                    <>
                                        <h1 className="mb-3 font-semibold">
                                            Revisi Angsuran
                                        </h1>
                                        <div className="mb-3">
                                            <InputLabel
                                                value={"Tanggal Angsuran"}
                                                className="mb-1"
                                            />
                                            <TextInput
                                                name="tanggal_drop"
                                                type="date"
                                                disabled
                                                className="w-full"
                                                value={data.pembayaran_date}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel
                                                value={"Tanggal Drop"}
                                                className="mb-1"
                                            />
                                            <CurrencyInput
                                                name="jumlah"
                                                id="jumlah"
                                                className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full mt-2`}
                                                allowDecimals={false}
                                                prefix="Rp. "
                                                min={1}
                                                required
                                                onValueChange={
                                                    onHandleCurencyChange
                                                }
                                                value={data.jumlah}
                                                placeholder={
                                                    "Inputkan angka tanpa sparator"
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="flex items-center">
                                                <Checkbox
                                                    name="danatitipan"
                                                    value={data.danatitipan}
                                                    onChange={setValue}
                                                />
                                                <span className="ml-2 text-sm text-gray-600">
                                                    Dana Titipan DO?
                                                </span>
                                            </label>
                                        </div>
                                        <div className="mb-3">
                                            <PrimaryButton
                                                title={"Update"}
                                                type="submit"
                                                className="ml-auto"
                                            />
                                        </div>
                                        <div className="mb-3 text-sm text-gray-400 italic">
                                            NB:
                                            <ul className="list-disc px-4">
                                                <li>
                                                    Hanya Angsuran Terakhir yang
                                                    dapat di edit.
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                        </form>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-3">
                        <div className="col-span-1 border p-4 shadow rounded">
                            <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                    <tr>
                                        {/* id, customer_id, branch_id, mantri, kelompok, hari, pinjaman, tanggal_drop, approved_date, approved_by, status, created_at, updated_at */}
                                        <th className="px-6 py-3" colSpan={"2"}>
                                            Data Buku Transaksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-green-200 text-black">
                                        <th className="px-6 py-3">
                                            ID Customer
                                        </th>
                                        <td className="px-6 py-3">
                                            {loanrequest.id}
                                        </td>
                                    </tr>
                                    <tr className="bg-green-200 text-black">
                                        <th className="px-6 py-3">
                                            Nama Nasabah
                                        </th>
                                        <td className="px-6 py-3">
                                            <div>
                                                {loanrequest.customer.nama}
                                            </div>
                                            <div className="font-thin italic">
                                                {loanrequest.customer.nik}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-3">
                                            Tanggal Permintaan Drop
                                        </th>
                                        <td className="px-6 py-3">
                                            {loanrequest.tanggal_drop}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th className="px-6 py-3">
                                            Hari / Kelompok
                                        </th>
                                        <td className="px-6 py-3">
                                            <div>{`${loanrequest.hari} / ${loanrequest.kelompok} `}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-3">
                                            Jumlah Permintaan Drop
                                        </th>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <NumericFormat
                                                value={loanrequest.pinjaman}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-span-1 border p-4 shadow rounded">
                            <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                    <tr>
                                        {/* id, customer_id, branch_id, mantri, kelompok, hari, pinjaman, tanggal_drop, approved_date, approved_by, status, created_at, updated_at */}
                                        <th className="px-6 py-3" colSpan={"2"}>
                                            Data Pinjaman
                                        </th>
                                    </tr>
                                </thead>
                                {loanrequest.loan && (
                                    <tbody>
                                        <tr>
                                            <th className="px-6 py-3">
                                                Tanggal Drop
                                            </th>
                                            <td className="px-6 py-3">
                                                {loanrequest.loan.tanggal_drop}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-6 py-3">
                                                Hari / Kelompok
                                            </th>
                                            <td className="px-6 py-3">
                                                <div>{`${loanrequest.loan.hari} / ${loanrequest.loan.kelompok} `}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-6 py-3">
                                                Jumlah Permintaan Drop
                                            </th>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <NumericFormat
                                                    value={
                                                        loanrequest.loan.drop
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-6 py-3">
                                                Jumlah Pinjaman
                                            </th>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <NumericFormat
                                                    value={
                                                        loanrequest.loan
                                                            .pinjaman
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-6 py-3">
                                                Saldo Pinjaman
                                            </th>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <NumericFormat
                                                    value={
                                                        loanrequest.loan.saldo
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                        <div className="col-span-1 border p-4 shadow rounded">
                            <table className="w-full text-xs text-left text-main-500 dark:text-main-400">
                                <thead className="text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400 text-center">
                                    <tr>
                                        {/* id, customer_id, branch_id, mantri, kelompok, hari, pinjaman, tanggal_drop, approved_date, approved_by, status, created_at, updated_at */}
                                        <th className="px-3 py-3">Tanggal</th>
                                        <th className="px-3 py-3">
                                            Jumlah Angsuran
                                        </th>
                                        <th className="px-3 py-3">
                                            Total Angsuran
                                        </th>
                                        <th className="px-3 py-3">
                                            Saldo Terakhir
                                        </th>
                                    </tr>
                                </thead>
                                {loanrequest.loan &&
                                    loanrequest.loan.last_angsuran && (
                                        <tbody>
                                            {loanrequest.loan.angsuran.map(
                                                (item, index) => (
                                                    <tr>
                                                        <th className="px-3 py-3">
                                                            {dayjs(
                                                                item.pembayaran_date
                                                            ).format("DD-MM")}
                                                        </th>
                                                        <td className="px-3 py-3 whitespace-nowrap">
                                                            <NumericFormat
                                                                value={
                                                                    item.jumlah
                                                                }
                                                                displayType={
                                                                    "text"
                                                                }
                                                                thousandSeparator={
                                                                    ","
                                                                }
                                                                prefix={"Rp. "}
                                                            />
                                                        </td>
                                                        <td className="px-3 py-3 whitespace-nowrap">
                                                            <NumericFormat
                                                                value={
                                                                    item.total_angsuran
                                                                }
                                                                displayType={
                                                                    "text"
                                                                }
                                                                thousandSeparator={
                                                                    ","
                                                                }
                                                                prefix={"Rp. "}
                                                            />
                                                        </td>
                                                        <td className="px-3 py-3 whitespace-nowrap">
                                                            <NumericFormat
                                                                value={
                                                                    item.saldo_terakhir
                                                                }
                                                                displayType={
                                                                    "text"
                                                                }
                                                                thousandSeparator={
                                                                    ","
                                                                }
                                                                prefix={"Rp. "}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    )}
                            </table>
                        </div>
                    </div>
                </ContentWrap>
            </div>
        </Authenticated>
    );
};

export default EditKeterangan;
