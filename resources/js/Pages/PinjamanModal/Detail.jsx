import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { NumericFormat } from "react-number-format";
import Mutasi from "./Components/Mutasi";

const Detail = ({ details, curent_unit, ...props }) => {
    const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        debit: 0,
        jasa: (curent_unit.max_payment * 2) / 100,
        transaction_date: "",
    });

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, parseInt(value));
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        // console.log(data);
        post(route("pinjamanmodal.pinjaman_modal_post", curent_unit.id), {
            onSuccess: (page) => reset(),
        });
    };
    return (
        <Authenticated
            loading={processing || loading}
            auth={props.auth}
            errors={props.errors}
        >
            <Card
                judul={`Detail Pinjaman Modal ${
                    curent_unit.type_pinjaman == "PO" ? "Pak Hertawan" : "Pusat"
                }`}
            >
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.endContent className={`flex-wrap`}>
                            <LinkButton
                                href={route("unitsaving.index")}
                                title={"Simpanan 1JT"}
                                size={"sm"}
                                type="button"
                                className="block whitespace-nowrap"
                                theme="primary"
                            />
                            <LinkButton
                                href={route("bonpanjer.bon_panjer")}
                                title={"Bon Panjer"}
                                size={"sm"}
                                type="button"
                                className="block whitespace-nowrap"
                                theme="primary"
                            />
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <div className="p-3 bg-white rounded shadow w-full mb-3 overflow-auto">
                    <table className="w-full text-left text-gray-500 text-xs">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap">
                            <tr>
                                <th className="px-3 py-1">Nomor</th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Tanggal
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Wilayah
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Unit
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Nama Karyawan
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Jabatan
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Saldo Sebelum
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Angsuran
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Pinjaman
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Saldo
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-1 hover:bg-main-200 hover:text-black"
                                >
                                    Jasa modal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {details ? (
                                details.map((item, key) => (
                                    <tr className="even:bg-gray-100">
                                        <th className="px-3 py-1" key={key}>
                                            <td colSpan="2">{key + 1}</td>
                                        </th>
                                        <td className="px-3 py-1">
                                            {dayjs(
                                                item.transaction_date
                                            ).format("DD/MM/YYYY")}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.wilayah}
                                        </td>
                                        <td className="px-3 py-1 whitespace-nowrap">
                                            {item.unit}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.nama_karyawan}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.jabatan}
                                        </td>
                                        <td className="px-3 py-1 whitespace-nowrap">
                                            <NumericFormat
                                                value={item.saldo_sebelum}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                            />
                                        </td>
                                        <td className="px-3 py-1 whitespace-nowrap">
                                            <NumericFormat
                                                value={item.angsuran}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                            />
                                        </td>
                                        <td className="px-3 py-1 whitespace-nowrap">
                                            <NumericFormat
                                                value={item.pinjaman}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                            />
                                        </td>
                                        <td className="px-3 py-1 whitespace-nowrap">
                                            <NumericFormat
                                                value={item.saldo}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                            />
                                        </td>
                                        <td className="px-3 py-1 whitespace-nowrap">
                                            <NumericFormat
                                                value={item.jasa_modal}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">Data Not Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-start justify-center flex-col lg:flex-row gap-3">
                    <div className="flex-[3]">
                        <div className="p-3 bg-white rounded shadow w-full">
                            <div className="font-semibold text-gray-500 text-xl mb-3">
                                Transaksi Pinjaman
                            </div>
                            <form onSubmit={onSubmitForm} className="w-full">
                                <div className="lg:flex gap-2 w-full">
                                    <div className="mb-3 flex-1 w-full">
                                        <InputLabel
                                            value={"Wilayah"}
                                            className="mb-1"
                                        />
                                        <TextInput
                                            className="block w-full"
                                            disabled
                                            value={curent_unit.wilayah}
                                        />
                                    </div>

                                    <div className="mb-3 flex-1 w-full">
                                        <InputLabel
                                            value={"Unit"}
                                            className="mb-1"
                                        />
                                        <TextInput
                                            className="block w-full"
                                            disabled
                                            value={curent_unit.unit}
                                        />
                                    </div>

                                    <div className="mb-3 flex-1 w-full">
                                        <InputLabel
                                            value={"Nama Karyawan"}
                                            className="mb-1"
                                        />
                                        <TextInput
                                            className="block w-full"
                                            type="text"
                                            disabled
                                            value={curent_unit.nama_karyawan}
                                        />
                                    </div>

                                    <div className="mb-3 flex-1 w-full">
                                        <InputLabel
                                            value={"Bulan"}
                                            className="mb-1"
                                        />
                                        <TextInput
                                            className="block w-full"
                                            type="date"
                                            required
                                            name="transaction_date"
                                            min={curent_unit.awalbulan}
                                            max={curent_unit.akhirbulan}
                                            value={data.transaction_date}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="lg:flex gap-2 w-full">
                                    <div className="mb-3 flex-1 w-full">
                                        <InputLabel
                                            value={"Angsur"}
                                            className="mb-1"
                                        />
                                        <CurrencyInput
                                            name="debit"
                                            id="debit"
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={1}
                                            max={curent_unit.max_payment}
                                            required
                                            onValueChange={
                                                onHandleCurencyChange
                                            }
                                            value={data.debit}
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                        <InputError
                                            message={errors.debit}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-3 flex-1 w-full">
                                        <InputLabel
                                            value={"Jasa Modal 2%"}
                                            className="mb-1"
                                        />
                                        <CurrencyInput
                                            name="jasa"
                                            id="jasa"
                                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                            allowDecimals={false}
                                            prefix="Rp. "
                                            min={0}
                                            onValueChange={
                                                onHandleCurencyChange
                                            }
                                            value={data.jasa}
                                            placeholder={
                                                "Inputkan angka tanpa sparator"
                                            }
                                        />
                                        <InputError
                                            message={errors.debit}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <PrimaryButton type="submit" title={"submit"} />
                            </form>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Mutasi id={curent_unit.id} setLoading={setLoading} />
                    </div>
                </div>
            </Card>
        </Authenticated>
    );
};

export default Detail;
