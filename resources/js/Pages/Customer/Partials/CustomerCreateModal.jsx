import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const CustomerCreateModal = ({ show, onClose, employees }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        nik: "",
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const dataEmployee = employees.map((item) => {
        return {
            id: item.id,
            value: item.id,
            display: `${item.nama_karyawan} ${
                item.area != 0 ? `- Kelompok ${item.area}` : ""
            }`,
        };
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("unit.customer.store"));
    };

    return (
        <Modal show={show} onClose={onClose}>
            <Loading show={processing} />
            <form onSubmit={onSubmit} className="p-6">
                <div>
                    <InputLabel htmlFor="nama" value="Nama Nasabah" />

                    <TextInput
                        id="nama"
                        name="nama"
                        value={data.nama}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="nik" value="NIK Nasabah" />

                    <TextInput
                        id="nik"
                        name="nik"
                        value={data.nik}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.nik} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="no_kk" value="No KK Nasabah" />

                    <TextInput
                        id="no_kk"
                        name="no_kk"
                        value={data.no_kk}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.no_kk} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="alamat" value="Alamat" />

                    <TextInput
                        id="alamat"
                        name="alamat"
                        value={data.alamat}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.alamat} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="mantri"
                        value="Nama Mantri Pendaftar"
                    />
                    <SelectList
                        options={dataEmployee}
                        nullValue={true}
                        onChange={handleOnChange}
                        name={`mantri`}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.mantri} className="mt-2" />
                </div>
                <div className="mt-4">
                    <PrimaryButton
                        type={"submit"}
                        title={"Submit"}
                        className="ml-auto"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default CustomerCreateModal;
