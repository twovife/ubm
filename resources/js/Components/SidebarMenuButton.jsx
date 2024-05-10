import { Link } from "@inertiajs/react";
import React, { Fragment } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa6";
import { RiAppsFill } from "react-icons/ri";
import { BsDot } from "react-icons/bs";
import { BiDotsHorizontal, BiDotsVertical } from "react-icons/bi";
import { Transition } from "@headlessui/react";

const SidebarMenuButton = ({
    title,
    icons,
    active = false,
    lists,
    show = false,
    ...params
}) => {
    return (
        <div className="relative mb-3">
            <button
                {...params}
                className={`hover:bg-gray-100 focus:bg-gray-200 w-full text-start px-3 py-1.5 font-thin flex gap-3 items-center justify-between text-gray-600 ${
                    active ? `rounded-t-lg bg-gray-300` : ""
                }`}
            >
                <div className="flex gap-3 items-center justify-start">
                    {icons ? { icons } : <RiAppsFill />}
                    <span>{title || "Button"}</span>
                </div>
                <FaAngleRight
                    className={`${show || active ? `rotate-90` : `rotate-0`}`}
                />
            </button>
            <Transition
                as={Fragment}
                show={show || active}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="bg-gray-100 rounded-b-lg text-sm font-light text-gray-500 overflow-hidden divide-y divide-gray-300">
                    {lists?.map((item, key) => (
                        <Link
                            href={item.href}
                            key={key}
                            className={`group hover:cursor-pointer ${
                                item.active
                                    ? `bg-gray-200 font-semibold`
                                    : "bg-gray-100"
                            } hover:bg-gray-200 px-6 py-2 w-full text-start flex items-center justify-start`}
                        >
                            <BiDotsVertical
                                className={`group-hover:text-roman-600 ${
                                    item.active ? `text-roman-600` : ``
                                }`}
                            />
                            <span className={`group-hover:font-semibold`}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </Transition>
        </div>
    );
};

export default SidebarMenuButton;
