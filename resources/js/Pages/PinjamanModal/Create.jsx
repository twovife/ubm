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

const Create = ({ branch, employees, ...props }) => {
    // const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        branch_id: "",
        setoran_awal: 1000000,
    });

    const [unit, setUnit] = useState();

    const wilayah = Object.values(
        branch.reduce((acc, obj) => {
            const wilayah = obj.wilayah;
            acc[wilayah] = {
                id: wilayah,
                value: wilayah,
                display: `wilayah ${wilayah}`,
            };
            return acc;
        }, {})
    );

    const onWilayahChange = (e) => {
        const { value } = e.target;
        const filteredObjects = branch
            .filter((obj) => obj.wilayah == value)
            .map(({ id, unit }) => ({ id: id, display: unit, value: id }));
        setUnit(filteredObjects);
    };

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
        post(route("pinjamanmodal.pinjaman_modal_store"));
    };
    return (
        <Authenticated
            loading={processing}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Buat Pinjaman Baru
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            href={route("unitsaving.index")}
                            title={"Halaman Utama"}
                        />
                    </div>
                </>
            }
        >
            <div className="sm:px-6 lg:px-8">
                <div className="p-3 bg-white rounded shadow w-1/2 mx-auto">
                    <form onSubmit={onSubmitForm} className="w-full">
                        <div className="lg:flex gap-3 w-full">
                            <div className="mb-2 flex-1">
                                <InputLabel
                                    value={"Wilayah"}
                                    className="mb-1"
                                />
                                <SelectList
                                    onChange={onWilayahChange}
                                    options={wilayah}
                                    nullValue={true}
                                    className={"w-full"}
                                />
                                <InputError
                                    message={errors.wilayah}
                                    className="mt-2"
                                />
                            </div>
                            {unit && (
                                <div className="mb-2 flex-1">
                                    <InputLabel
                                        value={"Unit"}
                                        className="mb-1"
                                    />
                                    <SelectList
                                        name="branch_id"
                                        onChange={onInputChange}
                                        nullValue={true}
                                        options={unit}
                                        className={"w-full"}
                                    />
                                    <InputError
                                        message={errors.branch_id}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <InputLabel
                                value={"Nomonal Pinjaman"}
                                className="mb-1"
                            />
                            <CurrencyInput
                                name="setoran_awal"
                                id="setoran_awal"
                                className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                allowDecimals={false}
                                prefix="Rp. "
                                min={1}
                                required
                                onValueChange={onHandleCurencyChange}
                                value={data.setoran_awal}
                                placeholder={"Inputkan angka tanpa sparator"}
                            />
                            <InputError
                                message={errors.setoran_awal}
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton type="submit" title={"submit"} />
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default Create;
