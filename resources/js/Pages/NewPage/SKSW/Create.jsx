import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import useServerFilter from "@/Hooks/useServerFilter";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, { Fragment } from "react";
import CurrencyInput from "react-currency-input-field";

const Create = ({ show = false, showHandler, setLoading }) => {
    const {
        wilayah,
        setSelectedWilayah,
        filteredBranch,
        selectedWilayah,
        selectedBranch,
        selectedBranch_id,

        onWilayahChangeHandler,
        onBranchChangeHandler,
        filteredEmps,
    } = useServerFilter();

    const {
        data,
        setData,
        post,
        processing,
        recentlySuccessful,
        reset,
        errors,
    } = useForm({
        employee_id: "",
        sw_balance: 0,
        sk_balance: 0,
        tgl_tabugan: "",
    });

    const onInputChangeHandler = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, parseInt(value));
    };

    const onClosedModal = () => {
        // setAddFilter({ name: "", data_type: "" });
        showHandler(false);
        reset();
        setLoading(false);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        // console.log(data);
        post(route("sksw.store"), {
            onStart: (visit) => {
                setLoading(true);
            },
            onSuccess: (page) => {
                onClosedModal();
            },
            onError: (errors) => setLoading(false),

            replace: true,
        });
    };

    return (
        <Transition
            as={Fragment}
            show={show}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <div className="w-full h-screen fixed top-0 left-0 z-[50]">
                <div
                    className="flex justify-center h-full items-center p-2"
                    onClick={onClosedModal}
                >
                    <form
                        onSubmit={onSubmitForm}
                        className="w-full lg:max-w-xl bg-white py-3 px-6 shadow border"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-3 font-semibold text-xl">
                            Tambah SKSW BARU
                        </div>
                        <div className="flex flex-col lg:flex-row gap-3 w-full mb-2">
                            <div className="flex-1">
                                <InputLabel
                                    value={"Wilayah"}
                                    className="mb-1"
                                />
                                <SelectList
                                    name="wilayah"
                                    value={selectedWilayah}
                                    className={`w-full`}
                                    nullValue={true}
                                    options={wilayah}
                                    onChange={onWilayahChangeHandler}
                                    required
                                />
                            </div>
                            {selectedWilayah !== "" && (
                                <div className="flex-1">
                                    <InputLabel
                                        value={"Unit"}
                                        className="mb-1"
                                    />
                                    <SelectList
                                        name="branch_id"
                                        className={`w-full`}
                                        value={selectedBranch_id}
                                        nullValue={true}
                                        options={filteredBranch}
                                        onChange={onBranchChangeHandler}
                                        required
                                    />
                                </div>
                            )}
                            {filteredEmps !== "" && (
                                <div className="flex-1">
                                    <InputLabel
                                        value={"Nama Karyawan"}
                                        className="mb-1"
                                    />
                                    <SelectList
                                        name="employee_id"
                                        className={`w-full`}
                                        value={data.employee_id}
                                        nullValue={true}
                                        options={filteredEmps}
                                        onChange={onInputChangeHandler}
                                        required
                                    />
                                    <InputError
                                        message={errors.employee_id}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-full mb-2">
                            <InputLabel value={"Tanggal Tabungan"} />
                            <TextInput
                                type="date"
                                className="w-full"
                                name="tgl_tabugan"
                                onChange={onInputChangeHandler}
                                required
                            />
                            <InputError
                                message={errors.tgl_tabugan}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full mb-2">
                            <InputLabel
                                value={"Setor Awal Simpanan Wajib"}
                                className="mb-1"
                            />
                            <CurrencyInput
                                name="sw_balance"
                                id="sw_balance"
                                className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                allowDecimals={false}
                                prefix="Rp. "
                                min={1}
                                required
                                onValueChange={onHandleCurencyChange}
                                value={data.sw_balance}
                                placeholder={"Inputkan angka tanpa sparator"}
                            />
                            <InputError
                                message={errors.sw_balance}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full mb-2">
                            <InputLabel
                                value={"Setor Awal Simpanan Sukarela"}
                                className="mb-1"
                            />
                            <CurrencyInput
                                name="sk_balance"
                                id="sk_balance"
                                className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                allowDecimals={false}
                                prefix="Rp. "
                                min={1}
                                required
                                onValueChange={onHandleCurencyChange}
                                value={data.sk_balance}
                                placeholder={"Inputkan angka tanpa sparator"}
                            />
                            <InputError
                                message={errors.sk_balance}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex justify-end items-center">
                            <PrimaryButton type="submit" title={"submit"} />
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default Create;
