import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { NumericFormat } from "react-number-format";

const Detail = ({ details, curent_unit, ...props }) => {
    // const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        debit: 10000,
        transaction_date: curent_unit.now,
    });

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        // console.log(data);
        post(route("bonpanjer.bon_panjer_post", curent_unit.id));
    };
    return (
        <Authenticated
            loading={processing}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Detail Pinjaman Modal
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            as="button"
                            href={route("bonpanjer.bon_panjer")}
                            title={"Back"}
                        />
                    </div>
                </>
            }
        >
            <div className="sm:px-6 lg:px-8">
                <div className="p-3 bg-white rounded shadow max-w-6xl mx-auto mb-3">
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
                                            {item.transaction_date}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.wilayah}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.unit}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.nama_karyawan}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.jabatan}
                                        </td>
                                        <td className="px-3 py-1">
                                            <NumericFormat
                                                value={item.saldo_sebelum}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                        <td className="px-3 py-1">
                                            <NumericFormat
                                                value={item.angsuran}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                        <td className="px-3 py-1">
                                            <NumericFormat
                                                value={item.pinjaman}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                        <td className="px-3 py-1">
                                            <NumericFormat
                                                value={item.saldo}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
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
                {curent_unit.editable && (
                    <div className="p-3 bg-white rounded shadow max-w-6xl mx-auto">
                        <form onSubmit={onSubmitForm} className="w-full">
                            <div className="lg:flex gap-2 w-full">
                                <div className="mb-2 flex-1 w-full">
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

                                <div className="mb-2 flex-1 w-full">
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

                                <div className="mb-2 flex-1 w-full">
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

                                <div className="mb-2 flex-1 w-full">
                                    <InputLabel
                                        value={"Bulan"}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        className="block w-full"
                                        type="month"
                                        disabled
                                        value={curent_unit.now}
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <InputLabel value={"Angsur"} className="mb-1" />
                                <CurrencyInput
                                    name="debit"
                                    id="debit"
                                    className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                    allowDecimals={false}
                                    prefix="Rp. "
                                    min={1}
                                    required
                                    onValueChange={onHandleCurencyChange}
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
                            <PrimaryButton type="submit" title={"submit"} />
                        </form>
                    </div>
                )}
            </div>
        </Authenticated>
    );
};

export default Detail;
