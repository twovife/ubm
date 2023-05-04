import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "border-gray-300 focus:border-main-500 focus:ring-main-500 rounded-md shadow-sm disabled:bg-gray-100 disabled:border disabled:rounded-md read-only:border-0 read-only:border-b read-only:rounded-none read-only:bg-main-100/50 read-only:focus:ring-0 " +
                className
            }
            ref={input}
        />
    );
});
