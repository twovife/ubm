import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import MobileLayout from "@/Layouts/MobileLayout";
import dayjs from "dayjs";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import DropModal from "./Partials/DropModal";
import Loading from "@/Components/Loading";

const CalonDrop = ({ requestDrop, ...props }) => {
    const [showModalDrop, setShowModalDrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const hideModalDrop = (e) => {
        setShowModalDrop(false);
    };
    return (
        <MobileLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between items-center">
                    <h1>Transaksi Drop</h1>
                    <LinkButton
                        as="a"
                        href={route("mantriapps.drop.mantriDrop")}
                        title={"Drop Harian"}
                    />
                </div>
            }
        >
            <Loading show={loading} />
            <DropModal
                datas={showModalDrop}
                setLoading={setLoading}
                onClosed={hideModalDrop}
            />
            <div className="p-3 border rounded-lg">
                <div className="border rounded p-3">
                    {requestDrop.map((drop, key) => (
                        <div key={key}>
                            <div className="flex mb-3">
                                <div className="flex-1">
                                    <div className="mb-1">
                                        <p className="underline underline-offset-2 font-semibold">
                                            NIK Nasabah
                                        </p>
                                        <div>{drop.customer.nik}</div>
                                    </div>
                                    <div className="mb-1">
                                        <p className="underline underline-offset-2 font-semibold">
                                            Nama Nasabah
                                        </p>
                                        <div>{drop.customer.nama}</div>
                                    </div>
                                    <div className="mb-1">
                                        <p className="underline underline-offset-2 font-semibold">
                                            Tanggal Drop
                                        </p>
                                        <div>
                                            {dayjs(drop.tanggal_drop).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 text-right">
                                    <div className="mb-1">
                                        <p className="underline underline-offset-2 font-semibold">
                                            {drop.status == "acc"
                                                ? "Disetujui"
                                                : drop.status == "open"
                                                ? "Belum Disetujui"
                                                : "Ditolak"}
                                        </p>
                                        <div>
                                            {drop.approved_date
                                                ? dayjs(
                                                      drop.approved_date
                                                  ).format("DD-MM-YYYY")
                                                : "."}
                                        </div>
                                    </div>

                                    <div className="mb-1">
                                        <p className="underline underline-offset-2 font-semibold">
                                            Oleh
                                        </p>
                                        <div>
                                            {drop.approvedby
                                                ? drop.approvedby.nama_karyawan
                                                : "."}
                                        </div>
                                    </div>
                                    <div className="mb-1">
                                        <p className="underline underline-offset-2 font-semibold">
                                            Jumlah Drop
                                        </p>
                                        <div>
                                            <NumericFormat
                                                value={drop.pinjaman}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
};

export default CalonDrop;
