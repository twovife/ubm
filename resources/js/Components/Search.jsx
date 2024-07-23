import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import useServerFilter from "@/Hooks/useServerFilter";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import ButtonWrapper from "./ButtonWrapper";

const Search = ({
    loading,
    setLoading,
    urlLink = route("emp.index"),
    localState,
    FilterWilayahOnly = false,
    availableBranch = false,
    availableDate = false,
    availableMonth = false,
    availablePlanText = false,
    planTextName = "search",
    children,
}) => {
    const {
        selectedSearchParam,
        wilayah,
        selectedWilayah,
        setSelectedWilayah,
        filteredBranch,
        selectedBranch_id,
        selectedBulan,
    } = useServerFilter();

    const { data, setData, get, processing } = useForm({});
    const onSearchChange = (e) => {
        const { name, value } = e.target;
        if (availablePlanText) {
            if (name == planTextName) {
                setData((prevData) => {
                    const newData = { [name]: value };

                    for (const key in prevData) {
                        if (key !== name) {
                            newData[key] = "";
                        }
                    }
                    return newData;
                });
            } else {
                setData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    [planTextName]: "",
                }));
            }
        } else {
            setData(name, value);
        }
    };

    const onOptWilayahChange = (e) => {
        const { value } = e.target;
        setSelectedWilayah(value);
        setData({ branch_id: "" });
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
        get(urlLink);
    };

    const ResetFilter = (e) => {
        e.preventDefault();
        router.visit(urlLink, {
            onStart: (visit) => setLoading(true),
            onFinish: (visit) => setLoading(false),
        });
        localStorage.setItem(
            localState,
            JSON.stringify({ oldFilter: [], oldPage: 1 })
        );
    };

    useEffect(() => {
        const newData = {};

        if (selectedSearchParam) {
            newData[planTextName] = selectedSearchParam;
        } else {
            if (selectedBranch_id) {
                newData.branch_id = selectedBranch_id;
            }
            if (selectedBulan) {
                newData.bulan = selectedBulan;
            }
            if (selectedWilayah) {
                newData.wilayah = selectedWilayah;
            }
        }

        if (Object.keys(newData).length > 0) {
            setData(newData);
        }
    }, []);

    useEffect(() => {
        setLoading(processing);
    }, [processing]);

    return (
        <form
            onSubmit={onSubmitSearch}
            className="flex w-full flex-col lg:flex-row gap-3 items-end lg:items-center justify-end"
            // className="flex lg:flex-row flex-col items-center justify-start gap-3 w-full lg:w-auto bg-red-400"
        >
            <div className="flex flex-row justify-end gap-3 flex-wrap w-full lg:w-auto">
                {availableMonth && (
                    <TextInput
                        type="month"
                        className={"w-full lg:w-auto"}
                        onChange={onSearchChange}
                        name="bulan"
                        value={data.bulan}
                    />
                )}
                {availableDate && (
                    <TextInput
                        type="date"
                        className={"w-full lg:w-auto"}
                        onChange={onSearchChange}
                        name="tanggal"
                        value={data.tanggal}
                    />
                )}

                {FilterWilayahOnly && (
                    <SelectList
                        name="wilayah"
                        value={data.wilayah}
                        className={`w-full lg:w-auto`}
                        nullValue={true}
                        options={wilayah}
                        onChange={onSearchChange}
                    />
                )}

                {availablePlanText && (
                    <TextInput
                        type="text"
                        className={"w-full lg:w-auto"}
                        onChange={onSearchChange}
                        name={planTextName}
                        value={data[planTextName]}
                        placeholder={planTextName}
                    />
                )}

                {availableBranch && (
                    <>
                        <SelectList
                            name="wilayah"
                            value={selectedWilayah}
                            className={`w-full lg:w-auto inline-block`}
                            nullValue={true}
                            options={wilayah}
                            onChange={onOptWilayahChange}
                        />
                        {selectedWilayah !== "" && (
                            <SelectList
                                name="branch_id"
                                className={`w-full lg:w-auto`}
                                value={data.branch_id}
                                nullValue={true}
                                required
                                options={filteredBranch}
                                onChange={onSearchChange}
                            />
                        )}
                    </>
                )}
            </div>
            <ButtonWrapper>
                <PrimaryButton
                    type="submit"
                    theme="green"
                    className="block"
                    title={"Cari"}
                />
                <PrimaryButton
                    onClick={ResetFilter}
                    type="button"
                    theme="yellow"
                    className="block"
                    title={"Reset"}
                />
                {children}
            </ButtonWrapper>
        </form>
    );
};

export default Search;
