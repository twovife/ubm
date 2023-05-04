import React from "react";
import { Link } from "@inertiajs/react";

export default function LinkButton({
    title,
    href,
    type = "submit",
    className = "",
    processing,
    children,
    disabled,
    icon,
    size,
    theme = "primary",
    ...props
}) {
    let themeclass = "";
    let btnsize = "px-4 py-2 text-xs";

    if (theme == "primary") {
        themeclass =
            `bg-main-500 disabled:hover:bg-main-800 hover:bg-main-700 focus:bg-main-600 active:bg-main-900 focus:ring-main-500 ` +
            className;
    } else if (theme == "secondary") {
        themeclass =
            `bg-gray-500 disabled:hover:bg-gray-800 hover:bg-gray-700 focus:bg-gray-600 active:bg-gray-900 focus:ring-gray-500 ` +
            className;
    } else if (theme == "green") {
        themeclass =
            `bg-green-500 disabled:hover:bg-green-800 hover:bg-green-700 focus:bg-green-600 active:bg-green-900 focus:ring-green-500 ` +
            className;
    } else if (theme == "red") {
        themeclass =
            `bg-red-500 disabled:hover:bg-red-800 hover:bg-red-700 focus:bg-red-600 active:bg-red-900 focus:ring-red-500 ` +
            className;
    } else if (theme == "yellow") {
        themeclass =
            `bg-yellow-500 disabled:hover:bg-yellow-800 hover:bg-yellow-700 focus:bg-yellow-600 active:bg-yellow-900 focus:ring-yellow-500 ` +
            className;
    } else if (theme == "base") {
        themeclass =
            `bg-main-500 disabled:hover:bg-main-500 hover:bg-main-600 focus:bg-main-600 active:bg-main-700 focus:ring-main-500 ` +
            className;
    } else {
        themeclass =
            `bg-white disabled:hover:bg-white border-gray-500 hover:bg-white focus:bg-white active:bg-white focus:ring-gray-500 ` +
            className;
    }

    if (size == "sm") {
        btnsize = `px-3 py-2 text-xs`;
    } else if (size == "md") {
        btnsize = `px-4 py-2 text-xs`;
    } else if (size == "lg") {
        btnsize = `px-6 py-3`;
    } else if (size == "box-lg") {
        btnsize = `px-6 py-6`;
    } else if (size == "box-md") {
        btnsize = `px-4 py-4`;
    } else if (size == "box") {
        btnsize = `px-3 py-3`;
    } else if (size == "box-sm") {
        btnsize = `px-1.5 py-1.5`;
    }

    return (
        <Link
            href={href}
            as={type}
            {...props}
            className={
                `disabled:cursor-not-allowed flex gap-2 items-center ${btnsize} border border-transparent rounded-md font-semibold text-xs text-white tracking-widest focus:outline-none focus:ring-2 ${
                    processing && "opacity-25"
                } transition ease-in-out duration-150 ` + themeclass
            }
            disabled={processing || disabled}
        >
            {icon}
            {children || (title && <span>{children || title}</span>)}
        </Link>
    );
}
