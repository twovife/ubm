import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

const BranchCreate = ({ show, onClose, ...props }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        wilayah: "",
        unit: "",
    });
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
        post(route("administrator.branches.stores"), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal maxWidth="2xl" show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <div>
                    <InputLabel htmlFor="wilayah" value="Wilayah" />

                    <TextInput
                        id="wilayah"
                        name="wilayah"
                        value={data.wilayah}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                        required
                        type={"number"}
                    />

                    <InputError message={errors.wilayah} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="unit" value="unit" />

                    <TextInput
                        id="unit"
                        name="unit"
                        value={data.unit}
                        className="mt-1 block w-full"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.unit} className="mt-2" />
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

export default BranchCreate;
