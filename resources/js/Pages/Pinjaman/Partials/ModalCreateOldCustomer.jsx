import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const ModalCreateOldCustomer = ({ auth, ...props }) => {
    const { data, setData, post, processing, errors } = useForm({
        nik: props.nik,
        unit_id: auth.user.employee.branch_id,
        unit: auth.user.employee.branch.unit,
        mantri: "",
        tanggal_drop: "",
        type_drop: "",
        pinjaman: "",
    });
    const onInputChangeHandler = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    const onSubmitCreate = (e) => {
        e.preventDefault();
        post(route("unit.pinjaman.store"));
    };

    return (
        <div>
            <Loading show={processing} />
            <h1 className="mb-3 text-lg font-semibold">
                Buat Pengajuan Pinjaman Customer Baru
            </h1>
            <div className="mb-3">
                <form onSubmit={onSubmitCreate}>
                    <div className="mb-1">
                        <InputLabel value={"NIK"} />
                        <TextInput
                            className="w-full text-xl mt-2"
                            name="nik"
                            id="nik"
                            disabled
                            value={data.nik}
                            required
                            onChange={onInputChangeHandler}
                        />
                        <InputError message={errors.nik} className="mt-2" />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Unit"} />
                        <TextInput
                            className="w-full text-xl mt-2"
                            name="unit"
                            id="unit"
                            disabled
                            value={data.unit}
                        />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Mantri :"} />
                        <SelectList
                            name="mantri"
                            options={props.employees}
                            nullValue={true}
                            value={data.mantri}
                            onChange={onInputChangeHandler}
                            required
                            className="w-full text-xl mt-2"
                        />
                        <InputError message={errors.mantri} className="mt-2" />
                    </div>

                    <div className="mb-1">
                        <InputLabel value={"Tanggal Drop :"} />
                        <div className="flex items-center gap-3">
                            <div className="flex-[3]">
                                <TextInput
                                    type={"date"}
                                    className="w-full text-xl mt-2"
                                    name="tanggal_drop"
                                    id="tanggal_drop"
                                    required
                                    value={data.tanggal_drop}
                                    onChange={onInputChangeHandler}
                                />
                                <InputError
                                    message={errors.tanggal_drop}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="flex-1 flex items-center">
                                    <Checkbox
                                        name="type_drop"
                                        value={data.type_drop}
                                        onChange={onInputChangeHandler}
                                    />
                                    <span className="ml-2 font-semibold">
                                        Drop Langsung ?
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Jumlah Drop :"} />
                        <TextInput
                            type={"number"}
                            className="w-full text-xl mt-2"
                            name="pinjaman"
                            id="pinjaman"
                            required
                            value={data.pinjaman}
                            onChange={onInputChangeHandler}
                        />
                        <InputError
                            message={errors.pinjaman}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <PrimaryButton
                            size={"md"}
                            title={"Submit"}
                            className={"block mt-2 ml-auto"}
                            type={"submit"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCreateOldCustomer;
