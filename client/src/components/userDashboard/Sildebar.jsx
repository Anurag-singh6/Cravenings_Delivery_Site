import React, { useState } from "react";
import { GrOverview } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { TbTransactionRupee } from "react-icons/tb";
import { FaBorderAll } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Authcontext";

const Sildebar = ({ active, setActive, isOpen, setOpen }) => {
  const { setUser, setLogin } = useAuth();
  const menuitems = [
    { key: "overview", title: "Overview", icon: <GrOverview /> },
    { key: "profile", title: "Profile", icon: <CgProfile /> },
    { key: "orders", title: "Orders", icon: <FaBorderAll /> },
    { key: "transaction", title: "Transaction", icon: <TbTransactionRupee /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setLogin(false);
      sessionStorage.removeItem("CravingUser");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };
  return (
    <>
      <div className="text-white ml-2.5 h-full flex flex-col justify-between">
        <div>
          <div className="font-bold mt-2.5 p-2 flex items-center gap-2">
            <button
              className="bg-(--color-primary) p-3 rounded-xl hover:bg-gray-500 transition"
              onClick={() => setOpen(!isOpen)}
              aria-label="Toggle sidebar"
            >
              <RxHamburgerMenu />
            </button>
            {!isOpen && (
              <span className="truncate text-sm">User Dashboard</span>
            )}
          </div>
          <hr />

          <div className="py-6 space-y-3 w-full text-sm font-semibold">
            {menuitems.map((item, idx) => (
              <button
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition ${
                  active === item.key
                    ? "bg-(--color-primary)"
                    : "hover:bg-gray-500"
                }`}
                onClick={() => setActive(item.key)}
                key={idx}
              >
                {item.icon}
                {!isOpen && <span className="truncate">{item.title}</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="p-2">
          <button
            className="w-full flex gap-3 items-center text-sm ps-2 rounded-xl h-10 text-nowrap overflow-hidden duration-300 hover:bg-red-500 hover:text-white text-red-600"
            onClick={handleLogout}
          >
            <IoIosLogOut />
            {!isOpen && "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sildebar;
