import React, { useEffect } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CurrencyInput from "react-currency-input-field";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Loading from "@/Components/Loading";
import SelectList from "@/Components/SelectList";
import useServerFilter from "@/Hooks/useServerFilter";

const Edit = ({ open, onClosed, dataDetail }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        asset_name: "", //
        asset_type_id: 1,
        asset_category_id: 1,
        asset_detail: "", //
        isactive: "yes",

        plat_nomor: "", //
        tanggal_stnk: "", //
        tanggal_pajak_tahunan: "", //
        nama_stnk: "",

        id: "",
        branch_id: "",
        before_branch_id: "",
        asset_place_id: 1,
        pengguna: "", //
        keterangan: "", //
    });

    const { wilayah, selectedWilayah, onWilayahChangeHandler, filteredBranch } =
        useServerFilter({ propsWilayah: data.wilayah });

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onTypeTransactionChange = (e) => {
        const { value, name } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: parseInt(value),
            remark: value == 1 ? "PEMBAYARAN PINJAMAN GORO" : "PINJAMAN GORO",
        }));
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    useEffect(() => {
        setData({ ...dataDetail });
    }, [dataDetail]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(data);
        // // console.log(data);
        put(route("asset.kendaraan.update", data.id), {
            onSuccess: () => {
                reset();
                onClosed();
                location.reload();
            },
            replace: true,
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => (open == true ? "" : onClosed())}
            className="text-sm"
        >
            <Loading show={processing} />
            <DialogContent className="lg:max-w-3xl h-auto overflow-auto">
                <DialogHeader>
                    <DialogTitle>Edit Aset Kendaraan</DialogTitle>
                    <DialogDescription>
                        Rincian Aset Kendaraan
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-auto h-[70vh] static">
                    <form onSubmit={onSubmitForm} className="relative">
                        <div className="grid lg:grid-cols-2 gap-4 py-4">
                            <div>
                                <div className="mb-3 font-semibold">
                                    Detail Asset
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value={"Nama Kendaraan"}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        name="asset_name"
                                        type="text"
                                        className="w-full inline-block"
                                        onChange={onInputChange}
                                        value={data.asset_name}
                                        placeHolder="ex: Supra Fit 125"
                                        required
                                    />
                                    <InputError
                                        message={errors.asset_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value={"Plat Nomor"}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        name="plat_nomor"
                                        type="text"
                                        className="w-full inline-block"
                                        onChange={onInputChange}
                                        value={data.plat_nomor}
                                        placeHolder="AG1010HX tanpa spasi "
                                        required
                                    />
                                    <InputError
                                        message={errors.plat_nomor}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value={"Detail Kendaraan"}
                                        optional={true}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        name="asset_detail"
                                        type="text"
                                        className="w-full inline-block"
                                        onChange={onInputChange}
                                        value={data.asset_detail}
                                        placeHolder="Warna Putih"
                                    />
                                    <InputError
                                        message={errors.asset_detail}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value={"Atas Nama Kendaraan"}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        name="nama_stnk"
                                        type="text"
                                        className="w-full inline-block"
                                        onChange={onInputChange}
                                        value={data.nama_stnk}
                                        required
                                    />
                                    <InputError
                                        message={errors.nama_stnk}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value={"Tanggal STNK ( Pajak 5Tahuna )"}
                                        className="mb-1"
                                    />
                                    <TextInput
                                        name="tanggal_stnk"
                                        type="date"
                                        className="w-full inline-block"
                                        onChange={onInputChange}
                                        value={data.tanggal_stnk}
                                        placeHolder="Warna Putih"
                                        required
                                    />
                                    <InputError
                                        message={errors.tanggal_stnk}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value={
                                            "Tanggal Pajak ( Pajak 1 Tahun )"
                                        }
                                        className="mb-1"
                                    />
                                    <TextInput
                                        name="tanggal_pajak_tahunan"
                                        type="date"
                                        className="w-full inline-block"
                                        onChange={onInputChange}
                                        value={data.tanggal_pajak_tahunan}
                                        placeHolder="Warna Putih"
                                        required
                                    />
                                    <InputError
                                        message={errors.tanggal_pajak_tahunan}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mb-3 font-semibold">
                                    Ubah Lokasi Asset
                                    <div className="italic font-thin text-sm">
                                        -{" "}
                                        <span className="text-red-500 font-semibold">
                                            Edit
                                        </span>{" "}
                                        untuk mengubah ( jika terjadi kesalahan
                                        input )
                                    </div>
                                    <div className="italic font-thin text-sm">
                                        -{" "}
                                        <span className="text-red-500 font-semibold">
                                            Pindah
                                        </span>{" "}
                                        untuk jika kendaraan dipindahkan ke unit
                                        lain
                                    </div>
                                    <div className="italic font-thin text-sm">
                                        -{" "}
                                        <span className="text-red-500 font-semibold">
                                            Rusak / Jual
                                        </span>{" "}
                                        untuk aset yang dijual / rusak
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        value={`Pilih Perubahan`}
                                        className="mb-1"
                                    />
                                    <SelectList
                                        name="edit"
                                        value={data.edit}
                                        className={`w-full`}
                                        nullValue={true}
                                        required
                                        options={[
                                            {
                                                id: 1,
                                                display: "Edit",
                                                value: "edit",
                                            },
                                            {
                                                id: 2,
                                                display: "Pindah",
                                                value: "pindah",
                                            },
                                            {
                                                id: 3,
                                                display: "Jual",
                                                value: "jual",
                                            },
                                            {
                                                id: 4,
                                                display: "Hilang",
                                                value: "hilang",
                                            },
                                        ]}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {data.edit == "edit" ||
                                data.edit == "pindah" ? (
                                    <div>
                                        <div className="mb-3 flex flex-col lg:flex-row items-center justify-center gap-3 mt-3">
                                            <div className="flex-1 w-full">
                                                <InputLabel value={`Wilayah`} />
                                                <SelectList
                                                    name="wilayah"
                                                    value={selectedWilayah}
                                                    className={`w-full`}
                                                    nullValue={true}
                                                    required
                                                    options={wilayah}
                                                    onChange={
                                                        onWilayahChangeHandler
                                                    }
                                                />
                                            </div>
                                            {selectedWilayah !== "" && (
                                                <div className="flex-1 w-full">
                                                    <InputLabel
                                                        value={`Unit`}
                                                    />
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
                                                        message={
                                                            errors.branch_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel
                                                value={"Pengguna"}
                                                className="mb-1"
                                            />
                                            <TextInput
                                                name="pengguna"
                                                type="text"
                                                className="w-full inline-block"
                                                onChange={onInputChange}
                                                value={data.pengguna}
                                                placeHolder="Mantri 1 / Admin"
                                                required
                                            />
                                            <InputError
                                                message={errors.pengguna}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel
                                                value={"Keterangan"}
                                                optional={true}
                                                className="mb-1"
                                            />
                                            <TextInput
                                                name="keterangan"
                                                type="text"
                                                className="w-full inline-block"
                                                onChange={onInputChange}
                                                value={data.keterangan}
                                            />
                                            <InputError
                                                message={errors.keterangan}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                ) : data.edit == "jual" ||
                                  data.edit == "hilang" ? (
                                    <>
                                        <div className="mb-3">
                                            <InputLabel
                                                value={"Tanggal Hilang / Rusak"}
                                                className="mb-1"
                                            />
                                            <TextInput
                                                name="nonactive_date"
                                                type="date"
                                                className="w-full inline-block"
                                                onChange={onInputChange}
                                                value={data.nonactive_date}
                                                placeHolder="Warna Putih"
                                                required
                                            />
                                            <InputError
                                                message={errors.nonactive_date}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputLabel
                                                value={"Keterangan"}
                                                className="mb-1"
                                            />
                                            <TextInput
                                                name="nonactive_reason"
                                                type="text"
                                                className="w-full inline-block"
                                                onChange={onInputChange}
                                                value={data.nonactive_reason}
                                                placeHolder="Hilang / Rusak"
                                                required
                                            />
                                            <InputError
                                                message={
                                                    errors.nonactive_reason
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                                {/*
                                 */}
                            </div>
                        </div>
                        <div className="flex justify-end sticky bottom-0 left-0 bg-white border-t p-2">
                            <PrimaryButton theme="green" type="submit">
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Edit;
