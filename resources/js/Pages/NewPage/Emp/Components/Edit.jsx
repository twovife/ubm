import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import useServerFilter from "@/Hooks/useServerFilter";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import React, { Fragment } from "react";

const Edit = ({ show, setShow, setLoading }) => {
    const { employee } = usePage().props;
    // console.log(employee);
    const { data, setData, put, reset, processing, errors } = useForm({
        nama_karyawan: employee.nama_karyawan ?? "",
        nik: employee.nik ?? "",
        alamat: employee.alamat ?? "",
        branch_id: employee.branch_id ?? "",
        hire_date: employee.hire_date ?? "",
        jabatan: employee.jabatan ?? "",
        area: employee.area ?? "",
        janis_jaminan: employee.janis_jaminan ?? "",
        status_kontrak: employee.status_kontrak ?? "",
    });

    const {
        wilayah,
        setSelectedWilayah,
        filteredBranch,
        selectedWilayah,
        selectedBranch,
        selectedBranch_id,

        onWilayahChangeHandler,
        onBranchChangeHandler,
        filteredEmps,
    } = useServerFilter({ propsWilayah: employee.branch.wilayah });

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

    const closedModal = (e) => {
        setShow();
        reset();
        setLoading(false);
    };

    const onSubmitMutasi = (e) => {
        e.preventDefault();
        put(route("emp.update", employee.id), {
            onStart: (visit) => {
                setLoading(true);
            },
            onSuccess: (page) => {
                closedModal();
            },
            onError: (errors) => setLoading(false),
        });
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
                    className="p-3 rounded shadow-lg bg-white border max-w-2xl w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <form onSubmit={onSubmitMutasi} className="mt-3 bg-inherit">
                        <div className="text-gray-500 font-semibold text-xl mono">
                            Tambah Karywan Baru
                        </div>
                        <div className="w-full mx-auto flex">
                            <div className="flex-1 p-3">
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor={"nama_karyawan"}
                                        value={"Nama Pegawai"}
                                    />
                                    <TextInput
                                        required
                                        onChange={onInputChange}
                                        className={`mt-1 w-full`}
                                        name={`nama_karyawan`}
                                        value={data.nama_karyawan}
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
                                        onChange={onInputChange}
                                        className={`mt-1 w-full`}
                                        name={`nik`}
                                        id={`nik`}
                                        value={data.nik}
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
                                    <TextArea
                                        required
                                        onChange={onInputChange}
                                        className={`mt-1 w-full`}
                                        name={`alamat`}
                                        id={`alamat`}
                                        value={data.alamat}
                                    />
                                    <InputError
                                        message={errors.alamat}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value={"Wilayah"}
                                        className="mb-1"
                                    />
                                    <SelectList
                                        name="wilayah"
                                        value={selectedWilayah}
                                        className={`w-full`}
                                        nullValue={true}
                                        options={wilayah}
                                        onChange={onWilayahChangeHandler}
                                        required
                                    />
                                </div>
                                {selectedWilayah !== "" && (
                                    <div className="mb-3">
                                        <InputLabel
                                            value={"Unit"}
                                            className="mb-1"
                                        />
                                        <SelectList
                                            name="branch_id"
                                            className={`w-full`}
                                            value={data.branch_id}
                                            nullValue={true}
                                            options={filteredBranch}
                                            onChange={onInputChange}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor={"hire_date"}
                                        value={"Tanggal masuk"}
                                    />
                                    <TextInput
                                        required
                                        onChange={onInputChange}
                                        className={`mt-1 w-full`}
                                        name={`hire_date`}
                                        id={`hire_date`}
                                        value={data.hire_date}
                                        type={`date`}
                                    />
                                    <InputError
                                        message={errors.hire_date}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 p-3">
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-3 mb-3">
                                    <div className="flex-1">
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
                                        <div className="flex-1">
                                            <InputLabel value={`Kelompok`} />
                                            <TextInput
                                                className={"w-full"}
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
                                    />
                                    <InputError
                                        message={errors.janis_jaminan}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel value={"Status Kontrak"} />
                                    <SelectList
                                        required
                                        name="status_kontrak"
                                        value={data.status_kontrak}
                                        className={"w-full"}
                                        nullvalue={true}
                                        options={statusKontrak}
                                        onChange={onInputChange}
                                    />
                                    <InputError
                                        message={errors.status_kontrak}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-end">
                            <PrimaryButton
                                type="submit"
                                title={"Submit"}
                                theme="green"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default Edit;
