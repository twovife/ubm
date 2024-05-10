import { useEffect, useState } from "react";

function useFilter({ employees }) {
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState([]);
    const [addFilter, setAddFilter] = useState({});

    useEffect(() => {
        const log = (e) => {
            if (e.target.classList.contains("filterthis")) {
                setShowFilter(true);
                setAddFilter({
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
    // const employeeAfterFilter = employees.filter(item=>item.);
    return {
        showFilter,
        setShowFilter,
        filter,
        setFilter,
        addFilter,
        setAddFilter,
    };
}

export default useFilter;
