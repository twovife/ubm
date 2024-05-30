import React from "react";

const ButtonWrapper = ({ children }) => {
    return (
        <div className="flex flex-row justify-end w-full lg:w-auto gap-3 flex-wrap">
            {children}
        </div>
    );
};

export default ButtonWrapper;
