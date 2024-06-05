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

const Create = ({ branch, employees, curent_unit, ...props }) => {
    console.log(props.back_params);
    const { data, setData, post, processing, errors } = useForm({
        branch_id: "",
        setoran_awal: 1500000,
        transaction_date: "",
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
        post(route("bop.store"));
    };
    return (
        <Authenticated loading={processing}>
            <Card judul="Setoran BOP Unit Baru ">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.endContent className={`flex-wrap`}>
                            <div className="w-full">
                                <LinkButton
                                    href={route("bop.index", [
                                        {
                                            bulan:
                                                props.back_params?.bulan ??
                                                null,
                                        },
                                    ])}
                                    title={"Back"}
                                    size={"sm"}
                                    type="button"
                                    className="block whitespace-nowrap ml-auto"
                                    theme="primary"
                                />
                            </div>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <div className="p-3 bg-white rounded shadow lg:w-1/2 mx-auto">
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
                        <div className="lg:flex gap-3 w-full">
                            <div className="mb-2 flex-1 w-full">
                                <InputLabel value={"Bulan"} className="mb-1" />
                                <TextInput
                                    className="block w-full"
                                    type="date"
                                    required
                                    name="transaction_date"
                                    max={curent_unit.akhirbulan}
                                    min={curent_unit.awalbulan}
                                    value={data.transaction_date}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="mb-2 flex-1">
                                <InputLabel
                                    value={"Setor Awal BOP"}
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
                                    placeholder={
                                        "Inputkan angka tanpa sparator"
                                    }
                                />
                                <InputError
                                    message={errors.setoran_awal}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <PrimaryButton type="submit" title={"submit"} />
                    </form>
                </div>
            </Card>
        </Authenticated>
    );
};

export default Create;
