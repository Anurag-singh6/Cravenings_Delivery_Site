import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import toast from "react-hot-toast";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import api from "../config/Api";

const PromoCode = {
  NEW50: 50,
  SAVE20: 20,
  CRAVE: 10,
};

const AvailaablePaymentMethod = [
  { id: "razorPay", label: "Pay Online" },
  { id: "cod", label: "Cash on Delivery" },
];

const Checkoutpage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setcart] = useState(JSON.parse(localStorage.getItem("cart"))); //get cart details stored in local
  // console.log("cartcheck ", cart);
  const [paymentMethod, setpayementMethod] = useState("razorPay");
  const [isProcessing, setisProcessing] = useState(false);
  const [promoCode, setpromocode] = useState("");
  const [appliedpromo, setappliedpromo] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  //tax charges calculation
  const tax_rate = 0.05; //5% tax
  const delivery_charge = 50;

  useEffect(() => {
    if (!user || !cart || cart.cartItem.length === 0) {
      toast.error("Cart is empty or session expired");
      navigate("/order-now");
    }
  }, []);

  const handleQuantityChange = (itemId, change) => {
    setcart((prev) => {
      const updatedItems = prev.cartItem.map((item) => {
        if (item._id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { ...prev, cartItem: updatedItems, cartValue: newTotal };
    });
  };

  const handleRemoveItem = (itemId) => {
    setcart((prev) => {
      const itemToRemove = prev.cartItem.find((item) => item._id === itemId);
      const newTotal =
        prev.cartValue - itemToRemove.price * itemToRemove.quantity;
      const updatedItems = prev.cartItem.filter((item) => item._id !== itemId);

      if (updatedItems.length === 0) {
        toast.error("Cart is now empty..!");
        navigate("/order-now");
        return prev;
      }

      return { ...prev, cartItem: updatedItems, cartValue: newTotal };
    });
  };

  const calculatePrices = () => {
    const subtotal = cart?.cartValue || 0;
    const tax = subtotal * tax_rate;
    const total = subtotal + tax + delivery_charge;
    return { subtotal, tax, total };
  };

  const handlePromoCodeApply = () => {
    const discountpercent = PromoCode[promoCode.toUpperCase()];
    if (discountpercent) {
      const { subtotal } = calculatePrices();
      const discountamount = (subtotal * discountpercent) / 100;
      const newsubtotal = subtotal - discountamount;

      console.log("Applying promo code: ", {
        promoCode,
        discountpercent,
        discountamount,
        oldSubtotal: subtotal,
        newSubTotal: newsubtotal,
      });
      setcart((prev) => ({ ...prev, cartValue: newsubtotal }));
      toast.success(
        `Promo code applied! You saved ₹${discountamount.toFixed(2)}`
      );
      setappliedpromo(true);
    } else {
      toast.error("Invaild promo code");
    }
  };

  const GeneratePayload = (RazorpayOrderId, RazorpayPaymentID) => {
    const { subtotal, tax, total } = calculatePrices();
    return {
      restaurantId: cart.resturantID,
      userId: user._id,
      items: [...cart.cartItem],
      orderValue: {
        subtotal,
        tax,
        total,
        promoCode,
        deliveryFee: 50,
        discountPercentage: PromoCode[promoCode.toUpperCase()],
        paymentMethod: "razorPay",
        paymentStatus: "paid",
        razorpayOrderID: RazorpayOrderId,
        razorpayPaymentID: "RazorpayPaymentID",
      },
      status: "pending",
      review: {},
    };
  };

  const handleRazorpayPayment = async () => {
    const { total } = calculatePrices();
    try {
      const keyRes = await api.get("/payment/getRazorpayKey");
      const key = keyRes.data.key;

      const orderRes = await api.post("/payment/createOrder", {
        amount: total,
      });

      const orderdata = orderRes.data.data;

      console.log(orderdata);

      //inbuilt razorpay

      const option = {
        key,
        amount: String(orderdata.amount),
        currency: orderdata.currency,
        name: "Cravings", //your business name
        description: "Test Transaction",
        image: "https://placehold.co/600x400?text=CG",
        order_id: orderdata.id, //this is sample order id. pass the `id` obtained in the response of step 1
        //callback_url: `${import.meta.env.VITE_FE_URL}/paymentSuccess`,
        //this run on payment success
        handler: async (response) => {
          try {
            console.log(response);

            const VerifyPaymentPayload = {
              paymentID: response.razorpay_payment_id,
              orderID: response.razorpay_order_id,
              signature: response.razorpay_signature,
            };

            console.log(VerifyPaymentPayload);
            const res = await api.post(
              "/payment/verifyPayment",
              VerifyPaymentPayload
            );

            //placeorder
            const payload = GeneratePayload(
              response.razorpay_order_id,
              response.razorpay_payment_id
            );

            const OrderRes = await api.post("/user/placeorder", payload);
            navigate("/paymentSuccess", { state: OrderRes.data.data });
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Unknown Error");
          } finally {
            setisProcessing(false);
          }
        },
        //this run on closing the razor pay modal
        modal: {
          ondismiss: ()=>{
            toast.error("Please Complete your Payment to Proceed");
            setisProcessing(false);
          },
        },
        prefill: {
          name: user.fullname, //customer name
          email: user.email,
          contact: user.mobileno, //customer phone number
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F16D34",
        },
      };
      console.log(option);
      

      const razorpay = new window.Razorpay(option);
      razorpay.open();

      razorpay.on("payment.failed", (response)=> {
        console.log("Payment Failed");
        toast.error("Payment Failed");
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !cart) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    setisProcessing(true);
    console.log("Lets Start Payment");

    if (paymentMethod === "razorPay") {
      console.log("Calling Razorpay");

      handleRazorpayPayment();
    }
  };

  //   const payload = GeneratePayload();
  //   console.log(payload);

  //   try {
  //     //payement gateway
  //     const res = await api.post("/user/placeorder", payload);
  //     toast.success(res.data.message);
  //     localStorage.removeItem("cart");
  //     navigate("/userdashboard", { state: { tab: "orders" } });
  //   } catch (error) {
  //     console.error("Order placement error: ", error);
  //     toast.error(error?.response?.data?.message || "Failed to place order");
  //   } finally {
  //     setisProcessing(false);
  //   }
  // };

  if (!user || !cart) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const { subtotal, tax, total } = calculatePrices();
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <h1
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Order Checkout
            </h1>
            <p className="text-gray-600 mt-2">
              Review your order and complete the payment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* left section - order items */}
            <div className="lg:col-span-2">
              {/*order item card */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-6"
                  style={{ color: "var(--color-primary)" }}
                >
                  Order Summary
                </h2>
                {/*items list */}
                <div className="space-y-4">
                  {cart.cartItem && cart.cartItem.length > 0 ? (
                    cart.cartItem.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-4 sm:flex-row border-b pb-4 hover:bg-gray-50 p-3 rounded transition"
                      >
                        {/*item image */}
                        <div className="shrink-0 w-full sm:w-auto">
                          <img
                            src={item.images?.[0]?.url || "🍳"}
                            alt={item.itemName}
                            className="w-full h-56 sm:w-24 sm:h-24 object-cover rounded-lg"
                          />
                        </div>

                        {/*item details */}
                        <div className="flex-1">
                          <h3
                            className="text-lg font-bold"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {item.itemName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.cuisine} • {item.type}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {item.servingSize}
                            </span>
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              {item.preparationTime}
                            </span>
                          </div>
                          <div className="text-lg font-semibold text-green-600 mt-2">
                            ₹{item.price}
                          </div>
                        </div>

                        {/*quantity controls */}
                        <div className="flex flex-col items-end justify-between w-full sm:w-auto">
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-red-500 hover:text-red-700 transition p-2"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>

                          <div
                            className="flex items-center border rounded-lg overflow-hidden"
                            style={{ borderColor: "var(--color-secondary)" }}
                          >
                            <button
                              onClick={() => handleQuantityChange(item._id, -1)}
                              className="p-2 hover:bg-gray-100 transition"
                              style={{
                                backgroundColor:
                                  item.quantity === 1 ? "#f3f4f6" : "white",
                              }}
                              disabled={item.quantity === 1}
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="px-4 font-bold text-lg w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item._id, 1)}
                              className="p-2 hover:bg-gray-100 transition"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>

                          {/*item total */}
                          <div className="text-right mt-2">
                            <p className="text-sm text-gray-600">Subtotal</p>
                            <p
                              className="text-lg font-bold"
                              style={{ color: "var(--color-secondary)" }}
                            >
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 text-lg">
                        Your cart is empty
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/*delivery address card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: "var(--color-primary)" }}
                >
                  Delivery Address
                </h2>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p
                    className="font-bold text-lg"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {user.fullname}
                  </p>
                  <p className="text-gray-700 mt-2">{user.address}</p>
                  <p className="text-gray-700">
                    {user.city}, {user.pin}
                  </p>
                  <p className="text-gray-700 mt-2">📞 {user.mobileno}</p>
                </div>

                <button
                  onClick={() =>
                    navigate("/userdashboard", { state: { tab: "profile" } })
                  }
                  className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold transition"
                >
                  ✎ Edit Address
                </button>
              </div>
            </div>

            {/*right section price summaery and payment */}
            <div className="lg:col-span-1">
              {/*price summary */}
              <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-8">
                <h2
                  className="text-xl sm:text-2xl font-bold mb-6"
                  style={{ color: "var(--color-primary)" }}
                >
                  Price Details
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tax (5%)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Delivery Charge</span>
                    <span className="font-semibold">
                      ₹{delivery_charge.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t pt-4 flex justify-between">
                    <span
                      className="text-lg font-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Total Amount
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/*promo code section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3
                    className="font-bold mb-3"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Promo Code
                  </h3>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      name="promo"
                      value={promoCode}
                      onChange={(e) => setpromocode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none disabled:bg-gray-100"
                      style={{ borderColor: "var(--color-secondary)" }}
                      disabled={appliedpromo}
                    />
                    <button
                      style={{ backgroundColor: "var(--color-secondary)" }}
                      className="text-white px-4 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
                      onClick={handlePromoCodeApply}
                      disabled={appliedpromo}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/*payement method selection */}
                <div className="mb-6 border-t pt-6">
                  <h3
                    className="font-bold mb-4"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Payment Method
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="razorPay"
                        checked={paymentMethod === "razorPay"}
                        onChange={(e) => setpayementMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-gray-700">{"Pay Online"}</span>
                    </label>
                    {/* {total < 1000 && (
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={(e) => setpayementMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 text-gray-700">
                          {"Cash on Delivery"}
                        </span>
                      </label>
                    )} */}
                  </div>
                </div>

                {/*place order button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  style={{ backgroundColor: "var(--color-secondary)" }}
                  className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>

                {/*continue shopping link */}
                <button
                  onClick={() => navigate(-1)}
                  className="w-full mt-3 text-blue-600 font-semibold py-2 rounded-lg hover:text-blue-800 transition"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkoutpage;
