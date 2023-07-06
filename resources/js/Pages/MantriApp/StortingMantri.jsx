import MobileLayout from "@/Layouts/MobileLayout";
import React, { useState } from "react";
import dayjs from "dayjs";
import { upperFirst } from "lodash";
import { NumericFormat } from "react-number-format";
import { router } from "@inertiajs/react";
import LinkButton from "@/Components/LinkButton";

const StortingMantri = (props) => {
    console.log(props);
    function gotoDetailPage(id) {
        router.get(route("mantriapps.angsur.updateangsur", id));
    }
    return (
        <MobileLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between items-center">
                    <div>Data Storting Hari {upperFirst(props.daysNow)}</div>
                    <div className="flex gap-3 items-center">
                        <LinkButton
                            className="hover:cursor-pointer"
                            href={route("mantriapps.angsur.storting")}
                            title={`Nor`}
                            size={`sm`}
                        />
                        <LinkButton
                            className="hover:cursor-pointer"
                            href={route("mantriapps.angsur.storting", {
                                status: "cm",
                            })}
                            title={`CM`}
                            size={`sm`}
                        />
                        <LinkButton
                            className="hover:cursor-pointer"
                            href={route("mantriapps.angsur.storting", {
                                status: "mb",
                            })}
                            title={`MB`}
                            size={`sm`}
                        />
                        <LinkButton
                            className="hover:cursor-pointer"
                            href={route("mantriapps.angsur.storting", {
                                status: "ml",
                            })}
                            title={`ML`}
                            size={`sm`}
                        />
                    </div>
                </div>
            }
        >
            <div className="py-3 text-main-800 overflow-auto relative shadow-md sm:rounded-lg border mb-3 ">
                <table className="w-full text-xs text-main-500 dark:text-main-400 text-center">
                    <thead className="text-xs text-main-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-main-400">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                            >
                                Nama Nasabah
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                            >
                                Drop
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Saldo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jml Angsuran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.loans ? (
                            props.loans.map((loan) => {
                                const lastpay = loan.last_angsuran
                                    ? loan.last_angsuran.pembayaran_date
                                    : null;

                                return (
                                    <tr
                                        className={`border-b dark:border-gray-700 ${
                                            lastpay ==
                                            dayjs().format("YYYY-MM-DD")
                                                ? `bg-green-200 dark:bg-gray-900`
                                                : `bg-white dark:bg-gray-900`
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 text-left hover:cursor-pointer hover:bg-gray-200"
                                            onClick={(e) => {
                                                lastpay ==
                                                dayjs().format("YYYY-MM-DD")
                                                    ? e.stopPropagation()
                                                    : gotoDetailPage(loan.id);
                                            }}
                                        >
                                            <div className="border-b border-gray mb-1 w-full">
                                                {loan.customer.nama}
                                            </div>
                                            <div>
                                                <small className="font-italic">
                                                    {loan.customer.nik}
                                                </small>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="border-b border-gray mb-1 whitespace-nowrap">
                                                {dayjs(
                                                    loan.tanggal_drop
                                                ).format("DD-MM-YYYY")}
                                            </div>
                                            <div className="whitespace-nowrap">
                                                <NumericFormat
                                                    value={loan.drop}
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <NumericFormat
                                                className="whitespace-nowrap"
                                                value={loan.saldo}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {loan.angsuran_count}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="border-b border-gray mb-1 w-full">
                                                {upperFirst(loan.status)}
                                            </div>
                                            <div>
                                                <small className="font-italic">
                                                    {upperFirst(
                                                        loan.loan_notes
                                                    )}
                                                </small>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-6 py-4" colSpan={4}>
                                    Data Tidak Ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </MobileLayout>
    );
};

export default StortingMantri;
