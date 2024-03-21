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
        debit: 1500000,
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
        // console.log(data);
        post(route("bop.update", curent_unit.id));
    };
    return (
        <Authenticated
            loading={processing}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Detail Pembayaran BOP
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            as="button"
                            href={route("unitsaving.index")}
                            title={"Back"}
                        />
                    </div>
                </>
            }
        >
            <div className="sm:px-6 lg:px-8">
                <div className="p-3 bg-white rounded shadow max-w-6xl mx-auto mb-3">
                    <table className="w-full text-xs text-left text-gray-500">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap">
                            <tr>
                                <th className="px-6 py-4">Nomor</th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 hover:bg-main-200 hover:text-black"
                                >
                                    Bulan
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 hover:bg-main-200 hover:text-black"
                                >
                                    Wilayah
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 hover:bg-main-200 hover:text-black"
                                >
                                    Unit
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 hover:bg-main-200 hover:text-black"
                                >
                                    Saldo Sebelum
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 hover:bg-main-200 hover:text-black"
                                >
                                    Simpanan
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 hover:bg-main-200 hover:text-black"
                                >
                                    Saldo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {details ? (
                                details.map((item, key) => (
                                    <tr className="even:bg-gray-100">
                                        <th className="px-6 py-1" key={key}>
                                            <td colSpan="2">{key + 1}</td>
                                        </th>
                                        <td className="px-6 py-1">
                                            {item.tanggal}
                                        </td>
                                        <td className="px-6 py-1">
                                            {item.wilayah}
                                        </td>
                                        <td className="px-6 py-1">
                                            {item.unit}
                                        </td>
                                        <td className="px-6 py-1">
                                            <NumericFormat
                                                value={item.saldo_before}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                        <td className="px-6 py-1">
                                            <NumericFormat
                                                value={item.debit}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                        <td className="px-6 py-1">
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
                            <div className="lg:flex gap-3 w-full">
                                <div className="mb-2 flex-1">
                                    <InputLabel
                                        value={"Wilayah"}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        disabled
                                        value={curent_unit.wilayah}
                                    />
                                </div>

                                <div className="mb-2 flex-1">
                                    <InputLabel
                                        value={"Unit"}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        disabled
                                        value={curent_unit.unit}
                                    />
                                </div>

                                <div className="mb-2 flex-1 w-full">
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
                            <div className="mb-2">
                                <InputLabel
                                    value={"Setoran Simpanan Wajib"}
                                    className="mb-1"
                                />
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
