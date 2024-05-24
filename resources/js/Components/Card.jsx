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
    return <div className="lg:px-4 px-0 py-2">{children}</div>;
};

const CardEndContent = ({ className, children }) => {
    return (
        <div
            className={`flex lg:flex-row flex-col justify-end gap-3 items-center flex-1 w-full ${className}`}
        >
            {children}
        </div>
    );
};

const CardStartContent = ({ className, children }) => {
    return (
        <div
            className={`flex lg:justify-start gap-3 items-center flex-1 w-full ${className}`}
        >
            {children}
        </div>
    );
};

const CardFilterItem = ({ children, filter, removeFilter }) => {
    const onClosed = (e) => {
        removeFilter(e);
    };
    return (
        <>
            {filter &&
                filter.map((item, key) => (
                    <div
                        key={key}
                        className="flex justify-start items-center gap-1 border border-roman-500 rounded-md shadow px-1 py-1"
                    >
                        <div className="p-1 border  rounded-l text-green-500">
                            <AiFillFilter />
                        </div>
                        <div className="p-1 border text-xs capitalize">
                            {`${item.name} ${
                                item.operator == 1
                                    ? `Mempunyai`
                                    : item.operator == 2
                                    ? "="
                                    : item.operator == 4
                                    ? "Lebih Dari"
                                    : item.operator == 5
                                    ? "Kurang Dari"
                                    : "Antara"
                            } "${item.search_key}"`}
                        </div>
                        <button
                            className="p-1 border  rounded-r text-roman-500 hover:bg-roman-500 hover:text-white
                        "
                            onClick={() => onClosed(item.id)}
                        >
                            <IoMdCloseCircle />
                        </button>
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
