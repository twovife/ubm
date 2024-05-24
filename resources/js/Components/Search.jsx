import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import useServerFilter from "@/Hooks/useServerFilter";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";

const Search = ({
    loading,
    setLoading,
    urlLink = route("emp.index"),
    localState,
    FilterWilayahOnly = false,
    availableBranch = false,
    availableDate = false,
    availableMonth = false,
}) => {
    const {
        wilayah,
        selectedWilayah,
        setSelectedWilayah,
        filteredBranch,
        selectedBranch_id,
        selectedBulan,
    } = useServerFilter();
    // console.log(selectedBulan);

    const { data, setData, get, processing } = useForm({});
    console.log(data);

    const onSearchChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const onOptWilayahChange = (e) => {
        const { value } = e.target;
        setSelectedWilayah(value);
        setData({ branch_id: "" });
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
        get(urlLink, { only: ["datas", "server_filter", "batch_datas"] });
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
        if (selectedBranch_id) {
            newData.branch_id = selectedBranch_id;
        }
        if (selectedBulan) {
            newData.bulan = selectedBulan;
        }
        if (selectedWilayah) {
            newData.wilayah = selectedWilayah;
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
            className="flex lg:flex-row flex-col items-center justify-start gap-3 w-full lg:w-auto"
        >
            {availableMonth && (
                <TextInput
                    type="month"
                    className={"w-full"}
                    onChange={onSearchChange}
                    name="bulan"
                    value={data.bulan}
                />
            )}
            {availableDate && (
                <TextInput
                    type="date"
                    className={"w-full"}
                    onChange={onSearchChange}
                    name="tanggal"
                    value={data.tanggal}
                />
            )}

            {FilterWilayahOnly && (
                <SelectList
                    name="wilayah"
                    value={data.wilayah}
                    className={`w-full`}
                    nullValue={true}
                    options={wilayah}
                    onChange={onSearchChange}
                />
            )}

            {availableBranch && (
                <>
                    <SelectList
                        name="wilayah"
                        value={selectedWilayah}
                        className={`w-full`}
                        nullValue={true}
                        options={wilayah}
                        onChange={onOptWilayahChange}
                    />
                    {selectedWilayah !== "" && (
                        <SelectList
                            name="branch_id"
                            className={`w-full`}
                            value={data.branch_id}
                            nullValue={true}
                            required
                            options={filteredBranch}
                            onChange={onSearchChange}
                        />
                    )}
                </>
            )}
            <div className="flex flex-row gap-3">
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
            </div>
        </form>
    );
};

export default Search;
