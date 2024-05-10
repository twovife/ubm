import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import useServerFilter from "@/Hooks/useServerFilter";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Search = ({ branchFilled }) => {
    const {
        dataWilayah,
        branches,
        filteredBranch,
        selectedWilayah,
        selectedBranch_id,
    } = useServerFilter();
    const { data, setData, get, processing, recentlySuccessful } = useForm({
        branch_id: selectedBranch_id || "",
    });

    const [wilayah, setWilayah] = useState(selectedWilayah);
    const [optBranch, setOptBranch] = useState(filteredBranch);

    const onWilayahChange = (e) => {
        const { value } = e.target;
        setWilayah(value);

        const branch = branches?.filter((item) => {
            return item.wilayah == value;
        });
        setOptBranch(branch);
        setData("branch_id", "");
    };

    const onSearchChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    const onSubmitSearch = (e) => {
        e.preventDefault();
        get(route("emp.index"), { only: ["employees", "server_filter"] });
    };
    return (
        <form
            onSubmit={onSubmitSearch}
            className="flex items-center justify-start gap-3"
        >
            <SelectList
                name="wilayah"
                value={wilayah}
                nullValue={true}
                options={dataWilayah}
                onChange={onWilayahChange}
            />
            {wilayah >= 0 && (
                <SelectList
                    name="branch_id"
                    value={data.branch_id}
                    nullValue={true}
                    options={optBranch}
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
