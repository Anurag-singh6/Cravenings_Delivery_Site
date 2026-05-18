import React from "react";
import Header from "./components/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./pages/dashboards/Userdashboard.jsx";
import Riderdashboard from "./pages/dashboards/Riderdashboard.jsx";
import Resturantdashboard from "./pages/dashboards/Resturantdashboard.jsx";
import Admindashboard from "./pages/dashboards/Admindashboard.jsx";
import OrderNow from "./pages/OrderNow.jsx";
import RestaurantDisplayMenu from "./pages/RestaurantDisplayMenu.jsx";
import Notfound from "./pages/Notfound.jsx";
import Checkoutpage from "./pages/Checkoutpage.jsx";
import PaymentSuccessPage from "./pages/PaymentSuccessPage.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/rider-dashboard" element={<Riderdashboard />} />
          <Route path="/resturant-dashboard" element={<Resturantdashboard />} />
          <Route path="/admin-dashboard" element={<Admindashboard />} />
          <Route path="/order-now" element={<OrderNow />} />
          <Route path="/restaurantMenu" element={<RestaurantDisplayMenu />} />
          <Route path="/checkout-page" element={<Checkoutpage />} />
          <Route path="/paymentSuccess" element={<PaymentSuccessPage />} />

          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
