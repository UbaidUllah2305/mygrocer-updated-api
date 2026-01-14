import React from "react";
import { Link } from "@inertiajs/react";

const FavouritesEmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <img
          src="/assets/Assets/Customer/favourites/no-favourites.svg"
          alt="No favourites saved"
          className="w-64 mx-auto"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">No Favourites Saved</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
        You'll see all your favorites here, to make ordering even faster. Just look for the heart icon while browsing!
      </p>
      <Link
        href="/customer/dashboard"
        className="inline-block bg-[#6F9C3D] hover:bg-[#5d8a32] text-white px-6 py-2 rounded-lg font-medium transition"
      >
        Let's find some favorite items
      </Link>
    </div>
  );
};

export default FavouritesEmptyState;