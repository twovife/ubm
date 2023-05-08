import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React from "react";

const CreatePinjamanModal = ({ show, onClose }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <form>
                <div className="p-6">
                    <h1 className="mb-3 text-lg font-semibold tracking-widest">
                        Tambah Pinjaman Baru
                    </h1>
                    <div className="mb-3"></div>
                    <div className="w-full">
                        <PrimaryButton
                            type="submit"
                            title={`Submit`}
                            theme={"green"}
                            className="ml-auto"
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default CreatePinjamanModal;
