import React from "react"
import RwaToken from "./RWAToken"

const MyRWA = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <RwaToken
        image="https://via.placeholder.com/300"
        location="123 Main St, Springfield"
        area="1500 sqft"
        price="$300,000"
        ownerBaseName="John Doe"
        verified={true}
        onSale={true}
      />
      {/* Add more RwaToken components as needed */}
    </div>
  )
}

export default MyRWA
