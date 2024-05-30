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

const Edit = ({ show, setShow, isActive, setLoading }) => {
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
    } = useForm({
        branch_id: "",
    });

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
                                required
                                onChange={onInputChange}
                                className={`mt-1 w-full`}
                                name={`nama_karyawan`}
                                id={`nama_karyawan`}
                                type={`text`}
                                value={data.nama_karyawan}
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
                                onChange={onInputChange}
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
                                onChange={onInputChange}
                                className={`mt-1 w-full`}
                                name={`alamat`}
                                id={`alamat`}
                                value={data.alamat}
                                type={`text`}
                            />
                            <InputError
                                message={errors.alamat}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel
                                htmlFor={"hire_date"}
                                value={"Tanggal Masuk"}
                            />
                            <TextInput
                                required
                                onChange={onInputChange}
                                className={`mt-1 w-full`}
                                name={`hire_date`}
                                disabled={data.hire_date ? false : "disabled"}
                                id={`hire_date`}
                                value={data.hire_date}
                                type={`date`}
                            />
                            <InputError
                                message={errors.hire_date}
                                className="mt-2"
                            />
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
                                        // options={props.titles}
                                        className={`mt-1 w-full`}
                                        name={`jabatan`}
                                        id={`jabatan`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <TextInput
                                        onChange={onInputChange}
                                        value={data.area}
                                        className={`mt-1`}
                                        type={"number"}
                                        disabled={
                                            data.area === 0 ? true : false
                                        }
                                        name={`area`}
                                        id={`updateArea`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <InputLabel
                                htmlFor={"branch_id"}
                                value={"Wilayah"}
                            />
                            <SelectList
                                name="wilayah"
                                value={selectedWilayah}
                                className={`w-full mt-1`}
                                nullValue={true}
                                options={wilayah}
                                onChange={onOptWilayahChange}
                            />
                            <InputError
                                message={errors.branch_id}
                                className="mt-2"
                            />
                        </div>
                        {selectedWilayah !== "" && (
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor={"branch_id"}
                                    value={"Wilayah"}
                                />
                                <SelectList
                                    name="branch_id"
                                    className={`w-full mt-1`}
                                    value={data.branch_id}
                                    nullValue={true}
                                    required
                                    options={filteredBranch}
                                    onChange={onInputChange}
                                />
                                <InputError
                                    message={errors.branch_id}
                                    className="mt-2"
                                />
                            </div>
                        )}

                        <div className="flex flex-col lg:flex-row items-center justify-center gap-3 mt-3">
                            <div className="flex-1 w-full">
                                <InputLabel value={"Jabatan"} />
                                <SelectList
                                    required
                                    value={data.jabatan}
                                    className={"w-full"}
                                    nullvalue={true}
                                    options={jabatan}
                                    name="jabatan"
                                    onChange={onJabatanChange}
                                />
                                <InputError
                                    message={errors.jabatan}
                                    className="mt-2"
                                />
                            </div>
                            {data.jabatan === "mantri" && (
                                <div className="flex-1 w-full">
                                    <InputLabel value={`Kelompok`} />
                                    <TextInput
                                        required
                                        name="area"
                                        value={data.area}
                                        type="number"
                                        min="0"
                                        onChange={onInputChange}
                                    />
                                    <InputError
                                        message={errors.area}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <InputLabel
                                htmlFor={"janis_jaminan"}
                                value={"Jenis Jaminan"}
                            />
                            <TextInput
                                onChange={onInputChange}
                                className={`mt-1 w-full`}
                                name={`janis_jaminan`}
                                id={`janis_jaminan`}
                                value={data.janis_jaminan}
                                type={`text`}
                            />
                            <InputError
                                message={errors.janis_jaminan}
                                className="mt-2"
                            />
                        </div>
                        {/*
                        {detailData.date_resign && (
                            <>
                                <div className="mb-3">
                                    <span className="underline underline-offset-4">
                                        Resign Information
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor={"date_resign"}
                                        value={"Tanggal Keluar"}
                                    />
                                    <TextInput
                                        required
                                        onChange={onInputChange}
                                        className={`mt-1 w-full`}
                                        name={`date_resign`}
                                        disabled={
                                            data.date_resign
                                                ? false
                                                : "disabled"
                                        }
                                        id={`date_resign`}
                                        value={data.date_resign}
                                        type={`date`}
                                    />
                                    <InputError
                                        message={errors.date_resign}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor={"resign_status"}
                                        value={"Status Keluar"}
                                    />
                                    <SelectList
                                        required
                                        onChange={onInputChange}
                                        nullValue={true}
                                        options={[
                                            {
                                                id: 1,
                                                value: "Resign",
                                                display: "Resign",
                                            },
                                            {
                                                id: 2,
                                                value: "Pecat",
                                                display: "Pecat",
                                            },
                                        ]}
                                        className={`mt-1 w-full`}
                                        name={`resign_status`}
                                        value={data.resign_status}
                                        id={`resign_status`}
                                    />
                                    <InputError
                                        message={errors.resign_status}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor={"resign_reson"}
                                        value={"Alasan Keluar"}
                                    />
                                    <TextInput
                                        required
                                        onChange={onInputChange}
                                        className={`mt-1 w-full`}
                                        name={`resign_reson`}
                                        value={data.resign_reson}
                                        id={`resign_reson`}
                                    />
                                    <InputError
                                        message={errors.resign_reson}
                                        className="mt-2"
                                    />
                                </div>
                            </>
                        )} */}

                        <div className="w-full mt-auto">
                            <PrimaryButton
                                className="ml-auto"
                                title={`Ubah Data`}
                                type={"submit"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default Edit;
