import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
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

const RequestPinjaman = ({ requestDrops, employee, ...props }) => {
    const [oldFilter, setOldFilter] = useState({
        search: "",
        hari: "",
        ...props.dataFilters,
    });
    const [loading, setLoading] = useState(false);
    const [alertModal, setAlertModal] = useState({
        show: false,
        textAlert: null,
        typeAlert: null,
    });
    const [showActionPinjaman, setShowActionPinjaman] = useState(false);
    const hideActionPinjaman = (e) => {
        setShowActionPinjaman(false);
    };

    const daysOnWeek = [
        { id: 1, display: "senin", value: "senin" },
        { id: 2, display: "selasa", value: "selasa" },
        { id: 3, display: "rabu", value: "rabu" },
        { id: 4, display: "kamis", value: "kamis" },
        { id: 5, display: "jumat", value: "jumat" },
        { id: 6, display: "sabtu", value: "sabtu" },
        { id: 7, display: "minggu", value: "minggu" },
    ];
    const onSelectChange = (e) => {
        const data = {
            ...oldFilter,
            [e.target.name]: e.target.value,
        };

        router.get(
            route("unit.pinjaman.request.requestPinjaman"),
            {
                data: data,
            },
            {
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
            }
        );
    };

    const filterFillChange = (e) => {
        setOldFilter({
            ...oldFilter,
            search: e.target.value,
        });
    };

    const searchsubmit = (e) => {
        e.preventDefault();
        const dataValue = document.getElementById("searchFill");
        const data = {
            ...oldFilter,
            search: dataValue.value,
        };
        router.get(
            route("unit.pinjaman.request.requestPinjaman"),
            {
                data: data,
            },
            {
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
            }
        );
    };

    const hideAlertModal = (e) => {
        setAlertModal(false);
    };

    useEffect(() => {
        if (props.flash.message) {
            setAlertModal({
                show: true,
                textAlert: props.flash.message,
                typeAlert: "success",
            });
        }
        if (props.errors[0]) {
            setAlertModal({
                show: true,
                textAlert: props.errors[0],
                typeAlert: "danger",
            });
        }
    }, []);

    const kelompoks = employee
        .sort((a, b) => a.area - b.area)
        .map((emp) => {
            return {
                id: emp.id,
                value: emp.area,
                display: emp.area,
            };
        });

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
            <ModalAlert alertParams={alertModal} onClose={hideAlertModal} />
            <Head title="Data Pinjaman" />
            <Loading show={loading} />
            <ActionPinjaman
                onClose={hideActionPinjaman}
                data={showActionPinjaman}
            />
            <div className="py-3">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border p-6 text-main-800">
                            <div className="flex justify-between w-full items-center mb-6">
                                <div className="flex gap-3 items-center">
                                    <InputLabel
                                        value={"Kelompok :"}
                                        className="font-semibold"
                                    />
                                    <SelectList
                                        value={oldFilter.kelompok}
                                        name="kelompok"
                                        onChange={onSelectChange}
                                        options={kelompoks}
                                    />
                                </div>
                                <div className="flex gap-3 items-center ml-3">
                                    <InputLabel
                                        value={"Hari :"}
                                        className="font-semibold"
                                    />
                                    <SelectList
                                        value={oldFilter.hari}
                                        name="hari"
                                        onChange={onSelectChange}
                                        nullValue={true}
                                        options={daysOnWeek}
                                    />
                                </div>
                                <div className="ml-auto">
                                    <form
                                        className="flex gap-3"
                                        onSubmit={searchsubmit}
                                    >
                                        <TextInput
                                            placeholder={"Cari Nama"}
                                            id="searchFill"
                                            className={`px-6`}
                                            onChange={filterFillChange}
                                            value={oldFilter.search}
                                        />
                                        <PrimaryButton
                                            type="submit"
                                            title={"search"}
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6">
                                <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                    <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                        <tr>
                                            {/* id, customer_id, branch_id, mantri, kelompok, hari, pinjaman, tanggal_drop, approved_date, approved_by, status, created_at, updated_at */}
                                            <th className="px-6 py-3">Nomor</th>
                                            <th className="px-6 py-3">
                                                Nama Customer
                                            </th>
                                            <th className="px-6 py-3">NIK</th>
                                            <th className="px-6 py-3">
                                                Alamat
                                            </th>
                                            <th className="px-6 py-3">
                                                Kelompok
                                            </th>
                                            <th className="px-6 py-3">Hari</th>
                                            <th className="px-6 py-3">
                                                Jumlah Pengajuan
                                            </th>
                                            <th className="px-6 py-3">
                                                Tanggal Drop
                                            </th>
                                            <th className="px-6 py-3">
                                                Status
                                            </th>
                                            <th className="px-6 py-3">
                                                Tanggal Disetujui
                                            </th>
                                            <th className="px-6 py-3">
                                                Disetujui Oleh
                                            </th>
                                            <th className="px-6 py-3 bg-rose-100">
                                                Mantri Bertugas
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestDrops &&
                                            requestDrops.data.map(
                                                (drop, key) => (
                                                    <tr
                                                        key={key}
                                                        className={`${
                                                            drop.status == "acc"
                                                                ? "bg-green-100"
                                                                : drop.status ==
                                                                  "tolak"
                                                                ? "bg-red-100"
                                                                : ""
                                                        }`}
                                                    >
                                                        <td className="px-6 py-3">
                                                            {key + 1}
                                                        </td>
                                                        {props.canCreate ? (
                                                            <td
                                                                className={`px-6 py-3 hover:cursor-pointer hover:bg-gray-100 text-blue-500`}
                                                                onClick={(e) =>
                                                                    setShowActionPinjaman(
                                                                        {
                                                                            show: true,
                                                                            id: drop.id,
                                                                            disabled:
                                                                                drop.status ==
                                                                                "acc"
                                                                                    ? true
                                                                                    : false,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    drop
                                                                        .customer
                                                                        .nama
                                                                }
                                                            </td>
                                                        ) : (
                                                            <td
                                                                className={`px-6 py-3`}
                                                            >
                                                                {
                                                                    drop
                                                                        .customer
                                                                        .nama
                                                                }
                                                            </td>
                                                        )}

                                                        <td className="px-6 py-3">
                                                            {drop.customer.nik}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {
                                                                drop.customer
                                                                    .alamat
                                                            }
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {drop.kelompok}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {drop.hari}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            <NumericFormat
                                                                value={
                                                                    drop.pinjaman
                                                                }
                                                                displayType={
                                                                    "text"
                                                                }
                                                                thousandSeparator={
                                                                    ","
                                                                }
                                                                prefix={"Rp. "}
                                                            />
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {dayjs(
                                                                drop.tanggal_drop
                                                            ).format(
                                                                "DD-MM-YYYY"
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-3 uppercase">
                                                            {drop.status}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {drop.approved_date
                                                                ? dayjs(
                                                                      drop.approved_date
                                                                  ).format(
                                                                      "DD-MM-YYYY"
                                                                  )
                                                                : ""}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {drop.approvedby
                                                                ? drop
                                                                      .approvedby
                                                                      .nama_karyawan
                                                                : ""}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {drop.mantri
                                                                ? drop.mantri
                                                                      .nama_karyawan
                                                                : ""}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination data={requestDrops} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default RequestPinjaman;
