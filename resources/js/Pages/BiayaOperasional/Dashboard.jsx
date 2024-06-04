import Card from "@/Components/Card";
import DefaultTable from "@/Components/DefaultTable";
import LinkButton from "@/Components/LinkButton";
import Search from "@/Components/Search";
import useFilter from "@/Hooks/useFilter";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
// import { BiRefresh } from "react-icons/bi";

const Dashboard = ({
    branch,
    server_filters,
    datas,
    saldo_akhir,
    ...props
}) => {
    const [loading, setLoading] = useState(false);
    const { filter, removeFilter, returnedData, totals } = useFilter(
        datas,
        100,
        "mutation_index"
    );
    const headers = [
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Bulan",
                column: "bulan",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Tanggal",
                column: "transaction_date",
                class_name: "whitespace-nowrap",
                format: "date",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Type Transaksi",
                column: "type_transaksi",
                class_name: "whitespace-nowrap",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Keterangan",
                column: "keterangan",
                class_name: "whitespace-nowrap",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Wilayah",
                column: "wilayah",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Unit",
                column: "unit",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Nama Karyawan",
                column: "nama_karyawan",
            },
        },

        {
            type: "default",
            headers: {
                filterable: "no",
                name: "BOP",
                column: "saldo_sebelumya",
                format: "currency",
                class_name: "whitespace-nowrap bg-gray-100",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Debit",
                column: "debit",
                format: "currency",
                class_name: "whitespace-nowrap bg-green-100",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Kredit",
                column: "kredit",
                format: "currency",
                class_name: "whitespace-nowrap bg-red-100",
            },
        },
        {
            type: "default",
            headers: {
                filterable: "no",
                name: "Saldo",
                column: "saldo",
                format: "currency",
                class_name: "whitespace-nowrap bg-blue-100",
            },
        },
    ];

    // const filterModal = () => {
    //     return (
    //         <div
    //             className="fixed text-white top-1/2 left-1/2 -translate-x-1/2 "
    //             onClick={(e) => e.stopPropagation()}
    //         >
    //             <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
    //                 <div className="flex justify-end items-center text-2xl px-2 py-4">
    //                     <div className="flex flex-col-reverse">
    //                         <input
    //                             name="column"
    //                             value={addFilter.column}
    //                             onChange={(e) =>
    //                                 setAddFilter({
    //                                     ...addFilter,
    //                                     column: e.target.value,
    //                                 })
    //                             }
    //                             className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"
    //                         />
    //                         <label className="text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500">
    //                             Column
    //                         </label>
    //                     </div>
    //                     <div className="flex flex-col-reverse">
    //                         <select
    //                             name="operators"
    //                             value={addFilter.operators}
    //                             onChange={(e) =>
    //                                 setAddFilter({
    //                                     ...addFilter,
    //                                     operators: e.target.value,
    //                                 })
    //                             }
    //                             className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator"
    //                         >
    //                             <option value="1">contains</option>
    //                             <option value="2">equal</option>
    //                         </select>
    //                         <label className="text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500">
    //                             Operator
    //                         </label>
    //                     </div>
    //                     <div className="flex flex-col-reverse">
    //                         <input
    //                             value={addFilter.values}
    //                             type={
    //                                 showFilter.format == "number"
    //                                     ? "number"
    //                                     : showFilter.format == "date"
    //                                     ? "date"
    //                                     : showFilter.format == "currency"
    //                                     ? "number"
    //                                     : "text"
    //                             }
    //                             onChange={handleInputChange}
    //                             name="values"
    //                             className="border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"
    //                         />
    //                         <label className="text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500">
    //                             Value
    //                         </label>
    //                     </div>
    //                     <div className="flex items-center justify-center">
    //                         <button
    //                             onClick={onSubmitSearch}
    //                             className="text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg"
    //                         >
    //                             Go
    //                         </button>
    //                         <button
    //                             onClick={() =>
    //                                 setOrderData({
    //                                     column: showFilter.column,
    //                                     orderby: "asc",
    //                                 })
    //                             }
    //                             className="text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3"
    //                         >
    //                             <AiOutlineSortAscending />
    //                         </button>
    //                         <button
    //                             onClick={() =>
    //                                 setOrderData({
    //                                     column: showFilter.column,
    //                                     orderby: "desc",
    //                                 })
    //                             }
    //                             className="text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1"
    //                         >
    //                             <AiOutlineSortDescending />
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    // const tBodyGenerator = () => {
    //     if (displayData.length === 0) {
    //         return (
    //             <>
    //                 <tbody>
    //                     <tr>
    //                         <td colSpan="2">Data Not Found</td>
    //                     </tr>
    //                 </tbody>
    //             </>
    //         );
    //     }
    //     return (
    //         <tbody>
    //             {displayData.map((item, index) => {
    //                 return (
    //                     <tr
    //                         key={index}
    //                         className="bg-white border-b hover:bg-blue-50 text-xs even:bg-gray-100"
    //                     >
    //                         <th className="px-6 flex items-center justify-start gap-3">
    //                             {(currentPage - 1) * itemsPerPage + index + 1}
    //                             {item.keterangan == "unpaid" ? (
    //                                 <Link
    //                                     href={route(
    //                                         "bonpanjer.bon_panjer_show",
    //                                         item.id
    //                                     )}
    //                                     className="px-2 py-1 rounded-lg bg-red-500 text-white"
    //                                 >
    //                                     Bayar
    //                                     {/* <AiFillFolderOpen className="text-blue-500 hover:cursor-pointer" /> */}
    //                                 </Link>
    //                             ) : (
    //                                 <Link
    //                                     as="button"
    //                                     disabled
    //                                     className="px-2 py-1 rounded-lg bg-white text-green-500"
    //                                 >
    //                                     {/* <AiOutlineCheck /> */}
    //                                     <AiFillCheckCircle />
    //                                 </Link>
    //                             )}
    //                         </th>
    //                         {headers.map((header, index) => {
    //                             if (header.format == "date") {
    //                                 return (
    //                                     <td className={`px-6 py-1`} key={index}>
    //                                         <div
    //                                             className={`whitespace-pre-wrap`}
    //                                         >
    //                                             {item[header.column] !== "-"
    //                                                 ? dayjs(
    //                                                       item[header.column]
    //                                                   ).format("DD-MM-YYYY")
    //                                                 : "-"}
    //                                         </div>
    //                                     </td>
    //                                 );
    //                             }
    //                             if (header.format == "currency") {
    //                                 return (
    //                                     <td
    //                                         className={`px-6 py-1 ${header.class_name}`}
    //                                         key={index}
    //                                     >
    //                                         <div
    //                                             className={`whitespace-nowrap text-right`}
    //                                         >
    //                                             <NumericFormat
    //                                                 value={item[header.column]}
    //                                                 displayType={"text"}
    //                                                 thousandSeparator={","}
    //                                                 prefix={"Rp. "}
    //                                             />
    //                                         </div>
    //                                     </td>
    //                                 );
    //                             }
    //                             return (
    //                                 <td className={`px-6 py-1`} key={index}>
    //                                     <div
    //                                         className={`${header.class_name} `}
    //                                     >
    //                                         {item[header.column]}
    //                                     </div>
    //                                 </td>
    //                             );
    //                         })}
    //                     </tr>
    //                 );
    //             })}
    //         </tbody>
    //     );
    // };

    return (
        <Authenticated loading={loading}>
            <Card judul="Buku Transaksi BOP">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.startContent className={`flex-wrap mb-3 lg:mb-0`}>
                            <Card.filterItem
                                filter={filter}
                                removeFilter={removeFilter}
                            />
                        </Card.startContent>
                        <Card.endContent className={`flex-wrap`}>
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("mutation.index")}
                                localState={"mutation_index"}
                                availableMonth={true}
                            >
                                <LinkButton
                                    href={route("mutation.create")}
                                    title={'Input Lain"'}
                                    size={"sm"}
                                    type="button"
                                    theme="yellow"
                                />
                            </Search>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
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
                                    {item.bulan}
                                </DefaultTable.td>

                                <DefaultTable.td className={`text-center`}>
                                    {dayjs(item.transaction_date).format(
                                        "DD/MM/YYYY"
                                    )}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.type_transaksi}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.keterangan}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.wilayah}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.unit}
                                </DefaultTable.td>
                                <DefaultTable.td className={`text-center`}>
                                    {item.nama_karyawan}
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-green-200`}
                                >
                                    <NumericFormat
                                        value={item.bop}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-emerald-300`}
                                >
                                    <NumericFormat
                                        value={item.debit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-red-200`}
                                >
                                    <NumericFormat
                                        value={item.kredit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>

                                <DefaultTable.td
                                    className={`text-end bg-blue-200`}
                                >
                                    <NumericFormat
                                        value={item.saldo}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                    />
                                </DefaultTable.td>
                            </DefaultTable.tr>
                        ))}
                    </DefaultTable.tbody>
                    <tfoot>
                        <tr className="bg-blue-200 font-semibold text-black">
                            <td className={`px-3 py-1`} colSpan={"7"}>
                                TOTAL
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.bop}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-green-500 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.debit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-red-600 text-white`}>
                                <div className={`whitespace-nowrap text-right`}>
                                    <NumericFormat
                                        value={totals.kredit}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                            <td className={`px-3 py-1 bg-blue-600 text-white`}>
                                <div
                                    className={`whitespace-nowrap text-right `}
                                >
                                    <NumericFormat
                                        value={saldo_akhir}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </DefaultTable>
            </Card>
        </Authenticated>
    );
};

export default Dashboard;
