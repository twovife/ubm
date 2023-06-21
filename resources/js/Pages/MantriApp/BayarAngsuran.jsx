import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import MobileLayout from "@/Layouts/MobileLayout";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { NumericFormat } from "react-number-format";

const BayarAngsuran = ({ ...props }) => {
    const { data, setData, put, processing, reset, errors } = useForm({
        pembayaran_date: "",
        jumlah: "",
        mantri: props.auth.user.employee_id,
        status: "",
        isMantriApp: true,
        danatitipan: false,
    });

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const onInputChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        put(route("unit.pinjaman.angsuran.bayar", props.loans.id));
    };

    const ansuranStatus = [
        { id: 1, value: "normal", display: "Normal" },
        { id: 2, value: "cm", display: "CM" },
        { id: 3, value: "mb", display: "MB" },
        { id: 4, value: "ml", display: "ML" },
    ];

    return (
        <MobileLayout
            auth={props.auth}
            errors={props.errors}
            header={"Angsuran Mantri"}
        >
            <div className="py-3 px-6 text-main-800 rounded-md border mb-3 shadow">
                <div className="flex w-full items-center mb-2 border-b">
                    <div className="flex-[2]">Nama Customer</div>
                    <div className="flex-[3]">{props.loans.customer.nama}</div>
                </div>
                <div className="flex w-full items-center mb-2 border-b">
                    <div className="flex-[2]">NIK</div>
                    <div className="flex-[3]">{props.loans.customer.nama}</div>
                </div>
            </div>
            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tanggal Angsuran
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jumlah
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.loans.angsuran.map((el, key) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={key}
                                >
                                    <td className="px-6 py-4">{key}</td>
                                    <td className="px-6 py-4">
                                        {dayjs(el.pembayaran_date).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <NumericFormat
                                            value={el.jumlah}
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
            </div>
            <div className="py-3 px-6 text-main-800 rounded-md border mb-3 shadow">
                <div>
                    <h1 className="text-xl mb-3">Pembayaran Angsuran</h1>
                    <form onSubmit={onSubmitForm} className="mb-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <InputLabel value={"Tanggal Pembayaran"} />
                                <TextInput
                                    required
                                    name="pembayaran_date"
                                    onChange={onInputChange}
                                    type="date"
                                    className="mt-1 block w-full"
                                    min={dayjs(props.loans.tanggal_drop)
                                        .add(1, "week")
                                        .format("YYYY-MM-DD")}
                                />
                                <InputError
                                    message={errors.pembayaran_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1">
                                <InputLabel value={"Jumlah Pembayaran"} />
                                <CurrencyInput
                                    name="jumlah"
                                    id="jumlah"
                                    className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full mt-1`}
                                    allowDecimals={false}
                                    prefix="Rp. "
                                    min={1}
                                    required
                                    onValueChange={onHandleCurencyChange}
                                    value={data.pinjaman}
                                    placeholder={
                                        "Inputkan angka tanpa sparator"
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <div className="flex-1">
                                <InputLabel value={"Status Angsuran"} />
                                <SelectList
                                    required
                                    name="status"
                                    className="w-full mt-1"
                                    onChange={onInputChange}
                                    nullValue={true}
                                    options={ansuranStatus}
                                />
                            </div>
                        </div>
                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="danatitipan"
                                    value={data.danatitipan}
                                    onChange={onInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Dana Titipan?
                                </span>
                            </label>
                        </div>
                        <div className="w-full mt-3">
                            <PrimaryButton
                                className="ml-auto"
                                title={"Setuju"}
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </MobileLayout>
    );
};

export default BayarAngsuran;
