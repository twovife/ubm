import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import { MdVerifiedUser } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import SidebarButton from "@/Components/SidebarButton";
import SideBarDropDown from "@/Components/SidebarDropDown";
import Loading from "@/Components/Loading";
import SweetAlert from "@/Components/SweetAlert";
import { usePage } from "@inertiajs/react";

export default function Authenticated({
    auth,
    header,
    children,
    loading = false,
}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [showSidebar, setShowSidebar] = useState(false);
    const [colapse, setColapse] = useState();

    const onClickDropDownHandler = (params) => {
        if (params == colapse) {
            setColapse(0);
        } else {
            setColapse(params);
        }
    };

    const onClosedSidebar = (event) => {
        event.preventDefault();
        setShowSidebar(false);
    };

    const { errors, flash } = usePage().props;

    return (
        <div className="min-h-screen relative bg-gray-50">
            {Object.keys(errors).length > 0 && (
                <SweetAlert type="error" message={errors[0]} />
            )}
            {flash.message && (
                <SweetAlert type="success" message={flash.message} />
            )}
            <Loading show={loading} />
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 text-main-800">
                    <div className="flex items-center justify-between h-16">
                        <BsUiChecksGrid
                            className="text-2xl hover:text-main-500 hover:scale-110 hover:cursor-pointer duration-300 ease-linear"
                            onClick={() => setShowSidebar(true)}
                        />
                        <div className="font-semibold flex">
                            <span className="hidden lg:block">
                                Portal Data&nbsp;
                            </span>
                            UBM
                        </div>
                        <div className="flex items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-main-500 bg-white hover:text-main-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <MdVerifiedUser className="text-2xl" />
                                                <span className="hidden lg:block ml-2">
                                                    {auth.user.username}
                                                </span>

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside
                className={`${
                    showSidebar ? `translate-x-0` : `-translate-x-full`
                } fixed top-0 z-[51] bg-white/10 backdrop-blur-[.8px] w-full duration-150`}
                onClick={() => setShowSidebar(false)}
            >
                <div
                    className={`bg-main-400 w-72 h-screen duration-150`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-4">
                        <h1 className="text-3xl font-semibold">UBM</h1>
                        <GrClose
                            className="text-main-800 text-2xl hover:rotate-180 hover:cursor-pointer duration-500 ease-in-out"
                            onClick={onClosedSidebar}
                        />
                    </div>
                    {auth.user.permissions.some(
                        (item) => item.name === "area"
                    ) ? (
                        // jika mantri
                        <div className="mt-3">
                            <SidebarButton
                                title={"Dashboard"}
                                href={route("mantriapps.index")}
                            />
                        </div>
                    ) : (
                        // jika bukan mantri
                        <div className="mt-3">
                            <SideBarDropDown
                                onClick={() =>
                                    onClickDropDownHandler("data_karyawan")
                                }
                                title={"Data Karyawan"}
                                active={route().current("employee.*")}
                                colapse={colapse}
                                dropdownId={"data_karyawan"}
                                lists={[
                                    {
                                        id: "1",
                                        href: route("employee.index"),
                                        name: "Data Karyawan",
                                        active: route().current("employee.*"),
                                    },
                                ]}
                            />

                            <SideBarDropDown
                                onClick={() => onClickDropDownHandler("sksw")}
                                title={"SKSW"}
                                active={route().current("simpanan.*")}
                                colapse={colapse}
                                dropdownId={"sksw"}
                                lists={[
                                    {
                                        id: "1",
                                        href: route("sksw.dashboard"),
                                        name: "Dashboard SKSW",
                                        active: route().current(
                                            "sksw.dashboard"
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

                            <SideBarDropDown
                                onClick={() => onClickDropDownHandler("aset")}
                                title={"Aset Kendaraan"}
                                active={route().current("aset.*")}
                                colapse={colapse}
                                dropdownId={"aset"}
                                lists={[
                                    {
                                        id: "1",
                                        href: route("aset.index"),
                                        name: "List Aset",
                                        active: route().current("aset.index"),
                                    },
                                    {
                                        id: "2",
                                        href: route("aset.taxalert"),
                                        name: "Peringatan Her",
                                        active: route().current(
                                            "aset.taxalert"
                                        ),
                                    },
                                ]}
                            />

                            <SideBarDropDown
                                onClick={() =>
                                    onClickDropDownHandler("simpanan_sejuta")
                                }
                                title={"Tabungan 1Jt"}
                                active={
                                    route().current("unitsaving.*") ||
                                    route().current("bonpanjer.*") ||
                                    route().current("pinjamanmodal.*")
                                }
                                colapse={colapse}
                                dropdownId={"simpanan_sejuta"}
                                lists={[
                                    {
                                        id: "1",
                                        href: route("unitsaving.dashboard"),
                                        name: "Dashboard Tabungan",
                                        active: route().current(
                                            "unitsaving.dashboard"
                                        ),
                                    },
                                    {
                                        id: "2",
                                        href: route("unitsaving.index"),
                                        name: "Tabungan 1Jt",
                                        active: route().current(
                                            "unitsaving.index"
                                        ),
                                    },
                                    {
                                        id: "3",
                                        href: route("bonpanjer.bon_panjer"),
                                        name: "Bon Panjer",
                                        active: route().current("bonpanjer.*"),
                                    },
                                    {
                                        id: "4",
                                        href: route(
                                            "pinjamanmodal.pinjaman_modal"
                                        ),
                                        name: "Pinjaman Modal",
                                        active: route().current(
                                            "pinjamanmodal.pinjaman_modal"
                                        ),
                                    },
                                ]}
                            />

                            <SideBarDropDown
                                onClick={() =>
                                    onClickDropDownHandler("BOP_Pusat")
                                }
                                title={"BOP Pusat"}
                                active={
                                    route().current("bop.*") ||
                                    route().current("bonpriv.*") ||
                                    route().current("mutation.*")
                                }
                                colapse={colapse}
                                dropdownId={"BOP_Pusat"}
                                lists={[
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
                                        active: route().current("bonpriv.*"),
                                    },
                                ]}
                            />
                        </div>
                    )}
                </div>
            </aside>
            {header && (
                <header className="bg-gray-100/50">
                    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
