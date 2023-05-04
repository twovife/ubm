import { Link } from "@inertiajs/react";
import React from "react";
import { BiCaretRight } from "react-icons/bi";
import { AiFillAppstore } from "react-icons/ai";

export default function SideBarDropDown({
    title,
    active = false,
    lists,
    icon,
    colapse,
    dropdownId = 0,
    ...props
}) {
    return (
        <div className="relative">
            <div>
                <button
                    {...props}
                    type="button"
                    className={`w-full flex justify-between items-center text-lg flex-nowrap gap-2 text-main-800 hover:text-main-200 hover:bg-main-600 px-4 py-3 font-semibold ${
                        active && `text-main-200 bg-main-600`
                    }`}
                >
                    <span sidebar-toggle-item="">{title ?? "none"}</span>
                    <div className="ml-auto flex gap-1">
                        <BiCaretRight
                            className={`ml-auto duration-200 ${
                                colapse == dropdownId || active
                                    ? `rotate-90`
                                    : ``
                            }`}
                        />
                        {icon ? icon : <AiFillAppstore />}
                    </div>
                </button>

                <ul
                    className={`${
                        colapse == dropdownId || active ? `block` : `hidden`
                    } space-y-2`}
                >
                    {lists ? (
                        lists.map((list) => {
                            return (
                                <li key={list.id}>
                                    <Link
                                        href={list.href}
                                        className={`first:mt-2 flex items-center w-full py-2 pl-10 ${
                                            list.active
                                                ? `text-main-900 font-bold hover:bg-main-500 hover:text-black `
                                                : `text-gray-800 font-thin hover:bg-main-500 hover:text-black `
                                        }`}
                                    >
                                        {list.name}
                                    </Link>
                                </li>
                            );
                        })
                    ) : (
                        <li>none</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
