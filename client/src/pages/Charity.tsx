import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import Campaign from "../components/Campaign"

const Charity = () => {
  const [campaigns, setCampaigns] = useState([
    {
      title: "Support Our Education Campaign",
      image: "https://example.com/image1.jpg",
      description:
        "Help provide education resources to underprivileged children.",
      ownerName: "Jane Doe",
      ownerAddress: "0x1234...abcd",
      ownerProfile: "https://example.com/profile1",
      deadline: "Dec 31, 2024",
    },
    {
      title: "Clean Water Initiative",
      image: "https://example.com/image2.jpg",
      description:
        "Your donation helps provide clean drinking water to rural areas.",
      ownerName: "John Smith",
      ownerAddress: "0x5678...efgh",
      ownerProfile: "https://example.com/profile2",
      deadline: "Nov 15, 2024",
    },
    {
      title: "Healthcare for All",
      image: "https://example.com/image3.jpg",
      description: "Join us in providing healthcare services to those in need.",
      ownerName: "Sarah Lee",
      ownerAddress: "0x9101...ijkl",
      ownerProfile: "https://example.com/profile3",
      deadline: "Jan 20, 2025",
    },
  ])

  const handleCreateCampaign = () => {
    // Implement logic for creating a new campaign (e.g., open a form modal)
    alert("Create new campaign feature coming soon!")
  }

  const handleDonate = (amount: number) => {
    console.log(`Donated ${amount} ETH`)
  }

  return (
    <div className="mt-20">
      <div className="text-center mb-6 flex flex-col md:flex-row items-center justify-center">
        <NavLink
          to="/createcampaigns"
          className="py-1 w-full px-2 md:w-64 m-1 bg-blue-500 text-white rounded-md font-bold hover:bg-green-600 transition-all"
        >
          Create Campaigns
        </NavLink>

        <NavLink
          to="/mycampaigns"
          className="py-1 px-2 w-full md:w-64 m-1 bg-blue-500 text-white rounded-md font-bold hover:bg-green-600 transition-all"
        >
          My Campaigns
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10 m-1">
        {campaigns.map((campaign, index) => (
          <Campaign
            key={index}
            title={campaign.title}
            image={campaign.image}
            description={campaign.description}
            ownerName={campaign.ownerName}
            ownerAddress={campaign.ownerAddress}
            ownerProfile={campaign.ownerProfile}
            deadline={campaign.deadline}
            onDonate={handleDonate}
          />
        ))}
      </div>
    </div>
  )
}

export default Charity
