import React, { useState, useEffect } from "react";
import pizza from "../assets/pizza.png";
import { useNavigate } from "react-router-dom";
import spiceking from "../assets/spiceking.png";
import pizzaparadice from "../assets/pizzapradice.png";
import dragon from "../assets/dragon.png";
import burgerhaven from "../assets/burgerhaven.png";
import Butterchicken from "../assets/dishes/Butterchicken.jpg";
import mapizza from "../assets/dishes/mpizza.jpg";
import hakanodels from "../assets/dishes/noodles.jpg";
import burger from "../assets/dishes/burger.jpg";
import tanchicken from "../assets/dishes/tanchicken.jpg";
import garlic from "../assets/dishes/gbread.jpg";
import fastd from "../assets/gif/fastd.gif";
import pay from "../assets/gif/pay.gif";
import quality from "../assets/gif/quality.gif";
import support from "../assets/gif/support.gif";
import api from "../config/Api";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurants(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const getRestaurantByName = (name) => {
    return restaurants.find((rest) => rest.name === name);
  };

  const handleAddToCart = (dish) => {
    const restaurant = getRestaurantByName(dish.restaurant);
    if (!restaurant) {
      toast.error("Restaurant not found");
      return;
    }

    // Navigate to restaurant menu with dish to add
    navigate("/restaurantMenu", { state: { ...restaurant, dishToAdd: dish } });
  };

  const featuredRestaurants = [
    {
      id: 1,
      name: "Spice Kingdom",
      rating: 4.5,
      deliveryTime: "30-40 mins",
      image: <img src={spiceking} alt="Spice Kingdom" className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 object-cover rounded-full" />,
    },
    {
      id: 2,
      name: "Pizza Paradise",
      cuisine: "Italian",
      rating: 4.3,
      deliveryTime: "25-35 mins",
      image: <img src={pizzaparadice} alt="pizza paradise" className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 object-cover rounded-full" />,
    },
    {
      id: 3,
      name: "Dragon Wok",
      cuisine: "Chinese",
      rating: 4.6,
      deliveryTime: "35-45 mins",
      image: <img src={dragon} alt="Chinese dragon" className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 object-cover rounded-full" />,
    },
    {
      id: 4,
      name: "Burger Haven",
      cuisine: "American",
      rating: 4.4,
      deliveryTime: "20-30 mins",
      image: <img src={burgerhaven} alt="burger heaven" className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 object-cover rounded-full" />,
    },
  ];

  const popularDishes = [
    {
      id: 1,
      name: "Butter Chicken",
      restaurant: "Spice Kingdom",
      price: 299,
      rating: 4.7,
      image: <img src={Butterchicken} alt="butter chicken" className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover" />,
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Pizza Paradise",
      price: 349,
      rating: 4.5,
      image: <img src={mapizza} alt="pizza" className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover" />,
    },
    {
      id: 3,
      name: "Hakka Noodles",
      restaurant: "Dragon Wok",
      price: 249,
      rating: 4.6,
      image: <img src={hakanodels} alt="hakka noodles" className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover" />,
    },
    {
      id: 4,
      name: "Classic Burger",
      restaurant: "Burger Haven",
      price: 199,
      rating: 4.4,
      image: <img src={burger} alt="burger" className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover" />,
    },
    {
      id: 5,
      name: "Tandoori Chicken",
      restaurant: "Spice Kingdom",
      price: 279,
      rating: 4.8,
      image: <img src={tanchicken} alt="tandoori chicken" className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover" />,
    },
    {
      id: 6,
      name: "Garlic Bread",
      restaurant: "Pizza Paradise",
      price: 99,
      rating: 4.3,
      image: <img src={garlic} alt="garlic bread" className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover" />,
    },
  ];

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE] py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* left content */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Order Your{" "}
                <span className="text-red-500 block sm:inline">Favorite Food 😋</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 md:text-gray-50">
                Discover delicious meals from the best restaurants in your area.
                Fast delivery, great quality, amazing taste!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <button
                  onClick={() => navigate("/order-now")}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition duration-300 transform hover:scale-105 cursor-pointer text-sm sm:text-base whitespace-nowrap"
                >
                  Order Now
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300 border-2 border-white cursor-pointer text-sm sm:text-base whitespace-nowrap"
                >
                  Contact Us
                </button>
              </div>

              {/* stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8">
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">500+</p>
                  <p className="text-xs sm:text-sm md:text-base">Restaurants</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">50K+</p>
                  <p className="text-xs sm:text-sm md:text-base">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">24/7</p>
                  <p className="text-xs sm:text-sm md:text-base">Support</p>
                </div>
              </div>
            </div>

            {/* right visual */}
            <div className="flex justify-center items-center order-1 md:order-2 mb-6 md:mb-0">
              <img 
                src={pizza} 
                alt="pizza hero" 
                className="w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 object-contain animate-pulse"
              />
            </div>
          </div>
        </div>
      </section>

      {/* featured restaurants section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              Featured Restaurants
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Explore our top-rated restaurants
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {featuredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              >
                <div className="h-28 sm:h-32 md:h-40 lg:h-48 bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                  {restaurant.image}
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-1 truncate">
                    {restaurant.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 truncate">
                    {restaurant.cuisine}
                  </p>
                  <div className="flex justify-between items-center text-xs sm:text-sm gap-1">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span className="font-semibold">
                        {restaurant.rating}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">
                      {restaurant.deliveryTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              Popular Dishes
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Most loved meals by our customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {popularDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="h-36 sm:h-44 md:h-52 lg:h-64 bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center overflow-hidden">
                  {dish.image}
                </div>
                <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-1 line-clamp-2">
                    {dish.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 truncate">
                    {dish.restaurant}
                  </p>
                  <div className="flex flex-col gap-2 mb-3 md:mb-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-500">
                        ₹{dish.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span className="text-xs sm:text-sm md:text-base font-semibold">
                          {dish.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(dish)}
                    className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-300 font-medium text-xs sm:text-sm md:text-base lg:text-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why choose us section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              Why Choose Cravings?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                icon: <img src={fastd} alt="Fast Delivery" className="w-14 sm:w-18 md:w-22 lg:w-28 h-14 sm:h-18 md:h-22 lg:h-28 object-contain mx-auto" />,
                title: "Fast Delivery",
                description: "Get your food delivered in minutes",
              },
              {
                icon: <img src={pay} alt="Safe Payment" className="w-14 sm:w-18 md:w-22 lg:w-28 h-14 sm:h-18 md:h-22 lg:h-28 object-contain mx-auto" />,
                title: "Safe Payment",
                description: "Secure and encrypted transactions",
              },
              {
                icon: <img src={quality} alt="Quality Assured" className="w-14 sm:w-18 md:w-22 lg:w-28 h-14 sm:h-18 md:h-22 lg:h-28 object-contain mx-auto" />,
                title: "Quality Assured",
                description: "Only verified restaurants and vendors",
              },
              {
                icon: <img src={support} alt="24/7 Support" className="w-14 sm:w-18 md:w-22 lg:w-28 h-14 sm:h-18 md:h-22 lg:h-28 object-contain mx-auto" />,
                title: "24/7 Support",
                description: "We're always here to help you",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg shadow-md text-center"
              >
                <div className="mb-3 sm:mb-4 md:mb-5">{feature.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5">
            Ready to Order?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-50 mb-6 sm:mb-8 md:mb-10">
            Join thousands of satisfied customers and enjoy delicious food
            delivered to your doorstep
          </p>
          <button
            onClick={() => navigate("/order-now")}
            className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition duration-300 transform hover:scale-105 text-sm sm:text-base md:text-lg lg:text-xl"
          >
            Order Now
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;