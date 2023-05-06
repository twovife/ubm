import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const PencairanSimpanan = ({ detailId, detailData, onClose, ...props }) => {
    const { data, setData, put, processing, errors, reset } =
        useForm(detailData);

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
                Pencairan Simpanan & Pengembalian Jaminan
            </div>
            <div className="flex flex-col lg:flex-row items-center flex-wrap gap-3">
                <div className="flex-1 mb-3">
                    <InputLabel
                        htmlFor={"pencairan_simpanan_date"}
                        value={"Tgl Pencairan Simp. Sukarela"}
                    />
                    <div className="flex-[3]">
                        <TextInput
                            onChange={onInputChangeHandler}
                            className={`mt-1 w-full`}
                            name={`pencairan_simpanan_date`}
                            id={`pencairan_simpanan_date`}
                            type={`date`}
                            value={data.pencairan_simpanan_date}
                        />
                        <InputError
                            message={errors.pencairan_simpanan_date}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="flex-1 mb-3">
                    <InputLabel
                        htmlFor={"pencairan_simpanan_w_date"}
                        value={"Tgl Pencairan Simp. Wajib"}
                    />
                    <div className="flex-[3]">
                        <TextInput
                            onChange={onInputChangeHandler}
                            className={`mt-1 w-full`}
                            name={`pencairan_simpanan_w_date`}
                            id={`pencairan_simpanan_w_date`}
                            type={`date`}
                            value={data.pencairan_simpanan_w_date}
                        />
                        <InputError
                            message={errors.pencairan_simpanan_w_date}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="flex-1 mb-3">
                    <InputLabel
                        htmlFor={"handover_jaminan"}
                        value={"Tgl Pengembalian Jaminan"}
                    />
                    <div className="flex-[3]">
                        <TextInput
                            onChange={onInputChangeHandler}
                            className={`mt-1 w-full`}
                            name={`handover_jaminan`}
                            id={`handover_jaminan`}
                            type={`date`}
                            value={data.handover_jaminan}
                        />
                        <InputError
                            message={errors.handover_jaminan}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
            <div>
                <PrimaryButton
                    className="ml-auto"
                    title={`Setujui`}
                    type={"submit"}
                />
            </div>
        </form>
    );
};

export default PencairanSimpanan;
