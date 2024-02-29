import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import useFilteredComplains from "@/Hooks/useFilteredComplains";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
    AiFillEdit,
    AiFillFilter,
    AiOutlineClose,
    AiOutlineSortAscending,
    AiOutlineSortDescending,
} from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { NumericFormat } from "react-number-format";

const Index = ({ branch, server_filters, datas, ...props }) => {
    console.log(branch);
    const itemsPerPage = 100;
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
    } = useFilteredComplains({}, itemsPerPage);

    const [showFilter, setShowFilter] = useState("");
    const [addFilter, setAddFilter] = useState({
        column: "",
        operators: "1",
        values: "",
    });

    const [loading, setLoading] = useState(false);

    const thisonclick = (column, format = "text") => {
        setShowFilter({ column, format });
    };

    useEffect(() => {
        const storedFilter = JSON.parse(
            localStorage.getItem("dashboard_simpanan_karyawan")
        );
        if (storedFilter && Object.keys(storedFilter).length > 0) {
            setFilters(storedFilter);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "dashboard_simpanan_karyawan",
            JSON.stringify(filters)
        );
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

    const branchess = branch.map((item) => {
        return {
            id: item.id,
            value: item.id,
            display: item.unit,
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
    const headers = [
        {
            title: "Wilayah",
            column: "wilayah",
        },
        {
            title: "Unit",
            column: "unit",
            nowrap: true,
            className: "whitespace-nowrap",
        },
        {
            title: "Nama Karyawan",
            column: "nama",
            nowrap: true,
        },

        {
            title: "Status Karyawan",
            column: "status_karyawan",
        },
        {
            title: "tanggal_masuk",
            column: "hiredate",
            format: "date",
        },
        {
            title: "Jabatan",
            column: "jabatan",
        },
        {
            title: "Tanggal Tabungan",
            column: "tanggal_tabungan",
            format: "date",
        },
        {
            title: "Simpanan Wajib",
            column: "saldo_sw",
            format: "currency",
            className: "bg-green-200 font-semibold",
        },
        {
            title: "Simpanan Sukarela",
            column: "saldo_sk",
            format: "currency",
            className: "bg-green-200 font-semibold",
        },
        {
            title: "Total Simpanan",
            column: "total_saldo",
            format: "currency",
            className: "bg-green-200 font-semibold",
        },
    ];

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
                {displayData.map((item, index) => (
                    <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm"
                    >
                        <th className="px-6 py-1">
                            <div className="flex justify-around items-center gap-3">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                                <Link
                                    href={route("simpanan.transaksi", item.id)}
                                >
                                    <AiFillEdit className="text-blue-500 hover:cursor-pointer" />
                                </Link>
                            </div>
                        </th>
                        {headers.map((header, index) => {
                            if (header.format == "date") {
                                return (
                                    <td
                                        className={`px-6 py-1 ${header.className} `}
                                        key={index}
                                    >
                                        <div>
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
                                if (header.column === "saldo_akhir") {
                                    return (
                                        <td
                                            className={`bg-green-200 px-6 py-1 ${header.className}`}
                                            key={index}
                                        >
                                            <div>
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
                                    <td
                                        className={`px-6 py-1 ${header.className} `}
                                        key={index}
                                    >
                                        <div>
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
                                <td
                                    className={`px-6 py-1 ${header.className} `}
                                    key={index}
                                >
                                    <div>{item[header.column]}</div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        );
    };

    const onResetPage = () => {
        setLoading(true);
        localStorage.setItem("dashboard_simpanan_karyawan", null);
        setFilters([{ column: "", operators: "1", values: "" }]);
        setOrderData({ column: "", orderby: "" });
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const [serverFilter, setServerFilter] = useState({
        branch_id: parseInt(server_filters.branch_id) ?? null,
    });

    const onServerFilterChange = (e) => {
        const { value, name } = e.target;
        setServerFilter({ ...serverFilter, [name]: value });
    };
    const onBranchChange = (e) => {
        e.preventDefault();
        console.log(serverFilter);
        setLoading(true);
        router.visit(route("sksw.skswdashboard"), {
            data: { ...serverFilter },
        });
    };

    return (
        <Authenticated
            loading={loading}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Daftar Simpanan Karyawan
                    </h2>
                    <form
                        onSubmit={onBranchChange}
                        className="ml-auto flex gap-3 items-center"
                    >
                        <SelectList
                            value={serverFilter.branch_id}
                            name={"branch_id"}
                            options={branchess}
                            nullValue={true}
                            className={"text-sm"}
                            onChange={onServerFilterChange}
                        />

                        <PrimaryButton
                            title={"Go"}
                            size={"sm"}
                            type="submit"
                            theme="green"
                        />

                        <LinkButton
                            href={route("sksw.skswdashboard")}
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
                <div className="p-3 bg-white rounded shadow">
                    <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3">
                        <div className="flex items-center gap-3">
                            <PrimaryButton
                                onClick={onResetPage}
                                size={"sm"}
                                theme="other"
                                icon={<BiRefresh />}
                                title={"Reset Fiter"}
                            />

                            <LinkButton
                                as="button"
                                href={route("simpanan.create")}
                                icon={<IoMdAdd />}
                                size={"md"}
                                title={"Tambah"}
                            ></LinkButton>
                        </div>
                    </div>
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

                <div className="h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto">
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
                    </table>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
