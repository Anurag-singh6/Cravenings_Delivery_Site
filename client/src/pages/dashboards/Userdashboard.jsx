import React, { useEffect, useState } from "react";
import Sildebar from "../../components/userDashboard/Sildebar";
import Useroverview from "../../components/userDashboard/Useroverview";
import Profile from "../../components/userDashboard/Profile";
import Orders from "../../components/userDashboard/Orders";
import Transaction from "../../components/userDashboard/Transaction";
import { useAuth } from "../../context/Authcontext";
import { useLocation, useNavigate } from "react-router-dom";

const Userdashboard = () => {
  const { role, isLogin } = useAuth();
  //const ActiveTab = useLocation().state.tab;
  const navigate = useNavigate();
  const [active, setActive] = useState(/*ActiveTab || */"overview");
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  if (role !== "customer") {
    return (
      <>
        <div className="p-3">
          <div className="border rounded shadow p-5 max-w-4xl mx-auto text-center bg-gray-100">
            <div className="text-5xl text-red-600">🚫</div>
            <div className="text-xl">
              You are not login as Customer. Please Login again.
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-[90vh] z-30">
        <div
          className={`bg-(--color-background) duration-300 ${
            isOpen ? "lg:w-20 w-full" : "lg:w-56 w-full"
          }`}
        >
          <Sildebar
            active={active}
            setActive={setActive}
            isOpen={isOpen}
            setOpen={setOpen}
          />
        </div>
        <div className="w-full lg:flex-1 duration-300">
          {active === "overview" && <Useroverview />}
          {active === "profile" && <Profile />}
          {active === "orders" && <Orders />}
          {active === "transaction" && <Transaction />}
        </div>
      </div>
    </>
  );
};

export default Userdashboard;
