import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const EmployeeCreate = ({ ...props }) => {
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

    const titleJabatan = props.titles.map((jabatan) => ({
        id: jabatan.id,
        value: jabatan.title,
        display: jabatan.title,
    }));

    const branch = props.branch.map((branch) => ({
        id: branch.id,
        value: branch.id,
        display: branch.unit,
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
    const submitCreate = (e) => {
        e.preventDefault();
        post(route("employee.store"), {
            onSuccess: (visit) => reset(),
        });
    };
    return (
        <div className="max-w-lg mx-auto">
            <Loading show={processing} />
            <form onSubmit={submitCreate}>
                <div className="p-6">
                    <div className="flex justify-between items-center p-6">
                        <h1 className="text-lg font-semibold tracking-widest">
                            Input Data Karyawan
                        </h1>

                        <LinkButton
                            as="a"
                            href={route("employee.index")}
                            icon={<IoMdArrowBack />}
                            size={"md"}
                            title={"Back"}
                        ></LinkButton>
                    </div>
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
                                <InputError
                                    message={errors.nama_karyawan}
                                    className="mt-2"
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
                                <InputError
                                    message={errors.nik}
                                    className="mt-2"
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
                                <InputError
                                    message={errors.alamat}
                                    className="mt-2"
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
                                <InputError
                                    message={errors.branch_id}
                                    className="mt-2"
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
                                <InputError
                                    message={errors.hire_date}
                                    className="mt-2"
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
                                <InputError
                                    message={errors.jabatan}
                                    className="mt-2"
                                />
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
                                <InputError
                                    message={errors.janis_jaminan}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="max-w-lg mx-auto px-6">
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
        </div>
    );
};

export default EmployeeCreate;
