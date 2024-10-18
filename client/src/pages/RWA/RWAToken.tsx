import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing the verification icon

interface RWATokenProps {
  image?: string;
  location?: string;
  area?: string;
  price?: string;
  ownerBaseName?: string;
  verified?: boolean; // New prop to control verification
  onSale?: boolean; // New prop to control verification
}

const RWAToken: React.FC<RWATokenProps> = ({
  image,
  location,
  area,
  price,
  ownerBaseName,
  verified,
  onSale, // Destructuring the verified prop
}) => {
  return (
    <div
      className={
        `rounded-lg shadow-lg p-4 border-4 bg-zinc-950 w-full max-w-sm ` +
        (onSale ? border-teal-600 : border-red-600)
      }
    >
      {/* Image with object-fit to cover */}
      <img
        src={image}
        alt="RWA Token"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex flex-col text-white">
        {/* <h2 className="text-lg font-bold mb-1">Owner: {ownerBaseName}</h2> */}
        {/* Conditional rendering based on verified prop */}
        {verified && (
          <div className="flex items-center text-green-400">
            <FaCheckCircle className="mr-2" />
            <span className="text-sm">Verified</span>
          </div>
        )}
        <p className="text-gray-400 mt-4">Location: {location}</p>
        <p className="text-gray-400">Area: {area}</p>
        <p className="text-gray-400">Price: {price}</p>
      </div>

      {/* Buy Now Button */}
      <button className="mt-6 w-full py-2 rounded-md text-white font-bold bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all">
        Buy Now
      </button>
    </div>
  );
};

export default RWAToken;