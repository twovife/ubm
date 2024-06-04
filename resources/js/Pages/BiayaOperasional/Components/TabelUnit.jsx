import DefaultTable from "@/Components/DefaultTable";
import useFilter from "@/Hooks/useFilter";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { NumericFormat } from "react-number-format";

const TabelUnit = ({ data, loading, setLoading }) => {
    const datas = data.data;
    const { returnedData, totals } = useFilter(datas, 100, "unitsaving_index");

    const headers = [
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Nomor",
                column: "no",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Wilayah",
                column: "wilayah",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Unit",
                column: "unit",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Total",
                column: "total",
                class_name: "whitespace-nowrap",
                type_date: "text",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Keterangan",
                column: "tanggungan",
                class_name: "whitespace-nowrap",
                type_date: "text",
            },
        },
    ];

    return (
        <DefaultTable>
            <DefaultTable.thead>
                {headers.map((item, key) => (
                    <DefaultTable.th
                        key={key}
                        type={item.type}
                        headers={item.headers}
                    />
                ))}
            </DefaultTable.thead>
            <DefaultTable.tbody>
                {returnedData?.map((item, key) => (
                    <DefaultTable.tr key={key}>
                        <DefaultTable.td className={`text-center`}>
                            <div className="flex justify-start items-center gap-3">
                                {key + 1}
                                {item.button_type == 2 ? (
                                    <Link
                                        href={route(
                                            "bop.create",
                                            item.branch_id
                                        )}
                                        className="px-2 py-1 rounded-lg bg-green-500 text-white"
                                    >
                                        Setoran
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </Link>
                                ) : item.button_type == 3 ? (
                                    <Link
                                        href={route("bop.show", item.id)}
                                        className="px-2 py-1 rounded-lg bg-gray-500 text-white"
                                    >
                                        Show
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </Link>
                                ) : item.button_type == 4 ? (
                                    <div className="px-2 py-1 rounded-lg bg-gray-500 text-white">
                                        Non Aktif
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </div>
                                ) : item.button_type == 1 ? (
                                    <Link
                                        href={route("bop.show", item.id)}
                                        className="px-2 py-1 rounded-lg bg-indigo-500 text-white"
                                    >
                                        Setor
                                        {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
                                    </Link>
                                ) : (
                                    "invalid"
                                )}
                            </div>
                        </DefaultTable.td>
                        <DefaultTable.td className={`text-center`}>
                            {item.wilayah}
                        </DefaultTable.td>
                        <DefaultTable.td className={`text-center`}>
                            {item.unit}
                        </DefaultTable.td>
                        <DefaultTable.td
                            noSpace
                            className={`text-end bg-green-200`}
                        >
                            <NumericFormat
                                value={item.total}
                                displayType={"text"}
                                thousandSeparator={","}
                            />
                        </DefaultTable.td>
                        <DefaultTable.td className={`text-center`}>
                            {item.tanggungan}
                        </DefaultTable.td>
                    </DefaultTable.tr>
                ))}
            </DefaultTable.tbody>
            <tfoot className="sticky bottom-0 left-0 w-full bg-gray-300 shadow border-t border-t-white">
                <tr className="bg-blue-200 font-semibold text-black">
                    <td className={`px-3 py-1`} colSpan={3}>
                        TOTAL
                    </td>
                    <td className={`px-3 py-1 bg-green-500 text-white`}>
                        <div className={`whitespace-nowrap  text-end`}>
                            <NumericFormat
                                value={totals.total}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </div>
                    </td>
                    <td className={`px-3 py-1`}></td>
                </tr>
            </tfoot>
        </DefaultTable>
    );
};

export default TabelUnit;
