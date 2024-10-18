import React, { useEffect, useState } from "react";
import RWAToken from "./RWAToken"; // Import RWAToken component
import { readContract } from "thirdweb";
import { useKBRTokenContext } from "../../context/context";

const BuyRWA: React.FC = () => {
  const { PropertyNFTContract, PeopleContract } = useKBRTokenContext();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllNFTs = async () => {
      try {
        // Fetch all NFTs from the contract
        const nftData = await readContract({
          contract: PropertyNFTContract,
          method:
            "function getAllNFTs() view returns ((uint256 tokenId, address owner, address seller, uint256 price, bool currentlyListed, string location, string size, string papers, bool forSale)[])",
          params: [],
        });
        console.log("NFT Data:", nftData);

        // Use Array.from to create a mutable copy of the readonly array
        setNfts(Array.from(nftData));
      } catch (error: any) {
        console.error("Error fetching NFTs", error);
        setLoading(false);
      }
    };

    getAllNFTs();
  }, [PropertyNFTContract, PeopleContract]);
  console.log(nfts);
  return (
    <div className="h-screen p-4">
      {loading ? (
        <p className="text-white">Loading NFTs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4 overflow-y-auto no-scrollbar mt-12">
          {nfts.map((nft) => (
            <RWAToken
              key={nft.tokenId}
              // image={nft.image_hash} // IPFS or hash of the image
              // location={nft.location}
              // area={nft.size}
              // price={nft.price}
              // ownerBaseName={nft.size}
              // verified={true} // Indicates if user is verified
              // onSale={nft.forSale} // Indicates if the NFT is for sale
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyRWA;