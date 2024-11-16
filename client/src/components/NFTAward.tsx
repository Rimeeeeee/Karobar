import React, { useEffect, useState } from "react";
import { prepareContractCall, readContract, sendTransaction } from "thirdweb";

import { download } from "thirdweb/storage";
import { useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethers } from "ethers";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useKBRTokenContext } from "../context/context";

interface NFTProps {
  recieverAddress: string;
  tokenId: string; 
  rating: string | number; 
}

const NFTAwards: React.FC<NFTProps> = ({
  
  recieverAddress,
  
  tokenId,
  rating,
}) => {
  const [image, setImage] = useState("");
  const { NFTAward, client } = useKBRTokenContext();
  const activeAccountAddress = useActiveAccount()?.address;
  console.log("recieverAddress:", recieverAddress);
  console.log("tokenId:", tokenId);
  console.log("rating:", rating);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        
        const tokenURI = await readContract({
          contract: NFTAward,
          method: "function tokenURI(uint256 tokenId) view returns (string)",
          params: [BigInt((tokenId)) as bigint],
        });
        console.log(tokenURI);
        const response = await download({
          client,
          uri: `${tokenURI}`,
        });
        const fileBlob = await response.blob();
        const fileUrl = URL.createObjectURL(fileBlob);
        setImage(fileUrl);
      } catch (error) {
        console.error("Error fetching image: ", error);
      }
    };

    fetchImage();
  }, [tokenId, NFTAward, client]);
console.log(image);
console.log(image);

// Conditional styling and heading
let heading = "";
let borderClass = "";

if (Number(rating.toString()) === 10) {
  heading = "Enthusiast";
} else if (Number(rating.toString()) === 50) {
  heading = "Gladiator";
} else if (Number(rating.toString()) === 100) {
  heading = "Conqueror";
  borderClass = "border-4 border-white";
}

return (
    <div
      className={`w-full z-10 max-w-xs mx-auto p-4 rounded-lg shadow-lg text-white border-4 border-white ${borderClass}`}
    >
      <div>
        <img
          src={image}
          alt={`NFT`}
          className="w-full rounded-md border-2 border-gray-500"
        />
      </div>
      {heading && (
        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold text-white">{heading}</h2>
        </div>
      )}
      <div className="flex items-center mb-4 mt-2 border-y-2 py-2 border-gray-500">
        <div className="ml-4 flex">
          <span className="flex items-center flex-col">
            <p className="text-lg text-gray-100 mt-2">
              {recieverAddress.slice(0, 8) + "..." + recieverAddress.slice(-6)}
            </p>
          </span>
        </div>
      </div>
      <div className="mb-2">
        <h4 className="text-md font-medium text-gray-300">Rating:</h4>
        <p className="text-sm text-gray-300">{rating.toString()}</p>
      </div>
    </div>
  );
  
};



export default NFTAwards;
