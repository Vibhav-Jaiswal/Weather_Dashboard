import React from "react";

const FavrateList = ({ favorites, selectFavorite, removeFavorite }) => {
  return (
    <div className="max-w-4xl mx-auto pt-12">
      <h1 className="text-3xl text-gray-800 text-center font-bold mb-6">
        Favorite List
      </h1>
      <ul className="text-center">
        {favorites.map((fav) => (
          <li
            key={fav.id}
            className="flex justify-between items-center p-2 border-b mt-6"
          >
            <span
              className="cursor-pointer text-xl font-semibold text-gray-800"
              onClick={() => selectFavorite(fav.name)}
            >
              {fav.name}
            </span>
            <button
              className="text-md glassCard px-4 sm:px-12 py-2 hover:scale-105 font-medium text-red-600"
              onClick={() => removeFavorite(fav.id, fav.name)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavrateList;
