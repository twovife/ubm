import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const RequestPinjaman = (props) => {
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
                            onClick={() => setShowModalCreate(true)}
                        ></PrimaryButton>
                    </div>
                </>
            }
        >
            <Head title="Data Pinjaman" />
        </Authenticated>
    );
};

export default RequestPinjaman;
