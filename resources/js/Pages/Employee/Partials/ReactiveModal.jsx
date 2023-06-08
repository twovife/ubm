import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const ReactiveModal = ({ show, onClose, detailId, ...props }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        history_date: "",
        branch_id: "",
        jabatan: "",
        area: "",
    });

    const branch = props.branch.map((branch) => ({
        id: branch.id,
        value: branch.id,
        display: branch.unit,
    }));

    const onJabatanChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
        if (e.target.value !== "mantri") {
            document.getElementById("area").disabled = true;
            document.getElementById("area").required = "";
        } else {
            document.getElementById("area").disabled = false;
            document.getElementById("area").focus();
            document.getElementById("area").required = "require";
        }
    };

    const onInputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const afterSubmitMutasi = () => {
        reset();
        onClose();
    };

    const onSubmitProcessMutasi = (e) => {
        e.preventDefault();
        put(route("employee.reactive", detailId), {
            onSuccess: () => afterSubmitMutasi(),
        });
    };

    return (
        <Modal maxWidth="2xl" show={show} onClose={onClose}>
            <div className="p-6">
                <div className="text-lg mb-6">Reactive Karyawan</div>
                <form className="w-full" onSubmit={onSubmitProcessMutasi}>
                    <div className="tracking-widest font-semibold mb-3">
                        Mutasi Karyawan
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor={"history_date"}
                            value={"Tanggal Masuk Kembali"}
                        />
                        <TextInput
                            required
                            onChange={onInputChangeHandler}
                            className={`mt-1 w-full`}
                            name={`history_date`}
                            id={`history_date`}
                            type={`date`}
                        />
                        <InputError
                            message={errors.history_date}
                            className="mt-2"
                        />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor={"branch_id"} value={"Unit Baru"} />
                        <SelectList
                            required
                            onChange={onInputChangeHandler}
                            className={`mt-1 w-full`}
                            name={`branch_id`}
                            id={`branch_id`}
                            nullValue={true}
                            options={branch}
                        />
                        <InputError
                            message={errors.branch_id}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor={"jabatan"}
                            value={"Jabatan Baru"}
                        />
                        <div className="flex gap-2">
                            <div className="flex-[2]">
                                <SelectList
                                    required
                                    onChange={onJabatanChangeHandler}
                                    nullValue={true}
                                    options={[
                                        {
                                            id: 1,
                                            value: "Kepala Unit",
                                            display: "Kepala Unit",
                                        },
                                        {
                                            id: 2,
                                            value: "Admin",
                                            display: "Admin",
                                        },
                                        {
                                            id: 3,
                                            value: "Kasir",
                                            display: "Kasir",
                                        },
                                        {
                                            id: 4,
                                            value: "Kepala Mantri",
                                            display: "Kepala Mantri",
                                        },
                                        {
                                            id: 5,
                                            value: "Mantri",
                                            display: "Mantri",
                                        },
                                    ]}
                                    className={`mt-1 w-full`}
                                    name={`jabatan`}
                                    id={`jabatan`}
                                />
                                <InputError
                                    message={errors.branch_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1">
                                <TextInput
                                    onChange={onInputChangeHandler}
                                    className={`mt-1`}
                                    type={"number"}
                                    disabled={true}
                                    name={`area`}
                                    id={`area`}
                                />
                                <InputError
                                    message={errors.branch_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-auto">
                        <PrimaryButton
                            className="ml-auto"
                            title={`Setujui Mutasi`}
                            type={"submit"}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ReactiveModal;
