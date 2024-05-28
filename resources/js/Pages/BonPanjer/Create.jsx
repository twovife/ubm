import Card from "@/Components/Card";
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
        <Authenticated loading={processing}>
            <Card judul="Bon Panjer Baru">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.startContent
                            className={`flex-wrap mb-3 lg:mb-0`}
                        ></Card.startContent>
                        <Card.endContent className={`flex-wrap`}>
                            <LinkButton
                                href={route("bonpanjer.bon_panjer")}
                                title={"Halaman Utama"}
                            />
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <form onSubmit={onSubmitForm} className="mb-2 max-w-lg mx-auto">
                    <div className="w-full">
                        <div className="mb-2">
                            <InputLabel value={"Wilayah"} className="mb-1" />
                            <SelectList
                                onChange={onWilayahChange}
                                options={wilayah}
                                nullValue={true}
                                className={"w-full"}
                            />
                        </div>
                        {unit && (
                            <div className="mb-2">
                                <InputLabel value={"Unit"} className="mb-1" />
                                <SelectList
                                    onChange={onUnitChange}
                                    nullValue={true}
                                    options={unit}
                                    className={"w-full"}
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
                        <InputLabel value={"Tanggal Bon"} className="mb-1" />
                        <TextInput
                            name="transaction_date"
                            type="date"
                            className="w-full"
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <InputLabel value={"Nominal Bon"} className="mb-1" />
                        <CurrencyInput
                            name="besar_pinjaman"
                            id="besar_pinjaman"
                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block text-sm mt-2 w-full`}
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
                    <div className="flex justify-end">
                        <PrimaryButton type="submit" title={"submit"} />
                    </div>
                </form>
            </Card>
        </Authenticated>
    );
};

export default Create;
