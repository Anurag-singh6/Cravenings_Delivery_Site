import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/Api";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const OrderNow = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [restaurant, setresturant] = useState();

  const fetchAllRestaurants = async () => {
    setloading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      setresturant(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const handleResturantClick = (resturantinfo) => {
    console.log("resturant clicked");
    navigate("/restaurantMenu", { state: resturantinfo });
  };

  if (loading) {
    return (
      <div className="h-[80vh]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-screen-2xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {restaurant &&
            restaurant.map((EacResturant, idx) => (
              <div
                className="h-full border border-gray-200 rounded-xl p-4 bg-white group cursor-pointer transition-shadow duration-200 hover:shadow-xl"
                key={idx}
                onClick={() => handleResturantClick(EacResturant)}
              >
                <img
                  src={EacResturant.photo.url}
                  alt={EacResturant.restaurantName}
                  className="w-full h-48 sm:h-52 object-cover rounded-xl mb-4"
                />
                <div className="space-y-2">
                  <div className="text-xl sm:text-2xl font-semibold text-[var(--color-secondary)]">
                    {EacResturant.restaurantName}
                  </div>
                  <div className="text-sm text-gray-600">{EacResturant.cuisine}</div>
                  <div className="text-sm text-gray-600 break-words">
                    {EacResturant.address}, {EacResturant.city}
                  </div>
                  <div className="text-sm text-gray-600">PIN: {EacResturant.pin}</div>
                  <div className="text-sm text-gray-600">{EacResturant.mobileno}</div>
                  <div className="flex items-center justify-between text-[var(--color-secondary)] gap-2 pt-3 border-t border-gray-200 mt-3">
                    <span className="font-semibold">Explore Menu</span>
                    <FaRegArrowAltCircleRight className="text-lg" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default OrderNow;
