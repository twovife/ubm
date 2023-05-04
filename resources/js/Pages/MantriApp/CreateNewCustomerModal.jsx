import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

const CreateNewCustomerModal = ({ show, onClose, ...props }) => {
    const { auth, dataNik } = props;
    const { data, setData, post, processing, errors } = useForm({
        nik: "",
        no_kk: "",
        nama: "",
        alamat: "",
        tanggal_drop: "",
        pinjaman: "",
    });

    useEffect(() => {
        setData("nik", dataNik);
    }, [dataNik]);

    const onInputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onSubmitCreate = (e) => {
        e.preventDefault();
        post(route("mantriapps.pinjaman.newCustomerDropStore"));
    };
    return (
        <Modal maxWidth="2xl" show={show} onClose={onClose}>
            <div className="p-6">
                <form onSubmit={onSubmitCreate}>
                    <div className="mb-1">
                        <InputLabel value={"NIK :"} />
                        <TextInput
                            className="w-full text-xl mt-2"
                            name="nik"
                            id="nik"
                            value={dataNik}
                            onChange={onInputChangeHandler}
                        />
                        <InputError message={errors.nik} className="mt-2" />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"No KK :"} />
                        <TextInput
                            className="w-full text-xl mt-2"
                            name="no_kk"
                            id="no_kk"
                            onChange={onInputChangeHandler}
                        />
                        <InputError message={errors.no_kk} className="mt-2" />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Nama Customer :"} />
                        <TextInput
                            className="w-full text-xl mt-2"
                            name="nama"
                            id="nama"
                            onChange={onInputChangeHandler}
                        />
                        <InputError message={errors.nama} className="mt-2" />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Alamat :"} />
                        <TextInput
                            className="w-full text-xl mt-2"
                            name="alamat"
                            id="alamat"
                            onChange={onInputChangeHandler}
                        />
                        <InputError message={errors.alamat} className="mt-2" />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Unit :"} />
                        <TextInput
                            value={auth.user.employee.branch.unit}
                            readOnly
                            className="w-full text-xl mt-2"
                        />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Mantri :"} />
                        <TextInput
                            value={auth.user.employee.nama_karyawan}
                            readOnly
                            className="w-full text-xl mt-2"
                        />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Kelompok :"} />
                        <TextInput
                            value={auth.user.employee.area}
                            readOnly
                            className="w-full text-xl mt-2"
                        />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Tanggal Drop :"} />
                        <TextInput
                            type={"date"}
                            className="w-full text-xl mt-2"
                            name="tanggal_drop"
                            id="tanggal_drop"
                            onChange={onInputChangeHandler}
                        />
                        <InputError
                            message={errors.tanggal_drop}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-1">
                        <InputLabel value={"Jumlah Drop :"} />
                        <TextInput
                            type={"number"}
                            className="w-full text-xl mt-2"
                            name="pinjaman"
                            id="pinjaman"
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
        </Modal>
    );
};

export default CreateNewCustomerModal;
