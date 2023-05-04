import LinkButton from "@/Components/LinkButton";
import React from "react";
import { AiTwotoneHome } from "react-icons/ai";

const MobileLayout = ({ auth, header, children }) => {
    return (
        <div className="min-h-screen max-w-xl mx-auto relative">
            <div className="p-4 shadow flex w-full items-center sticky top-0 z-50">
                <div className="text-2xl font-semibold text-main-800 tracking-widest">
                    UBM APPS
                </div>
                <LinkButton
                    className="ml-auto"
                    href={route("mantriapps.index")}
                    icon={<AiTwotoneHome className="text-lg" />}
                    size={"box"}
                    type={"button"}
                />
            </div>
            <div className="p-4 pb-2">
                <div className="font-semibold text-lg  text-main-800">
                    {header || "TITLE HERE"}
                </div>
            </div>
            <div className="px-4 py-2 text-main-800">{children}</div>
        </div>
    );
};

export default MobileLayout;
