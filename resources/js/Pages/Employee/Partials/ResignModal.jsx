import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const ResignModal = ({ branch, detailId, onClose, ...props }) => {
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

    const onSubmitResign = (e) => {
        e.preventDefault();
        // console.log(data);
        put(route("employee.resign", detailId), {
            onSuccess: () => afterSubmitMutasi(),
        });
    };

    return (
        <form className="w-full h-full flex flex-col" onSubmit={onSubmitResign}>
            <Loading show={processing} />
            <div className="tracking-widest font-semibold mb-3">
                Resign Karyawan
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"date_resign"} value={"Tanggal Keluar"} />
                <TextInput
                    required
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`date_resign`}
                    id={`date_resign`}
                    type={`date`}
                />
                <InputError message={errors.date_resign} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"resign_status"} value={"Status Keluar"} />
                <SelectList
                    required
                    onChange={onInputChangeHandler}
                    nullValue={true}
                    options={[
                        {
                            id: 1,
                            value: "Resign",
                            display: "Resign",
                        },
                        {
                            id: 2,
                            value: "Pecat",
                            display: "Pecat",
                        },
                    ]}
                    className={`mt-1 w-full`}
                    name={`resign_status`}
                    id={`resign_status`}
                />
                <InputError message={errors.resign_status} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"resign_reson"} value={"Alasan Keluar"} />
                <TextInput
                    required
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`resign_reson`}
                    id={`resign_reson`}
                />
                <InputError message={errors.resign_reson} className="mt-2" />
            </div>
            <div className="w-full mt-auto">
                <PrimaryButton
                    className="ml-auto"
                    title={`Setujui Resign`}
                    type={"submit"}
                />
            </div>
        </form>
    );
};

export default ResignModal;
