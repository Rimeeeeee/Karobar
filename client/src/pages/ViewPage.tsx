import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineTeam } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import NFTAwards from "../components/NFTAward";
import { readContract, prepareContractCall, sendTransaction } from "thirdweb";
import { useKBRTokenContext } from "../context/context";
import { download } from "thirdweb/storage";

import { useActiveAccount } from "thirdweb/react";
import Balance from "../components/Balance";
import FollowButton from "../components/FollowButton";
import { createWallet } from "thirdweb/wallets";

const ViewProfile: React.FC = () => {
  const { userId } = useParams();
  const { PeopleContract, client,NFTAward } = useKBRTokenContext();

  const [user, setUser] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("path_to_dummy_image.jpg");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState<boolean>(false);
  const [nfts, setNfts] = useState<any[]>([]);
  const acc = useActiveAccount()?.address?.toLowerCase();

  const handleClaimToken = async () => {
    if (!PeopleContract||!NFTAward || !acc) return;

    setClaiming(true);
    const wallet = createWallet("io.metamask");
    const connectedAccount = await wallet.connect({ client });
    try {
      const transaction = await prepareContractCall({
        contract: NFTAward,
        method: "function claimToken()",
        params: [],

        
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account: connectedAccount,
      });

      console.log("Token claimed successfully:", transactionHash);
      alert("Token claimed successfully!");
    } catch (error) {
      console.error("Failed to claim token:", error);
      alert("Failed to claim token. Please try again later.");
    } finally {
      setClaiming(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (userId && PeopleContract) {
        setLoading(true);
        setError(null);
        try {
          const data = await readContract({
            contract: PeopleContract,
            method:
              "function getUserById(address _user) view returns ((uint256 uid, address userid, string name, string bio, string image_hash, string caption, uint256 dailycheckin, uint256[] dailycheckins, address[] followers, address[] following, uint256 token, bool blacklisted, uint256 userRating, bool verifiedUser))",
            params: [userId.toLowerCase()],
          });

          setUser({
            name: data.name,
            userid: data.userid,
            bio: data.bio,
            caption:data.caption,
            imageHash: data.image_hash,
            followers: data.followers.length,
            following: data.following.length,
            userrating: Number(data.userRating),
          });

          try {
            const response = await download({
              client,
              uri: `${data.image_hash}`,
            });

            const fileBlob = await response.blob();
            const fileUrl = URL.createObjectURL(fileBlob);
            setImageUrl(fileUrl);
          } catch (imageError) {
            console.error("Failed to fetch user image", imageError);
          }
        } catch (contractError) {
          console.error("Failed to fetch user data", contractError);
          setError("Unable to fetch user data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    getUser();
  }, [userId, PeopleContract, client]);
  useEffect(() => {
    const getAllNFTs = async () => {
      try {
        const nftData = await readContract({
          contract: NFTAward,
          method:
            "function getAllNFTs() view returns ((uint256 tokenId, address owner, address reciever, uint256 rating)[])",
          params: [],
        });
        console.log("NFT Data:", nftData);

        setNfts(Array.from(nftData));
        setLoading(false); 
      } catch (error: any) {
        console.error("Error fetching NFTs", error);
        setLoading(false);
      }
    };

    getAllNFTs();
  }, [NFTAward, PeopleContract]);

  if (loading) {
    return <div className="p-6 text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="p-6 text-center text-white">User not found.</div>;
  }

  return (
    <div className="p-4 w-full h-full max-w-screen-lg mx-auto">
      <div className="lg:mt-6 p-4 bg-black rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-3 mt-4">
          <img
            src={imageUrl}
            alt="Profile"
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-white"
          />
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              {user.name}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm hidden lg:block">
              @{user.userid}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm block lg:hidden">
              @{user.userid?.slice(0, 4) + "..." + user.userid?.slice(-4)}
            </p>
            <p className="text-gray-300 text-sm sm:text-base font-semibold">{user.caption}</p>
            <p className="text-gray-300 text-sm sm:text-base">{user.bio}</p>
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-4 border-t border-b border-gray-500 py-3">
          <div className="text-center">
            <span className="text-sm text-gray-300">User Rating:</span>
            <span className="text-lg text-red-500 font-semibold">
              {user.userrating}
            </span>
          </div>
          {acc === userId?.toLowerCase() ? (
              <button
              onClick={handleClaimToken}
              disabled={claiming}
              className={`px-3 py-1.5 rounded-lg text-white font-semibold ${
                claiming
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {claiming ? "Claiming..." : "Claim Award"}
            </button>
            ) : (
              ''
            )}
          
        </div>
  
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <AiOutlineUser className="text-2xl text-gray-400" />
              <Link
                to={`/followers/${user.userid}`}
                className="flex flex-col items-center"
              >
                <span className="text-lg font-bold text-white">
                  {user.followers}
                </span>
                <span className="text-gray-500 text-xs">Followers</span>
              </Link>
            </div>
          </div>
  
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <AiOutlineTeam className="text-2xl text-gray-400" />
              <Link
                to={`/following/${user.userid}`}
                className="flex flex-col items-center"
              >
                <span className="text-lg font-bold text-white">
                  {user.following}
                </span>
                <span className="text-gray-500 text-xs">Following</span>
              </Link>
            </div>
          </div>
  
          <div className="flex items-center justify-center">
            {acc === userId?.toLowerCase() ? (
              <Balance />
            ) : (
              <FollowButton userId={user.userid} />
            )}
          </div>
        </div>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-3 overflow-y-auto no-scrollbar mt-8">
        {nfts
          .filter((nft) => nft.reciever === user.userid)
          .map((nft, index) => (
            <NFTAwards
              key={`${nft.tokenId.toString()}-${index}`}
              recieverAddress={nft.reciever}
              rating={nft.rating}
              tokenId={nft.tokenId.toString()}
            />
          ))}
      </div>
    </div>
  );
  
  
  
};

export default ViewProfile;