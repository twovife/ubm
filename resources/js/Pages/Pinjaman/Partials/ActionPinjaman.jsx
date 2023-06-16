import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

const ActionPinjaman = ({ onClose, ...props }) => {
    const { show, id, disabled } = props.data;
    const [actionLoading, setActionLoading] = useState(false);

    const onActionAcc = (e) => {
        e.preventDefault();
        router.post(
            route("unit.pinjaman.request.actions", id),
            { value: 1 },
            {
                onBefore: () => setActionLoading(true),
                onFinish: () => {
                    onClose();
                    setActionLoading(false);
                },
            }
        );
    };
    const onActionReject = (e) => {
        e.preventDefault();
        router.post(
            route("unit.pinjaman.request.actions", id),
            { value: 0 },
            {
                onBefore: () => setActionLoading(true),
                onFinish: () => {
                    onClose();
                    setActionLoading(false);
                },
            }
        );
    };

    const onActionDroped = (e) => {
        e.preventDefault();
        router.post(
            route("unit.pinjaman.request.actions", id),
            { value: 3 },
            {
                onBefore: () => setActionLoading(true),
                onFinish: () => {
                    onClose();
                    setActionLoading(false);
                },
            }
        );
    };
    return (
        <Modal show={show} onClose={onClose}>
            <Loading show={actionLoading} />
            <div className="p-6 overflow-auto ">
                <h1 className="text-xl font-semibold mb-6">Respon Pengajuan</h1>
                <div className="flex justify-center gap-6">
                    <form onSubmit={onActionAcc}>
                        <PrimaryButton
                            type="submit"
                            title={"Acc"}
                            size={"xl"}
                        />
                    </form>
                    <form onSubmit={onActionReject}>
                        <PrimaryButton
                            type="submit"
                            title={"Tolak"}
                            size={"xl"}
                        />
                    </form>
                    {disabled && (
                        <form onSubmit={onActionDroped}>
                            <PrimaryButton
                                type="submit"
                                title={"Drop"}
                                size={"xl"}
                            />
                        </form>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ActionPinjaman;
