import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import ContentWrap from "@/Components/ContentWrap";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

const CustomerGlobal = ({ customer, ...props }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        nama: customer.nama ?? "",
        nik: customer.nik ?? "",
        no_kk: customer.no_kk ?? "",
        alamat: customer.alamat ?? "",
    });

    const setValue = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onSubmitCustomer = (e) => {
        e.preventDefault();
        put(route("unit.customer.update", customer.id));
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Edit Nasabah
                    </h2>
                    <Head title="Management User" />
                    <div className="ml-auto flex items-center"></div>
                </>
            }
        >
            <div className="p-4">
                <ContentWrap>
                    <form
                        className="max-w-xl mx-auto"
                        onSubmit={onSubmitCustomer}
                    >
                        <div className="mb-3">
                            <InputLabel value={"Nama Nasabah"} />
                            <TextInput
                                name="nama"
                                value={data.nama}
                                onChange={setValue}
                                className="w-full"
                                required
                            />
                            <InputError
                                message={errors.nama}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel value={"NIK"} />
                            <TextInput
                                name="nik"
                                value={data.nik}
                                onChange={setValue}
                                className="w-full"
                                required
                            />
                            <InputError message={errors.nik} className="mt-2" />
                        </div>
                        <div className="mb-3">
                            <InputLabel value={"Nomor KK"} />
                            <TextInput
                                name="no_kk"
                                value={data.no_kk}
                                onChange={setValue}
                                className="w-full"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel value={"Alamat"} />
                            <TextInput
                                name="alamat"
                                value={data.alamat}
                                onChange={setValue}
                                className="w-full"
                            />
                            <InputError
                                message={errors.alamat}
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton
                            disabled={processing}
                            type="submit"
                            title={"submit"}
                            className="ml-auto"
                        />
                    </form>
                </ContentWrap>
            </div>
        </Authenticated>
    );
};

export default CustomerGlobal;
