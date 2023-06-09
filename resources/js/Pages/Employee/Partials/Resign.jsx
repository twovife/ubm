import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const Resign = ({ detailData, branch, ...props }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: detailData.id,
        history_date: "",
        jabatan: detailData.jabatan,
        area: detailData.area,
        branch_id: detailData.branch_id,
        janis_jaminan: "",
    });
    const onInputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onJabatanChangeHandler = (e) => {
        if (e.target.value != "mantri") {
            setData({ ...data, area: 0, [e.target.name]: e.target.value });
            document.getElementById("resignArea").disabled = true;
            document.getElementById("resignArea").required = "";
        } else {
            setData(e.target.name, e.target.value);
            document.getElementById("resignArea").disabled = false;
            document.getElementById("resignArea").focus();
            document.getElementById("resignArea").required = "require";
        }
    };

    const onSubmitProcessUpdate = (e) => {
        e.preventDefault();
        console.log(data);
        put(route("employee.reactive", data.id));
    };

    return (
        <form className="overflow-y-auto" onSubmit={onSubmitProcessUpdate}>
            <Loading show={processing} />
            <div className="tracking-widest font-semibold mb-3">
                Kembali Masuk
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
                    value={data.history_date}
                    type={`date`}
                />
                <InputError message={errors.hire_date} className="mt-2" />
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"jabatan"} value={"Jabatan Baru"} />
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
                            id={`resignArea`}
                        />
                        <InputError
                            message={errors.branch_id}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <InputLabel htmlFor={"branch_id"} value={"Unit Baru"} />
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
                    title={`Aktivkan Kembali`}
                    type={"submit"}
                />
            </div>
        </form>
    );
};

export default Resign;
