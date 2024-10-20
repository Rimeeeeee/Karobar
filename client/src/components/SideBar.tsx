import React, { useState, useEffect } from "react";
import { MdHealthAndSafety } from "react-icons/md";
import {
  FaHome,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserPlus,
  FaBuilding,
  FaUsers,
  FaCalendarCheck,
} from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { useActiveAccount } from "thirdweb/react";
//import Abc from "./Basename";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const address =useActiveAccount()?.address;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sliceUserId = (userId: string) => {
    if (userId.length > 11) {
      return `${userId.slice(0, 9)}...${userId.slice(-2)}`;
    }
    return userId;
  };

  return (
    <div
      className={`fixed h-screen ${isOpen ? "sm:w-64 w-56" : "w-0"} bg-zinc-950 text-white gap-3 flex flex-col transition-all duration-300 z-50`}
    >
      <div className="flex flex-col mr-12">
        {/* Header with profile */}
        <div
          className={`p-1 text-lg font-semibold flex flex-col items-center ${!isOpen && "hidden"}`}
        >
            <NavLink
              to={`/profile/${address}`}
              className="flex items-center space-x-2 mt-8"
            >
             {/*<Abc/>*/}
            </NavLink>
        
          
          <button
            onClick={toggleSidebar}
            className="text-4xl mt-7 ml-1 absolute top-4 right-4"
          >
            <FaTimes />
          </button>
        </div>
        {/* Navigation links */}
        <div
          className={`flex flex-col space-y-2 md:space-y-3 text-base md:text-lg gap-2 p-4 ${!isOpen && "hidden"}`}
        >
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 p-2 text-blue-500"
                : "flex items-center space-x-2 p-2 hover:text-blue-500"
            }
          >
            <FaUserPlus className="md:text-xl text-lg" />
            <span>Register</span>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 p-2 text-blue-500"
                : "flex items-center space-x-2 p-2 hover:text-blue-500"
            }
          >
            <FaHome className="text-xl" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/dailylogin"
            className={({ isActive }) =>
              isActive
                ? "flex group items-center space-x-2 p-2 bg-blue-500 rounded-md"
                : "flex items-center space-x-2 p-2 hover:bg-blue-500 rounded-md"
            }
          >
            <FaCalendarCheck className="text-xl group-hover:text-white" />
            <span className="group-hover:text-white">Daily Check-in</span>
          </NavLink>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 p-2 bg-blue-500 rounded-md"
                : "flex items-center space-x-2 p-2 hover:bg-blue-500 rounded-md"
            }
          >
            <FaUsers className="text-xl" />
            <span>People</span>
          </NavLink>
          <NavLink
            to="/swap"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 p-2 text-blue-500"
                : "flex items-center space-x-2 p-2 hover:text-blue-500"
            }
          >
            <MdSwapHorizontalCircle className="text-xl" />
            <span>Swap Tokens</span>
          </NavLink>
          <NavLink
            to="/insurance"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 p-2 text-blue-500"
                : "flex items-center space-x-2 p-2 hover:text-blue-500"
            }
          >
            <MdHealthAndSafety className="text-xl" />
            <span>Insurance</span>
          </NavLink>
          <NavLink
            to="/rwa"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 p-2 text-blue-500"
                : "flex items-center space-x-2 p-2 hover:text-blue-500"
            }
          >
            <FaBuilding className="text-xl" />
            <span>Property (RWA)</span>
          </NavLink>
          <NavLink
            to="/merch"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 p-2 text-blue-500"
                : "flex items-center space-x-2 p-2 hover:text-blue-500"
            }
          >
            <FaShoppingCart className="text-xl" />
            <span>Merchandise</span>
          </NavLink>
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 p-2 text-blue-500"
                : "flex items-center space-x-2 p-2 hover:text-blue-500"
            }
          >
            <BiDonateHeart className="text-xl" />
            <span>Donate to Charity</span>
          </NavLink>
        </div>
      </div>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="text-2xl p-2 bg-black text-white fixed top-4 left-4 z-50 mb-2"
        >
          <FaBars />
        </button>
      )}
    </div>
  );
};

export default SideBar;
