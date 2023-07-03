import MobileLayout from "@/Layouts/MobileLayout";
import dayjs from "dayjs";
import React from "react";
import { NumericFormat } from "react-number-format";

const DetailDrop = ({ ...props }) => {
    const { loans } = props;
    return (
        <MobileLayout
            auth={props.auth}
            errors={props.errors}
            header={"Detail Drop Langsung"}
        >
            <div>
                <div className="flex px-4 py-2 border-b shadow-sm">
                    <div className="flex-[2] flex justify-between">
                        <span>Nomor</span>
                        <span className="pr-3">:</span>
                    </div>
                    <div className="flex-[4]">{loans.id}</div>
                </div>
                <div className="flex px-4 py-2 border-b shadow-sm">
                    <div className="flex-[2] flex justify-between">
                        <span>Nama</span>
                        <span className="pr-3">:</span>
                    </div>
                    <div className="flex-[4]">{loans.customer.nama}</div>
                </div>
                <div className="flex px-4 py-2 border-b shadow-sm">
                    <div className="flex-[2] flex justify-between">
                        <span>NIK</span>
                        <span className="pr-3">:</span>
                    </div>
                    <div className="flex-[4]">{loans.customer.nik}</div>
                </div>
                <div className="flex px-4 py-2 border-b shadow-sm">
                    <div className="flex-[2] flex justify-between">
                        <span>Drop</span>
                        <span className="pr-3">:</span>
                    </div>
                    <div className="flex-[4]">
                        <NumericFormat
                            value={loans.drop}
                            displayType={"text"}
                            thousandSeparator={","}
                            prefix={"Rp. "}
                        />
                    </div>
                </div>
                <div className="flex px-4 py-2 border-b shadow-sm">
                    <div className="flex-[2] flex justify-between">
                        <span>Tanggal Drop</span>
                        <span className="pr-3">:</span>
                    </div>
                    <div className="flex-[4]">
                        {dayjs(loans.tanggal_drop).format("DD-MM-YYYY")}
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default DetailDrop;
