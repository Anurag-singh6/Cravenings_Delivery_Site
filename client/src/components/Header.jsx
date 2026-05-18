import React, { useState } from "react";
import Transparent from "../assets/transparent.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Header = () => {
  const { user, isLogin, role, setRole } = useAuth();
  const nevigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = () => {
    switch (role) {
      case "manager": {
        setRole("manager");
        nevigate("/resturant-dashboard");
        break;
      }
      case "partner": {
        setRole("partner");
        nevigate("/rider-dashboard");
        break;
      }
      case "customer": {
        setRole("customer");
        nevigate("/userdashboard");
        break;
      }
      case "admin": {
        setRole("admin");
        nevigate("/admin-dashboard");
        break;
      }
      default:
        break;
    }
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bg-(--color-primary) shadow-xl px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 sticky top-0 z-50 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="flex-shrink-0">
          <img src={Transparent} alt="Cravings Logo" className="h-10 sm:h-12 md:h-14 w-16 sm:w-20 md:w-24 object-cover" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <Link
            to={"/"}
            className="text-decoration-none font-bold text-white text-sm md:text-base lg:text-lg hover:text-(--color-background) transition duration-300"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="text-decoration-none font-bold text-white text-sm md:text-base lg:text-lg hover:text-(--color-background) transition duration-300"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="text-decoration-none font-bold text-white text-sm md:text-base lg:text-lg hover:text-(--color-background) transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {isLogin ? (
            <div
              className="text-yellow-300 font-bold text-sm md:text-base lg:text-lg hover:text-(--color-secondary-hover) cursor-pointer transition duration-300"
              onClick={handleNavigate}
            >
              {user.fullname}
            </div>
          ) : (
            <>
              <button
                className="bg-(--color-secondary) cursor-pointer text-white py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 lg:px-6 font-bold text-xs sm:text-sm md:text-base hover:bg-(--color-secondary-hover) hover:text-(--color-accent) rounded transition duration-300"
                onClick={() => nevigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-(--color-secondary) cursor-pointer text-white py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 lg:px-6 font-bold text-xs sm:text-sm md:text-base hover:bg-(--color-secondary-hover) hover:text-(--color-accent) rounded transition duration-300"
                onClick={() => nevigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMenuClick}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`bg-white h-1 w-6 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-3" : ""}`}></span>
          <span className={`bg-white h-1 w-6 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`bg-white h-1 w-6 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-(--color-primary) shadow-lg px-4 sm:px-6 py-4 sm:py-6 space-y-3">
          {/* Mobile Navigation Links */}
          <Link
            to={"/"}
            onClick={closeMenu}
            className="text-decoration-none font-bold text-white text-base sm:text-lg hover:text-(--color-background) transition duration-300 block py-2"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            onClick={closeMenu}
            className="text-decoration-none font-bold text-white text-base sm:text-lg hover:text-(--color-background) transition duration-300 block py-2"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            onClick={closeMenu}
            className="text-decoration-none font-bold text-white text-base sm:text-lg hover:text-(--color-background) transition duration-300 block py-2"
          >
            Contact
          </Link>

          {/* Mobile Auth Section */}
          <div className="border-t border-gray-600 pt-3 mt-3 space-y-2">
            {isLogin ? (
              <div
                className="text-yellow-300 font-bold text-base sm:text-lg hover:text-(--color-secondary-hover) cursor-pointer transition duration-300 py-2"
                onClick={() => {
                  handleNavigate();
                  closeMenu();
                }}
              >
                {user.fullname}
              </div>
            ) : (
              <>
                <button
                  className="w-full bg-(--color-secondary) cursor-pointer text-white py-2 sm:py-2.5 px-4 font-bold text-sm sm:text-base hover:bg-(--color-secondary-hover) hover:text-(--color-accent) rounded transition duration-300"
                  onClick={() => {
                    nevigate("/login");
                    closeMenu();
                  }}
                >
                  Login
                </button>
                <button
                  className="w-full bg-(--color-secondary) cursor-pointer text-white py-2 sm:py-2.5 px-4 font-bold text-sm sm:text-base hover:bg-(--color-secondary-hover) hover:text-(--color-accent) rounded transition duration-300"
                  onClick={() => {
                    nevigate("/register");
                    closeMenu();
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
