import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import { useForm } from "@inertiajs/react";
import React from "react";

export const ModalHer = ({ datas, onClose }) => {
    const { tax, show } = datas;
    const { data, setData, put, processing, errors, reset } = useForm({
        type_pajak: "",
    });
    console.log(errors);
    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await put(route("aset.update", tax?.id));
        closedModal();
    };

    const closedModal = () => {
        onClose();
        reset;
        setData({
            id: "",
            type_pajak: "",
        });
    };

    return (
        <Modal show={show} onClose={closedModal}>
            <div className="p-3 pb-0 mt-3">
                <div className="flex justify-start items-center mb-2">
                    <div className="flex-1">Nama Aset</div>
                    <div className="flex-1">:</div>
                    <div className="flex-[2]">{tax?.nama_aset}</div>
                </div>
                <div className="flex justify-start items-center mb-2">
                    <div className="flex-1">Plat Nomor</div>
                    <div className="flex-1">:</div>
                    <div className="flex-[2]">
                        {tax?.plat_nomor} - (An. {tax?.nama_stnk})
                    </div>
                </div>
                <div className="flex justify-start items-center mb-2">
                    <div className="flex-1">Tanggal Her</div>
                    <div className="flex-1">:</div>
                    <div className="flex-[2]">{tax?.tanggal_stnk}</div>
                </div>
                <div className="flex justify-start items-center mb-2">
                    <div className="flex-1">Jabatan</div>
                    <div className="flex-1">:</div>
                    <div className="flex-[2]">{tax?.pengguna}</div>
                </div>
            </div>
            <form
                onSubmit={onSubmit}
                className="p-3 flex justify-start items-end gap-3"
            >
                <div className="flex mb-1 w-full gap-3">
                    <div className="flex-1">
                        <InputLabel value={"Jenis Her"} />
                        <SelectList
                            nullvalue={true}
                            className="w-full pt-1"
                            name="type_pajak"
                            onChange={onChangeHandler}
                            options={[
                                { id: 1, value: "1", display: "Tahunan" },
                                { id: 2, value: "2", display: "5 Tahunan" },
                            ]}
                        />
                        <InputError message={errors.type_pajak} />
                    </div>
                </div>
                <div className="mb-1">
                    <PrimaryButton title={"Submit"} type="submit" />
                </div>
            </form>
        </Modal>
    );
};
