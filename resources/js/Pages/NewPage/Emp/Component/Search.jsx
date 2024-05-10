import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import useServerFilter from "@/Hooks/useServerFilter";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Search = ({ loading, setLoading }) => {
    const {
        wilayah,
        selectedWilayah,
        setSelectedWilayah,
        filteredBranch,
        selectedBranch,
    } = useServerFilter();

    const { data, setData, get, processing, recentlySuccessful } = useForm({
        branch_id: selectedBranch ?? "",
    });

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
        get(route("emp.index"), { only: ["employees", "server_filter"] });
    };

    useEffect(() => {
        setLoading(processing);
    }, [processing]);
    return (
        <form
            onSubmit={onSubmitSearch}
            className="flex items-center justify-start gap-3"
        >
            <SelectList
                name="wilayah"
                value={selectedWilayah}
                nullValue={true}
                options={wilayah}
                onChange={onOptWilayahChange}
            />
            {selectedWilayah !== "" && (
                <SelectList
                    name="branch_id"
                    value={data.branch_id}
                    nullValue={true}
                    options={filteredBranch}
                    onChange={onSearchChange}
                />
            )}

            <PrimaryButton
                type="submit"
                theme="green"
                className="block"
                title={"Cari"}
            />
        </form>
    );
};

export default Search;
