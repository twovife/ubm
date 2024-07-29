import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import Loading from "@/Components/Loading";

const Create = ({ branchId, branch, open, onClosed, ...props }) => {
    const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        branch_id: branchId,
        setoran_awal: 1000000,
        transaction_date: "",
    });

    useEffect(() => {
        setLoading(processing);
    }, [processing]);

    useEffect(() => {
        setData("branch_id", branchId);
    }, [branchId]);

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        post(route("unitsaving.store"), {
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
                    <DialogTitle>Tabungan 1 JT {branch}</DialogTitle>
                    <DialogDescription>
                        Setoran Baru Tabungan 1JT {branch}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmitForm} className="w-full">
                    <div className="lg:flex gap-3 w-full">
                        <div className="mb-2 flex-1">
                            <InputLabel
                                value={"Setor Awal Simpanan Wajib"}
                                className="mb-1"
                            />
                            <CurrencyInput
                                name="setoran_awal"
                                id="setoran_awal"
                                className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                allowDecimals={false}
                                prefix="Rp. "
                                min={1}
                                required
                                onValueChange={onHandleCurencyChange}
                                value={data.setoran_awal}
                                placeholder={"Inputkan angka tanpa sparator"}
                            />
                            <InputError
                                message={errors.setoran_awal}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-2 flex-1">
                            <InputLabel
                                value={"Jumlah Setor"}
                                className="mb-1"
                            />
                            <TextInput
                                name="transaction_date"
                                value={data.transaction_date}
                                type="date"
                                onChange={onInputChange}
                                className={"w-full"}
                            />
                            <InputError
                                message={errors.setoran_awal}
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

export default Create;
