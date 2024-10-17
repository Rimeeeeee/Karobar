import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import BuyRWA from "./RWA/BuyRWA"
import MyRWA from "./RWA/MyRWA"
import CreateRWA from "./RWA/CreateRWA"
import SideMenu from "./RWA/SideMenu"
import SideBar from "../components/SideBar"

const RWA: React.FC = () => {
  const location = useLocation() // Get the current route location

  // Check if the current path is one of the routes
  const isRouteMatched = [
    "/rwa/buy-rwa",
    "/rwa/my-rwa",
    "/rwa/create-rwa",
  ].includes(location.pathname)

  return (
    <div className="flex h-screen bg-black">
      {/* <div className="mb-14"> */}
      <SideMenu />
      {/* </div> */}
      <div className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="buy-rwa" element={<BuyRWA />} />
          <Route path="my-rwa" element={<MyRWA />} />
          <Route path="create-rwa" element={<CreateRWA />} />
        </Routes>

        {!isRouteMatched && ( // Render the home content only when no route is matched
          <div className="w-full flex justify-center items-center flex-col ">
            <h2 className="text-3xl sm:text-5xl font-bold text-primary text-gradient">
              Tokenize your Assets on Base!!!
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default RWA
