import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import api from "../config/Api";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";

const RestaurantDisplayMenu = () => {
  const { isLogin, role } = useAuth(); //if customer not login
  const navigate = useNavigate();

  const data = useLocation().state;
  console.log("resturant menu page", data);

  const [loading, setloading] = useState(false);
  const [menuitems, setmenuitems] = useState();
  const [cart, setcart] = useState(JSON.parse(localStorage.getItem("cart"))); //store cart in local st
  const [cartflag, setcartflag] = useState([]);

  const fetchMenuItems = async () => {
    setloading(true);
    try {
      const res = await api.get(`/public/restaurant/menu/${data._id}`);
      setmenuitems(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setloading(false);
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setcart();
    setcartflag([]);
  };

  const handleAddtoCart = (NewItem) => {
    if (cart) {
      if (cart.resturantID === NewItem.resturantID) {
        setcart((prev) => ({
          ...prev,
          cartItem: [...prev.cartItem, { ...NewItem, quantity: 1 }],
          cartValue: Number(prev.cartValue) + Number(NewItem.price),
        }));
        setcartflag((prev) => [...prev, NewItem._id]);
      } else {
        toast.error("Clear the cart first");
      }
    } else {
      setcart({
        resturantID: NewItem.resturantID,
        cartItem: [{ ...NewItem, quantity: 1 }],
        cartValue: Number(NewItem.price),
      });
      setcartflag((prev) => [...prev, NewItem._id]);
    }
  };

  const handleCheckout = () => {
    isLogin && role === "customer"
      ? (localStorage.setItem("cart", JSON.stringify(cart)),
        navigate("/checkout-page"))
      : (toast.error("Please Login as Customer"), navigate("/login"));
  };

  console.log(cart);

  useEffect(() => {
    cart && localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchMenuItems();
  }, [data]);

  useEffect(() => {
    if (data.dishToAdd && menuitems) {
      const itemToAdd = menuitems.find(item => item.name === data.dishToAdd.name);
      if (itemToAdd) {
        handleAddtoCart({ ...itemToAdd, resturantID: data._id });
      }
    }
  }, [menuitems, data.dishToAdd]);

  useEffect(() => {
    if (data.dishToAdd && menuitems) {
      const itemToAdd = menuitems.find(item => item.name === data.dishToAdd.name);
      if (itemToAdd) {
        handleAddtoCart({ ...itemToAdd, resturantID: data._id });
        // Clear dishToAdd to avoid re-adding
        // Since data is from useLocation, we can't modify it, but since it's one time, it's fine
      }
    }
  }, [menuitems, data.dishToAdd]);

  return (
    <>
      <div className="max-w-7xl mx-auto p-3 rounded shadow mt-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="text-[var(--color-secondary)] font-bold text-2xl sm:text-3xl">
              {data.restaurantName || "Restaurant"}
            </div>
            <div className="text-sm text-gray-600 mt-1">{data.address}</div>
            <div className="text-sm text-gray-600">{data.city}</div>
          </div>
          <img
            src={data.photo.url}
            alt={data.restaurantName || "Restaurant"}
            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-3 rounded shadow mt-4">
        <div className="text-[var(--color-secondary)] font-bold text-2xl text-center mb-4">
          Menu
        </div>

        <div className="space-y-4">
          {menuitems &&
            menuitems.map((EachItem, idx) => (
              <div
                className="border border-gray-100 hover:shadow-lg p-4 rounded"
                key={idx}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                  <img
                    src={EachItem.images[0].url}
                    alt={EachItem.itemName}
                    className="w-full h-56 lg:w-56 lg:h-56 object-cover rounded"
                  />

                  <div className="flex flex-col justify-between w-full gap-4">
                    <div className="space-y-3">
                      <div className="text-[var(--color-primary)] text-xl font-bold">
                        {EachItem.itemName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {EachItem.description}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                        <div>
                          <span className="font-semibold">Cuisine:</span> {EachItem.cuisine}
                        </div>
                        <div>
                          <span className="font-semibold">Type:</span>{" "}
                          <span
                            className="capitalize px-2 py-1 rounded text-white"
                            style={{
                              backgroundColor:
                                EachItem.type === "veg" ? "#22c55e" : "#ef4444",
                            }}
                          >
                            {EachItem.type}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold">Serving Size:</span> {EachItem.servingSize}
                        </div>
                        <div>
                          <span className="font-semibold">Preparation Time:</span> {EachItem.preparationTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold">Availability:</span>{" "}
                          <span
                            className={`capitalize px-2 py-1 rounded ${
                              EachItem.availability === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {EachItem.availability}
                          </span>
                        </div>
                        <div className="text-[var(--color-primary)] text-2xl font-bold">
                          ₹{EachItem.price}
                        </div>
                      </div>
                      <button
                        className="w-full sm:w-auto bg-[var(--color-primary)] text-white px-6 py-2 rounded hover:bg-[var(--color-primary-hover)] transition"
                        onClick={() => handleAddtoCart(EachItem)}
                        disabled={cartflag.includes(EachItem._id)}
                      >
                        {cartflag.includes(EachItem._id) ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {cart && (
        <div className="fixed inset-x-0 bottom-5 flex items-center justify-center px-4 sm:px-6">
          <div className="bg-[var(--color-secondary)] rounded-3xl w-full max-w-3xl py-4 px-4 sm:px-6 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-white font-bold flex items-center justify-between gap-3">
                <span>Items: {cart.cartItem.length}</span>
                <button
                  className="text-white px-3 py-2 rounded hover:bg-white/30 transition disabled:bg-gray-300"
                  onClick={handleClearCart}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
              <div className="text-white font-bold flex flex-col gap-3 sm:flex-row sm:items-center">
                <span>₹ {cart.cartValue}</span>
                <button
                  className="bg-[var(--color-primary)] text-white px-6 py-2 rounded hover:bg-[var(--color-primary-hover)] transition disabled:bg-gray-300"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDisplayMenu;
