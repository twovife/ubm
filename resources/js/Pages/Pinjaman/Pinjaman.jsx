import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CreatePinjamanModal from "./Partials/CreatePinjamanModal";

const Pinjaman = (props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const hideCreateModal = (e) => {
        setShowCreateModal(false);
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Data Pinjaman
                    </h2>
                    <div className="ml-auto flex items-center">
                        <PrimaryButton
                            icon={<IoMdAdd />}
                            size={"md"}
                            title={"Tambah"}
                            onClick={() => setShowCreateModal(true)}
                        ></PrimaryButton>
                    </div>
                </>
            }
        >
            <Head title="Data Pinjaman" />
            <CreatePinjamanModal
                show={showCreateModal}
                onClose={hideCreateModal}
            />
        </Authenticated>
    );
};

export default Pinjaman;
