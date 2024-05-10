import React from "react";

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

Card.subTitle = CardSubTitle;

export default Card;
