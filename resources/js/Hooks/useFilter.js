import { useEffect, useState } from "react";

function useFilter(data, itemsPerPage, local_name) {
    const savedFilter = localStorage.getItem(local_name);

    const { oldFilter, oldPage } = savedFilter
        ? JSON.parse(savedFilter)
        : { oldFilter: [], oldPage: 1 };

    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState(oldFilter);
    const [addFilter, setAddFilter] = useState({});
    const [returnedData, setReturnedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(oldPage);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const handleWindowClick = (e) => {
            if (e.target.classList.contains("filterthis")) {
                setShowFilter(true);
                setAddFilter({
                    name: e.target.getAttribute("data-name"),
                    data_type: e.target.getAttribute("data-type"),
                });
            }
        };
        window.addEventListener("click", handleWindowClick);
        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, []);

    const whenFilterrAdding = (params) => {
        const isDuplicate = filter.some(
            (item) =>
                item.name === params.name &&
                item.search_key.toLowerCase() ===
                    params.search_key.toLowerCase()
        );
        if (!isDuplicate) {
            setFilter([...filter, { ...params, id: filter.length + 1 }]);
        }
        setCurrentPage(1);
    };

    const removeFilter = (id) => {
        setFilter((prevFilter) => prevFilter.filter((item) => item.id !== id));
        setCurrentPage(1);
    };

    const filterData = (data, filter) => {
        if (filter.length === 0) {
            return data;
        } else {
            return data.filter((item) => {
                return filter.every((filterItem) => {
                    switch (filterItem.operator) {
                        case 2:
                            return (
                                item[filterItem.name] == filterItem.search_key
                            );
                        case 4:
                            return (
                                item[filterItem.name] > filterItem.search_key
                            );
                        case 5:
                            return (
                                item[filterItem.name] < filterItem.search_key
                            );
                        case 1:
                            if (filterItem.data_type === "text") {
                                return item[filterItem.name]
                                    .toLowerCase()
                                    .includes(
                                        filterItem.search_key.toLowerCase()
                                    );
                            } else {
                                return item[filterItem.name].includes(
                                    filterItem.search_key
                                );
                            }
                        default:
                            return data;
                    }
                });
            });
        }
    };

    const displayData = (data, filter) => {
        const filteredData = filterData(data, filter);
        // console.log(filterData(data, filter));
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
        return filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    };

    useEffect(() => {
        const filteredData = displayData(data, filter);

        setReturnedData(filteredData);
        localStorage.setItem(
            local_name,
            JSON.stringify({ oldFilter: filter, oldPage: currentPage })
        );
    }, [currentPage, filter]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let totals = {};

    returnedData.forEach((entry) => {
        for (let key in entry) {
            if (key !== "wilayah" && key !== "bulan") {
                totals[key] =
                    (parseInt(totals[key]) || 0) + parseInt(entry[key] ?? 0);
            }
        }
    });

    return {
        showFilter,
        setShowFilter,
        filter,
        whenFilterrAdding,
        addFilter,
        setAddFilter,
        removeFilter,
        returnedData,
        totalPages,
        currentPage,
        displayData,
        handlePageChange,
        setCurrentPage,
        totals,
    };
}

export default useFilter;
