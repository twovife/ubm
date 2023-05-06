import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import FormMutasi from "./FormMutasi";
import PencairanSimpanan from "./PencairanSimpanan";
import PengambilanJaminan from "./PengambilanJaminan";
import ResignModal from "./ResignModal";
import UpdateDetail from "./UpdateDetail";
import Resign from "./Resign";

const ActionModal = ({ show, onClose, data, ...props }) => {
    const branch = props.branch.map((branch) => ({
        id: branch.id,
        value: branch.id,
        display: branch.unit,
    }));

    return (
        <Modal maxWidth="7xl" show={show} onClose={onClose}>
            <div className="p-6 overflow-auto">
                <div className="text-lg mb-6">Action Form</div>
                <div className="lg:flex gap-6">
                    <div className="flex-1">
                        <UpdateDetail
                            branch={branch}
                            detailData={data}
                            onClose={onClose}
                            titles={props.titles}
                        />
                    </div>
                    <div className="flex-[2]">
                        <div className="w-full lg:flex gap-6 mb-6">
                            {data.date_resign !== null ? (
                                <Resign
                                    branch={branch}
                                    detailData={data}
                                    onClose={onClose}
                                    titles={props.titles}
                                />
                            ) : (
                                <>
                                    <div className="flex-1">
                                        <FormMutasi
                                            branch={branch}
                                            detailId={data.id}
                                            onClose={onClose}
                                            titles={props.titles}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <ResignModal
                                            branch={branch}
                                            detailId={data.id}
                                            onClose={onClose}
                                            titles={props.titles}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="w-full lg:flex gap-6">
                            <div className="flex-1">
                                <PencairanSimpanan
                                    detailId={data.id}
                                    detailData={data}
                                    onClose={onClose}
                                />
                            </div>
                            {/* <div className="flex-1">
                                <PengambilanJaminan
                                    detailId={data.id}
                                    onClose={onClose}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ActionModal;
