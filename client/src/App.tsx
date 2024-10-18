import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "./thirdweb.svg";
import CryptoSwap from "./components/CryptoSwap";
import SideBar from "./components/SideBar";
import { Merch } from "./pages/Merch";
import Home from "./pages/Home"; // Ensure this is created or add a placeholder
import TopBar from "./components/Topbar";
import Swap from "./pages/Swap";
import RWA from "./pages/RWA";
import Charity from "./pages/Charity";
import MyCampaign from "./pages/MyCampaign";
import Login from "./pages/Login";
import DailyLogin from "./pages/DailyLogin";
import People from "./pages/People";
import CreateRWA from "./pages/RWA/CreateRWA";


export function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar placed on the left */}
        <SideBar />

        <div className="flex-1 flex flex-col">
          {/* Topbar placed at the top */}
          <TopBar />

          {/* Main content */}
          <main className="flex-1 container mx-auto">
            {/* Uncomment the ConnectButton if needed for wallet connection */}
            {/* <ConnectButton /> */}

            <Routes>
              {/* Add a Home component or placeholder */}
              <Route path="/" element={<Home />} />
              <Route path="/swap" element={<Swap />} /> {/* Swap route */}
              <Route path="/merch" element={<Merch />} />
              <Route path="/rwa/*" element={<RWA />} />
              <Route path="/donate" element={<Charity />} />
              <Route path="/mycampaigns" element={<MyCampaign />} />

              <Route path="/login" element={<Login />} />
              <Route path="/dailylogin" element={<DailyLogin />} />
              <Route path="/people" element={<People />} />
              <Route path="/create-rwa" element={<CreateRWA />} />

              {/* Add additional routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
