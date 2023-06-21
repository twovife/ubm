import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoMdAdd } from "react-icons/io";
import LinkButton from "@/Components/LinkButton";

const HistoryByKartuKeluarga = (props) => {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        History Pinjaman Lanjutan
                    </h2>
                </>
            }
        ></Authenticated>
    );
};

export default HistoryByKartuKeluarga;
