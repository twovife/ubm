import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import { MdVerifiedUser } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import SidebarButton from "@/Components/SidebarButton";
import SideBarDropDown from "@/Components/SidebarDropDown";
import Loading from "@/Components/Loading";
import SweetAlert from "@/Components/SweetAlert";
import { usePage } from "@inertiajs/react";
import { AiFillFire } from "react-icons/ai";
import { BiAlignJustify } from "react-icons/bi";
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import Card from "@/Components/Card";

export default function Authenticated({ header, children, loading = false }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const { errors, flash, auth } = usePage().props;

    return (
        <div className="min-h-screen relative bg-gray-50">
            {Object.keys(errors).length > 0 && (
                <SweetAlert type="error" message={errors[0]} />
            )}
            {flash.message && (
                <SweetAlert type="success" message={flash.message} />
            )}
            <Loading show={loading} />
            <Navbar auth={auth} toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} setIsopen={toggleSidebar} />
            <div className="relative py-2 px-4">
                <main>{children}</main>
            </div>
        </div>
    );
}
