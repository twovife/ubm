import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import LinkButton from "@/Components/LinkButton";
import ModalAlert from "@/Components/ModalAlert";
import SelectList from "@/Components/SelectList";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import dayjs from "dayjs";
import Loading from "@/Components/Loading";
import ActionPinjaman from "./Partials/ActionPinjaman";
import { NumericFormat } from "react-number-format";
import ContentWrap from "@/Components/ContentWrap";
import MyTables from "@/Components/MyTables";
import { AiFillEdit } from "react-icons/ai";

const RequestPinjaman = ({ datadrops, ...props }) => {
    const [showActionPinjaman, setShowActionPinjaman] = useState(false);
    const hideActionPinjaman = (e) => {
        setShowActionPinjaman(false);
    };

    const headers = [
        {
            title: "Nomor Pinjaman",
            column: "id",
            sortable: false,
            filterable: true,
        },
        {
            title: "Nama Nasabah",
            column: "customer_nama",
            sortable: false,
            filterable: false,
        },
        {
            title: "NIK",
            column: "customer_nik",
            sortable: false,
            filterable: false,
        },
        {
            title: "Alamat",
            column: "customer_alamat",
            sortable: false,
            filterable: false,
        },
        {
            title: "Kelompok",
            column: "kelompok",
            sortable: false,
            filterable: true,
        },
        {
            title: "Tanggal Drop",
            column: "tanggal_drop",
            sortable: false,
            filterable: true,
        },
        {
            title: "Hari",
            column: "hari",
            sortable: false,
            filterable: true,
        },
        {
            title: "Jumlah Pegajuan",
            column: "pinjaman",
            sortable: false,
            filterable: false,
        },
        {
            title: "Status",
            column: "status",
            sortable: false,
            filterable: true,
        },
        {
            title: "Tanggal Disetujui",
            column: "approved_date",
            sortable: false,
            filterable: false,
        },
        {
            title: "Disetujui Oleh",
            column: "approved_by",
            sortable: false,
            filterable: false,
        },
        {
            title: "Mantri Bertugas",
            column: "mantri",
            sortable: false,
            filterable: false,
        },
    ];
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Transaksi Drop
                    </h2>
                    <div className="ml-auto flex items-center">
                        {props.canCreate && (
                            <LinkButton
                                icon={<IoMdAdd />}
                                size={"md"}
                                title={"Tambah Pinjaman"}
                                type="a"
                                href={route("unit.pinjaman.create")}
                            ></LinkButton>
                        )}
                    </div>
                </>
            }
        >
            <ContentWrap>
                <ActionPinjaman
                    onClose={hideActionPinjaman}
                    data={showActionPinjaman}
                />
                <MyTables
                    header={headers}
                    link={datadrops.link}
                    datefilter={"tanggal_drop"}
                    editable={true}
                >
                    <tbody>
                        {datadrops.data.map((item, index) => (
                            <tr key={index} className="odd:bg-gray-100">
                                <th className="px-6 py-1">
                                    <div className="flex justify-around items-center gap-3">
                                        {index + 1}
                                        <Link
                                            href={route(
                                                "unit.pinjaman.request.edit",
                                                item.id
                                            )}
                                        >
                                            <AiFillEdit className="text-blue-500 hover:cursor-pointer" />
                                        </Link>
                                    </div>
                                </th>
                                {headers.map((header, index) => {
                                    if (header.column == "status") {
                                        return (
                                            <td
                                                className="px-6 py-1 min-w-[10rem]"
                                                key={index}
                                            >
                                                {item.status == "acc" ? (
                                                    <span className="bg-green-300 px-2.5 py-1 rounded-full">
                                                        {item[header.column]}
                                                    </span>
                                                ) : item.status == "tolak" ? (
                                                    <span className="bg-red-300 px-2.5 py-1 rounded-full">
                                                        {item[header.column]}
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-1 rounded-full">
                                                        {item[header.column]}
                                                    </span>
                                                )}
                                            </td>
                                        );
                                    }

                                    if (
                                        header.column == "tanggal_drop" ||
                                        (header.column == "approved_date" &&
                                            item[header.column] != "")
                                    ) {
                                        return (
                                            <td
                                                className="px-6 py-1 min-w-[10rem]"
                                                key={index}
                                            >
                                                {dayjs(
                                                    item[header.column]
                                                ).format("DD/MM/YYYY")}
                                            </td>
                                        );
                                    }

                                    if (header.column == "pinjaman") {
                                        return (
                                            <td
                                                className="px-6 py-1 min-w-[10rem]"
                                                key={index}
                                            >
                                                <NumericFormat
                                                    value={item[header.column]}
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </td>
                                        );
                                    }

                                    if (
                                        header.column == "customer_nama" &&
                                        props.canCreate
                                    ) {
                                        return (
                                            <td
                                                key={index}
                                                className={`px-6 py-3 hover:cursor-pointer hover:bg-gray-100 text-blue-500`}
                                                onClick={(e) =>
                                                    setShowActionPinjaman({
                                                        show: true,
                                                        id: item.id,
                                                        disabled:
                                                            item.status == "acc"
                                                                ? true
                                                                : false,
                                                    })
                                                }
                                            >
                                                {item.customer_nama}
                                            </td>
                                        );
                                    }

                                    return (
                                        <td
                                            className="px-6 py-1 min-w-[10rem]"
                                            key={index}
                                        >
                                            {item[header.column]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </MyTables>
            </ContentWrap>
        </Authenticated>
    );
};

export default RequestPinjaman;
