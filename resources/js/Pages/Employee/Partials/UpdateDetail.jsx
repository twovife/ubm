import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const UpdateDetail = ({ onClose, detailData, branch, ...props }) => {
    const { data, setData, put, processing, errors, reset } =
        useForm(detailData);
    const onInputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onJabatanChangeHandler = (e) => {
        if (e.target.value != "mantri") {
            setData({ ...data, area: 0, [e.target.name]: e.target.value });
            document.getElementById("updateArea").disabled = true;
            document.getElementById("updateArea").required = "";
        } else {
            setData(e.target.name, e.target.value);
            document.getElementById("updateArea").disabled = false;
            document.getElementById("updateArea").focus();
            document.getElementById("updateArea").required = "require";
        }
    };

    const afterSubmitUpdate = () => {
        reset();
        onClose();
    };

    const onSubmitProcessUpdate = (e) => {
        e.preventDefault();
        put(route("employee.update", data.id), {
            onSuccess: () => afterSubmitUpdate(),
        });
    };

    return (
        <form className="overflow-y-auto" onSubmit={onSubmitProcessUpdate}>
            <Loading show={processing} />
            <div className="tracking-widest font-semibold mb-3">
                Update Data
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"nama_karyawan"} value={"Nama Karyawan"} />
                <TextInput
                    required
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`nama_karyawan`}
                    id={`nama_karyawan`}
                    type={`text`}
                    value={data.nama_karyawan}
                />
                <InputError message={errors.nama_karyawan} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"nik"} value={"NIK"} />
                <TextInput
                    required
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`nik`}
                    id={`nik`}
                    value={data.nik}
                    type={`text`}
                />
                <InputError message={errors.nik} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"alamat"} value={"Alamat"} />
                <TextArea
                    required
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`alamat`}
                    id={`alamat`}
                    value={data.alamat}
                    type={`text`}
                />
                <InputError message={errors.alamat} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"hire_date"} value={"Tanggal Masuk"} />
                <TextInput
                    required
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`hire_date`}
                    disabled={data.hire_date ? false : "disabled"}
                    id={`hire_date`}
                    value={data.hire_date}
                    type={`date`}
                />
                <InputError message={errors.hire_date} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"jabatan"} value={"Jabatan"} />
                <div className="flex gap-2">
                    <div className="flex-[2]">
                        <SelectList
                            required
                            value={data.jabatan}
                            onChange={onJabatanChangeHandler}
                            nullValue={true}
                            options={props.titles}
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
                            value={data.area}
                            className={`mt-1`}
                            type={"number"}
                            disabled={data.area === 0 ? true : false}
                            name={`area`}
                            id={`updateArea`}
                        />
                        <InputError
                            message={errors.branch_id}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"branch_id"} value={"Unit"} />
                <SelectList
                    required
                    value={data.branch_id}
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`branch_id`}
                    id={`branch_id`}
                    options={branch}
                />
                <InputError message={errors.branch_id} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"janis_jaminan"} value={"Jenis Jaminan"} />
                <TextInput
                    required
                    onChange={onInputChangeHandler}
                    className={`mt-1 w-full`}
                    name={`janis_jaminan`}
                    id={`janis_jaminan`}
                    value={data.janis_jaminan}
                    type={`text`}
                />
                <InputError message={errors.janis_jaminan} className="mt-2" />
            </div>
            <div className="w-full mt-auto">
                <PrimaryButton
                    className="ml-auto"
                    title={`Ubah Data`}
                    type={"submit"}
                />
            </div>
        </form>
    );
};

export default UpdateDetail;
