import MobileLayout from "@/Layouts/MobileLayout";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import {
    FcCalendar,
    FcTodoList,
    FcDonate,
    FcUnlock,
    FcBriefcase,
} from "react-icons/fc";
import ModalNik from "./Partials/ModalNik";

const Index = (props) => {
    const [showModal, setShowModal] = useState(false);
    const onModalClosed = () => {
        setShowModal(false);
    };
    return (
        <MobileLayout
            auth={props.auth}
            errors={props.errors}
            header={"Aplikasi Mantri"}
        >
            <div className="flex gap-3 justify-center flex-wrap">
                <Link
                    as="a"
                    href={route("mantriapps.pinjaman.requestDrop")}
                    className="w-32 h-32 bg-main-200 border border-white rounded-xl shadow shadow-black/30 flex justify-center items-center flex-col hover:shadow-none hover:bg-main-200"
                >
                    <FcBriefcase className="text-7xl" />
                    <div className="font-bold text-lg">PENGAJUAN</div>
                </Link>
                <Link
                    as="a"
                    href={route("mantriapps.drop.mantriDrop")}
                    className="w-32 h-32 bg-main-200 border border-white rounded-xl shadow shadow-black/30 flex justify-center items-center flex-col hover:shadow-none hover:bg-main-200"
                >
                    <FcBriefcase className="text-7xl" />
                    <div className="font-bold text-lg">DROP</div>
                </Link>
                <div
                    onClick={() => setShowModal(true)}
                    className="w-32 h-32 bg-main-200 border border-white rounded-xl shadow shadow-black/30 flex justify-center items-center flex-col hover:shadow-none hover:bg-main-200"
                >
                    <FcDonate className="text-7xl" />
                    <div className="font-bold text-lg">ANGSURAN</div>
                </div>
                <div className="w-32 h-32 bg-main-200 border border-white rounded-xl shadow shadow-black/30 flex justify-center items-center flex-col hover:shadow-none hover:bg-main-200">
                    <FcTodoList className="text-7xl" />
                    <div className="font-bold text-xl">HISTORY</div>
                </div>
                <div className="w-32 h-32 bg-main-200 border border-white rounded-xl shadow shadow-black/30 flex justify-center items-center flex-col hover:shadow-none hover:bg-main-200">
                    <FcUnlock className="text-7xl" />
                    <div className="font-bold text-xl">LOGOUT</div>
                </div>
            </div>
            <ModalNik show={showModal} onClose={onModalClosed} />
        </MobileLayout>
    );
};

export default Index;
