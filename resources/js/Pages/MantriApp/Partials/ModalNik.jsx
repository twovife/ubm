import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

const ModalNik = ({ show = false, onClose }) => {
    const [searchNik, setSearchNik] = useState("");

    const onKeywordChange = (e) => {
        setSearchNik(e.target.value);
    };

    const onSubmitKtp = (e) => {
        e.preventDefault();
        router.get(route("mantriapps.angsur.angsur", searchNik));
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6 overflow-auto">
                <form onSubmit={onSubmitKtp} className="max-w-md mb-3">
                    <InputLabel value={"Masukkan Nomor KTP"} />
                    <div className="flex items-baseline gap-3">
                        <TextInput
                            className="mt-1 block w-full"
                            name={"cek_ktp"}
                            value={searchNik}
                            onChange={onKeywordChange}
                            id={"cek_ktp"}
                        />
                        <PrimaryButton
                            size={"sm"}
                            className="whitespace-nowrap"
                            title={"Cek KTP"}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ModalNik;
