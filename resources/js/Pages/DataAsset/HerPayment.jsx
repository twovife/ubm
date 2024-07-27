import React, { useEffect } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Loading from "@/Components/Loading";
import Checkbox from "@/Components/Checkbox";

const HerPayment = ({ open, onClosed, triggeredId }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: "",
    });

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    useEffect(() => {
        setData("id", triggeredId);
    }, [triggeredId]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        put(route("asset.kendaraan.herpayment", triggeredId), {
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
            <DialogContent className="h-auto overflow-auto">
                <DialogHeader>
                    <DialogTitle>Pembayaran </DialogTitle>
                    <DialogDescription>
                        Rincian Aset Kendaraan
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmitForm}>
                    <div className="block mb-3">
                        <label className="flex items-center">
                            <Checkbox name="remember" required />
                            <span className="ml-2 text-xl font-semibold text-black">
                                Pajak Sudah Dibayarkan
                            </span>
                        </label>
                    </div>
                    <div className="flex justify-end sticky bottom-0 left-0 bg-white border-t p-2">
                        <PrimaryButton theme="green" type="submit">
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default HerPayment;
