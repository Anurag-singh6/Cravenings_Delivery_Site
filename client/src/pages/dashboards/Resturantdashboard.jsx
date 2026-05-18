import React, { useEffect, useState } from "react";
import ManagerSlidebar from "../../components/resturantDashboard/ManagerSlidebar";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import Resturantoverview from "../../components/resturantDashboard/Resturantoverview";
import Managerprofile from "../../components/resturantDashboard/Managerprofile";
import Menuitems from "../../components/resturantDashboard/Menuitems";
import Managertransaction from "../../components/resturantDashboard/Managertransaction";
import Managerhelpdesk from "../../components/resturantDashboard/Managerhelpdesk";
import Resturantorders from "../../components/resturantDashboard/Resturantorders";

const Resturantdashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("restoverview");
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  if (role !== "manager") {
    return (
      <>
        {" "}
        <div className="p-3">
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
            <div className="text-5xl text-red-600">🚫</div>
            <div className="text-xl">
              You are not login as Manager. Please Login again.
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex w-full h-[90vh]">
        <div
          className={`bg-(--color-background) duration-300 ${
            isOpen ? "w-2/30" : "w-12/60"
          }`}
        >
          <ManagerSlidebar
            active={active}
            setActive={setActive}
            isOpen={isOpen}
            setOpen={setOpen}
          />
        </div>
        <div className={`${isOpen ? "w-58/60" : "w-48/60"} duration-300`}>
          {active === "resturantoverview" && <Resturantoverview />}
          {active === "managerprofile" && <Managerprofile />}
          {active === "menuitems" && <Menuitems />}
          {active === "orders" && <Resturantorders />}
          {active === "managertransaction" && <Managertransaction />}
          {active === "managerhelpdesk" && <Managerhelpdesk />}
        </div>
      </div>
    </>
  );
};

export default Resturantdashboard;
