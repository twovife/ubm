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
        employee_id: "",
        besar_pinjaman: 1000000,
    });

    const [unit, setUnit] = useState();
    const [employee, setEmployee] = useState();

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
        setEmployee(null);
    };

    const onUnitChange = (e) => {
        const { value } = e.target;
        const filteredEmployee = employees
            .filter((obj) => obj.branch_id == value)
            .map(({ id, nama_karyawan, jabatan }) => ({
                id: id,
                display: `${nama_karyawan} - ${jabatan}`,
                value: id,
            }));
        setEmployee(filteredEmployee);
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
        post(route("bonpanjer.bon_panjer_store"));
    };
    return (
        <Authenticated
            loading={processing}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Buat Tabungan Untuk Unit Baru
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            href={route("bonpanjer.bon_panjer")}
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
                            <div className="mb-2">
                                <InputLabel
                                    value={"Wilayah"}
                                    className="mb-1"
                                />
                                <SelectList
                                    onChange={onWilayahChange}
                                    options={wilayah}
                                    nullValue={true}
                                />
                            </div>
                            {unit && (
                                <div className="mb-2">
                                    <InputLabel
                                        value={"Unit"}
                                        className="mb-1"
                                    />
                                    <SelectList
                                        onChange={onUnitChange}
                                        nullValue={true}
                                        options={unit}
                                    />
                                </div>
                            )}
                            {employee && (
                                <div className="mb-2">
                                    <InputLabel
                                        value={"Nama Karawan"}
                                        className="mb-1"
                                    />
                                    <SelectList
                                        onChange={onInputChange}
                                        name={"employee_id"}
                                        nullValue={true}
                                        options={employee}
                                        className={`w-full`}
                                    />
                                    <InputError
                                        message={errors.employee_id}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <InputLabel
                                value={"Setor Awal Simpanan Wajib"}
                                className="mb-1"
                            />
                            <CurrencyInput
                                name="besar_pinjaman"
                                id="besar_pinjaman"
                                className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                allowDecimals={false}
                                prefix="Rp. "
                                min={1}
                                required
                                onValueChange={onHandleCurencyChange}
                                value={data.besar_pinjaman}
                                placeholder={"Inputkan angka tanpa sparator"}
                            />
                            <InputError
                                message={errors.besar_pinjaman}
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
