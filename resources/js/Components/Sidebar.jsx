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
    const menu1 =
        auth.user.username == "suci"
            ? [
                  {
                      id: "1",
                      href: route("unitsaving.dashboard"),
                      name: "Buku Transaksi 1jt",
                      active: route().current("unitsaving.dashboard"),
                  },

                  {
                      id: "2",
                      href: route("unitsaving.index"),
                      name: "Tabungan 1Jt",
                      active: route().current("unitsaving.index"),
                  },
                  {
                      id: "3",
                      href: route("bonpanjer.bon_panjer"),
                      name: "Bon Panjer",
                      active:
                          route().current("bonpanjer.*") &&
                          !route().current("bonpanjer.bon_panjer_lunas"),
                  },
                  {
                      id: "5",
                      href: route("bonpanjer.bon_panjer_lunas"),
                      name: "Bon Panjer Lunas",
                      active: route().current("bonpanjer.bon_panjer_lunas"),
                  },
                  {
                      id: "4",
                      href: route("pinjamanmodal.pinjaman_modal"),
                      name: "Pinjaman Modal",
                      active: route().current("pinjamanmodal.pinjaman_modal"),
                  },
                  {
                      id: "5",
                      href: route("pinjamanmodal.pinjaman_modal_transaksi"),
                      name: "Transaksi Pinj Modal",
                      active: route().current(
                          "pinjamanmodal.pinjaman_modal_transaksi"
                      ),
                  },
              ]
            : [
                  {
                      id: "2",
                      href: route("unitsaving.index"),
                      name: "Tabungan 1Jt",
                      active: route().current("unitsaving.index"),
                  },
                  {
                      id: "3",
                      href: route("bonpanjer.bon_panjer"),
                      name: "Bon Panjer",
                      active:
                          route().current("bonpanjer.*") &&
                          !route().current("bonpanjer.bon_panjer_lunas"),
                  },
                  {
                      id: "5",
                      href: route("bonpanjer.bon_panjer_lunas"),
                      name: "Bon Panjer Lunas",
                      active: route().current("bonpanjer.bon_panjer_lunas"),
                  },
                  {
                      id: "4",
                      href: route("pinjamanmodal.pinjaman_modal"),
                      name: "Pinjaman Modal",
                      active: route().current("pinjamanmodal.pinjaman_modal"),
                  },
                  {
                      id: "5",
                      href: route("pinjamanmodal.pinjaman_modal_transaksi"),
                      name: "Transaksi Pinj Modal",
                      active: route().current(
                          "pinjamanmodal.pinjaman_modal_transaksi"
                      ),
                  },
              ];

    const menu2 =
        auth.user.username == "suci"
            ? [
                  {
                      id: "1",
                      href: route("mutation.index"),
                      name: "Dashboard Mutasi BOP",
                      active: route().current("mutation.*"),
                  },
                  {
                      id: "2",
                      href: route("bop.index"),
                      name: "Setoran BOP",
                      active: route().current("bop.*"),
                  },
                  {
                      id: "3",
                      href: route("bonpriv.index"),
                      name: "Bon Prive",
                      active: route().current("bonpriv.index"),
                  },
                  {
                      id: "4",
                      href: route("bonpriv.indexlunas"),
                      name: "Bon Prive Lunas",
                      active: route().current("bonpriv.indexlunas"),
                  },
              ]
            : [
                  {
                      id: "2",
                      href: route("bop.index"),
                      name: "Setoran BOP",
                      active: route().current("bop.*"),
                  },
                  {
                      id: "3",
                      href: route("bonpriv.index"),
                      name: "Bon Prive",
                      active: route().current("bonpriv.index"),
                  },
                  {
                      id: "4",
                      href: route("bonpriv.indexlunas"),
                      name: "Bon Prive Lunas",
                      active: route().current("bonpriv.indexlunas"),
                  },
              ];
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
                        active={route().current("emp.*")}
                        show={collapse == 1}
                        title={`Karyawan`}
                        lists={[
                            {
                                id: "1",
                                href: route("emp.index"),
                                name: "Data Karyawan",
                                active: route().current("emp.index"),
                            },
                        ]}
                    />
                    <SidebarMenuButton
                        onClick={() => togglerColapse(2)}
                        active={route().current("sksw.*")}
                        show={collapse == 2}
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
                                href: route("sksw.dashboard_nonaktif"),
                                name: "Dashboard Non Active",
                                active: route().current(
                                    "sksw.dashboard_nonaktif"
                                ),
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
                        onClick={() => togglerColapse(3)}
                        active={
                            route().current("unitsaving.*") ||
                            route().current("bonpanjer.*") ||
                            route().current("pinjamanmodal.*")
                        }
                        show={collapse == 3}
                        title={`Tabungan 1 Juta`}
                        lists={menu1}
                    />
                    <SidebarMenuButton
                        onClick={() => togglerColapse(4)}
                        active={
                            route().current("bop.*") ||
                            route().current("bonpriv.*") ||
                            route().current("mutation.*")
                        }
                        show={collapse == 4}
                        title={`BOP Pusat`}
                        lists={menu2}
                    />

                    {/* <SidebarMenuButton
                        onClick={() => togglerColapse(5)}
                        active={route().current("controlpanel.*")}
                        show={collapse == 5}
                        title={`Goro Umroh `}
                        lists={[
                            {
                                id: "1",
                                href: route("goroumrah.goro_transaksi"),
                                name: "Transaksi Goro",
                                active: route().current(
                                    "goroumrah.goro_transaksi"
                                ),
                            },
                            {
                                id: "2",
                                href: route("goroumrah.goro_index"),
                                name: "Iuran Goro Umroh",
                                active: route().current("goroumrah.goro_index"),
                            },
                            {
                                id: "3",
                                href: route("goroumrah.goro_pinjaman"),
                                name: "Pinjaman Goro",
                                active: route().current(
                                    "goroumrah.goro_pinjaman"
                                ),
                            },
                        ]}
                    /> */}

                    <SidebarMenuButton
                        onClick={() => togglerColapse(99)}
                        active={route().current("controlpanel.*")}
                        show={collapse == 99}
                        title={`Administrasi`}
                        lists={[
                            {
                                id: "1",
                                href: route("controlpanel.daftar_unit"),
                                name: "Daftar Kantor",
                                active: route().current(
                                    "controlpanel.daftar_unit"
                                ),
                            },
                            {
                                id: "2",
                                href: route(
                                    "controlpanel.syncronize_sksw_with_employee"
                                ),
                                name: "Emp X SKSW",
                                active: route().current(
                                    "controlpanel.syncronize_sksw_with_employee"
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
