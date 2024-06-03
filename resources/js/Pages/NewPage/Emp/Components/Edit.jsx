import InputLabel from "@/Components/InputLabel";
import SelectList from "@/Components/SelectList";
import React, { Fragment, useState } from "react";
import Mutasi from "./Mutasi";
import { Transition } from "@headlessui/react";
import Resign from "./Resign";
import Kembali from "./Kembali";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import useServerFilter from "@/Hooks/useServerFilter";
import PrimaryButton from "@/Components/PrimaryButton";

const Edit = ({ show, emps, setShow, isActive, setLoading }) => {
    const {
        wilayah,
        selectedWilayah,
        setSelectedWilayah,
        filteredBranch,
        selectedBranch_id,
        selectedBulan,
    } = useServerFilter();

    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({ ...emps });

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

    const onOptWilayahChange = (e) => {
        const { value } = e.target;
        setSelectedWilayah(value);
        setData({ branch_id: "" });
    };

    const jabatan = [
        { id: 1, value: "mantri", display: "Mantri" },
        { id: 3, value: "admin", display: "Admin" },
        { id: 4, value: "kasir", display: "Kasir" },
        { id: 2, value: "kepala mantri", display: "Kepala Mantri" },
        { id: 5, value: "wakil pimpinan", display: "Wakil Pimpinan" },
        { id: 6, value: "pimpinan", display: "Pimpinan" },
        { id: 7, value: "staf", display: "Staf" },
        { id: 8, value: "staf kontrol", display: "Staf Kontrol" },
        { id: 9, value: "pengawas", display: "Pengawas" },
    ];

    const statusKontrak = [
        { id: 1, value: 1, display: "Cadangan" },
        { id: 2, value: 2, display: "Kontrak" },
    ];
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const onJabatanChange = (e) => {
        const { name, value } = e.target;
        const newData = { [name]: value, area: 0 };

        setData((currentData) => ({ ...currentData, ...newData }));
    };

    const onSubmitProcessUpdate = (e) => {
        e.preventDefault();
        put(route("employee.update", data.id), {
            onSuccess: () => afterSubmitUpdate(),
        });
    };

    const closedModal = (e) => {
        setShow();
    };

    return (
        <Transition
            as={Fragment}
            show={show}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
        >
            <div
                className="fixed top-0 left-0 border px-6 py-3 rounded w-full h-screen z-[100] flex items-center justify-center"
                onClick={closedModal}
            >
                <div
                    className="p-3 rounded shadow-lg bg-white border max-w-md w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <form
                        className="overflow-y-auto"
                        onSubmit={onSubmitProcessUpdate}
                    >
                        <div className="tracking-widest font-semibold mb-3">
                            Update Data
                        </div>
                        <div className="mb-3">
                            <InputLabel
                                htmlFor={"nama_karyawan"}
                                value={"Nama Karyawan"}
                            />
                            <TextInput
                                className={`w-full block mt-1`}
                                name={`nama_karyawan`}
                                type={`text`}
                                value={data.nama_karyawan}
                            />
                            <InputError
                                message={errors.nama_karyawan}
                                className="mt-2"
                            />
                        </div>
                        <div className={"mb-3"}>
                            <InputLabel htmlFor={"nik"} value={"Nik"} />
                            <TextInput
                                className={`w-full block mt-1`}
                                name={`nik`}
                                type={`text`}
                                value={data.nik}
                            />
                            <InputError
                                message={errors.nik}
                                className={"mt-2"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default Edit;
