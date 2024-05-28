import React, { useEffect, useState, useContext } from "react";
import Card from "../Components/Card";
import Loading from "../Components/Loading";
import LeftProfile from "../Profile/LeftProfile";
import { AuthContext } from "../context/AuthProvider";
import { useParams } from "react-router-dom";
import About from "../Profile/About";
import NotPost from "../Profile/NotPost";

const UserProfile = () => {
    const { email } = useParams(); // Now use it here
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null); // State to store user data
    const { user } = useContext(AuthContext);
    const [update,setUpdate] = useState(false);
    //const {profileEmail } = email;

    useEffect(() => {
        if (!user || !user.email) return; // Ensure user and email are available
        setIsLoading(true);
        
        // Fetch user profile data
        fetch(`https://blog-app-backend-toa9.onrender.com/userProfile/${email}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch user profile data. Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setUserData(data); // Set user data
                setIsLoading(false);
                setUpdate(true);
            })
            .catch((error) => {
                console.error("Error fetching user profile data:", error.message);
                setIsLoading(false);
            });
    }, [email, user]); // Make sure to include email and user in the dependency array

    useEffect(() => {
        if (!user || !user.email) return; // Ensure user and email are available
        setIsLoading(true);
        fetch(`https://blog-app-backend-toa9.onrender.com/yourBlogs/${email}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch user profile data. Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Filter blogs where postedBy matches user's email
                const userBlogs = data.filter(blog => blog.postedBy === email);
                setBlogs(userBlogs);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user profile data:", error.message);
                setIsLoading(false);
            });
            //console.log(email);
    }, [email, user]); // Make sure to include email and user in the dependency array
    
    return (
        <div>
            {/* main content */}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-4 lg:px-24 px-4 py-12">
                <div className="bg-white pr-10 rounded">
                    <LeftProfile userData={userData} posts = {blogs.length} email = {email} name={blogs.yourName} dp={blogs.imageSrc} /> {/* Pass userData to LeftProfile component */}
                </div>
                <div className="col-span-2 bg-white p-4 rounded">
                    {isLoading ? (
                        // Loading indicator
                        <Loading />
                    ) : (
                        blogs.length > 0 ?
                        <div>
                            {blogs.map((blog, index) => (
                                <Card key={index} data={blog} imageSrc={blog.imageSrc}  />
                            ))}
                        </div> : <NotPost/>
                    )}
                </div>
                <div className="bg-white p-4 rounded">
                    <About email={email} update={update}/>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
