import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Mutasi from "./Component/Mutasi";
import { MdDelete } from "react-icons/md";

const Transaksi = ({ branch, employees, deposit, ...props }) => {
    const [loading, setLoading] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        saldo_awal_sk: deposit.sk_balance,
        nominal_sk: 0,
        saldo_awal_sw: deposit.sw_balance,
        nominal_sw: 0,
        transaction_date: "",
        transaction: "",
        transaction_type: "",
        income_note: "Setoran Awal",
    });

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, parseInt(value));
    };

    const [detailJenis, setDetailJenis] = useState();
    const onJenisChange = (e) => {
        setDetailJenis(null);
        const { value, name } = e.target;

        if (value === "D") {
            setDetailJenis([
                {
                    id: 1,
                    value: "D",
                    display: "Debit / Setor",
                },
            ]);
            setData({ ...data, nominal_sw: 100000, [name]: value });
        }

        if (value === "K") {
            setData(name, value);
            setDetailJenis([
                {
                    id: 1,
                    value: "K",
                    display: "Pengambilan Sukarela",
                },
                {
                    id: 2,
                    value: "KRMD",
                    display: "Kredit Resign / MD",
                },
            ]);
        }
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(data);
        put(route("simpanan.addtransaksi", deposit.id));
    };

    const [activeTab, setActiveTab] = useState(1); // Mengatur tab pertama sebagai aktif

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <Authenticated
            loading={processing || loading}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Transaksi Simpanan
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            href={route("simpanan.index")}
                            title={"Halaman Utama"}
                        />
                    </div>
                </>
            }
        >
            <div className="mx-auto sm:px-6 lg:px-8 mb-6">
                <ul className="tab-list flex justify-start gap-3">
                    <li
                        className={`tab ${
                            activeTab === 1
                                ? "active bg-main-400 ring-2 ring-main-500"
                                : ""
                        } px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`}
                        onClick={() => handleTabClick(1)}
                    >
                        Simpanan Wajib
                    </li>
                    <li
                        className={`tab ${
                            activeTab === 2
                                ? "active bg-main-400 ring-2 ring-main-500"
                                : ""
                        } px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`}
                        onClick={() => handleTabClick(2)}
                    >
                        Simpanan Sukarela
                    </li>
                </ul>

                <div className="tab-content mt-3">
                    <div className={activeTab === 1 ? "active" : "hidden"}>
                        <div className="p-3 bg-white rounded shadow">
                            <div className="relative overflow-x-auto max-h-[50vh]">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Wilayah
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Unit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Bulan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Tanggal Transaksi
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Saldo Sebelumnya
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Debit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Kredit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Saldo
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Setoran (D)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Debit Mutasi (D)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Pengambilan Sukarela (K)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Kredit Mutasi (K)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Kredit Resign / MD (K)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deposit.mandatorytrasactions.map(
                                            (item, key) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={key}
                                                >
                                                    <td className="px-6 py-4">
                                                        {item.branch.wilayah}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.branch.unit}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {dayjs(
                                                            item?.transaction_date
                                                        ).format("MMM")}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {dayjs(
                                                            item?.transaction_date
                                                        ).format("DD-MM-YYYY")}
                                                    </td>
                                                    <td className="px-6 py-4 bg-gray-200">
                                                        {item.balance_before}
                                                    </td>
                                                    <td className="px-6 py-4 bg-green-200">
                                                        {item.debit}
                                                    </td>
                                                    <td className="px-6 py-4 bg-red-200">
                                                        {item.kredit}
                                                    </td>
                                                    <td className="px-6 py-4 bg-emerald-100">
                                                        {item.balance}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "D"
                                                            ? item.debit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "DM"
                                                            ? item.debit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "K"
                                                            ? item.kredit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "KM"
                                                            ? item.kredit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "KRMD"
                                                            ? item.kredit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-blue-100">
                                                        {key ==
                                                            deposit
                                                                .mandatorytrasactions
                                                                .length -
                                                                1 && (
                                                            <LinkButton
                                                                href={route(
                                                                    "simpanan.destroysw",
                                                                    item.id
                                                                )}
                                                                type="button"
                                                                method="delete"
                                                                title={"Delete"}
                                                            />
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={activeTab === 2 ? "active" : "hidden"}>
                        <div className="p-3 bg-white rounded shadow">
                            <div className="relative overflow-x-auto max-h-[50vh]">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Wilayah
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Unit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Bulan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Tanggal Transaksi
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Saldo Sebelumnya
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Debit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Kredit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Saldo
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Setoran (D)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Debit Mutasi (D)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Pengambilan Sukarela (K)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Kredit Mutasi (K)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Kredit Resign / MD (K)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deposit.optionaltrasactions.map(
                                            (item, key) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={key}
                                                >
                                                    <td className="px-6 py-4">
                                                        {item.branch.wilayah}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.branch.unit}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {dayjs(
                                                            item?.transaction_date
                                                        ).format("MMM")}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {dayjs(
                                                            item?.transaction_date
                                                        ).format("DD-MM-YYYY")}
                                                    </td>
                                                    <td className="px-6 py-4 bg-gray-200">
                                                        {item.balance_before}
                                                    </td>
                                                    <td className="px-6 py-4 bg-green-200">
                                                        {item.debit}
                                                    </td>
                                                    <td className="px-6 py-4 bg-red-200">
                                                        {item.kredit}
                                                    </td>
                                                    <td className="px-6 py-4 bg-emerald-100">
                                                        {item.balance}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "D"
                                                            ? item.debit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "DM"
                                                            ? item.debit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "K"
                                                            ? item.kredit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "KM"
                                                            ? item.kredit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-yellow-100">
                                                        {item.transaction_type ==
                                                        "KRMD"
                                                            ? item.kredit
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 bg-blue-100">
                                                        {key ==
                                                            deposit
                                                                .optionaltrasactions
                                                                .length -
                                                                1 && (
                                                            <LinkButton
                                                                href={route(
                                                                    "simpanan.destroysk",
                                                                    item.id
                                                                )}
                                                                type="button"
                                                                method="delete"
                                                                title={"Delete"}
                                                            />
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-white rounded shadow mt-3">
                    <div className="lg:flex justify-start items-start gap-3">
                        <div className="mb-3 flex-1">
                            <InputLabel value={"Nama Karyawan"} />
                            <TextInput
                                type={"text"}
                                disabled
                                value={deposit.employee.nama_karyawan}
                                name="transaction_date"
                                className="w-full uppercase"
                            />
                        </div>
                        <div className="mb-3 flex-1">
                            <InputLabel value={"Unit Sekarang"} />
                            <TextInput
                                type={"text"}
                                disabled
                                value={deposit.branch.unit}
                                name="transaction_date"
                                className="w-full"
                            />
                        </div>
                        <div className="mb-3 flex-1"></div>
                        <div className="mb-3 flex-1"></div>
                    </div>
                </div>
                <div className="p-3 bg-white rounded shadow mt-3">
                    <form onSubmit={onSubmitForm}>
                        <span className="font-semibold mb-3">Transaksi</span>
                        <div className="lg:flex justify-start items-start gap-3">
                            <div className="mb-3 flex-1">
                                <InputLabel value={"Tanggal Transaksi"} />
                                <TextInput
                                    type={"month"}
                                    required
                                    onChange={onInputChange}
                                    name="transaction_date"
                                    className="w-full"
                                />
                            </div>
                            <div className="mb-3 flex-1">
                                <InputLabel value={"Jenis Transaksi"} />
                                <SelectList
                                    className={"w-full"}
                                    nullValue={true}
                                    required
                                    name={"transaction"}
                                    value={data.transaction}
                                    onChange={onJenisChange}
                                    options={[
                                        {
                                            id: 1,
                                            value: "D",
                                            display: "Debit",
                                        },
                                        {
                                            id: 2,
                                            value: "K",
                                            display: "Kredit",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="mb-3 flex-1">
                                <InputLabel value={"Jenis Transaksi"} />
                                <SelectList
                                    className={"w-full"}
                                    nullValue={true}
                                    name={"transaction_type"}
                                    required
                                    onChange={onInputChange}
                                    options={detailJenis}
                                />
                            </div>

                            <div className="flex-[2] flex gap-3">
                                <div className="flex-1">
                                    <div className="mb-3">
                                        <InputLabel
                                            value={"Saldo Simpanan Wajib"}
                                        />
                                        <CurrencyInput
                                            name="saldo_awal_sw"
                                            id="saldo_awal_sw"
                                            readOnly
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={1}
                                            required
                                            onValueChange={
                                                onHandleCurencyChange
                                            }
                                            value={data.saldo_awal_sw}
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel
                                            value={
                                                "Nominal Transaksi Simpanan Wajib"
                                            }
                                        />
                                        <CurrencyInput
                                            name="nominal_sw"
                                            id="nominal_sw"
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={1}
                                            required
                                            onValueChange={
                                                onHandleCurencyChange
                                            }
                                            value={data.nominal_sw}
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel
                                            value={
                                                "Saldo Akhir Transaksi Simpanan Wajib"
                                            }
                                        />
                                        <CurrencyInput
                                            name="sw_balance"
                                            id="sw_balance"
                                            readOnly
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={1}
                                            required
                                            value={
                                                data.transaction == "D"
                                                    ? parseInt(
                                                          data.saldo_awal_sw
                                                      ) +
                                                      parseInt(data.nominal_sw)
                                                    : parseInt(
                                                          data.saldo_awal_sw
                                                      ) -
                                                      parseInt(data.nominal_sw)
                                            }
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="mb-3">
                                        <InputLabel
                                            value={"Saldo Simpanan Sukarela"}
                                        />
                                        <CurrencyInput
                                            name="saldo_awal_sk"
                                            readOnly
                                            id="saldo_awal_sk"
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={1}
                                            required
                                            onValueChange={
                                                onHandleCurencyChange
                                            }
                                            value={data.saldo_awal_sk}
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel
                                            value={
                                                "Nominal Transaksi Simpanan Sukarela"
                                            }
                                        />
                                        <CurrencyInput
                                            name="nominal_sk"
                                            id="nominal_sk"
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={1}
                                            required
                                            onValueChange={
                                                onHandleCurencyChange
                                            }
                                            value={data.nominal_sk}
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputLabel
                                            value={
                                                "Saldo Akhir Transaksi Simpanan Sukarela"
                                            }
                                        />
                                        <CurrencyInput
                                            name="sk_balance"
                                            id="sk_balance"
                                            readOnly
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={1}
                                            required
                                            value={
                                                data.transaction == "D"
                                                    ? parseInt(
                                                          data.saldo_awal_sk
                                                      ) +
                                                      parseInt(data.nominal_sk)
                                                    : parseInt(
                                                          data.saldo_awal_sk
                                                      ) -
                                                      parseInt(data.nominal_sk)
                                            }
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <PrimaryButton title={"Submit"} type="submit" />
                        </div>
                    </form>
                </div>
                <Mutasi />
            </div>
        </Authenticated>
    );
};

export default Transaksi;
