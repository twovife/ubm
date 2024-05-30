import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import useServerFilter from "@/Hooks/useServerFilter";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

const Kembali = ({ typeMutasi, closedModal, setLoading }) => {
    const { employee } = usePage().props;
    const { wilayah, selectedWilayah, setSelectedWilayah, filteredBranch } =
        useServerFilter();
    // console.log(filteredBranch);

    const { data, setData, put, processing, recentlySuccessful, errors } =
        useForm({
            typeMutasi: parseInt(typeMutasi),
            branch_id: "",
            tanggal_kembali: "",
            status_kontrak: "",
            jabatan: "",
            area: 0,
            jenis_jaminan: "",
        });

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

    const onOptWilayahChange = (e) => {
        const { value } = e.target;
        setSelectedWilayah(value);
        const newData = { branch_id: value };
        setData((currentData) => ({ ...currentData, ...newData }));
    };

    const onSubmitMutasi = (e) => {
        e.preventDefault();
        setLoading(true);
        put(route("emp.kembali_karyawan", employee.id), {
            onSuccess: (page) => {
                closedModal();
            },
            onFinish: (page) => {
                setLoading(false);
            },
            replace: true,
        });
    };
    return (
        <form onSubmit={onSubmitMutasi} className="mt-3 bg-inherit">
            <div className="text-gray-500 font-semibold text-xl mono">
                Pilih Unit Dan Jabatan Baru
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 mt-3">
                <div className="flex-1 w-full">
                    <InputLabel value={`Wilayah`} />
                    <SelectList
                        name="wilayah"
                        value={selectedWilayah}
                        className={`w-full`}
                        nullValue={true}
                        required
                        options={wilayah}
                        onChange={onOptWilayahChange}
                    />
                </div>
                {selectedWilayah !== "" && (
                    <div className="flex-1 w-full">
                        <InputLabel value={`Unit`} />
                        <SelectList
                            name="branch_id"
                            className={`w-full`}
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
            </div>
            <div className="mt-3">
                <InputLabel value={"Tanggal Kembali"} />
                <TextInput
                    name="tanggal_kembali"
                    value={data.tangal}
                    required
                    className={"w-full"}
                    type={"date"}
                    onChange={onInputChange}
                />
                <InputError message={errors.tanggal_kembali} className="mt-2" />
            </div>
            <div className="mt-3">
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
                <InputError message={errors.status_kontrak} className="mt-2" />
            </div>
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
                    <InputError message={errors.jabatan} className="mt-2" />
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
                        <InputError message={errors.area} className="mt-2" />
                    </div>
                )}
            </div>
            <div className="mt-3">
                <InputLabel value={"Jenis Jaminan"} optional={true} />
                <TextInput
                    name="jenis_jaminan"
                    value={data.jenis_jaminan}
                    className={"w-full"}
                    onChange={onInputChange}
                />
                <InputError message={errors.status_kontrak} className="mt-2" />
            </div>
            <div className="mt-3 flex justify-end items-center">
                <PrimaryButton title={"Submit"} type="submit" theme="green" />
            </div>
        </form>
    );
};

export default Kembali;
