import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";

const FilterBox = ({
    show = false,
    setShow,
    filter,
    setFilter,
    addFilter,
    setAddFilter,
}) => {
    const filterOperator = [
        { id: 1, value: 1, display: "Seperti", grouping: 3 },
        { id: 2, value: 2, display: "Sama Dengan", grouping: 2 },
        // { id: 3, value: 3, display: "Diantara", grouping: 1 },
        { id: 4, value: 4, display: "Lebih Dari", grouping: 1 },
        { id: 5, value: 5, display: "Kurang Dari", grouping: 1 },
    ];

    const operator = filterOperator.filter((item) => {
        if (addFilter?.data_type == "date") {
            return item.grouping < 3;
        }
        if (addFilter?.data_type == "text") {
            return item.grouping > 1;
        }
        if (addFilter?.data_type == "number") {
            return item.grouping < 3;
        }
        return item.grouping > 0;
    });

    const [onChangeValues, setOnChangeValues] = useState({
        name: "",
        data_type: "",
        operator: "",
        values: "",
    });

    useLayoutEffect(() => {
        setOnChangeValues({
            ...onChangeValues,

            name: addFilter?.name,
            data_type: addFilter?.data_type,
            operator: operator[0]?.value,
        });
    }, [show]);

    const onChangeChangeValues = (e) => {
        const { name, value } = e.target;
        setOnChangeValues({ ...onChangeValues, [name]: value });
    };

    const onCariClick = (e) => {
        e.preventDefault();
        setFilter([...filter, { ...onChangeValues, id: filter.length + 1 }]);
    };

    const onClosedModal = () => {
        setOnChangeValues({
            name: "",
            data_type: "",
            operator: "",
            values: "",
        });
        setAddFilter({ name: "", data_type: "" });
        setShow(false);
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
                    <form
                        onSubmit={onCariClick}
                        className="flex justify-between gap-3 bg-white py-3 px-6 shadow border"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <InputLabel value={"Kolom"} />
                            <TextInput
                                readOnly
                                className={"mt-1"}
                                value={addFilter.name}
                            />
                        </div>
                        <div>
                            <InputLabel value={"."} />
                            <SelectList
                                className={"mt-1"}
                                onChange={onChangeChangeValues}
                                options={operator}
                                value={addFilter.operator}
                            />
                        </div>
                        <div>
                            <InputLabel value={"Kata Kunci"} />
                            <div className="flex items-center gap-2">
                                <TextInput
                                    required
                                    name="search_key"
                                    onChange={onChangeChangeValues}
                                    className={"mt-1"}
                                    value={addFilter.search_key}
                                    type={addFilter?.data_type ?? "text"}
                                />
                                <PrimaryButton title={"Cari"} type="submit" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default FilterBox;
