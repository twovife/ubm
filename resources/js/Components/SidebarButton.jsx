import { Link } from "@inertiajs/react";
import React from "react";
import { AiFillAppstore } from "react-icons/ai";

export default function SidebarButton({
    active = false,
    children,
    icon,
    href,
    title,
}) {
    return (
        <Link
            href={href}
            className={`w-full flex justify-between items-center text-lg flex-nowrap gap-2 text-main-800 hover:text-main-200 hover:bg-main-600 px-4 py-3 font-semibold ${
                active && `text-main-200 bg-main-600`
            }`}
        >
            <span className="whitespace-nowrap overflow-hidden">
                {title ?? children}
            </span>
            <div className="ml-auto">{icon ? icon : <AiFillAppstore />}</div>
        </Link>
    );
}
