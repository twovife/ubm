import React from "react";
import { AiFillFire } from "react-icons/ai";
import { BiAlignJustify } from "react-icons/bi";
import { MdVerifiedUser } from "react-icons/md";
import Dropdown from "./Dropdown";

const Navbar = ({ toggleSidebar, auth }) => {
    return (
        <nav className="p-3 bg-white border-b shadow-sm sticky top-0 left-0 w-full z-40">
            <div className="flex justify-between items-center">
                <div className="text-xl font-semibold text-roman-500 flex gap-1 justify-start items-center">
                    <button
                        className="hover:bg-roman-50 p-1.5 text-2xl mr-2 rounded-lg "
                        onClick={toggleSidebar}
                    >
                        <BiAlignJustify />
                    </button>
                    <AiFillFire className="text-2xl" />
                    <div>
                        <span>UBMI</span>
                        <span className="hidden lg:inline-block ml-1">
                            Digital
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-roman-600 border border-transparent text-sm leading-4 font-medium rounded-md hover:bg-roman-50 bg-white focus:outline-none transition ease-in-out duration-150"
                                >
                                    <MdVerifiedUser className="text-xl" />
                                    <span className="hidden lg:block ml-2">
                                        {auth.user.username}
                                    </span>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
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
        </nav>
    );
};

export default Navbar;
