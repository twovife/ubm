import InputLabel from "@/Components/InputLabel";
import SelectList from "@/Components/SelectList";
import React, { Fragment, useState } from "react";
import Mutasi from "./Mutasi";
import { Transition } from "@headlessui/react";
import Resign from "./Resign";
import Kembali from "./Kembali";

const ComponentC = () => <div>komponen C</div>;
const Perpindahan = ({ show, setShow, isActive }) => {
    const [selectedValue, setSelectedValue] = useState("");

    const selectPerpindahan = [
        { id: 1, value: 1, display: "Promosi" },
        { id: 2, value: 2, display: "Mutasi" },
        { id: 3, value: 3, display: "Demosi" },

        { id: 4, value: 4, display: "Resign" },
        { id: 5, value: 5, display: "Pecat" },

        { id: 6, value: 6, display: "Kembali Masuk" },
    ];

    const filteredOptions = isActive
        ? selectPerpindahan.filter((options) => options.id < 6)
        : selectPerpindahan.filter((options) => options.id === 6);

    const onPerpindahanChange = (e) => {
        const value = parseInt(e.target.value, 10); // Konversi nilai menjadi angka
        setSelectedValue(value);
    };

    const closedModal = (e) => {
        setShow();
        setTimeout(() => {
            setSelectedValue("");
        }, 200);
    };

    const renderComponent = () => {
        console.log("Render component for value:", selectedValue);
        if (selectedValue >= 1 && selectedValue <= 3) {
            return (
                <Mutasi typeMutasi={selectedValue} closedModal={closedModal} />
            );
        } else if (selectedValue >= 4 && selectedValue <= 5) {
            return (
                <Resign typeMutasi={selectedValue} closedModal={closedModal} />
            );
        } else if (selectedValue === 6) {
            return (
                <Kembali typeMutasi={selectedValue} closedModal={closedModal} />
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
                            options={filteredOptions}
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

export default Perpindahan;
