import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import CustomerCreateModal from "./Partials/CustomerCreateModal";
import MyTables from "@/Components/MyTables";
import ContentWrap from "@/Components/ContentWrap";

const CustomerGlobal = ({ customers, ...props }) => {
    const headers = [
        {
            title: "Id Customer",
            column: "id",
            sortable: false,
        },
        {
            title: "Nama",
            column: "nama",
            sortable: false,
        },
        {
            title: "NIK",
            column: "nik",
            sortable: false,
        },
        {
            title: "No KK",
            column: "no_kk",
            sortable: false,
        },
        {
            title: "Alamat",
            column: "alamat",
            sortable: false,
        },
        {
            title: "Unit",
            column: "unit",
            sortable: false,
        },
    ];
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Management User
                    </h2>
                    <Head title="Management User" />
                    <div className="ml-auto flex items-center"></div>
                </>
            }
        >
            <div className="p-4">
                <ContentWrap>
                    <MyTables
                        header={headers}
                        link={customers.link}
                        datefilter={false}
                        editable={true}
                    >
                        <tbody>
                            {customers.data.map((item, index) => (
                                <tr key={index} className="odd:bg-gray-100">
                                    <th className="px-6 py-1">
                                        <div className="flex justify-around items-center gap-3">
                                            {index + 1}
                                            <Link
                                                href={route(
                                                    "unit.customer.edit",
                                                    item.id
                                                )}
                                            >
                                                <AiFillEdit className="text-blue-500 hover:cursor-pointer" />
                                            </Link>
                                        </div>
                                    </th>
                                    {headers.map((header, index) => (
                                        <td
                                            className="px-6 py-1 min-w-[10rem]"
                                            key={index}
                                        >
                                            {item[header.column]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </MyTables>
                </ContentWrap>
            </div>
        </Authenticated>
    );
};

export default CustomerGlobal;
