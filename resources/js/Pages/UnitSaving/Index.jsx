import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import useBulanFilter from "@/Hooks/useBulanFilter";
import useFilteredComplains from "@/Hooks/useFilteredComplains";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import {
    AiFillEdit,
    AiFillFilter,
    AiOutlineClose,
    AiOutlineSortAscending,
    AiOutlineSortDescending,
} from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { NumericFormat } from "react-number-format";
import TabelUnit from "./Components/TabelUnit";
// import { BiRefresh } from "react-icons/bi";

const Index = ({ branch, server_filters, datas, batch_datas, ...props }) => {
    const {
        tahunAngka,
        bulanAngka,
        serverFilter,
        setServerFilter,
        onServerFilterChange,
        onBranchChange,
        branchess,
        loading,
        setLoading,
        activeTab,
        setActiveTab,
        handleTabClick,
    } = useBulanFilter(
        server_filters,
        route("unitsaving.index"),
        branch,
        batch_datas,
        "wilayah"
    );

    const itemsPerPage = 50;
    const {
        filters,
        setFilters,
        orderData,
        setOrderData,
        currentPage,
        setCurrentPage,
        displayData,
        totalPages,
        handlePageChange,
        totals,
    } = useFilteredComplains({}, itemsPerPage, datas);

    const [showFilter, setShowFilter] = useState("");
    const [addFilter, setAddFilter] = useState({
        column: "",
        operators: "1",
        values: "",
    });

    const thisonclick = (column, format = "text") => {
        setShowFilter({ column, format });
    };

    useEffect(() => {
        const storedFilter = JSON.parse(
            localStorage.getItem("dashboard_unitsaving")
        );
        if (storedFilter && Object.keys(storedFilter).length > 0) {
            setFilters(storedFilter);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("dashboard_unitsaving", JSON.stringify(filters));
    }, [filters]);

    useEffect(() => {
        const log = (e) => {
            if (e.target.tagName == "TH") {
                thisonclick(
                    e.target.getAttribute("data-item"),
                    e.target.getAttribute("data-format")
                );
                setAddFilter({
                    ...addFilter,
                    ["column"]: e.target.getAttribute("data-item"),
                });
            } else {
                thisonclick("");
            }
        };
        window.addEventListener("click", log);
        return () => {
            window.removeEventListener("click", log);
        };
    });

    const onSubmitSearch = () => {
        const updatedFilters = [...filters];

        // Cari indeks filter yang memiliki column yang sama dengan addFilter.column
        const indexToUpdate = updatedFilters.findIndex(
            (filter) => filter.column === addFilter.column
        );

        // Jika ada filter dengan column yang sama, gantikan filter tersebut
        if (indexToUpdate !== -1) {
            updatedFilters[indexToUpdate] = addFilter;
        } else {
            // Jika tidak ada filter dengan column yang sama, tambahkan filter baru
            updatedFilters.push(addFilter);
        }

        setFilters(updatedFilters);
    };

    const decrementFilter = (column) => {
        // Buat salinan dari daftar filter
        const updatedFilters = [...filters];
        // Cari indeks filter dengan column yang sesuai
        const decrementFilters = filters.filter(
            (filter) => filter.column !== column
        );
        setFilters(decrementFilters);
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        let convertedValue = value;

        if (type === "number") {
            convertedValue = parseInt(value);
        }

        setAddFilter({
            ...addFilter,
            [name]: convertedValue,
        });
    };

    const headers = [
        {
            title: "Wilayah",
            column: "wilayah",
        },
        {
            title: "Saldo Tabungan",
            column: "total",
            format: "currency",
        },
        {
            title: "Setoran Terakhir",
            column: "last_month_payment",
        },
    ];

    const filterModal = () => {
        return (
            <div
                className="fixed text-white top-1/2 left-1/2 -translate-x-1/2"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="flex justify-end items-center text-2xl px-2 py-4">
                        <div className="flex flex-col-reverse">
                            <input
                                name="column"
                                value={addFilter.column}
                                onChange={(e) =>
                                    setAddFilter({
                                        ...addFilter,
                                        column: e.target.value,
                                    })
                                }
                                className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"
                            />
                            <label className="text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500">
                                Column
                            </label>
                        </div>
                        <div className="flex flex-col-reverse">
                            <select
                                name="operators"
                                value={addFilter.operators}
                                onChange={(e) =>
                                    setAddFilter({
                                        ...addFilter,
                                        operators: e.target.value,
                                    })
                                }
                                className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator"
                            >
                                <option value="1">contains</option>
                                <option value="2">equal</option>
                            </select>
                            <label className="text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500">
                                Operator
                            </label>
                        </div>
                        <div className="flex flex-col-reverse">
                            <input
                                value={addFilter.values}
                                type={
                                    showFilter.format == "number"
                                        ? "number"
                                        : showFilter.format == "date"
                                        ? "date"
                                        : showFilter.format == "currency"
                                        ? "number"
                                        : "text"
                                }
                                onChange={handleInputChange}
                                name="values"
                                className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"
                            />
                            <label className="text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500">
                                Value
                            </label>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                onClick={onSubmitSearch}
                                className="text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg"
                            >
                                Go
                            </button>
                            <button
                                onClick={() =>
                                    setOrderData({
                                        column: showFilter.column,
                                        orderby: "asc",
                                    })
                                }
                                className="text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3"
                            >
                                <AiOutlineSortAscending />
                            </button>
                            <button
                                onClick={() =>
                                    setOrderData({
                                        column: showFilter.column,
                                        orderby: "desc",
                                    })
                                }
                                className="text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1"
                            >
                                <AiOutlineSortDescending />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const tBodyGenerator = () => {
        if (displayData.length === 0) {
            return (
                <>
                    <tbody>
                        <tr>
                            <td colSpan="2">Data Not Found</td>
                        </tr>
                    </tbody>
                </>
            );
        }
        return (
            <tbody>
                {displayData.map((item, index) => {
                    return (
                        <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs"
                        >
                            <th className="px-6 py-1">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </th>
                            {headers.map((header, index) => {
                                if (header.format == "date") {
                                    return (
                                        <td className={`px-6 py-1`} key={index}>
                                            <div
                                                className={`whitespace-pre-wrap`}
                                            >
                                                {item[header.column] !== "-"
                                                    ? dayjs(
                                                          item[header.column]
                                                      ).format("DD-MM-YYYY")
                                                    : "-"}
                                            </div>
                                        </td>
                                    );
                                }
                                if (header.format == "currency") {
                                    return (
                                        <td
                                            className={`px-6 py-1 ${header.class_name}`}
                                            key={index}
                                        >
                                            <div
                                                className={`whitespace-nowrap`}
                                            >
                                                <NumericFormat
                                                    value={item[header.column]}
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </div>
                                        </td>
                                    );
                                }
                                return (
                                    <td className={`px-6 py-1`} key={index}>
                                        <div
                                            className={`${header.class_name} `}
                                        >
                                            {item[header.column]}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    return (
        <Authenticated
            loading={loading}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Simpanan 1Jt
                    </h2>
                    <form
                        // onSubmit={onBranchChange}
                        className="ml-auto flex gap-3 items-center"
                    >
                        <SelectList
                            value={serverFilter.transaction_month}
                            options={bulanAngka}
                            name={"transaction_month"}
                            nullValue={true}
                            className={"text-sm"}
                            onChange={onServerFilterChange}
                        />
                        <SelectList
                            value={serverFilter.transaction_year}
                            options={tahunAngka}
                            name={"transaction_year"}
                            nullValue={true}
                            className={"text-sm"}
                            onChange={onServerFilterChange}
                        />
                        {/* <SelectList
                            value={serverFilter.wilayah}
                            name={"wilayah"}
                            options={branchess}
                            nullValue={true}
                            className={"text-sm"}
                            onChange={onServerFilterChange}
                        /> */}

                        <PrimaryButton
                            href={route("unitsaving.index")}
                            title={"Go"}
                            size={"sm"}
                            type="submit"
                            theme="green"
                        />
                        {/* <LinkButton
                            href={route("unitsaving.create")}
                            title={"+ New"}
                            size={"sm"}
                            type="button"
                            theme="yellow"
                        /> */}

                        <LinkButton
                            href={route("unitsaving.index")}
                            title={"Reset"}
                            size={"sm"}
                            theme="other"
                            type="submit"
                            icon={<BiRefresh />}
                        />
                    </form>
                </>
            }
        >
            <div className="mx-auto sm:px-6 lg:px-8 mb-6">
                {filters && (
                    <div className="inline-block mt-3">
                        {filters.map((item) => {
                            if (item.column == "") {
                                return null;
                            }
                            return (
                                <div className="flex items-center justify-start space-y-2">
                                    <div className="border rounded flex items-center">
                                        <div className="p-2 text-lg bg-green-400 text-white">
                                            <AiFillFilter />
                                        </div>
                                        <div className="px-3 text-sm text-main-500">
                                            <span className="mr-1 capitalize ">
                                                {item.column}
                                            </span>
                                            <span className="mr-1 capitalize ">
                                                {item.operators == 1
                                                    ? "Contains"
                                                    : "="}
                                            </span>
                                            <span>'{item.values}'</span>
                                        </div>
                                    </div>
                                    <div
                                        className="hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2"
                                        onClick={() =>
                                            decrementFilter(item.column)
                                        }
                                    >
                                        <AiOutlineClose />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="mx-auto sm:px-6 lg:px-8 mb-6">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap">
                        <tr>
                            <th className="px-6 py-4">Nomor</th>
                            {headers.map((header, key) => (
                                <th
                                    key={key}
                                    data-item={header.column}
                                    data-format={header.format ?? "text"}
                                    scope="col"
                                    className="px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer"
                                >
                                    {header.title}
                                    {orderData.column == header.column && (
                                        <span className="ml-1 text-blue-400 italic">
                                            {orderData.orderby}
                                        </span>
                                    )}

                                    {showFilter.column == header.column &&
                                        filterModal()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {tBodyGenerator()}
                    <tfoot>
                        <tr className="bg-blue-200 font-semibold text-black">
                            <td className={`px-6 py-1`} colSpan={"2"}>
                                TOTAL
                            </td>
                            <td className={`px-6 py-1`}>
                                <div className={`whitespace-nowrap`}>
                                    <NumericFormat
                                        value={totals.total}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-6 py-1`}></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="mx-auto sm:px-6 lg:px-8 mb-6">
                {batch_datas.length > 0 ? (
                    <>
                        <ul className="tab-list flex justify-start gap-3 flex-wrap">
                            {batch_datas.map((item) => (
                                <li
                                    key={item.wilayah}
                                    className={`tab ${
                                        activeTab === item.wilayah
                                            ? "active bg-main-400 ring-2 ring-main-500"
                                            : ""
                                    } px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`}
                                    onClick={() => handleTabClick(item.wilayah)}
                                >
                                    {item.wilayah}
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content mt-3">
                            {batch_datas.map((item) => (
                                <div
                                    key={item.wilayah}
                                    className={
                                        activeTab === item.wilayah
                                            ? "active"
                                            : "hidden"
                                    }
                                >
                                    <TabelUnit
                                        data={item}
                                        branch={branch}
                                        loading={loading}
                                        setLoading={setLoading}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>Belum ada data yang di input di wilayah ini</div>
                )}
            </div>
        </Authenticated>
    );
};

export default Index;
