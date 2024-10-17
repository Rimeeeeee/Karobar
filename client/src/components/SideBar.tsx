import React, { useState, useEffect } from "react"
import { MdHealthAndSafety } from "react-icons/md"
import {
  FaHome,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserPlus,
  FaBuilding,
} from "react-icons/fa"
import { BiDonateHeart } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import { MdSwapHorizontalCircle } from "react-icons/md"

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [user, setUser] = useState<any>(null)
  const address = "0xAddressSample" // Mocked for example

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sliceUserId = (userId: string) => {
    if (userId.length > 11) {
      return `${userId.slice(0, 9)}...${userId.slice(-2)}`
    }
    return userId
  }

  return (
    <div
      className={`fixed h-screen ${isOpen ? "sm:w-64 w-56" : "w-0"} bg-zinc-950 text-white gap-4 flex flex-col transition-all duration-300 z-50`}
    >
      <div className="flex flex-col mr-12">
        {/* Header with profile */}
        <div
          className={`p-1 text-2xl font-semibold flex flex-col items-center ${!isOpen && "hidden"}`}
        >
          {user ? (
            <NavLink
              to={`/profile/${user.userId}`}
              className="flex items-center space-x-2 mt-8"
            >
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-lg">{user.username}</div>
                <div className="text-sm text-gray-700">
                  @{sliceUserId(user.userId)}
                </div>
              </div>
            </NavLink>
          ) : (
            <div className="flex items-center space-x-2 mt-8">
              <div className="w-10 h-10 rounded-full bg-gray-500"></div>
              <div>
                <div className="text-lg">Loading...</div>
                <div className="text-sm text-gray-700">Loading...</div>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-4xl mt-7 ml-1 absolute top-4 right-4"
          >
            <FaTimes />
          </button>
        </div>
        {/* Navigation links */}
        <div
          className={`flex flex-col space-y-3 md:space-y-5 text-base md:text-lg gap-2 p-4 ${!isOpen && "hidden"}`}
        >
          <NavLink
            to="/register"
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
  )
}

export default SideBar