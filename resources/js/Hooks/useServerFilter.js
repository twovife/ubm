import { usePage } from "@inertiajs/react";

function useServerFilter() {
    const { server_filter } = usePage().props;

    const dataWilayah = [
        { id: 0, display: "Pusat", value: 0 },
        { id: 1, display: "Wilayah 1", value: 1 },
        { id: 2, display: "Wilayah 2", value: 2 },
        { id: 3, display: "Wilayah 3", value: 3 },
        { id: 4, display: "Wilayah 4", value: 4 },
        { id: 5, display: "Wilayah 5", value: 5 },
        { id: 6, display: "Wilayah 6", value: 6 },
        { id: 7, display: "Wilayah 7", value: 7 },
        { id: 8, display: "Wilayah 8", value: 8 },
        { id: 9, display: "Wilayah 9", value: 9 },
        { id: 10, display: "Wilayah 10", value: 10 },
    ];

    const branches = server_filter?.branch?.map((item) => {
        return {
            id: item.id,
            display: item.unit,
            value: item.id,
            wilayah: item.wilayah,
        };
    });
    const selectedWilayah = server_filter?.wilayah ?? null;
    const selectedBranch_id = server_filter?.branch_id ?? null;

    const filteredBranch = branches?.filter((item) => {
        return item.wilayah == selectedWilayah;
    });

    return {
        dataWilayah,
        branches,
        selectedWilayah,
        selectedBranch_id,
        filteredBranch,
    };
}

export default useServerFilter;
