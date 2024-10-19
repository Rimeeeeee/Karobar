import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineTeam } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import { readContract } from "thirdweb";
import { useKBRTokenContext } from "../context/context";
import { download } from "thirdweb/storage";

import { useActiveAccount } from "thirdweb/react";
import Balance from "../components/Balance";
import FollowButton from "../components/FollowButton";
import Abc from "../components/Basename";

const ViewProfile: React.FC = () => {
  const { userId } = useParams(); // Use userId instead of id
  const { PeopleContract, client } = useKBRTokenContext();

  const [user, setUser] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const acc = useActiveAccount()?.address?.toLowerCase(); // Ensure it's lowercase for comparison

  useEffect(() => {
    const getUser = async () => {
      if (userId && PeopleContract) {
        try {
          const data = await readContract({
            contract: PeopleContract,
            method:
              "function getUserById(address _user) view returns ((uint256 uid, address userid, string name, string bio, string image_hash, string caption, uint256 dailycheckin, uint256[] dailycheckins, address[] followers, address[] following, uint256 token, bool blacklisted, uint256 userRating, bool verifiedUser))",
            params: [userId.toLowerCase()], // Ensure it's lowercase
          });
          console.log(data);
          setUser({
            name: data.name,
            userid: data.userid,
            bio: data.bio,
            imageHash: data.image_hash,
            followers: data.followers.length,
            following: data.following.length,
            userrating: Number(data.userRating),
          });
          console.log(user);
          try {
            const response = await download({
              client,
              uri: `${data.image_hash}`,
            });

            const fileBlob = await response.blob();
            const fileUrl = URL.createObjectURL(fileBlob);
            setImageUrl(fileUrl);
          } catch (error) {
            console.error("Failed to fetch user image", error);
            // Set a dummy image URL if there's an error
            setImageUrl("path_to_dummy_image.jpg");
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    getUser();
  }, [userId, PeopleContract, client]);

  return (
    <div className="p-4 w-full h-full max-w-screen-lg mx-auto">
      {user && (
        <div className="lg:mt-4 p-4">
          <div className="flex items-center justify-center md:space-x-2 space-x-1 mt-10">
            <img
              src={imageUrl}
              alt="Profile"
              className="h-14 w-14 sm:h-14 sm:w-14 mt-2 rounded-full border-2 border-white"
            />
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold ml-5 mt-8">
                {user.name}
              </h1>
              <p className="text-gray-400 ml-5 text-xs sm:text-md hidden lg:block">
                @{user.userid}
              </p>
              <p className="text-gray-400 ml-5 text-xs sm:text-md block lg:hidden">
                @{user.userid.slice(0, 4) + "..." + user.userid.slice(-4)}
              </p>
              <p className="text-gray-20 ml-5">{user.bio}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 flex-row border-b-2 border-t-2 border-white">
            <span className="text-lg">User Rating:</span>
            <span className="text-xl text-red-500">{user.userrating}</span>
          </div>
          <div className="flex items-center justify-center flex-row border-b-2 border-white">
            <span className="text-lg">Base Name of User:</span>
            <Abc uid={userId} />
          </div>
          <div className="flex space-x-1 md:space-x-8 mt-4 items-center justify-center">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex items-center space-x-1">
                  <AiOutlineUser className="text-lg" />
                  <Link to={`/followers/${user.userid}`}>
                    <span className="font-bold">{user.followers}</span>
                  </Link>
                  <Link to={`/followers/${user.userid}`}>
                    <span className="text-gray-600 cursor-pointer hover:none sm:text-md text-sm">
                      Followers
                    </span>
                  </Link>
                </div>

                <div className="flex items-center space-x-1">
                  <AiOutlineTeam className="text-lg" />
                  <span className="font-bold">{user.following}</span>
                  <Link to={`/following/${user.userid}`}>
                    <span className="text-gray-600 sm:text-md text-sm cursor-pointer hover:none">
                      Following
                    </span>
                  </Link>
                </div>
                <div>
                  {acc === userId?.toLowerCase() ? (
                    <Balance /> // Show Balance component if account matches userId
                  ) : (
                    <FollowButton userId={user.userid} /> // Show FollowButton otherwise
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
