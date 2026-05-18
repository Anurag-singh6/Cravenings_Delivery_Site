import React, { useEffect, useState } from "react";
import Addmenu from "../resturantDashboard/managerModols/modals/Addmenu";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { IoIosEye } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import EditItemModal from "./managerModols/modals/EditItemModal";
import ViewItemModal from "./managerModols/modals/ViewItemModal";

const Menuitems = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [menuItems, setMenuItems] = useState();

  const fetchMenuItem = async () => {
    try {
      const res = await api.get("/restaurant/menuItem");
      toast.success(res.data.message);
      setMenuItems(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add menu item");
    }
  };

  useEffect(() => {
    if (!isAddItemModalOpen && !isEditItemModalOpen) fetchMenuItem();
  }, [isAddItemModalOpen, isEditItemModalOpen]);
  return (
    <>
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 h-full overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 border border-gray-200 ">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              Menu Management
            </h2>
            <button
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-(--color-secondary) text-white rounded-lg hover:bg-(--color-secondary-hover) transition font-semibold text-sm sm:text-base"
              onClick={() => setIsAddItemModalOpen(true)}
            >
              Add Item
            </button>
          </div>
          <div className="border mt-3"></div>
          <div className="overflow-x-auto mt-3">
          <table className="w-full">
            <thead>
              <tr className="grid grid-cols-6 sm:grid-cols-8 text-xs sm:text-sm md:text-base bg-(--color-secondary) text-white">
                <th className="font-semibold px-1 sm:px-2 py-2">S.no</th>
                <th className="font-semibold col-span-2 px-1 sm:px-2 py-2">Item Name</th>
                <th className="font-semibold px-1 sm:px-2 py-2">Price</th>
                <th className="font-semibold hidden sm:table-cell px-1 sm:px-2 py-2">Type</th>
                <th className="font-semibold hidden md:table-cell px-1 sm:px-2 py-2">Cuisine</th>
                <th className="font-semibold px-1 sm:px-2 py-2">Avail</th>
                <th className="font-semibold px-1 sm:px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {menuItems &&
                menuItems.map((items, idx) => (
                  <tr
                    className="grid grid-cols-6 sm:grid-cols-8 text-center py-2 border-b border-gray-300 text-xs sm:text-sm md:text-base"
                    key={idx}
                  >
                    <td className="px-1 sm:px-2">{idx + 1}</td>
                    <td className="col-span-2 px-1 sm:px-2 truncate">{items.itemName}</td>
                    <td className="px-1 sm:px-2">₹{items.price}</td>
                    <td className="hidden sm:table-cell px-1 sm:px-2">{items.type.toUpperCase()}</td>
                    <td className="hidden md:table-cell px-1 sm:px-2">{items.cuisine}</td>
                    <td className="flex justify-center items-center text-lg sm:text-xl md:text-2xl px-1 sm:px-2">
                      {items.availability === "available" ? (
                        <FaToggleOn className="text-green-500" />
                      ) : items.availability === "unavailable" ? (
                        <FaToggleOff className="text-red-500" />
                      ) : (
                        <ImBlocked
                          className="font-bold text-black"
                          title="Removed from Menu"
                        />
                      )}
                    </td>
                    <td className="flex gap-1 sm:gap-2 justify-center px-1 sm:px-2">
                      <button
                        className="text-gray-500 p-1 sm:p-2 rounded-lg bg-gray-200 shadow hover:shadow-md transition text-sm sm:text-base"
                        onClick={() => {
                          setSelectedItem(items);
                          setIsViewItemModalOpen(true);
                        }}
                      >
                        <IoIosEye />
                      </button>
                      <button
                        className="text-blue-500 p-1 sm:p-2 rounded-lg bg-gray-200 shadow hover:shadow-md transition text-sm sm:text-base"
                        onClick={() => {
                          setSelectedItem(items);
                          setIsEditItemModalOpen(true);
                        }}
                      >
                        <MdEditSquare />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {isAddItemModalOpen && (
        <Addmenu onclose={() => setIsAddItemModalOpen(false)} />
      )}
      {isViewItemModalOpen && (
        <ViewItemModal
          onclose={() => setIsViewItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
      {isEditItemModalOpen && (
        <EditItemModal
          onclose={() => setIsEditItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
};

export default Menuitems;
