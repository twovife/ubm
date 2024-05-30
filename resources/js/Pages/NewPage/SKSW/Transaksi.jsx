import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { NumericFormat } from "react-number-format";
import Mutasi from "./Components/Mutasi";
import Card from "@/Components/Card";
import ButtonWrapper from "@/Components/ButtonWrapper";

const Transaksi = ({
    branch,
    datas,
    employees,
    deposit,
    validating,
    ...props
}) => {
    const [loading, setLoading] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        saldo_awal_sk: 0,
        nominal_sk: 0,
        saldo_awal_sw: 0,
        nominal_sw: 0,
        transaction_date: "",
        transaction: "",
        transaction_type: "",
        income_note: "Setoran Awal",
    });

    useEffect(() => {
        setData({
            ...data,
            saldo_awal_sk: deposit.sk_balance,
            saldo_awal_sw: deposit.sw_balance,
        });
    }, [deposit]);

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
            const jenisdetail = [
                {
                    id: 1,
                    value: "K",
                    display: "Pengambilan SK",
                },
            ];
            if (deposit.status_karyawan == "Resign") {
                jenisdetail.push({
                    id: 2,
                    value: "KRMD",
                    display: "Kredit Resign / MD",
                });
            }
            setDetailJenis(jenisdetail);
        }
    };

    const onChangeJenisTransaksi = (e) => {
        const { name, value } = e.target;
        if (value === "KRMD") {
            setData({
                ...data,
                nominal_sw: parseInt(deposit.sw_balance),
                nominal_sk: parseInt(deposit.sk_balance),
                [name]: value,
            });
        } else {
            setData(name, value);
        }
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(data);
        put(route("sksw.addtransaksi", deposit.id), {
            onSuccess: (page) => {
                reset();
            },
        });
    };

    return (
        <Authenticated loading={processing || loading}>
            <Card judul="Transaksi SKSW">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.startContent className={`flex-wrap mb-3 lg:mb-0`}>
                            <p className="text-xs">
                                * jika ada debit dan kredit dalam satu bulan,
                                cara input disendirikan ( setelah debit baru
                                kredit / sebaliknya)
                            </p>
                            <p className="text-xs">
                                *Jika Terjadi Kesalahan Input bisa hubungi tim
                                IT ( jangan mengurangi transaksi jika memang
                                tidak ada transaksi kredit )
                            </p>
                        </Card.startContent>
                        <Card.endContent className={`flex-wrap`}>
                            <ButtonWrapper>
                                <LinkButton
                                    href={route("sksw.dashboard")}
                                    title={"Halaman Utama"}
                                    className="inline-block"
                                />
                            </ButtonWrapper>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
            </Card>
            <div className="p-5 mt-3 bg-gray-50 rounded shadow overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 shadow rounded">
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
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Saldo SW Sebelumnya
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Debit SW
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Kredit SW
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Saldo SW
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Setoran SW(D)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Debit Mutasi SW(D)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Pengambilan SW(K)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Kredit Mutasi SW(K)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold"
                            >
                                Kredit Resign / MD SW(K)
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Saldo SK Sebelumnya
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Debit SK
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Kredit SK
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Saldo SK
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Setoran SK(D)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Debit Mutasi SK(D)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Pengambilan SK(K)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Kredit Mutasi SK(K)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold"
                            >
                                Kredit Resign / MD SK(K)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((item, key) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={key}
                            >
                                <td className="px-6 py-4">{item.wilayah}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.unit}
                                </td>
                                <td className="px-6 py-4">
                                    {dayjs(item?.transaction_date).format(
                                        "MMM"
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {dayjs(item?.transaction_date).format(
                                        "DD-MM-YYYY"
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-gray-100">
                                    <NumericFormat
                                        value={item.sw_balance_before}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-green-100 text-black">
                                    <NumericFormat
                                        value={item.sw_debit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap bg-red-100 text-black">
                                    <NumericFormat
                                        value={item.sw_kredit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-green-200 text-black font-semibold">
                                    <NumericFormat
                                        value={item.sw_saldo}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.D_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.DM_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.K_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.KM_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.KRMD_sw}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap bg-gray-50">
                                    <NumericFormat
                                        value={item.sk_balance_before}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-green-100 text-black">
                                    <NumericFormat
                                        value={item.sk_debit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-red-100 text-black">
                                    <NumericFormat
                                        value={item.sk_kredit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-green-200 text-black font-semibold">
                                    <NumericFormat
                                        value={item.sk_saldo}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.D_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.DM_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.K_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.KM_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap bg-blue-100">
                                    <NumericFormat
                                        value={item.KRMD_sk}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mx-auto sm:px-6 lg:px-8 mb-6">
                <div className="p-3 bg-white rounded shadow mt-3">
                    <div className="lg:flex justify-start items-start gap-3">
                        <div className="mb-3 flex-1">
                            <InputLabel value={"Nama Karyawan"} />
                            <TextInput
                                type={"text"}
                                disabled
                                value={deposit.nama_karyawan}
                                name="transaction_date"
                                className="w-full uppercase"
                            />
                        </div>
                        <div className="mb-3 flex-1">
                            <InputLabel value={"Unit Sekarang"} />
                            <TextInput
                                type={"text"}
                                disabled
                                value={deposit.unit}
                                name="transaction_date"
                                className="w-full"
                            />
                        </div>
                        <div className="mb-3 flex-1">
                            <InputLabel value={"Status Karyawan"} />
                            <TextInput
                                type={"text"}
                                disabled
                                value={deposit.status_karyawan}
                                name="transaction_date"
                                className="w-full"
                            />
                        </div>
                        <div className="mb-3 flex-1">
                            <InputLabel value={"Status SKSW"} />
                            <TextInput
                                type={"text"}
                                disabled
                                value={deposit.status_sksw}
                                name="transaction_date"
                                className="w-full"
                            />
                        </div>
                        <div className="mb-3 flex-1"></div>
                        <div className="mb-3 flex-1"></div>
                    </div>
                </div>
                {deposit.status_sksw == "Active" && (
                    <>
                        <div className="p-3 bg-white rounded shadow mt-3">
                            <form onSubmit={onSubmitForm}>
                                <span className="font-semibold mb-3">
                                    Transaksi
                                </span>
                                <div className="lg:flex justify-start items-start gap-3">
                                    <div className="mb-3 flex-1">
                                        <InputLabel
                                            value={"Tanggal Transaksi"}
                                        />
                                        <TextInput
                                            type={"month"}
                                            required
                                            max={validating.max_date}
                                            min={validating.min_date}
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
                                            onChange={onChangeJenisTransaksi}
                                            options={detailJenis}
                                        />
                                    </div>

                                    <div className="flex-[2] flex gap-3">
                                        <div className="flex-1">
                                            <div className="mb-3">
                                                <InputLabel
                                                    value={
                                                        "Saldo Simpanan Wajib"
                                                    }
                                                />
                                                <CurrencyInput
                                                    name="saldo_awal_sw"
                                                    id="saldo_awal_sw"
                                                    className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed`}
                                                    allowDecimals={false}
                                                    prefix="Rp. "
                                                    min={1}
                                                    readOnly
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
                                                    className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed`}
                                                    allowDecimals={false}
                                                    prefix="Rp. "
                                                    min={1}
                                                    readOnly
                                                    required
                                                    value={
                                                        data.transaction == "D"
                                                            ? parseInt(
                                                                  data.saldo_awal_sw
                                                              ) +
                                                              parseInt(
                                                                  data.nominal_sw
                                                              )
                                                            : parseInt(
                                                                  data.saldo_awal_sw
                                                              ) -
                                                              parseInt(
                                                                  data.nominal_sw
                                                              )
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
                                                    value={
                                                        "Saldo Simpanan Sukarela"
                                                    }
                                                />
                                                <CurrencyInput
                                                    name="saldo_awal_sk"
                                                    id="saldo_awal_sk"
                                                    className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed`}
                                                    allowDecimals={false}
                                                    prefix="Rp. "
                                                    min={1}
                                                    required
                                                    readOnly
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
                                                    className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed`}
                                                    allowDecimals={false}
                                                    prefix="Rp. "
                                                    readOnly
                                                    min={1}
                                                    required
                                                    value={
                                                        data.transaction == "D"
                                                            ? parseInt(
                                                                  data.saldo_awal_sk
                                                              ) +
                                                              parseInt(
                                                                  data.nominal_sk
                                                              )
                                                            : parseInt(
                                                                  data.saldo_awal_sk
                                                              ) -
                                                              parseInt(
                                                                  data.nominal_sk
                                                              )
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
                                    <PrimaryButton
                                        title={"Submit"}
                                        type="submit"
                                    />
                                </div>
                            </form>
                        </div>
                        <Mutasi />
                    </>
                )}
            </div>
        </Authenticated>
    );
};

export default Transaksi;
