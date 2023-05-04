import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const PencairanSimpanan = ({ detailId, onClose, ...props }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        date_resign: "",
        resign_status: "",
        resign_reson: "",
    });

    const onInputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const afterSubmitMutasi = () => {
        reset();
        onClose();
    };

    const onSubmitProcessMutasi = (e) => {
        e.preventDefault();
        put(route("employee.handover", detailId), {
            onSuccess: () => afterSubmitMutasi(),
        });
    };

    return (
        <form
            className="w-full h-full flex flex-col"
            onSubmit={onSubmitProcessMutasi}
        >
            <Loading show={processing} />
            <div className="tracking-widest font-semibold mb-3">
                Pencairan Simpanan
            </div>
            <InputLabel
                htmlFor={"pencairan_simpanan_date"}
                value={"Tanggal Keluar"}
            />
            <div className="flex items-center gap-3">
                <div className="flex-[3]">
                    <TextInput
                        required
                        onChange={onInputChangeHandler}
                        className={`mt-1 w-full`}
                        name={`pencairan_simpanan_date`}
                        id={`pencairan_simpanan_date`}
                        type={`date`}
                    />
                    <InputError
                        message={errors.pencairan_simpanan_date}
                        className="mt-2"
                    />
                </div>
                <div>
                    <PrimaryButton
                        className="ml-auto"
                        title={`Setujui Pencairan`}
                        type={"submit"}
                    />
                </div>
            </div>
        </form>
    );
};

export default PencairanSimpanan;
