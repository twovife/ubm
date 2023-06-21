import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import CurrencyInput from "react-currency-input-field";

const OldCustomer = ({ auth, ...props }) => {
    const { data, setData, post, processing, errors } = useForm({
        nik: props.nik,
        unit_id: auth.user.employee.branch_id,
        unit: auth.user.employee.branch.unit,
        mantri: auth.user.employee.id,
        tanggal_drop: "",
        type_drop: "",
        pinjaman: "",
    });

    const onInputChangeHandler = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const onSubmitCreate = (e) => {
        e.preventDefault();
        post(route("mantriapps.pinjaman.store"));
    };
    return (
        <div className="py-3 px-6 text-main-800 rounded-md border mb-3">
            <Loading show={processing} />
            <h1 className="mb-3 text-lg font-semibold">
                Buat Pengajuan Pinjaman Customer Baru
            </h1>
            <div className="mb-3">
                <form onSubmit={onSubmitCreate}>
                    <div className="mb-1">
                        <InputLabel value={"NIK"} />
                        <TextInput
                            className="w-full text-xl mt-2"
                            name="nik"
                            id="nik"
                            disabled
                            value={data.nik}
                            required
                            onChange={onInputChangeHandler}
                        />
                        <InputError message={errors.nik} className="mt-2" />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Tanggal Drop :"} />
                        <div className="flex items-center gap-3">
                            <div className="flex-[3]">
                                <TextInput
                                    type={"date"}
                                    className="w-full text-xl mt-2"
                                    name="tanggal_drop"
                                    id="tanggal_drop"
                                    required
                                    value={data.tanggal_drop}
                                    onChange={onInputChangeHandler}
                                />
                                <InputError
                                    message={errors.tanggal_drop}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="flex-1 flex items-center">
                                    <Checkbox
                                        name="type_drop"
                                        value={data.type_drop}
                                        onChange={onInputChangeHandler}
                                    />
                                    <span className="ml-2 font-semibold">
                                        Drop Langsung ?
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Jumlah Drop :"} />
                        <CurrencyInput
                            name="pinjaman"
                            id="pinjaman"
                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-xl mt-2`}
                            allowDecimals={false}
                            prefix="Rp. "
                            min={1}
                            required
                            onValueChange={onHandleCurencyChange}
                            value={data.pinjaman}
                            placeholder={"Inputkan angka tanpa sparator"}
                        />
                        <InputError
                            message={errors.pinjaman}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <PrimaryButton
                            size={"md"}
                            title={"Submit"}
                            className={"block mt-2 ml-auto"}
                            type={"submit"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OldCustomer;
