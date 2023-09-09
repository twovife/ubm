import React from "react";

export default function PrimaryButton({
    title,
    type = "button",
    className = "",
    processing,
    children,
    disabled,
    icon,
    size,
    active = false,
    theme = "primary",
    ...props
}) {
    let themeclass = "";
    let btnsize = "px-4 py-2 text-xs";

    if (theme == "primary") {
        themeclass =
            `${
                active || disabled ? `bg-main-900` : `bg-main-500`
            } disabled:hover:bg-main-800 hover:bg-main-700 focus:bg-main-600 focus:ring-main-500 text-white border border-transparent` +
            className;
    } else if (theme == "secondary") {
        themeclass =
            `${
                active ? `bg-gray-900` : `bg-gray-500`
            } disabled:hover:bg-gray-800 hover:bg-gray-700 focus:bg-gray-600 focus:ring-gray-500 text-white border border-transparent` +
            className;
    } else if (theme == "green") {
        themeclass =
            `${
                active ? `bg-green-900` : `bg-green-500`
            } disabled:hover:bg-green-800 hover:bg-green-700 focus:bg-green-600 focus:ring-green-500 text-white border border-transparent` +
            className;
    } else if (theme == "red") {
        themeclass =
            `${
                active ? `bg-red-900` : `bg-red-500`
            } disabled:hover:bg-red-800 hover:bg-red-700 focus:bg-red-600 focus:ring-red-500 text-white border border-transparent` +
            className;
    } else if (theme == "yellow") {
        themeclass =
            `${
                active ? `bg-yellow-900` : `bg-yellow-500`
            } disabled:hover:bg-yellow-800 hover:bg-yellow-700 focus:bg-yellow-600 focus:ring-yellow-500 text-white border border-transparent` +
            className;
    } else if (theme == "base") {
        themeclass =
            `${
                active ? `bg-main-900` : `bg-main-500`
            } disabled:hover:bg-main-500 hover:bg-main-600 focus:bg-main-600 focus:ring-main-500 text-white border border-transparent` +
            className;
    } else {
        themeclass =
            `${
                active ? `bg-white-900` : `bg-white-500`
            } disabled:hover:bg-main-800 border border border-main-500 text-main-500 hover:text-white hover:bg-main-700 focus:bg-main-600 focus:ring-main-500 ` +
            className;
    }

    if (size == "sm") {
        btnsize = `px-3 py-2 text-xs`;
    } else if (size == "md") {
        btnsize = `px-4 py-2 text-xs`;
    } else if (size == "lg") {
        btnsize = `px-6 py-3`;
    } else if (size == "xl") {
        btnsize = `px-6 py-3 text-xl`;
    } else if (size == "box-lg") {
        btnsize = `px-6 py-6`;
    } else if (size == "box-md") {
        btnsize = `px-4 py-4`;
    } else if (size == "box") {
        btnsize = `px-3 py-3`;
    }

    return (
        <button
            {...props}
            type={type}
            className={
                `disabled:cursor-not-allowed flex gap-2 items-center ${btnsize} rounded-md font-semibold tracking-widest focus:outline-none focus:ring-2 ${
                    processing && "opacity-25"
                } transition ease-in-out duration-150 ` + themeclass
            }
            disabled={processing || disabled}
        >
            {icon}
            {children || (title && (children || title))}
        </button>
    );
}
