import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const CreateModal = ({ show, onClose, ...props }) => {
    const { data, setData, post, reset, processing, errors } = useForm({
        nama_karyawan: "",
        nik: "",
        alamat: "",
        branch_id: "",
        hire_date: "",
        jabatan: "",
        area: "",
        janis_jaminan: "",
    });

    const branch = props.branch.map((branch) => ({
        id: branch.id,
        value: branch.id,
        display: branch.unit,
    }));
    const titleJabatan = props.titles.map((jabatan) => ({
        id: jabatan.id,
        value: jabatan.title,
        display: jabatan.title,
    }));

    const onJabatanChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
        if (e.target.value !== "mantri") {
            document.getElementById("area").disabled = true;
            document.getElementById("area").removeAttribute("required");
        } else {
            document.getElementById("area").disabled = false;
            document.getElementById("area").focus();
            document
                .getElementById("area")
                .setAttribute("required", "required");
        }
    };
    const onInputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };
    const onModalClosed = (e) => {
        reset();
        onClose();
    };
    const submitCreate = (e) => {
        e.preventDefault();
        post(route("employee.store"), {
            onFinish: (visit) => onModalClosed(),
        });
    };
    return (
        <Modal maxWidth="4xl" show={show} onClose={onClose}>
            <Loading show={processing} />
            <form onSubmit={submitCreate}>
                <div className="p-6">
                    <h1 className="mb-3 text-lg font-semibold tracking-widest">
                        Input Data Karyawan
                    </h1>
                    <div className="max-w-lg mx-auto">
                        <div className="flex-1 px-6">
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor={"nama_karyawan"}
                                    value={"Nama Pegawai"}
                                />
                                <TextInput
                                    required
                                    onChange={onInputChangeHandler}
                                    className={`mt-1 w-full`}
                                    name={`nama_karyawan`}
                                    id={`nama_karyawan`}
                                />
                            </div>
                            <div className="mb-3">
                                <InputLabel htmlFor={"nik"} value={"NIK"} />
                                <TextInput
                                    required
                                    onChange={onInputChangeHandler}
                                    className={`mt-1 w-full`}
                                    name={`nik`}
                                    id={`nik`}
                                />
                            </div>
                            <div className="mb-3">
                                <InputLabel
                                    required
                                    htmlFor={"alamat"}
                                    value={"Alamat"}
                                />
                                <TextInput
                                    required
                                    onChange={onInputChangeHandler}
                                    className={`mt-1 w-full`}
                                    name={`alamat`}
                                    id={`alamat`}
                                />
                            </div>

                            <br />

                            <div className="mb-3">
                                <InputLabel
                                    htmlFor={"branch_id"}
                                    value={"Unit"}
                                />
                                <SelectList
                                    required
                                    onChange={onInputChangeHandler}
                                    className={`mt-1 w-full`}
                                    name={`branch_id`}
                                    id={`branch_id`}
                                    nullValue={true}
                                    options={branch}
                                />
                            </div>

                            <div className="mb-3">
                                <InputLabel
                                    htmlFor={"hire_date"}
                                    value={"Tanggal masuk"}
                                />
                                <TextInput
                                    required
                                    onChange={onInputChangeHandler}
                                    className={`mt-1 w-full`}
                                    name={`hire_date`}
                                    id={`hire_date`}
                                    type={`date`}
                                />
                            </div>

                            <div className="mb-3">
                                <InputLabel
                                    htmlFor={"jabatan"}
                                    value={"Jabatan"}
                                />
                                <div className="flex gap-2">
                                    <SelectList
                                        required
                                        onChange={onJabatanChangeHandler}
                                        nullValue={true}
                                        options={titleJabatan}
                                        className={`flex-[2]`}
                                        name={`jabatan`}
                                        id={`jabatan`}
                                    />
                                    <TextInput
                                        onChange={onInputChangeHandler}
                                        className={`flex-1`}
                                        type={"number"}
                                        disabled={true}
                                        name={`area`}
                                        id={`area`}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <InputLabel
                                    htmlFor={"janis_jaminan"}
                                    value={"Jenis Jaminan"}
                                />
                                <TextInput
                                    onChange={onInputChangeHandler}
                                    className={`mt-1 w-full`}
                                    name={`janis_jaminan`}
                                    id={`janis_jaminan`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <PrimaryButton
                            type="submit"
                            title={`Submit`}
                            theme={"green"}
                            disabled={processing}
                            className="ml-auto"
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default CreateModal;
