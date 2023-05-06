import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CreatePinjamanModal from "./Partials/CreatePinjamanModal";
import LinkButton from "@/Components/LinkButton";
import ModalAlert from "@/Components/ModalAlert";

const RequestPinjaman = (props) => {
    const [alertModal, setAlertModal] = useState({
        show: false,
        textAlert: null,
        typeAlert: null,
    });

    const hideAlertModal = (e) => {
        setAlertModal(false);
    };

    useEffect(() => {
        if (props.flash.message) {
            setAlertModal({
                show: true,
                textAlert: props.flash.message,
                typeAlert: "success",
            });
        }
        if (props.errors[0]) {
            setAlertModal({
                show: true,
                textAlert: props.errors[0],
                typeAlert: "danger",
            });
        }
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Data Request Pinjaman
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
            <ModalAlert alertParams={alertModal} onClose={hideAlertModal} />
            <Head title="Data Pinjaman" />
        </Authenticated>
    );
};

export default RequestPinjaman;
