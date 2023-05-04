import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const FormMutasi = ({ branch, detailId, onClose, ...props }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        history_date: "",
        keterangan: "",
        branch_id: "",
        jabatan: "",
        area: "",
    });

    const onJabatanChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
        if (e.target.value !== "Mantri") {
            document.getElementById("mutasiArea").disabled = true;
            document.getElementById("mutasiArea").required = "";
        } else {
            document.getElementById("mutasiArea").disabled = false;
            document.getElementById("mutasiArea").focus();
            document.getElementById("mutasiArea").required = "require";
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
        put(route("employee.mutasi", detailId), {
            onSuccess: () => afterSubmitMutasi(),
        });
    };

    return (
        <form className="w-full" onSubmit={onSubmitProcessMutasi}>
            <Loading show={processing} />
            <div className="tracking-widest font-semibold mb-3">
                Mutasi Karyawan
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"history_date"} value={"Tanggal Pindah"} />
                <TextInput
                    required
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`history_date`}
                    id={`history_date`}
                    type={`date`}
                />
                <InputError message={errors.history_date} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"keterangan"} value={"Keterangan"} />
                <SelectList
                    required
                    onChange={onInputChangeHandler}
                    nullValue={true}
                    options={[
                        {
                            id: 1,
                            value: "Promosi",
                            display: "Promosi",
                        },
                        {
                            id: 2,
                            value: "Mutasi",
                            display: "Mutasi",
                        },
                        {
                            id: 3,
                            value: "Demosi",
                            display: "Demosi",
                        },
                    ]}
                    className={`mt-1 w-full`}
                    name={`keterangan`}
                    id={`keterangan`}
                />
                <InputError message={errors.keterangan} className="mt-2" />
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
                <InputError message={errors.branch_id} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"jabatan"} value={"Jabatan Baru"} />
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
                            id={`mutasiArea`}
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
    );
};

export default FormMutasi;
