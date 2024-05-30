import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

const Resign = ({ typeMutasi, closedModal, setLoading }) => {
    const { employee } = usePage().props;

    const { data, setData, put, processing, recentlySuccessful, errors } =
        useForm({
            resign_status: parseInt(typeMutasi),
            date_resign: "",
            resign_reson: "",
        });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const onSubmitResign = (e) => {
        e.preventDefault();
        setLoading(true);
        put(route("emp.resign_karyawan", employee.id), {
            onSuccess: (page) => {
                closedModal();
            },
            onFinish: (page) => {
                setLoading(false);
            },
            replace: true,
        });
    };

    return (
        <form onSubmit={onSubmitResign}>
            <div className="mt-3">
                <InputLabel value={"Tanggal Keluar"} />
                <TextInput
                    name="date_resign"
                    value={data.tangal}
                    required
                    className={"w-full"}
                    type={"date"}
                    onChange={onInputChange}
                />
                <InputError message={errors.date_resign} className="mt-2" />
            </div>
            <div className="mt-3">
                <InputLabel value={"Alasan Keluar"} />
                <TextInput
                    name="resign_reson"
                    value={data.tangal}
                    required
                    className={"w-full"}
                    type={"text"}
                    onChange={onInputChange}
                />
                <InputError message={errors.resign_reson} className="mt-2" />
            </div>
            <div className="mt-3 flex justify-end items-center">
                <PrimaryButton title={"Submit"} type="submit" theme="green" />
            </div>
        </form>
    );
};

export default Resign;
