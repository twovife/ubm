import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import { MdVerifiedUser } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import SidebarButton from "@/Components/SidebarButton";
import SideBarDropDown from "@/Components/SidebarDropDown";

export default function Authenticated({ auth, header, children }) {
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

    return (
        <div className="min-h-screen relative">
            <nav className="bg-white border-b border-main-100 sticky top-0 z-50">
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
                                onClick={() => onClickDropDownHandler(1)}
                                title={"Data Karyawan"}
                                active={route().current("employee.*")}
                                colapse={colapse}
                                dropdownId={1}
                                lists={[
                                    {
                                        id: "em1",
                                        href: route("employee.index"),
                                        name: "Data Karyawan",
                                        active: route().current("employee.*"),
                                    },
                                ]}
                            />
                            <SideBarDropDown
                                onClick={() => onClickDropDownHandler(2)}
                                title={"Buku Transaksi Drop"}
                                active={route().current(
                                    "unit.pinjaman.request.*"
                                )}
                                colapse={colapse}
                                dropdownId={2}
                                lists={[
                                    {
                                        id: "trs1",
                                        href: route(
                                            "unit.pinjaman.request.requestPinjaman"
                                        ),
                                        name: "Transaksi Drop",
                                        active: route().current(
                                            "unit.pinjaman.request.requestPinjaman"
                                        ),
                                    },
                                    {
                                        id: "trs2",
                                        href: route(
                                            "unit.pinjaman.request.bukutransaksi"
                                        ),
                                        name: "Rekap Transaksi Drop",
                                        active: route().current(
                                            "unit.pinjaman.request.bukutransaksi"
                                        ),
                                    },
                                ]}
                            />

                            <SideBarDropDown
                                onClick={() => onClickDropDownHandler(4)}
                                title={"Buku Transaksi Drop"}
                                active={route().current("unit.customer.*")}
                                colapse={colapse}
                                dropdownId={4}
                                lists={[
                                    {
                                        id: "1",
                                        href: route("unit.customer.index"),
                                        name: "Data Customer",
                                        active: route().current(
                                            "unit.customer.*"
                                        ),
                                    },
                                ]}
                            />

                            <SideBarDropDown
                                onClick={() => onClickDropDownHandler(3)}
                                title={"Buku Angsuran"}
                                active={route().current(
                                    "unit.pinjaman.angsuran.*"
                                )}
                                colapse={colapse}
                                dropdownId={3}
                                lists={[
                                    {
                                        id: "angs1",
                                        href: route(
                                            "unit.pinjaman.angsuran.index"
                                        ),
                                        name: "Data Storting",
                                        active: route().current(
                                            "unit.pinjaman.angsuran.index"
                                        ),
                                    },
                                    {
                                        id: "angs2",
                                        href: route(
                                            "unit.pinjaman.angsuran.indexmb"
                                        ),
                                        name: "Data Storting MB",
                                        active: route().current(
                                            "unit.pinjaman.angsuran.indexmb"
                                        ),
                                    },
                                    {
                                        id: "angs3",
                                        href: route(
                                            "unit.pinjaman.request.requestPinjaman"
                                        ),
                                        name: "Pembayaran Angsuran ML",
                                        active: route().current(
                                            "unit.pinjaman.request.requestPinjaman"
                                        ),
                                    },
                                ]}
                            />

                            {/* <SideBarDropDown
                                  onClick={() => onClickDropDownHandler(2)}
                                  title={"Data Administrasi"}
                                  active={route().current("unit.pinjaman*")}
                                  colapse={colapse}
                                  dropdownId={2}
                                  lists={[
                                      {
                                          id: 1,
                                          href: route(
                                              "unit.pinjaman.request.requestPinjaman"
                                          ),
                                          name: "Buku Transaksi",
                                          active: route().current(
                                              "unit.pinjaman.request.*"
                                          ),
                                      },
                                      {
                                          id: 2,
                                          href: route("unit.pinjaman.index"),
                                          name: "Buku Storting",
                                          active: route().current(
                                              "unit.pinjaman.index"
                                          ),
                                      },
                                      {
                                          id: 3,
                                          href: route("unit.pinjaman.angsuran.index"),
                                          name: "Data Storting",
                                          active: route().current(
                                              "unit.pinjaman.angsuran.*"
                                          ),
                                      },
                                  ]}
                              /> */}
                            {/* <SideBarDropDown
                                  onClick={() => onClickDropDownHandler(2)}
                                  title={"Administrator"}
                                  active={route().current("administrator.*")}
                                  colapse={colapse}
                                  dropdownId={2}
                                  lists={[
                                      {
                                          id: 1,
                                          href: route("administrator.user.index"),
                                          name: "User Management",
                                          active: route().current(
                                              "administrator.user.*"
                                          ),
                                      },
                                      {
                                          id: 2,
                                          href: route("administrator.branches.index"),
                                          name: "Managemen Unit",
                                          active: route().current(
                                              "administrator.branches.*"
                                          ),
                                      },
                                  ]}
                              /> */}

                            {/* <SideBarDropDown
                                  onClick={() => onClickDropDownHandler(3)}
                                  title={"Administrasi Pusat"}
                                  active={route().current("cabang-utama.*")}
                                  colapse={colapse}
                                  dropdownId={3}
                                  lists={[
                                      {
                                          id: 1,
                                          href: route("cabangutama.customer.index"),
                                          name: "Data Customer",
                                          active: route().current(
                                              "cabangutama.customer.*"
                                          ),
                                      },
                                  ]}
                              /> */}

                            {/* <SideBarDropDown
                                  onClick={() => onClickDropDownHandler(4)}
                                  title={"Administrasi Unit"}
                                  active={route().current("cabang-utama.*")}
                                  colapse={colapse}
                                  dropdownId={4}
                                  lists={[
                                      {
                                          id: 1,
                                          href: route("cabangutama.customer.index"),
                                          name: "Data Customer",
                                          active: route().current(
                                              "cabangutama.customer.*"
                                          ),
                                      },
                                      {
                                          id: 2,
                                          href: route("unit.requestloan.index"),
                                          name: "Data Customer",
                                          active: route().current(
                                              "unit.requestloan.index*"
                                          ),
                                      },
                                  ]}
                              /> */}
                        </div>
                    )}
                </div>
            </aside>
            {header && (
                <header className="bg-white">
                    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
