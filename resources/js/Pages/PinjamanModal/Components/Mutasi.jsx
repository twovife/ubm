import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import useFilter from "@/Hooks/useFilter";
import useServerFilter from "@/Hooks/useServerFilter";
import { useForm } from "@inertiajs/react";
import React from "react";

const Mutasi = ({ id, setLoading }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        transaction_date: "",
        branch_id: "",
    });

    const { wilayah, onWilayahChangeHandler, selectedWilayah, filteredBranch } =
        useServerFilter();

    console.log(selectedWilayah);

    const onInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        put(route("pinjamanmodal.pinjaman_modal_mutasi", id), {
            onStart: (visit) => setLoading(true),
            onSuccess: (page) => {
                reset();
            },
            onCancel: () => setLoading(false),
            onFinish: (visit) => setLoading(false),
        });
    };

    return (
        <div className="p-3 bg-white rounded shadow w-full">
            <div className="font-semibold text-gray-500 text-xl mb-3">
                Transaksi Pinjaman
            </div>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3 w-full">
                    <InputLabel value={`Transaction Date`} />
                    <TextInput
                        value={data.transaction_date}
                        onChange={onInputChange}
                        name="transaction_date"
                        type="date"
                        className="w-full mt-1"
                    />
                </div>
                <div className="mb-3 w-full">
                    <InputLabel value={`Wilayah`} />
                    <SelectList
                        name="wilayah"
                        value={selectedWilayah}
                        className={`w-full mt-1`}
                        nullValue={true}
                        required
                        options={wilayah}
                        onChange={onWilayahChangeHandler}
                    />
                </div>
                {selectedWilayah !== "" && (
                    <div className="mb-3 w-full">
                        <InputLabel value={`Unit`} />
                        <SelectList
                            name="branch_id"
                            className={`w-full mt-1`}
                            value={data.branch_id}
                            nullValue={true}
                            required
                            options={filteredBranch}
                            onChange={onInputChange}
                        />
                        <InputError
                            message={errors.branch_id}
                            className="mt-2"
                        />
                    </div>
                )}
                <div className="flex justify-end">
                    <PrimaryButton title="Submit" theme="green" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default Mutasi;
