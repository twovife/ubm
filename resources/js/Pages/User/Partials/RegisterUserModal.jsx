import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const RegisterUserModal = ({ show, onClose, ...props }) => {
    const { employees, unit } = props;
    const [nameOfEmployee, setNameOfEmployee] = useState();
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        employee_id: "",
        password: "",
        password_confirmation: "",
    });

    const units = unit.map((item) => {
        return {
            id: item.id,
            value: item.id,
            display: item.unit,
        };
    });

    const employeeName = (e) => {
        const nama = employees.filter(
            (item) => item.branch_id == e.target.value
        );
        const names = nama.map((name) => {
            return {
                id: name.id,
                value: name.id,
                display: name.nama_karyawan,
            };
        });
        setNameOfEmployee(names);
    };

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onSuccess: () => {
                reset("password");
                onClose();
            },
        });
    };

    return (
        <Modal maxWidth="2xl" show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Unit" />
                    <SelectList
                        options={units}
                        className="mt-1 block w-full"
                        onChange={employeeName}
                        nullValue={true}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="employee_id" value="Nama Karyawan" />
                    <SelectList
                        options={nameOfEmployee}
                        nullValue={true}
                        onChange={handleOnChange}
                        name={`employee_id`}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.employee_id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton
                        type={"submit"}
                        className="ml-4"
                        disabled={processing}
                    >
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default RegisterUserModal;
