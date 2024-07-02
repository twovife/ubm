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
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Loading from "@/Components/Loading";
import SelectList from "@/Components/SelectList";

const CreateTransaksi = ({ open, onClosed }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        branch_id: "",
        unit_payment_id: 2,
        remark: "",
        nominal: 0,
        transaction_date: "",
        type_transaksi: "",
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
        post(route("goroumrah.goro_create"), {
            onSuccess: () => {
                reset();
                onClosed();
                location.reload();
            },
            replace: true,
        });
    };

    const onClosedModal = (e) => {
        onClosed();
        reset();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => (open == true ? "" : onClosedModal())}
            className="text-sm"
        >
            <Loading show={processing} />
            <DialogContent className="lg:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Transaksi Goro Umroh</DialogTitle>
                    <DialogDescription>
                        Pembayaran Goro Umroh Bulanan
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={onSubmitForm}>
                    <div className="mb-3">
                        <InputLabel
                            value={"Tanggal Transaksi"}
                            className="mb-1"
                        />
                        <TextInput
                            name="transaction_date"
                            type="date"
                            className="w-full inline-block"
                            onChange={onInputChange}
                            value={data.transaction_date}
                            required
                        />
                        <InputError
                            message={errors.transaction_date}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel value={"Tipe Transaksi"} className="mb-1" />
                        <SelectList
                            name="type_transaksi"
                            className="w-full inline-block"
                            onChange={onInputChange}
                            value={data.type_transaksi}
                            nullValue={true}
                            options={[
                                { id: 1, display: "Debit", value: 1 },
                                { id: 2, display: "Kredit", value: 2 },
                            ]}
                            required
                        />
                        <InputError
                            message={errors.type_transaksi}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel value={"Nominal"} className="mb-1" />
                        <CurrencyInput
                            name="nominal"
                            id="nominal"
                            className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md mt-2`}
                            allowDecimals={false}
                            prefix="Rp. "
                            min={1}
                            required
                            onValueChange={onHandleCurencyChange}
                            value={data.nominal}
                            placeholder={"Inputkan angka tanpa sparator"}
                        />
                        <InputError message={errors.nominal} className="mt-2" />
                    </div>
                    <div className="mb-3">
                        <InputLabel value={"Keterangan"} className="mb-1" />
                        <TextInput
                            name="remark"
                            type="text"
                            className="w-full inline-block"
                            onChange={onInputChange}
                            value={data.remark}
                            required
                        />
                        <InputError message={errors.remark} className="mt-2" />
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton theme="green" type="submit">
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTransaksi;
