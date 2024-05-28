import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { NumericFormat } from "react-number-format";

const Detail = ({ details, curent_unit, ...props }) => {
    // const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        debit: 10000,
        transaction_date: "",
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
        post(route("bonpanjer.bon_panjer_post", curent_unit.id));
    };
    return (
        <Authenticated loading={processing}>
            <Card judul="Detail Bon Panjer">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.endContent className={`flex-wrap`}>
                            <div className="flex justify-end w-full">
                                <LinkButton
                                    as="button"
                                    href={route("bonpanjer.bon_panjer")}
                                    title={"Back"}
                                />
                            </div>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <div className="overflow-auto w-full">
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
                                        <td className="px-3 py-1 whitespace-nowrap">
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
                                            />
                                        </td>
                                        <td className="px-3 py-1">
                                            <NumericFormat
                                                value={item.pinjaman}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                            />
                                        </td>
                                        <td className="px-3 py-1">
                                            <NumericFormat
                                                value={item.saldo}
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
            </Card>
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
                                <InputLabel value={"Unit"} className="mb-1" />
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
                                    value={"Tanggal Transaksi"}
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
                                placeholder={"Inputkan angka tanpa sparator"}
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
        </Authenticated>
    );
};

export default Detail;
