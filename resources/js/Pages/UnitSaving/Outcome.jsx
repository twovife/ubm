import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const Outcome = ({ open, onClosed }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nominal: 0,
        transaction_date: "",
        keterangan: "",
        transaksi: "",
    });

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        post(route("unitsaving.store_mutasi"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => onClosed(),
            onFinish: () => reset(),
        });
    };
    return (
        <Dialog
            open={open}
            onOpenChange={(open) => (open == true ? "" : onClosed())}
            className="text-sm"
        >
            <Loading show={processing} />
            <DialogContent className="lg:max-w-3xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Mutasi Tb 1jt</DialogTitle>
                    <DialogDescription>
                        Mutasi Lain Lain TB 1 Juta
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmitForm} className="w-full">
                    <div className="w-full gap-3 lg:flex">
                        <div className="flex-1 w-full mb-2">
                            <InputLabel value={"Tanggal"} className="mb-1" />
                            <TextInput
                                className="block w-full"
                                type="date"
                                required
                                min="2024-05-01"
                                name="transaction_date"
                                value={data.transaction_date}
                                onChange={onInputChange}
                            />
                            <InputError
                                message={errors.transaction_date}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex-1 mb-2">
                            <InputLabel value={"Nominal"} className="mb-1" />
                            <CurrencyInput
                                name="nominal"
                                id="nominal"
                                className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                allowDecimals={false}
                                prefix="Rp. "
                                min={1}
                                required
                                onValueChange={onHandleCurencyChange}
                                value={data.nominal}
                                placeholder={"Inputkan angka tanpa sparator"}
                            />
                            <InputError
                                message={errors.nominal}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="w-full gap-3 lg:flex">
                        <div className="flex-1 w-full mb-2">
                            <InputLabel
                                value={"Debit / Kredit"}
                                className="mb-1"
                            />
                            <SelectList
                                className="block w-full"
                                type="text"
                                required
                                name="transaksi"
                                value={data.transaksi}
                                nullValue={true}
                                options={[
                                    {
                                        id: 1,
                                        value: "D",
                                        display: "Masuk (Debit)",
                                    },
                                    {
                                        id: 2,
                                        value: "K",
                                        display: "Keluar (Kredit)",
                                    },
                                ]}
                                onChange={onInputChange}
                            />
                            <InputError
                                message={errors.transaksi}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex-1 w-full mb-2">
                            <InputLabel value={"Keterangan"} className="mb-1" />
                            <TextInput
                                className="block w-full"
                                type="text"
                                required
                                name="keterangan"
                                value={data.keterangan}
                                onChange={onInputChange}
                            />
                            <InputError
                                message={errors.keterangan}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <PrimaryButton type="submit" title={"submit"} />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Outcome;
