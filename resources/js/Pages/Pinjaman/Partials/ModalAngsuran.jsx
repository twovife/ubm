import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";
import { NumericFormat } from "react-number-format";

const ModalAngsuran = ({ onClose, ...props }) => {
    const { show, dataArray } = props.data;
    const { data, setData, put, processing, reset, errors } = useForm({
        pembayaran_date: "",
        jumlah: "",
        status: "",
    });
    const mantriList = props.mantri.map((man) => {
        return {
            id: man.id,
            value: man.id,
            display: `${man.nama_karyawan} - Kelompok ${man.area}`,
        };
    });

    const ansuranStatus = [
        { id: 1, value: "normal", display: "Normal" },
        { id: 2, value: "cm", display: "CM" },
        { id: 3, value: "mb", display: "MB" },
        { id: 4, value: "ml", display: "ML" },
    ];

    const onInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const afterSubmit = () => {
        reset();
        onClose();
    };
    const onSubmitForm = (e) => {
        e.preventDefault();
        put(route("unit.pinjaman.angsuran.bayar", dataArray.id), {
            onSuccess: () => afterSubmit(),
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <Loading show={processing} />
            <div className="p-6 overflow-auto">
                <table className="w-full text-sm text-left text-main-500 dark:text-main-400 mb-3">
                    <thead className="text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400">
                        <tr>
                            {/* id, customer_id, branch_id, mantri, kelompok, hari, pinjaman, tanggal_drop, approved_date, approved_by, status, created_at, updated_at */}
                            <th className="px-6 py-3">No</th>
                            <th className="px-6 py-3">Tanggal Pembayaran</th>
                            <th className="px-6 py-3">Jumlah Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataArray &&
                            (dataArray.angsuran.length !== 0 ? (
                                dataArray.angsuran.map((angs, key) => (
                                    <tr key={key}>
                                        <td className="px-6 py-3">{key + 1}</td>
                                        <td className="px-6 py-3">
                                            {angs.pembayaran_date}
                                        </td>
                                        <td className="px-6 py-3">
                                            <NumericFormat
                                                value={angs.jumlah}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="px-6 py-3" colSpan={2}>
                                        Belum Ada Angsuran Terdeteksi
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div>
                    <h1 className="text-xl">Buat Pembayaran Baru</h1>
                    <form onSubmit={onSubmitForm} className="mb-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <InputLabel value={"Tanggal Pembayaran"} />
                                <TextInput
                                    name="pembayaran_date"
                                    onChange={onInputChange}
                                    type="date"
                                    className="mt-1 block w-full"
                                    min={
                                        dataArray
                                            ? dayjs(dataArray.tanggal_drop)
                                                  .add(1, "week")
                                                  .format("YYYY-MM-DD")
                                            : null
                                    }
                                />
                            </div>
                            <div className="flex-1">
                                <InputLabel value={"Jumlah Pembayaran"} />
                                <TextInput
                                    name="jumlah"
                                    onChange={onInputChange}
                                    type="number"
                                    className="mt-1 block w-full"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <div className="flex-1">
                                <InputLabel value={"Status Angsuran"} />
                                <SelectList
                                    name="status"
                                    className="w-full mt-1"
                                    onChange={onInputChange}
                                    nullValue={true}
                                    options={ansuranStatus}
                                />
                            </div>
                        </div>
                        <div className="w-full mt-3">
                            <PrimaryButton
                                className="ml-auto"
                                title={"Setuju"}
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAngsuran;
