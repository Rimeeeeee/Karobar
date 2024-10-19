import React, { useEffect, useState } from "react";
import { prepareContractCall, readContract, sendTransaction } from "thirdweb";
import { useKBRTokenContext } from "../../context/context";
import { download } from "thirdweb/storage";
import { useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethers } from "ethers";

interface NFTProps {
  papers: boolean; // Or the correct type for papers (e.g., boolean, string)
  creatorAddress: string;
  sellerAddress: string;
  price: number; // Or the appropriate type (could be BigInt or bigint if applicable)
  uri: string;
  tokenId: string; // Or number, based on your actual data
  forSale: boolean;
  location: string;
  size: string | number; // Define appropriately
}

const RWAToken: React.FC<NFTProps> = ({
  papers,
  creatorAddress,
  sellerAddress,
  price,
  uri,
  tokenId,
  forSale,
  location,
  size,
}) => {
  const [image, setImage] = useState("");
  const { PropertyNFTContract, client } = useKBRTokenContext();
  const activeAccountAddress = useActiveAccount()?.address;
  console.log("papers:", papers);
  console.log("creatorAddress:", creatorAddress);
  console.log("sellerAddress:", sellerAddress);
  console.log("price:", price);
  console.log("uri:", uri);
  console.log("tokenId:", tokenId);
  console.log("forSale:", forSale);
  console.log("location:", location);
  console.log("size:", size);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Fetch tokenURI and handle IPFS URL for NFT image
        const tokenURI = await readContract({
          contract: PropertyNFTContract,
          method: "function tokenURI(uint256 tokenId) view returns (string)",
          params: [BigInt(parseInt(tokenId)) as bigint],
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
  }, [uri, tokenId, PropertyNFTContract, client]);

  const buyNFTs = async (tokenId: number, price: number) => {
    try {
      const wallet = createWallet("io.metamask");
      const account = await wallet.connect({ client });
      console.log("aaaaaaaaaaaaaaaaaaa" + ethers.parseEther(price.toString()));
      const transaction = await prepareContractCall({
        contract: PropertyNFTContract,
        method: "function executeSale(uint256 tokenId) payable",
        params: [BigInt(tokenId)],
        value: BigInt(price.toString()), // Convert price to string for parsing
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      console.log("Transaction successful:", transactionHash);
    } catch (error) {
      console.error("Failed to buy NFT:", error);
    }
  };

  return (
    <div
      className={`w-full max-w-xs mx-auto p-4 rounded-lg shadow-lg z-10 text-white ${
        forSale ? "border-2 border-green-500" : "border-2 border-white"
      }`}
    >
      <div>
        <img src={image} alt={`NFT`} className="w-full rounded-md" />
      </div>
      <div className="flex items-center mb-4 mt-2 border-y-2 p-2 border-white">
        <div className="ml-4">
          <h2 className="text-lg font-semibold">
            {creatorAddress.slice(0, 6) + "..." + creatorAddress.slice(-4)}
          </h2>
          <p className="text-sm text-gray-400">
            {sellerAddress.slice(0, 6) + "..." + sellerAddress.slice(36, 40)}
          </p>
        </div>
      </div>
      <div className="mb-2">
        <h4 className="text-md font-medium">Location:</h4>
        <p className="text-sm text-gray-300">{location}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-medium">Size:</h4>
        <p className="text-sm text-gray-300">{size}</p>
      </div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex flex-row">
          <h3 className="text-xl font-bold">Price:</h3>
          <p className="text-xl font-bold text-blue-400">
            {" "}
            {ethers.formatEther(price.toString())}ETH
          </p>
        </div>
        {sellerAddress !== activeAccountAddress && (
          <button
            className="buy-now-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => buyNFTs(Number(tokenId), price)} // Corrected price handling
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RWAToken;
