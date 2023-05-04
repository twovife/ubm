import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import MobileLayout from "@/Layouts/MobileLayout";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import CreateNewCustomerModal from "./CreateNewCustomerModal";
import CreateOldCustomerModal from "./CreateOldCustomerModal";

const RequestDrop = ({ data, ...props }) => {
    const [customer, setCustomer] = useState();
    const [customerApiStatus, setCustomerApiStatus] = useState();
    const [dataNik, setDataNik] = useState(null);
    const [showCreateNew, setShowCreateNew] = useState(false);
    const [showCreateOld, setShowCreateOld] = useState(false);
    const [showTabs, setShowTabs] = useState("customer");

    const onNikChange = (e) => {
        setCustomerApiStatus(null);
        setDataNik(e.target.value);
    };

    const onFormNikSubmit = async (e) => {
        e.preventDefault();
        const { status, data } = await axios
            .get(route("api.cekcustomerbynik"), {
                params: {
                    nik: dataNik,
                },
            })
            .then((data) => data)
            .catch((err) => err);
        setCustomerApiStatus(status);
        setCustomer(data.data);
        if (status == 200) {
            document.getElementById("nik").setAttribute("readOnly", "readOnly");
        }
    };

    const hideCreateNew = (e) => {
        setShowCreateNew(false);
    };
    const hideCreateOld = (e) => {
        setShowCreateOld(false);
    };

    const onTabClick = (e) => {
        setShowTabs(e.target.getAttribute("data-button"));
    };
    return (
        <MobileLayout
            auth={props.auth}
            errors={props.errors}
            header={<h1>Tambah Permohonan Drop / Pinjaman</h1>}
        >
            <form onSubmit={onFormNikSubmit}>
                <InputLabel value={"Silahkan Masukkan NIK Customer :"} />
                <TextInput
                    className="w-full text-xl mt-2"
                    name="nik"
                    id="nik"
                    onChange={onNikChange}
                    required
                />
                <div className="mt-2 flex gap-2">
                    <PrimaryButton
                        disabled={customerApiStatus == 200 ?? false}
                        type={"submit"}
                        size={"md"}
                        className="block ml-auto"
                        title={"Cari"}
                        theme={"primary"}
                        icon={<AiOutlineSearch />}
                    />

                    <PrimaryButton
                        size={"md"}
                        className={`block ${
                            customerApiStatus == 200 ? "" : "hidden"
                        }`}
                        title={"Buat Baru"}
                        theme={"primary"}
                        icon={<AiOutlinePlus />}
                        onClick={() => setShowCreateOld(true)}
                    />
                </div>
            </form>
            {customerApiStatus &&
                (customerApiStatus == 200 ? (
                    <>
                        <div className="mt-2">
                            <div className="w-full bg-red-50 flex">
                                <PrimaryButton
                                    disabled={showTabs == "customer" ?? false}
                                    className={`w-full rounded-none rounded-l-lg flex justify-center py-3`}
                                    title={"Customer"}
                                    data-button="customer"
                                    onClick={onTabClick}
                                />
                                <PrimaryButton
                                    disabled={showTabs == "pinjaman" ?? false}
                                    className={`w-full rounded-none rounded-r-lg flex justify-center`}
                                    title={"Pinjaman"}
                                    data-button="pinjaman"
                                    onClick={onTabClick}
                                />
                            </div>
                        </div>
                        <div className="mt-2" id="tabContent">
                            <div
                                data-tab="customer"
                                className={`${
                                    showTabs == "customer" ? "" : "hidden"
                                }`}
                            >
                                <div className="p-4 rounded-lg shadow-md border">
                                    <h1 className="font-semibold text-lg text-main-800">
                                        Detail Nasabah
                                    </h1>
                                </div>
                            </div>
                            <div
                                data-tab="pinjaman"
                                className={`${
                                    showTabs == "pinjaman" ? "" : "hidden"
                                }`}
                            >
                                <div className="p-4 rounded-lg shadow-md border">
                                    <h1 className="font-semibold text-lg text-main-800">
                                        History Pinjaman Nasabah
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </>
                ) : customerApiStatus == 204 ? (
                    <div className="mt-2">
                        <div className="border p-4 rounded shadow border-gray-300 text-main-800 text-lg">
                            <div className=" text-center">
                                <h1 className="text-2xl font-semibold">
                                    Customer Belum Terdaftar di Sistem UBM
                                </h1>
                                <p className="mt-2">
                                    Tambahkan Customer ke Sistem UBM untuk
                                    melanjutkan proses pinjaman baru
                                </p>
                            </div>
                            <div className="mt-2">
                                <PrimaryButton
                                    className={"block ml-auto"}
                                    size={"md"}
                                    title={"Buat Baru"}
                                    onClick={() => setShowCreateNew(true)}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Somethink error detection</div>
                ))}
            <CreateNewCustomerModal
                show={showCreateNew}
                onClose={hideCreateNew}
                auth={props.auth}
                dataNik={dataNik}
            />
            <CreateOldCustomerModal
                show={showCreateOld}
                onClose={hideCreateOld}
                auth={props.auth}
                dataNik={dataNik}
            />
        </MobileLayout>
    );
};

export default RequestDrop;
