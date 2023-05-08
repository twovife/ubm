import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

const DropModal = ({ datas, onClosed, ...props }) => {
    const [loading, setLoading] = useState(false);
    const { show, id } = datas;
    const afterSubmit = (e) => {
        setLoading(false);
        onClosed();
    };
    const submitThis = (e) => {
        router.put(
            route("mantriapps.drop.storeMantriDrop", id),
            { value: 3 },
            {
                onBefore: () => setLoading(true),
                onSuccess: () => afterSubmit(),
            }
        );
    };
    return (
        <Modal maxWidth={"sm"} show={show} onClose={onClosed}>
            <Loading show={loading} />
            <div className="p-6">
                <h1 className="text-center text-xl mb-3">
                    Drop Customer Sekarang?
                </h1>
                <PrimaryButton
                    onClick={submitThis}
                    title={"Yes"}
                    size={"lg"}
                    className="mx-auto"
                />
            </div>
        </Modal>
    );
};

export default DropModal;
