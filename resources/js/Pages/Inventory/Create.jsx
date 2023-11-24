import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const Create = ({ branch, employees, title, ...props }) => {
    // const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        nama_aset: "",
        type_aset: "",
        status_kepemilikan: "pusat",
        isactive: "active",
        status_aset: "",
        tanggal_pembelian: "",

        // aset kendaraan
        detail_aset: "",
        plat_nomor: "",
        nama_stnk: "",
        tanggal_stnk: "",
        tax_expired: "",

        // area penempatan

        jabatan: "",
        area: 0,
        branch_id: "",
    });

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
        post(route("aset.store"));
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
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="p-3 bg-white rounded shadow">
                    <form
                        onSubmit={onSubmitForm}
                        className="lg:grid lg:grid-cols-2 gap-3"
                    >
                        <div className="col-span-1 w-full">
                            <div className="mb-2">
                                <InputLabel
                                    value={"Type Aset"}
                                    className="mb-1"
                                />
                                <SelectList
                                    name="type_aset"
                                    onChange={onHandleTypeChange}
                                    className="block w-full lg:w-1/2"
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
                                        name={"nama_aset"}
                                        className="block w-full lg:w-1/2"
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
                                    className="block w-full lg:w-1/2"
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
                                            className="block w-full lg:w-1/2"
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
                                            className="block w-full lg:w-1/2"
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
                                            required
                                            className="block w-full lg:w-1/2"
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
                                            required
                                            className="block w-full lg:w-1/2"
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
                                            className="block w-full lg:w-1/2"
                                        />
                                        <InputError
                                            message={errors.tax_expired}
                                            className="mt-2"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="col-span-1 w-full">
                            <div className="mb-2">
                                <InputLabel
                                    value={"Wilayah Penempatan Aset"}
                                    className="mb-1"
                                />
                                <SelectList
                                    onChange={onWilayahChange}
                                    options={wilayah}
                                    required
                                    nullValue={true}
                                    className="block w-full lg:w-1/2"
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
                                            className="block w-full lg:w-1/2"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <InputLabel
                                            value={"Jabatan"}
                                            className="mb-1"
                                        />
                                        <div className="flex gap-2 w-full lg:w-1/2">
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
                </div>
            </div>
        </Authenticated>
    );
};

export default Create;
