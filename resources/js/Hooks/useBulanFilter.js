import React from "react";

function useBulanFilter() {
    const bulanAngka = [
        { id: 1, display: "Januari", value: 1 },
        { id: 2, display: "Februari", value: 2 },
        { id: 3, display: "Maret", value: 3 },
        { id: 4, display: "April", value: 4 },
        { id: 5, display: "Mei", value: 5 },
        { id: 6, display: "Juni", value: 6 },
        { id: 7, display: "Juli", value: 7 },
        { id: 8, display: "Agustus", value: 8 },
        { id: 9, display: "September", value: 9 },
        { id: 10, display: "Oktober", value: 10 },
        { id: 11, display: "November", value: 11 },
        { id: 12, display: "Desember", value: 12 },
    ];

    const tahunAngka = [
        { id: 1, display: "2023", value: 2023 },
        { id: 2, display: "2024", value: 2024 },
        { id: 3, display: "2025", value: 2025 },
    ];

    return {
        tahunAngka,
        bulanAngka,
    };
}

export default useBulanFilter;
