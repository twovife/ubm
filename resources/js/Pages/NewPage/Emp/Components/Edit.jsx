import InputLabel from "@/Components/InputLabel";
import SelectList from "@/Components/SelectList";
import React, { Fragment, useState } from "react";
import Mutasi from "./Mutasi";
import { Transition } from "@headlessui/react";
import Resign from "./Resign";
import Kembali from "./Kembali";

const Edit = ({ show, setShow, isActive, setLoading }) => {
    const [selectedValue, setSelectedValue] = useState("");

    const selectEdit = [
        { id: 1, value: 1, display: "Ganti Data" },
        { id: 2, value: 2, display: "Masukkan Jaminan" },
    ];

    const onPerpindahanChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setSelectedValue(value);
    };

    const closedModal = (e) => {
        setShow();
        setTimeout(() => {
            setSelectedValue("");
        }, 200);
    };

    const renderComponent = () => {
        if (selectedValue >= 1 && selectedValue <= 3) {
            return (
                <Mutasi
                    typeMutasi={selectedValue}
                    closedModal={closedModal}
                    setLoading={setLoading}
                />
            );
        } else if (selectedValue >= 4 && selectedValue <= 5) {
            return (
                <Resign
                    typeMutasi={selectedValue}
                    closedModal={closedModal}
                    setLoading={setLoading}
                />
            );
        } else if (selectedValue === 6) {
            return (
                <Kembali
                    typeMutasi={selectedValue}
                    closedModal={closedModal}
                    setLoading={setLoading}
                />
            );
        } else {
            return (
                <div className="text-center mt-3">
                    Pilih komponen dari select list di atas
                </div>
            );
        }
    };

    return (
        <Transition
            as={Fragment}
            show={show}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
        >
            <div
                className="fixed top-0 left-0 border px-6 py-3 rounded w-full h-screen z-[100] flex items-center justify-center"
                onClick={closedModal}
            >
                <div
                    className="p-3 rounded shadow-lg bg-white border max-w-md w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mt-3 w-full">
                        <InputLabel value={"Pilih Perpindahan"} />
                        <SelectList
                            onChange={onPerpindahanChange}
                            options={selectEdit}
                            value={selectedValue}
                            className={"block w-full"}
                            nullValue={true}
                        />
                    </div>
                    {renderComponent()}
                </div>
            </div>
        </Transition>
    );
};

export default Edit;
