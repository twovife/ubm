import React, { useEffect, useRef, useState } from "react";

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
import { router, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Loading from "@/Components/Loading";
import Checkbox from "@/Components/Checkbox";

const DeleteTransaksi = ({ open, onClosed, triggeredId }) => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm();

    const confirmUserDeletion = (e) => {
        setConfirmingUserDeletion(e.target.checked);
    };

    const deleteData = (e) => {
        e.preventDefault();
        destroy(route("goroumrah.deleteTrans", triggeredId), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
        onClosed();
    };
    return (
        <Dialog
            open={open}
            onOpenChange={(open) => (open == true ? "" : closeModal())}
            className="text-sm"
        >
            <Loading show={processing} />
            <DialogContent className="lg:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Hapus Transaksi</DialogTitle>
                    <DialogDescription>
                        Hapus Transaksi Terpilih
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="flex items-center justify-center gap-4 py-4"
                    onSubmit={deleteData}
                >
                    {confirmingUserDeletion == true ? (
                        <div className="flex justify-end">
                            <PrimaryButton theme="red" type="submit">
                                HAPUS
                            </PrimaryButton>
                        </div>
                    ) : (
                        <div className="block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    value={confirmingUserDeletion}
                                    onChange={confirmUserDeletion}
                                />
                                <span className="ml-2 text-xl text-gray-600">
                                    Yakin Untuk Menghapus Transaksi Ini?
                                </span>
                            </label>
                        </div>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteTransaksi;
