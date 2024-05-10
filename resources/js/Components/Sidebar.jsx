import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { AiFillHome } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa6";
import SidebarMenuButton from "./SidebarMenuButton";

const Sidebar = ({ isOpen, setIsopen }) => {
    const { auth } = usePage().props;
    const unitAkses = auth.user.permissions.some(
        (item) => item.name === "unit"
    );
    const [collapse, setCollapse] = useState("");
    const togglerColapse = (params) => {
        if (params == collapse) {
            setCollapse("");
        } else {
            setCollapse(params);
        }
    };
    return (
        <aside
            className={`${
                isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
            } top-0 left-0 transition-all duration-200 ease-in fixed w-full h-screen backdrop-blur-sm z-50`}
            onClick={setIsopen}
        >
            <div
                className="w-60 bg-white p-3 h-full border-r"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center font-semibold text-roman-600">
                    Apps Menu
                </div>
                <div className="mt-3">
                    <button className="hover:bg-gray-100 focus:bg-gray-200 w-full text-start px-3 py-1.5 rounded font-light flex gap-3 items-center justify-start">
                        <AiFillHome />
                        <span>Home</span>
                    </button>
                    <SidebarMenuButton
                        onClick={() => togglerColapse(1)}
                        active={route().current("sksw.*")}
                        show={collapse == 1}
                        title={`SKSW`}
                        lists={[
                            {
                                id: "1",
                                href: route("sksw.dashboard"),
                                name: "Dashboard SKSW",
                                active: route().current("sksw.dashboard"),
                            },
                            {
                                id: "2",
                                href: route("sksw.global"),
                                name: "SKSW Global",
                                active: route().current("sksw.global"),
                            },
                            {
                                id: "3",
                                href: route("sksw.wilayah"),
                                name: "SKSW Wilayah",
                                active: route().current("sksw.wilayah"),
                            },
                            {
                                id: "4",
                                href: route("sksw.unit"),
                                name: "SKSW Unit",
                                active: route().current("sksw.unit"),
                            },
                        ]}
                    />
                    <SidebarMenuButton
                        onClick={() => togglerColapse(2)}
                        active={route().current("aset.*")}
                        show={collapse == 2}
                        title={`Aset Kendaraan`}
                        lists={[
                            {
                                id: "1",
                                href: route("sksw.dashboard"),
                                name: "Dashboard SKSW",
                                active: route().current("sksw.dashboard"),
                            },
                            {
                                id: "2",
                                href: route("sksw.global"),
                                name: "SKSW Global",
                                active: route().current("sksw.global"),
                            },
                            {
                                id: "3",
                                href: route("sksw.wilayah"),
                                name: "SKSW Wilayah",
                                active: route().current("sksw.wilayah"),
                            },
                            {
                                id: "4",
                                href: route("sksw.unit"),
                                name: "SKSW Unit",
                                active: route().current("sksw.unit"),
                            },
                        ]}
                    />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
