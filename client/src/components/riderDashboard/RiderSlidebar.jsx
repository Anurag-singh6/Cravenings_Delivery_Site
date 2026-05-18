import React from "react";
import { TbChartTreemap } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { TiShoppingCart } from "react-icons/ti";
import { FaHistory } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

const RiderSlidebar = ({ active, setActive, isOpen, setOpen }) => {
  const { setUser, setLogin } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { key: "overview", title: "Overview", icon: <TbChartTreemap /> },
    { key: "profile", title: "Profile", icon: <ImProfile /> },
    { key: "current-orders", title: "Current Orders", icon: <TiShoppingCart /> },
    { key: "order-history", title: "Order History", icon: <FaHistory /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setLogin(false);
      navigate("/");
      sessionStorage.removeItem("CravingUser");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  return (
    <>
      <div className="p-2 text-white flex h-full flex-col justify-between">
        <div>
          <div className="h-10 text-xl font-bold flex items-center gap-3 mb-3">
            <button
              className="p-2 rounded-md hover:bg-white/10 transition"
              onClick={() => setOpen(!isOpen)}
              aria-label="Toggle sidebar"
            >
              <GiHamburgerMenu />
            </button>
            {!isOpen && (
              <span className="truncate text-sm">Rider Dashboard</span>
            )}
          </div>
          <hr />

          <div className="py-6 space-y-3 w-full text-sm">
            {menuItems.map((item, idx) => (
              <button
                className={`w-full text-left flex gap-3 items-center px-2 py-2 rounded-xl transition ${
                  active === item.key
                    ? "bg-(--color-secondary) text-white"
                    : "hover:bg-gray-100/70 text-gray-900"
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
            className="w-full flex gap-3 items-center text-sm ps-2 rounded-xl h-10 text-nowrap overflow-hidden duration-300 hover:bg-red-500 text-white font-bold"
            onClick={handleLogout}
          >
            <MdLogout />
            {!isOpen && "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default RiderSlidebar;
