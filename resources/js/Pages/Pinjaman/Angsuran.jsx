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
    console.log(props.display_tanggal);
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
            window.location.href,
            {
                data: data,
            },
            {
                onBefore: () => setAngsuranLoading(true),
                onFinish: () => setAngsuranLoading(false),
            }
        );
    };

    const myHeaderFuntion = (params) => {
        let lastMontHeader = null;
        return params.map((tgl, key) => {
            const bulan = new Date(tgl).getMonth() + 1;
            let header = null;

            if (lastMontHeader == null || lastMontHeader == bulan) {
                header = (
                    <th className="w-16 text-center px-6 py-3" key={`x${key}`}>
                        {dayjs(tgl).format("DD/MM")}
                    </th>
                );
            } else {
                header = (
                    <>
                        <th
                            className="w-16 text-center px-6 py-3"
                            key={`xa${key}`}
                        >
                            TTL Angsuran
                        </th>
                        <th
                            className="w-16 text-center px-6 py-3"
                            key={`xaa${key}`}
                        >
                            Saldo
                        </th>
                        <th
                            className="w-16 text-center px-6 py-3"
                            key={`x${key}`}
                        >
                            {dayjs(tgl).format("DD/MM")}
                        </th>
                    </>
                );
            }
            lastMontHeader = bulan;
            return header;
        });
    };
    const myFunction = (parameter, loan) => {
        let lastMont = null;
        let loanPerMonth = 0;
        let lastSaldo = 0;
        return parameter.map((tgl, key) => {
            const bulan = new Date(tgl).getMonth() + 1;
            let detailTd = null;
            if (lastMont == null || lastMont == bulan) {
                detailTd = (
                    <td
                        className={`text-center whitespace-nowrap text-sm px-6 py-3 ${
                            loan.angsuran
                                .filter((item) => item.pembayaran_date == tgl)
                                .map((item) => item.danatitipan)
                                .join(", ") == "true"
                                ? "text-red-500"
                                : ""
                        }`}
                        key={`headerdate${key}`}
                        tanggal_id={dayjs(tgl).format("DD/MM")}
                    >
                        {(() => {
                            if (
                                loan.angsuran.some(
                                    (s) => s.pembayaran_date === tgl
                                )
                            ) {
                                //

                                const loanvalue = loan.angsuran
                                    .filter(
                                        (item) => item.pembayaran_date == tgl
                                    )
                                    .map((item) => {
                                        loanPerMonth += item.jumlah;
                                        lastSaldo = item.saldo_terakhir;
                                        return item.jumlah;
                                    })
                                    .join(", ");
                                return (
                                    <NumericFormat
                                        value={loanvalue}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                );
                            }
                        })()}
                    </td>
                );
            } else {
                detailTd = (
                    <>
                        <td
                            key={`xx1${key}`}
                            className={`text-center whitespace-nowrap text-sm px-6 py-3 bg-yellow-50`}
                        >
                            <NumericFormat
                                value={loanPerMonth}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </td>
                        <td
                            key={`xx2${key}`}
                            className={`text-center whitespace-nowrap text-sm px-6 py-3 bg-yellow-50`}
                        >
                            <NumericFormat
                                value={lastSaldo}
                                displayType={"text"}
                                thousandSeparator={","}
                                prefix={"Rp. "}
                            />
                        </td>

                        <td
                            className={`text-center whitespace-nowrap text-sm px-6 py-3 ${
                                loan.angsuran
                                    .filter(
                                        (item) => item.pembayaran_date == tgl
                                    )
                                    .map((item) => item.danatitipan)
                                    .join(", ") == "true"
                                    ? "text-red-500"
                                    : ""
                            }`}
                            key={`x2${key}`}
                            tanggal_id={dayjs(tgl).format("DD/MM")}
                        >
                            {(() => {
                                if (
                                    loan.angsuran.some(
                                        (s) => s.pembayaran_date === tgl
                                    )
                                ) {
                                    const loanvalue = loan.angsuran
                                        .filter(
                                            (item) =>
                                                item.pembayaran_date == tgl
                                        )
                                        .map((item) => {
                                            loanPerMonth = 0;
                                            loanPerMonth += item.jumlah;
                                            lastSaldo = item.saldo_terakhir;
                                            return item.jumlah;
                                        })
                                        .join(", ");
                                    return (
                                        <NumericFormat
                                            value={loanvalue}
                                            displayType={"text"}
                                            thousandSeparator={","}
                                            prefix={"Rp. "}
                                        />
                                    );
                                } else {
                                    loanPerMonth = 0;
                                    loanPerMonth += 0;
                                }
                            })()}
                        </td>
                    </>
                );
            }
            lastMont = bulan;
            return detailTd;
        });
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
                                            {myHeaderFuntion(
                                                props.display_tanggal
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
                                                {myFunction(
                                                    props.display_tanggal,
                                                    loan
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
