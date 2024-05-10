import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

const FilterBox = ({
    show = false,
    setShow,
    filterData,
    setFilterData,
    addFilter,
    setAddFilter,
}) => {
    const [operatorData, setOperatorData] = useState("");
    const [values, setValues] = useState("");

    const onOperatorDataChange = (e) => {
        const { value } = e.target;
        setOperatorData(value);
    };
    const onClosedModal = () => {
        setFilterData({ name: "", data_type: "" });
        setOperatorData("");
        setShow(false);
    };

    const filterOperator = [
        { id: 1, value: 1, display: "Seperti", grouping: 3 },
        { id: 2, value: 2, display: "Sama Dengan", grouping: 2 },
        // { id: 3, value: 3, display: "Diantara", grouping: 1 },
        { id: 4, value: 4, display: "Lebih Dari", grouping: 1 },
        { id: 5, value: 5, display: "Kurang Dari", grouping: 1 },
    ];

    const operator = filterOperator.filter((item) => {
        if (filterData?.data_type == "date") {
            return item.grouping < 3;
        }
        if (filterData?.data_type == "text") {
            return item.grouping > 1;
        }
        if (filterData?.data_type == "number") {
            return item.grouping < 3;
        }
    });

    const onCariClick = () => {
        setAddFilter({ ...addFilter, [filterData?.name]: values });
    };

    return (
        <Transition
            as={Fragment}
            show={show}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <div className="w-full h-screen fixed top-0 left-0 z-[50]">
                <div
                    className="flex justify-center h-full items-center"
                    onClick={onClosedModal}
                >
                    <div
                        className="flex justify-between gap-3 bg-white py-3 px-6 shadow border"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <InputLabel value={"Kolom"} />
                            <TextInput
                                readOnly
                                className={"mt-1"}
                                value={filterData?.name}
                            />
                        </div>
                        <div>
                            <InputLabel value={"."} />
                            <SelectList
                                className={"mt-1"}
                                options={operator}
                                onChange={onOperatorDataChange}
                            />
                        </div>
                        <div>
                            <InputLabel value={"Kata Kunci"} />
                            <div className="flex items-center gap-2">
                                <TextInput
                                    name="value1"
                                    className={"mt-1"}
                                    type={filterData?.data_type ?? "text"}
                                    onChange={(e) => setValues(e.target.value)}
                                />
                                {operatorData == 3 ? (
                                    <>
                                        <span>Sampai</span>
                                        <TextInput
                                            name="value2"
                                            className={"mt-1"}
                                            type={
                                                filterData?.data_type ?? "text"
                                            }
                                        />
                                    </>
                                ) : (
                                    ""
                                )}
                                <PrimaryButton
                                    title={"Cari"}
                                    onClick={onCariClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default FilterBox;
