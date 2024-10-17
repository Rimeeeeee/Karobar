import React, { useState } from "react"

interface CampaignProps {
  title: string
  image: string
  description: string
  ownerName: string
  ownerAddress: string
  ownerProfile: string
  deadline: string
  onDonate: (amount: number) => void
}

const Campaign: React.FC<CampaignProps> = ({
  title,
  image,
  description,
  ownerName,
  ownerAddress,
  ownerProfile,
  deadline,
  onDonate,
}) => {
  const [donationAmount, setDonationAmount] = useState(0)

  const handleDonate = () => {
    if (donationAmount > 0) {
      onDonate(donationAmount)
    } else {
      alert("Please enter a valid donation amount.")
    }
  }

  return (
    <div className="bg-gray-800 text-white p-2 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-300 mb-4">{description}</p>

      <div className="mb-4">
        <p className="font-semibold">Owner: {ownerName}</p>
        <p className="text-gray-400">Address: {ownerAddress}</p>
        <a
          href={ownerProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 underline"
        >
          View Owner Profile
        </a>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Deadline: {deadline}</p>
      </div>

      <div className="mb-4 flex flex-col md:flex-row">
        <label className="block text-gray-400">
          Enter Donation Amount (ETH):
        </label>
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(Number(e.target.value))}
          className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
        />
      </div>

      <button
        onClick={handleDonate}
        className="w-full py-2 rounded-md text-white font-bold bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all"
      >
        Donate Now
      </button>
    </div>
  )
}

export default Campaign
