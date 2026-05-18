import React, { useEffect, useState } from "react";
import RiderSlidebar from "../../components/riderDashboard/RiderSlidebar";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import RiderOverview from "../../components/riderDashboard/RiderOverview";
import RiderProfile from "../../components/riderDashboard/RiderProfile";
import RiderOrders from "../../components/riderDashboard/RiderOrders";
import RiderTransaction from "../../components/riderDashboard/RiderTransaction";

const Riderdashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("rideroverview");
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  if (role !== "partner") {
    return (
      <>
        <div className="p-3">
          <div className="border rounded shadow p-5 max-w-4xl mx-auto text-center bg-gray-100">
            <div className="text-5xl text-red-600">🚫</div>
            <div className="text-xl">
              You are not login as Rider. Please Login again.
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-[90vh]">
        <div
          className={`bg-(--color-background) duration-300 ${
            isOpen ? "lg:w-20 w-full" : "lg:w-56 w-full"
          }`}
        >
          <RiderSlidebar
            active={active}
            setActive={setActive}
            isOpen={isOpen}
            setOpen={setOpen}
          />
        </div>
        <div className="w-full lg:flex-1 duration-300">
          {active === "overview" && <RiderOverview />}
          {active === "profile" && <RiderProfile />}
          {active === "current-orders" && <RiderOrders />}
          {active === "order-history" && <RiderTransaction />}
        </div>
      </div>
    </>
  );
};

export default Riderdashboard;
