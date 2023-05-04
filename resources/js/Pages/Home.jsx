import React from "react";
import { HiCubeTransparent } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";

const Home = (props) => {
    console.log(props);
    return (
        <div className="font-roboto px-8 py-3">
            <div className="w-full flex items-center">
                <h1 className="p-2 text-3xl text-main-500">
                    <HiCubeTransparent />
                </h1>
                <h1 className="text-3xl font-bold">UBM</h1>
                <div className="ml-auto flex gap-2">
                    <MdVerifiedUser className="text-2xl" />
                </div>
            </div>
        </div>
    );
};

export default Home;
