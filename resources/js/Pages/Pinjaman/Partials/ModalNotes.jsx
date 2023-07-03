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
import CurrencyInput from "react-currency-input-field";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";

const ModalNotes = ({ closedModal, ...props }) => {
    const { show, dataArray } = props.data;
    const { data, setData, put, processing, reset, errors } = useForm({
        loan_notes: dataArray ? dataArray.loan_notes : "",
    });

    const jenisNasabah = [
        {
            id: 1,
            value: "10L",
            display: "10L",
        },
        {
            id: 2,
            value: "Beban Pemakaian",
            display: "Beban Pemakaian",
        },
        {
            id: 3,
            value: "CM Lunas",
            display: "CM Lunas",
        },
    ];

    const onInputChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    const onSubmit = () => {
        put(route("unit.pinjaman.editNotes", dataArray.id ?? null));
    };

    return (
        <Modal show={show} onClose={closedModal}>
            <Loading show={processing} />
            <form onSubmit={onSubmit} className="p-6 overflow-auto">
                <div className="mb-1">
                    <InputLabel value={"Jenis Nasabah :"} />
                    <SelectList
                        name="loan_notes"
                        options={jenisNasabah}
                        nullValue={true}
                        value={data.loan_notes}
                        onChange={onInputChange}
                        className="w-full text-xl mt-2"
                    />
                    <InputError message={errors.loan_notes} className="mt-2" />
                </div>
                <div className="w-full mt-3">
                    <PrimaryButton
                        className="ml-auto"
                        title={"Setuju"}
                        type="submit"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default ModalNotes;
