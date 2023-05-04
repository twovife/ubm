import React from "react";
import "../../css/loader.css";
import ReactDOM from "react-dom";
import { Transition } from "@headlessui/react";

const Loading = ({ show }) => {
    const loadingRoot = document.getElementById("loading");
    return ReactDOM.createPortal(
        <Transition show={show} leave="duration-200">
            <div className="w-full h-screen bg-white/20 absolute top-0 left-0 z-[100] flex justify-center items-center backdrop-blur-[1px]">
                <div className="custom-loader"></div>
            </div>
        </Transition>,
        loadingRoot
    );
    // <div className="absolute w-full h-full bg-red-400">
    //     <div class="custom-loader"></div>
    // </div>
};

export default Loading;
