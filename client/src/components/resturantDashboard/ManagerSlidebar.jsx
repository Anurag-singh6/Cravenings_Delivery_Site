import React from "react";
import { GrOverview } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLiveHelp } from "react-icons/md";
import { TbTransactionRupee } from "react-icons/tb";
import { FaBorderAll } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Authcontext";

const ManagerSlidebar = ({ active, setActive, isOpen, setOpen }) => {
  const { setUser, setLogin } = useAuth();
  const menuitems = [
    { key: "resturantoverview", title: "Overview", icon: <GrOverview /> },
    { key: "managerprofile", title: "Profile", icon: <CgProfile /> },
    { key: "menuitems", title: "Menu", icon: <TiShoppingCart /> },
    {key: "orders", title: "Orders", icon: <FaBorderAll/>},
    {
      key: "managertransaction",
      title: "Transaction",
      icon: <TbTransactionRupee />,
    },
    { key: "managerhelpdesk", title: "Help Desk", icon: <MdOutlineLiveHelp /> },
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
      <div className="text-white ml-2.5">
        <div className="font-bold mt-2.5 p-2 flex gap-1 items-center">
          <button
            className="bg-(--color-primary) p-3 rounded-xl hover:bg-gray-500"
            onClick={() => setOpen(!isOpen)}
          >
            <RxHamburgerMenu />
          </button>
          {""}
          {!isOpen && (
            <span className="text-nowrap overflow-hidden">Resturant</span>
          )}
        </div>
        <hr />

        <div className="py-6 space-y-5 w-full">
          {menuitems.map((item, idx) => (
            <button
              className={`flex gap-3 items-center hover:bg-gray-400 p-2 rounded-xl ${
                active === item.key
                  ? "bg-(--color-primary)"
                  : "hover:bg-gray-500"
              }`}
              onClick={() => setActive(item.key)}
              key={idx}
            >
              {" "}
              {item.icon}
              {!isOpen && item.title}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button
          className="flex gap-3 items-center text-lg ps-2 rounded-xl h-10 text-nowrap overflow-hidden duration-300 hover:bg-red-500 hover:text-white text-red-600"
          onClick={handleLogout}
        >
          {" "}
          <IoIosLogOut />
          {!isOpen && "Logout"}
        </button>
      </div>
    </>
  );
};

export default ManagerSlidebar;
