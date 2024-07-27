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

const Create = ({
    open,
    onClosed,
    triggeredId,
    triggeredBranch,
    triggeredWilayah,
}) => {
    // const previledge = usePage().props.auth.user?.permissions?.name;

    const { data, setData, post, processing, errors, reset } = useForm({
        branch_id: "",
        unit_payment_id: 4,
        remark: "",
        nominal: 1000000,
        transaction_date: "",
        type_transaksi: "",
    });

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
        setData("branch_id", triggeredId);
    }, [triggeredId, triggeredWilayah]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        // console.log(data);
        post(route("goroumrah.goro_create"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => onClosed(),
            onFinish: () => reset(),
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(open) =>
                open == true ? setData("branch_id", triggeredId) : onClosed()
            }
            className="text-sm"
        >
            <Loading show={processing} />
            <DialogContent className="lg:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Bayar Goro Umroh {triggeredBranch}
                    </DialogTitle>
                    <DialogDescription>
                        Pembayaran Goro Umroh Bulanan
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={onSubmitForm}>
                    <div className="mb-3">
                        <InputLabel value={"Tipe Transaksi"} className="mb-1" />
                        <SelectList
                            name="type_transaksi"
                            className="w-full inline-block"
                            onChange={onTypeTransactionChange}
                            value={data.type_transaksi}
                            nullValue={true}
                            options={[
                                { id: 1, display: "Bayar", value: 1 },
                                { id: 2, display: "Pinjam", value: 2 },
                            ]}
                            required
                        />
                        <InputError
                            message={errors.type_transaksi}
                            className="mt-2"
                        />
                    </div>
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

export default Create;
