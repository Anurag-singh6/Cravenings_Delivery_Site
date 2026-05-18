import React from "react";

const ViewItemModal = ({ onclose, selectedItem }) => {
  if (!selectedItem) {
    return null;
  }
  const images = selectedItem.images || [].slice(0, 5);

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between px-4 sm:px-6 py-4 border-b border-gray-300 items-center sticky top-0 bg-white z-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 break-words">
              {selectedItem.itemName}
            </h2>

            <button
              onClick={onclose}
              className="text-gray-600 hover:text-red-600 text-xl sm:text-2xl transition ml-3"
            >
              ⊗
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-600">
                  Images
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {images.slice(0, 5).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center"
                    >
                      <img
                        src={image.url}
                        alt={`${selectedItem.itemName} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Item Name
                </label>

                <p className="text-gray-800 font-medium break-words">
                  {selectedItem.itemName}
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Price
                </label>

                <p className="text-base sm:text-lg font-bold text-orange-600">
                  ₹{parseFloat(selectedItem.price).toFixed(2)}
                </p>
              </div>

              {/* Cuisine */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Cuisine
                </label>

                <p className="text-gray-800 capitalize">
                  {selectedItem.cuisine}
                </p>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Type
                </label>

                <p
                  className={`font-medium capitalize ${
                    selectedItem.type === "veg"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedItem.type}
                </p>
              </div>

              {/* Serving Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Serving Size
                </label>

                <p className="text-gray-800">
                  {selectedItem.servingSize} Persons
                </p>
              </div>

              {/* Preparation Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Preparation Time
                </label>

                <p className="text-gray-800">
                  {selectedItem.preparationTime} mins
                </p>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Availability
                </label>

                <p
                  className={`font-medium capitalize ${
                    selectedItem.availability === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedItem.availability}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Description
              </label>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed bg-gray-50 p-3 rounded break-words">
                {selectedItem.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="text-xs sm:text-sm text-gray-500 space-y-1 pt-4 border-t border-gray-200">
              <p>
                Created: {new Date(selectedItem.createdAt).toLocaleDateString()}
              </p>

              <p>
                Last Updated:{" "}
                {new Date(selectedItem.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewItemModal;
