import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CreatePinjamanModal from "./Partials/CreatePinjamanModal";
import LinkButton from "@/Components/LinkButton";

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
                        <LinkButton
                            icon={<IoMdAdd />}
                            size={"md"}
                            title={"Tambah Pinjaman"}
                            type="a"
                            href={route("unit.pinjaman.create")}
                        ></LinkButton>
                    </div>
                </>
            }
        >
            <Head title="Data Pinjaman" />
        </Authenticated>
    );
};

export default Pinjaman;
