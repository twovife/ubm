import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import PindahUnit from "./PindahUnit";

const Edit = ({ aset, branch, employees, title, ...props }) => {
    const { data, setData, put, processing, errors } = useForm({
        nama_aset: aset.nama_aset ?? null,
        type_aset: aset.type_aset ?? null,
        status_kepemilikan: aset.status_kepemilikan ?? null,
        isactive: "active" ?? null,
        tanggal_pembelian: aset.tanggal_pembelian ?? null, //opotional

        // aset kendaraan
        detail_aset: aset?.vehicle_detail?.detail_aset ?? null, //opotional
        plat_nomor: aset?.vehicle_detail?.plat_nomor ?? null,
        nama_stnk: aset?.vehicle_detail?.nama_stnk ?? null,
        tanggal_stnk: aset?.vehicle_detail?.tanggal_stnk ?? null,
        tax_expired: aset?.vehicle_detail?.tax?.tax_expired ?? null,
        tax_id: aset?.vehicle_detail?.tax?.id ?? null,

        // area penempatan

        jabatan: aset?.aset_placement?.pengguna ?? null,
        area: 0,
        branch_id: aset?.aset_placement?.branch_id ?? null,
        aset_placement_id: aset?.aset_placement?.id ?? null,
    });
    console.log(data);
    const [unit, setUnit] = useState();

    const wilayah = Object.values(
        branch.reduce((acc, obj) => {
            const wilayah = obj.wilayah;
            acc[wilayah] = {
                id: wilayah,
                value: wilayah,
                display: `wilayah ${wilayah}`,
            };
            return acc;
        }, {})
    );

    const titles = title.map((ttls) => ({
        id: ttls.id,
        value: ttls.title,
        display: ttls.title,
    }));

    const onWilayahChange = (e) => {
        const { value } = e.target;
        const filteredObjects = branch
            .filter((obj) => obj.wilayah == value)
            .map(({ id, unit }) => ({ id: id, display: unit, value: id }));
        console.log(filteredObjects);
        setUnit(filteredObjects);
    };

    const onJabatanChangeHandler = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onHandleTypeChange = (e) => {
        const { value, name } = e.target;
        if (value === "kendaraan") {
            setData(name, value);
        } else {
            setData({
                ...data,
                [name]: value,
                detail_aset: "",
                plat_nomor: "",
                nama_stnk: "",
                tanggal_stnk: "",
                tax_expired: "",
            });
        }
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        put(route("aset.edit", aset.id));
    };

    return (
        <Authenticated
            loading={processing}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Tambah Baru Simpanan Sukarela
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            href={route("simpanan.index")}
                            title={"Halaman Utama"}
                        />
                    </div>
                </>
            }
        >
            <div className="mx-auto sm:px-6 lg:px-8 mb-3">
                <div className="p-3 bg-white rounded shadow lg:flex gap-3">
                    <form
                        onSubmit={onSubmitForm}
                        className="lg:flex flex-[2] gap-3"
                    >
                        <div className="flex-1 w-full mb-3">
                            <div className="mb-1 font-semibold text-gray-500">
                                Ganti Detail
                            </div>
                            <div className="mb-2">
                                <InputLabel
                                    value={"Type Aset"}
                                    className="mb-1"
                                />
                                <SelectList
                                    name="type_aset"
                                    onChange={onHandleTypeChange}
                                    className="block w-full lg:w-2/3"
                                    value={data.type_aset}
                                    options={[
                                        {
                                            id: 1,
                                            value: "kendaraan",
                                            display: "Kendaraan",
                                        },
                                    ]}
                                    required
                                    nullValue={true}
                                />
                                <InputError
                                    message={errors.type_aset}
                                    className="mt-2"
                                />

                                <div className="mb-2">
                                    <InputLabel
                                        value={"Nama Aset"}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        required
                                        type="text"
                                        onChange={onInputChange}
                                        value={data.nama_aset}
                                        name={"nama_aset"}
                                        className="block w-full lg:w-2/3"
                                    />
                                    <InputError
                                        message={errors.nama_aset}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="mb-2">
                                <InputLabel
                                    value={"Tanggal Pembelian Aset"}
                                    className="mb-1"
                                    optional={true}
                                />
                                <TextInput
                                    type="date"
                                    onChange={onInputChange}
                                    name={"tanggal_pembelian"}
                                    value={data.tanggal_pembelian}
                                    className="block w-full lg:w-2/3"
                                />
                                <InputError
                                    message={errors.tanggal_pembelian}
                                    className="mt-2"
                                />
                            </div>

                            {/* detail */}
                            {data.type_aset == "kendaraan" && (
                                <>
                                    <div className="mb-2">
                                        <InputLabel
                                            value={"Detail Aset"}
                                            className="mb-1"
                                            optional={true}
                                        />
                                        <TextInput
                                            type="text"
                                            onChange={onInputChange}
                                            name={"detail_aset"}
                                            value={data.detail_aset}
                                            className="block w-full lg:w-2/3"
                                        />
                                        <InputError
                                            message={errors.detail_aset}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel
                                            value={"Plat Nomor"}
                                            className="mb-1"
                                        />
                                        <TextInput
                                            type="text"
                                            onChange={onInputChange}
                                            required
                                            name={"plat_nomor"}
                                            value={data.plat_nomor}
                                            className="block w-full lg:w-2/3"
                                        />
                                        <InputError
                                            message={errors.plat_nomor}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel
                                            value={"Atas Nama Kendaraan"}
                                            className="mb-1"
                                        />
                                        <TextInput
                                            type="text"
                                            onChange={onInputChange}
                                            name={"nama_stnk"}
                                            value={data.nama_stnk}
                                            required
                                            className="block w-full lg:w-2/3"
                                        />
                                        <InputError
                                            message={errors.nama_stnk}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel
                                            value={"Tanggal Kadaluarsa STNK"}
                                            className="mb-1"
                                        />
                                        <TextInput
                                            type="date"
                                            onChange={onInputChange}
                                            name={"tanggal_stnk"}
                                            value={data.tanggal_stnk}
                                            required
                                            className="block w-full lg:w-2/3"
                                        />
                                        <InputError
                                            message={errors.tanggal_stnk}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel
                                            value={"Tanggal Kadaluarsa Pajak"}
                                            className="mb-1"
                                        />
                                        <TextInput
                                            type="date"
                                            onChange={onInputChange}
                                            required
                                            name={"tax_expired"}
                                            value={data.tax_expired}
                                            className="block w-full lg:w-2/3"
                                        />
                                        <InputError
                                            message={errors.tax_expired}
                                            className="mt-2"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex-1 w-full">
                            <div className="mb-2">
                                <div className="mb-1 font-semibold text-gray-500">
                                    Ubah Wilayah Penempatan
                                    <span className="italic font-light text text-xs">
                                        ( Jika Terjadi Kesalahan Input )
                                    </span>
                                </div>
                                <div className="text-xl">
                                    {aset.aset_placement?.branch?.unit} -
                                    {aset.aset_placement?.pengguna}
                                </div>
                            </div>
                            <div className="mb-2">
                                <InputLabel
                                    value={"Ubah Wilayah Penempatan Aset"}
                                    className="mb-1"
                                />
                                <SelectList
                                    onChange={onWilayahChange}
                                    options={wilayah}
                                    nullValue={true}
                                    className="block w-full lg:w-2/3"
                                />
                            </div>
                            {unit && (
                                <>
                                    <div className="mb-2">
                                        <InputLabel
                                            value={"Unit Penempatan Aset"}
                                            className="mb-1"
                                        />
                                        <SelectList
                                            onChange={onInputChange}
                                            nullValue={true}
                                            required
                                            options={unit}
                                            name={"branch_id"}
                                            className="block w-full lg:w-2/3"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <InputLabel
                                            value={"Jabatan"}
                                            className="mb-1"
                                        />
                                        <div className="flex gap-2 w-full lg:w-2/3">
                                            <SelectList
                                                required
                                                onChange={
                                                    onJabatanChangeHandler
                                                }
                                                nullValue={true}
                                                options={titles}
                                                className={`flex-[2]`}
                                                name={`jabatan`}
                                                id={`jabatan`}
                                            />
                                            {data.jabatan === "mantri" && (
                                                <TextInput
                                                    onChange={onInputChange}
                                                    className={`flex-1`}
                                                    type={"number"}
                                                    required
                                                    name={`area`}
                                                    id={`area`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="mb-2 flex items-end justify-end">
                                <PrimaryButton type="submit" title={"Submit"} />
                            </div>
                        </div>
                    </form>
                    <div className="flex-1">
                        <PindahUnit />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Edit;
