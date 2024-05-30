import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import React, { Fragment } from "react";

const PengembalianJaminan = ({ show, setShow, setLoading }) => {
    const { employee } = usePage().props;
    const { data, setData, put, processing, recentlySuccessful, errors } =
        useForm({
            handover_jaminan: "",
        });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const closedModal = (e) => {
        setShow();
        setTimeout(() => {
            reset();
        }, 200);
    };

    const onSubmitMutasi = (e) => {
        e.preventDefault();
        setLoading(true);
        put(route("emp.pengembalianjaminan", employee.id), {
            onSuccess: (page) => {
                closedModal();
            },

            onFinish: (page) => {
                setLoading(false);
            },
            replace: true,
        });
    };

    return (
        <Transition
            as={Fragment}
            show={show}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
        >
            <div
                className="fixed top-0 left-0 border px-6 py-3 rounded w-full h-screen z-[100] flex items-center justify-center"
                onClick={closedModal}
            >
                <form
                    onSubmit={onSubmitMutasi}
                    className="p-3 rounded shadow-lg bg-white border max-w-md w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-2xl">Pengembalian Jaminan</div>
                    <div className="mt-3 w-full">
                        <InputLabel value={"Tanggal Pengembalian"} />
                        <TextInput
                            name="handover_jaminan"
                            type="date"
                            onChange={onInputChange}
                            className="w-full"
                            value={data.handover_jaminan}
                        />
                    </div>
                    <div className="mt-3 flex justify-end items-center">
                        <PrimaryButton
                            title={"Submit"}
                            type="submit"
                            theme="green"
                        />
                    </div>
                </form>
            </div>
        </Transition>
    );
};

export default PengembalianJaminan;
