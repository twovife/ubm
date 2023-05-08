import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { NumericFormat } from "react-number-format";
import ModalAngsuran from "./Partials/ModalAngsuran";
import ModalAlert from "@/Components/ModalAlert";

const Angsuran = ({ ...props }) => {
    const [showAngsuranModal, setShowAngsuranModal] = useState(false);
    const hideAngsuranModal = (e) => {
        setShowAngsuranModal(false);
    };
    const [angsuranLoading, setAngsuranLoading] = useState(false);
    const [oldFilter, setOldFilter] = useState({
        search: "",
        hari: "",
        kelompok: "",
        ...props.dataFilters,
    });

    const [alertModal, setAlertModal] = useState({
        show: false,
        textAlert: null,
        typeAlert: null,
    });

    const hideAlertModal = (e) => {
        setAlertModal(false);
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
    const kelompoks = props.kelompok
        .sort((a, b) => a.area - b.area)
        .map((emp) => {
            return {
                id: emp.id,
                value: emp.area,
                display: emp.area,
            };
        });

    const onSelectChange = (e) => {
        const data = {
            ...oldFilter,
            [e.target.name]: e.target.value,
        };

        router.get(
            route("unit.pinjaman.angsuran.index"),
            {
                data: data,
            },
            {
                onBefore: () => setAngsuranLoading(true),
                onFinish: () => setAngsuranLoading(false),
            }
        );
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Data Storting
                    </h2>
                </>
            }
        >
            <Head title="Data Storting" />
            <Loading show={angsuranLoading} />
            <ModalAngsuran
                data={showAngsuranModal}
                onClose={hideAngsuranModal}
                mantri={props.mantri}
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
                                        value={oldFilter.kelompok ?? ""}
                                        name="kelompok"
                                        onChange={onSelectChange}
                                        nullValue={true}
                                        options={kelompoks}
                                    />
                                </div>
                                <div className="flex gap-3 items-center ml-3">
                                    <InputLabel
                                        value={"Hari :"}
                                        className="font-semibold"
                                    />
                                    <SelectList
                                        value={oldFilter.hari ?? ""}
                                        name="hari"
                                        onChange={onSelectChange}
                                        nullValue={true}
                                        options={daysOnWeek}
                                    />
                                </div>
                                <div className="ml-auto">
                                    <form
                                        className="flex gap-3"
                                        // onSubmit={searchsubmit}
                                    >
                                        <TextInput
                                            placeholder={"Cari Nama"}
                                            id="searchFill"
                                            // className={`px-6`}
                                            // onChange={filterFillChange}
                                            // value={oldFilter.search}
                                        />
                                        <PrimaryButton
                                            type="submit"
                                            title={"search"}
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6 whitespace-pre-wrap">
                                <table className="w-full text-sm text-left text-main-500 dark:text-main-400">
                                    <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                                        <tr>
                                            {/* id, customer_id, branch_id, mantri, kelompok, hari, pinjaman, tanggal_drop, approved_date, approved_by, status, created_at, updated_at */}
                                            <th className="px-6 py-3">Nomor</th>
                                            <th className="px-6 py-3 whitespace-nowrap">
                                                Tanggal Drop
                                            </th>
                                            <th className="px-6 py-3 whitespace-nowrap">
                                                Nama Nasabah
                                            </th>
                                            <th className="px-6 py-3">
                                                Alamat
                                            </th>
                                            <th className="px-6 py-3">
                                                Kelompok
                                            </th>
                                            <th className="px-6 py-3">Hari</th>
                                            <th className="px-6 py-3 whitespace-nowrap">
                                                Pinjaman Ke
                                            </th>
                                            <th className="px-6 py-3 whitespace-nowrap">
                                                Jml Angsuran
                                            </th>
                                            <th className="px-6 py-3 whitespace-nowrap">
                                                Besar Pinjaman
                                            </th>
                                            <th className="px-6 py-3">Saldo</th>
                                            {props.display_tanggal.map(
                                                (tgl, key) => (
                                                    <th
                                                        className="w-16 text-center px-6 py-3"
                                                        key={`x${key}`}
                                                    >
                                                        {dayjs(tgl).format(
                                                            "DD/MM"
                                                        )}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.pinjaman.map((loan, key) => (
                                            <tr key={key}>
                                                <td className="px-6 py-3">
                                                    {key + 1}
                                                </td>
                                                <td className="px-6 py-3">
                                                    {dayjs(
                                                        loan.tanggal_drop
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                <td
                                                    className="px-6 py-3 hover:bg-gray-100 hover:cursor-pointer text-blue-500"
                                                    onClick={(e) =>
                                                        setShowAngsuranModal({
                                                            show: true,
                                                            dataArray: loan,
                                                        })
                                                    }
                                                >
                                                    {loan.customer.nama}
                                                </td>
                                                <td className="px-6 py-3">
                                                    {loan.customer.alamat}
                                                </td>
                                                <td className="px-6 py-3">
                                                    {loan.kelompok}
                                                </td>
                                                <td className="px-6 py-3">
                                                    {loan.hari}
                                                </td>
                                                <td className="px-6 py-3">1</td>
                                                <td className="px-6 py-3">
                                                    {loan.angsuran.length}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap">
                                                    <NumericFormat
                                                        value={loan.pinjaman}
                                                        displayType={"text"}
                                                        thousandSeparator={","}
                                                        prefix={"Rp. "}
                                                    />
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap">
                                                    {
                                                        <NumericFormat
                                                            value={loan.saldo}
                                                            displayType={"text"}
                                                            thousandSeparator={
                                                                ","
                                                            }
                                                            prefix={"Rp. "}
                                                        />
                                                    }
                                                </td>
                                                {props.display_tanggal.map(
                                                    (tgl, key) => (
                                                        <td
                                                            className="text-center whitespace-nowrap text-sm"
                                                            key={`x2${key}`}
                                                            tanggal_id={dayjs(
                                                                tgl
                                                            ).format("DD/MM")}
                                                        >
                                                            {(() => {
                                                                if (
                                                                    loan.angsuran.some(
                                                                        (s) =>
                                                                            s.pembayaran_date ===
                                                                            tgl
                                                                    )
                                                                ) {
                                                                    const loanvalue =
                                                                        loan.angsuran
                                                                            .filter(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.pembayaran_date ==
                                                                                    tgl
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.jumlah
                                                                            )
                                                                            .join(
                                                                                ", "
                                                                            );
                                                                    return (
                                                                        <NumericFormat
                                                                            value={
                                                                                loanvalue
                                                                            }
                                                                            displayType={
                                                                                "text"
                                                                            }
                                                                            thousandSeparator={
                                                                                ","
                                                                            }
                                                                            prefix={
                                                                                "Rp. "
                                                                            }
                                                                        />
                                                                    );
                                                                }
                                                            })()}
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Angsuran;
