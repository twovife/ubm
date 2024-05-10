import { useEffect, useState } from "react";

function useFilter({ employees }) {
    const [filterData, setFilterData] = useState({
        name: "",
        data_type: "",
    });
    const [showFilter, setShowFilter] = useState();

    useEffect(() => {
        const log = (e) => {
            if (e.target.classList.contains("filterthis")) {
                setShowFilter(true);
                setFilterData({
                    name: e.target.getAttribute("data-name"),
                    data_type: e.target.getAttribute("data-type"),
                });
            }
        };
        window.addEventListener("click", log);
        return () => {
            window.removeEventListener("click", log);
        };
    });
    const [addFilter, setAddFilter] = useState({});
    const employeeAfterFilter = employees.filter(item=>item.);
    return {
        filterData,
        setFilterData,
        showFilter,
        setShowFilter,
        addFilter,
        setAddFilter,
    };
}

export default useFilter;
