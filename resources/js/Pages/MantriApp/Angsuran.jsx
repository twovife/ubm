import LinkButton from "@/Components/LinkButton";
import MobileLayout from "@/Layouts/MobileLayout";
import React from "react";
import { NumericFormat } from "react-number-format";

const Angsuran = ({ ...props }) => {
    console.log(props);
    return (
        <MobileLayout
            auth={props.auth}
            errors={props.errors}
            header={"Angsuran Mantri"}
        >
            {props.customer ? (
                <>
                    <div className="py-3 px-6 text-main-800 rounded-md border mb-3 shadow">
                        <div className="flex w-full items-center mb-2 border-b">
                            <div className="flex-[2]">Nama Customer</div>
                            <div className="flex-[3]">
                                {props.customer.nama}
                            </div>
                        </div>
                        <div className="flex w-full items-center mb-2 border-b">
                            <div className="flex-[2]">NIK</div>
                            <div className="flex-[3]">{props.customer.nik}</div>
                        </div>
                    </div>
                    {props.loans ? (
                        props.loans.map((el, key) => (
                            <div
                                key={`angsuranmantri${key}`}
                                className="py-3 px-6 text-main-800 rounded-md border mb-3 shadow"
                            >
                                <div className="flex w-full items-center mb-2 border-b">
                                    <div className="flex-1">Tanggal Drop</div>
                                    <div className="flex-[2]">
                                        {el.tanggal_drop}
                                    </div>
                                </div>
                                <div className="flex w-full items-center mb-2 border-b">
                                    <div className="flex-1">Pinjaman Ke</div>
                                    <div className="flex-[2]">
                                        {el.pinjaman_ke}
                                    </div>
                                </div>
                                <div className="flex w-full items-center mb-2 border-b">
                                    <div className="flex-1">Pinjaman</div>
                                    <div className="flex-[2]">
                                        <NumericFormat
                                            value={el.pinjaman}
                                            displayType={"text"}
                                            thousandSeparator={","}
                                            prefix={"Rp. "}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <LinkButton
                                        size={"md"}
                                        title={"Angsur"}
                                        type="a"
                                        href={route(
                                            "mantriapps.angsur.updateangsur",
                                            el.id
                                        )}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-3 px-6 text-main-800 rounded-md border mb-3 shadow">
                            Customer Belum Ada Transaksi Pada Hari Ini
                        </div>
                    )}
                </>
            ) : (
                <div className="py-3 px-6 text-main-800 rounded-md border mb-3 shadow">
                    Data Tidak Ditemukan
                </div>
            )}
        </MobileLayout>
    );
};

export default Angsuran;
