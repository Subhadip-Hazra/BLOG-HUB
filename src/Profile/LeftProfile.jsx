import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthProvider";
import FullscreenModal from "../Components/FullScreenImg";
import { FaCalendar, FaGenderless, FaHeart } from "react-icons/fa";
import { MdSchool } from "react-icons/md"
import { FaEarthAsia } from 'react-icons/fa6';

const LeftProfile = ({ userData, posts,email,name,dp }) => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFollow = async () => {
        try {
            const response = await fetch(`https://blog-app-zl5n.onrender.com/follow/${userData.email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ followerEmail: user?.email }), // Toggle follow status
            });
            if (response.ok) {
                window.location.href = `https://blog-app-zl5n.onrender.co/user-profile/${userData.email}`; // Redirect user
            } else {
                console.error("Failed to update follow status");
            }
        } catch (error) {
            console.error("Error updating follow status:", error);
        }
    };

    // Default user data
    const defaultUserData = {
        yourName: name ,
        email: email || 'user@example.com',
        profileURL: dp || 'https://via.placeholder.com/150',
        gender: 'Not specified',
        highSchool: 'Not specified',
        universityName: 'Not specified',
        relation: 'Not specified',
        dateOfBirth: 'Not specified',
        personalWeb: '#',
        userBio: 'This is the default bio.',
        followerCount: 0, // Add followerCount property with default value
        followingCount: 0,
    };

    // Destructure user data or use default data if userData is not provided
    const {
        yourName,
        email: userEmail,
        userBio,
        gender,
        highSchool,
        universityName,
        relation,
        dateOfBirth,
        personalWeb,
    } = userData || defaultUserData;

    // Access profileURL using optional chaining
    const profileURL = userData?.profileURL || defaultUserData.profileURL;

    return (
        <div className="h-full w-full ml-6 rounded">
            <div className="mt-4 w-full">
                <div className="flex items-center gap-2 w-full overflow-hidden">
                    {profileURL && (
                        <img
                            title='profile image'
                            src={profileURL}
                            alt="Uploaded Image"
                            className="sm:w-11 sm:h-12 h-16 mt-5 w-14 md:h-18 md:w-16 border-2 border-black rounded-md ring-2 ring-white cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        />
                    )}
                    <div className="flex flex-col w-full">
                        <h1 className="text-slate-940 text-xr ml-2 first-letter:capitalize">{yourName}</h1>
                        <h4 className="text-green text-sm ml-2">{userEmail}</h4>
                    </div>
                </div>
                <p className="mt-4 text-justify text-sm first-letter:text-2xl first-letter:capitalize">{userBio}</p>
                <div className='mt-5'>
                    <Link to={`/edit-profile/${email}`}>
                        {user.email === userEmail && <button className="w-full py-2 bg-green hover:bg-cream rounded-sm text-white cursor-pointer font-semibold block">
                            Edit Profile
                        </button> 
                        }
                    </Link>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-primary/75 gap-2 text-sm mb-4 flex items-center">
                    <FaGenderless /> {gender}
                </p>
                <p className="text-primary/75 gap-2 text-sm mb-4 flex items-center">
                    <MdSchool /> {highSchool.trim().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </p>
                <p className="text-primary/75 gap-2 text-sm mb-4 flex items-center ">
                    <MdSchool /> {universityName.trim().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </p>
                <p className="text-primary/75 gap-2 text-sm mb-4 flex items-center">
                    <FaHeart /> {relation}
                </p>
                <p className="text-primary/75 gap-2 text-sm mb-4 flex items-center">
                    <FaCalendar /> {dateOfBirth}
                </p>
                <p className="text-primary/75 gap-2 text-sm mb-4 flex items-center">
                    <FaEarthAsia /><Link to={`${personalWeb}`}>My Portfolio</Link>
                </p>
            </div>
            <div className="flex mt-12 gap-4">
                <p className="text-sm">
                    <span className='text-blue'>{posts}</span> Posts
                </p>
                <p className="text-sm">
                    <span className='text-blue'>{userData && userData.followerCount !== 0 ? userData.followerCount : defaultUserData.followerCount}</span> Follower
                </p>
                <p className="text-sm">
                    <span className='text-blue'>{userData && userData.followingCount !== 0 ? userData.followingCount : defaultUserData.followingCount}</span> Following
                </p>
            </div>

            <div className="mt-8">
                {userData && user.email !== userEmail && (
                    <button className="w-full block py-2 bg-green hover:bg-cream rounded-sm text-white cursor-pointer font-semibold" onClick={handleFollow}>
                        {userData.isFollowing ? 'Follow Me' :'Following'}
                    </button>
                )}
            </div>
            {isModalOpen && <FullscreenModal onClose={() => setIsModalOpen(false)} imageSrc={profileURL} />}
        </div>
    );
};

export default LeftProfile;
