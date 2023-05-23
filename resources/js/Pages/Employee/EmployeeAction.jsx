import React from "react";
import UpdateDetail from "./Partials/UpdateDetail";
import Resign from "./Partials/Resign";
import FormMutasi from "./Partials/FormMutasi";
import ResignModal from "./Partials/ResignModal";
import PencairanSimpanan from "./Partials/PencairanSimpanan";
import LinkButton from "@/Components/LinkButton";
import { IoMdArrowBack } from "react-icons/io";

const EmployeeAction = ({ data, ...props }) => {
    const titleJabatan = props.titles.map((jabatan) => ({
        id: jabatan.id,
        value: jabatan.title,
        display: jabatan.title,
    }));

    const branch = props.branch.map((branch) => ({
        id: branch.id,
        value: branch.id,
        display: branch.unit,
    }));

    return (
        <div>
            <div className="p-6 overflow-auto">
                <div className="flex w-full justify-between items-center">
                    <div className="text-lg mb-6">Action Form</div>
                    <LinkButton
                        as="a"
                        href={route("employee.index")}
                        icon={<IoMdArrowBack />}
                        size={"sm"}
                        title={"Back"}
                    ></LinkButton>
                </div>
                <div className="lg:flex gap-6">
                    <div className="flex-1">
                        <UpdateDetail
                            branch={branch}
                            detailData={data}
                            titles={titleJabatan}
                        />
                    </div>
                    <div className="flex-[2]">
                        <div className="w-full lg:flex gap-6 mb-6">
                            {data.date_resign !== null ? (
                                <Resign
                                    branch={branch}
                                    detailData={data}
                                    titles={titleJabatan}
                                />
                            ) : (
                                <>
                                    <div className="flex-1">
                                        <FormMutasi
                                            branch={branch}
                                            detailId={data.id}
                                            titles={titleJabatan}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <ResignModal
                                            branch={branch}
                                            detailId={data.id}
                                            titles={titleJabatan}
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
                                    auth={props.auth}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeAction;
