import React from "react";
import { AiFillFilter } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";

const Card = ({ judul = "Judul", children }) => {
    return (
        <div className="bg-white py-2 px-4 shadow rounded border-b">
            <h1 className="text-4xl font-semibold font-roboto text-gray-400 tracking-wider ">
                {judul}
            </h1>
            {children}
        </div>
    );
};

const CardSubTitle = ({ children }) => {
    return <div className="px-4 py-2">{children}</div>;
};

const CardEndContent = ({ className, children }) => {
    return (
        <div className={`flex justify-end gap-3 items-center ${className}`}>
            {children}
        </div>
    );
};

const CardStartContent = ({ className, children }) => {
    return (
        <div className={`flex justify-start gap-3 items-center ${className}`}>
            {children}
        </div>
    );
};

const CardFilterItem = ({ children, filter }) => {
    return (
        <>
            {filter &&
                filter.map((item) => (
                    <div className="flex justify-start items-center gap-1 border border-roman-500 rounded-md shadow px-1 py-1">
                        <div className="p-1 border  rounded-l text-green-500">
                            <AiFillFilter />
                        </div>
                        <div className="p-1 border text-xs">
                            Nama Kolon Seperti Value Kolom
                        </div>
                        <div className="p-1 border  rounded-r text-roman-500">
                            <IoMdCloseCircle />
                        </div>
                    </div>
                ))}
        </>
    );
};

Card.subTitle = CardSubTitle;
Card.endContent = CardEndContent;
Card.startContent = CardStartContent;
Card.filterItem = CardFilterItem;

export default Card;
