import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import CurrencyInput from "react-currency-input-field";

const Create = ({ employees, curent_unit, ...props }) => {
    // const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        employee_id: "",
        besar_pinjaman: 1000000,
        transaction_date: "",
    });

    const emps = employees.map(({ id, nama_karyawan, jabatan }) => ({
        id: id,
        display: `${nama_karyawan} - ${jabatan}`,
        value: id,
    }));

    const onInputChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        post(route("bonpriv.store"));
    };
    return (
        <Authenticated
            loading={processing}
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-main-800 leading-tight">
                        Buat Bon Prive Baru
                    </h2>
                    <div className="ml-auto flex items-center">
                        <LinkButton
                            href={route("bonpanjer.bon_panjer")}
                            title={"Halaman Utama"}
                        />
                    </div>
                </>
            }
        >
            <div className="sm:px-6 lg:px-8">
                <div className="p-3 bg-white rounded shadow lg:w-1/2 mx-auto">
                    <form onSubmit={onSubmitForm} className="w-full">
                        <div className="lg:flex gap-3 w-full">
                            <div className="mb-2 flex-1">
                                <InputLabel
                                    value={"Nama Karawan"}
                                    className="mb-1"
                                />
                                <SelectList
                                    onChange={onInputChange}
                                    name={"employee_id"}
                                    nullValue={true}
                                    options={emps}
                                    className={`w-full`}
                                />
                                <InputError
                                    message={errors.employee_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mb-2 flex-1 w-full">
                                <InputLabel value={"Bulan"} className="mb-1" />
                                <TextInput
                                    className="block w-full"
                                    type="date"
                                    required
                                    name="transaction_date"
                                    max={curent_unit.akhirbulan}
                                    min={curent_unit.awalbulan}
                                    value={data.transaction_date}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="mb-2 flex-1">
                                <InputLabel
                                    value={"Pinjaman BON Prive"}
                                    className="mb-1"
                                />
                                <CurrencyInput
                                    name="besar_pinjaman"
                                    id="besar_pinjaman"
                                    className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2`}
                                    allowDecimals={false}
                                    prefix="Rp. "
                                    min={1}
                                    required
                                    onValueChange={onHandleCurencyChange}
                                    value={data.besar_pinjaman}
                                    placeholder={
                                        "Inputkan angka tanpa sparator"
                                    }
                                />
                                <InputError
                                    message={errors.besar_pinjaman}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <PrimaryButton type="submit" title={"submit"} />
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default Create;
