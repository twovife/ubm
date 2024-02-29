import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

const Mutasi = () => {
    const { branch, deposit, validating } = usePage().props;
    const [unit, setUnit] = useState();
    const [employee, setEmployee] = useState();

    const { data, setData, put, processing, errors } = useForm({
        transaction_date: "",
        transaction: "M",
        transaction_type: "M",
        branch_id: "",
    });

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
        setData("branch_id", value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        put(route("sksw.addtransaksi", deposit.id));
    };

    return (
        <div className="p-3 bg-white rounded shadow mt-3">
            <form onSubmit={onSubmitForm}>
                <span className="font-semibold mb-3">Mutasi</span>
                <div className="lg:flex justify-start items-start gap-3">
                    <div className="mb-3 flex-1">
                        <InputLabel value={"Tanggal Transaksi"} />
                        <TextInput
                            type={"month"}
                            required
                            max={validating.max_date}
                            min={validating.min_date}
                            onChange={(e) =>
                                setData(e.target.name, e.target.value)
                            }
                            name="transaction_date"
                            className="w-full"
                        />
                    </div>

                    <div className="mb-3 flex-1">
                        <InputLabel value={"Wilayah"} className="mb-1" />
                        <SelectList
                            onChange={onWilayahChange}
                            options={wilayah}
                            nullValue={true}
                            className={"w-full"}
                        />
                    </div>

                    <div className="mb-3 flex-1">
                        {unit && (
                            <>
                                <InputLabel value={"Unit"} className="mb-1" />
                                <SelectList
                                    onChange={onUnitChange}
                                    nullValue={true}
                                    options={unit}
                                    className={"w-full"}
                                />
                            </>
                        )}
                    </div>

                    <div className="flex-1"></div>
                    <div className="flex-1"></div>
                </div>
                <div>
                    <PrimaryButton title={"Submit"} type="submit" />
                </div>
            </form>
        </div>
    );
};

export default Mutasi;
