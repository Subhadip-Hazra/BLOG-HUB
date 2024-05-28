/* eslint-disable react/no-unknown-property */
import React, { useContext, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { useEffect } from "react";
import { FaBell } from "react-icons/fa";
import logo from '../assets/logo.gif'
import '../App.css'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [showNotificationBox, setShownotificationBox] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showDot, setShowDot] = useState(false);
    const [prevLength, setPrevLength] = useState(0);
    const notificationBoxRef = useRef(null);



    const handleClickOutside = (event) => {
        if (notificationBoxRef.current && !notificationBoxRef.current.contains(event.target)) {
            setShownotificationBox(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    useEffect(() => {
        if (user) {
            fetch(`https://blog-app-backend-toa9.onrender.com/notifications?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setNotifications(data);
                    setLoading(false);
                    // Check if there are new notifications to show dot
                    //console.log(prevLength);
                    //console.log(data.length);
                    if (data.length > prevLength) {
                        setPrevLength(data.length);
                        setShowDot(false);
                    } else {
                        setShowDot(true);
                    }

                })
                .catch((error) => {
                    console.error("Error fetching notifications:", error);
                    setLoading(false);
                });
        }
    }, [user, prevLength]);


    useEffect(() => {
        // Function to send a request to the backend when the component mounts
        const sendNotificationRequest = async () => {
            try {
                //console.log(user?.email);
                const response = await fetch("https://blog-app-backend-toa9.onrender.com/send-notification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: user?.email })
                });
                if (response.ok) {
                    //console.log("New Notification Fetched");
                }
                else {
                    //console.log("failed to get new notification");
                }
            }
            catch (error) {
                console.error("Error sending notification request:", error);
            }
        };

        // Call the function when the component mounts
        sendNotificationRequest();
    }, [user?.email]);


    const handleLogout = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // menu toggle btn
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const navItems = [
        { path: "/", title: "Home" },
        { path: "/my-blogs", title: "My Blogs" },
        { path: "/post-blog", title: "Post Blogs" },
    ];

    const handleDot = () => {
        setShowDot(false);
    }

    return (
        <header className="max-w-screen-2xl container mx-auto xl:px-24 px-2">
            <nav className="flex justify-between items-center py-6">
                <a href="/" className="flex items-center gap-2 text-2xl">
                    <img title="logo image" src={logo} alt="logo" className="w-10 h-12 mb-3" />
                    <span className="mb-3"><span className="bg-black p-1 text-slate-50 rounded-s">Blog</span><span className="text-slate-950 p-1 rounded-e bg-green">Hub</span></span>
                </a>

                {/* nav items */}
                <ul className="hidden md:flex ml-36 gap-12">
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-primary">
                            <NavLink
                                to={path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {/* notification system */}
                <div className="ml-24 relative">
                    <div className="group" onClick={handleDot}>
                        {showDot && <p className="ml-4 bottom-3 text-xl absolute animate-ping text-red-700">•</p>}
                        <FaBell className="text-black w-6 h-6 cursor-pointer" onClick={setShownotificationBox} />
                    </div>
                    {showNotificationBox && (
                        <div className="absolute right-0 mt-2 w-80 h-32 overflow-y-auto p-1 bg-white border-3 border-gray-200 rounded-md shadow-lg opacity-100 transition duration-300">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {notifications.length === 0 ? (
                                        <div ref={notificationBoxRef} className="flex justify-center font-fonts mt-6">
                                            <p>No notifications</p>

                                        </div>
                                    ) : (
                                        notifications.map((notification, index) => (
                                            <div ref={notificationBoxRef} key={index} className="px-4 py-2">
                                                {notification.blogId ? (
                                                    <Link to={`https://blog-hub-69.netlify.appblogs/${notification.blogId}`}>
                                                        <span className="text-sm text-green">⦿</span> <span className="font-mono">{notification.message}</span> from <span className="bg-gray-200 italic font-sm p-1 rounded-md">@ {notification.name}</span>
                                                    </Link>
                                                ) : (
                                                    <div className="px-4 py-2">
                                                        <span className="text-sm text-green">⦿</span> <span className="font-mono">{notification.notificationMessage}{notification.message}</span> from <span className="bg-gray-200 italic font-sm p-1 rounded-md">@ {notification.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className="relative hidden text-base text-primary font-medium space-x-5 lg:block">
                    {/* User is logged in */}
                    {user ? (
                        <div className="group">
                            {/* Profile picture and logout button */}
                            <div className="flex gap-4 items-center cursor-pointer">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {user?.photoURL ? (
                                        <img
                                            title="photo url"
                                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                            src={user?.photoURL}
                                            alt="User profile"
                                        />
                                    ) : (
                                        <img
                                            title="default photo url"
                                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Default user profile"
                                        />
                                    )}
                                </div>

                            </div>
                            {/* Additional options */}
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                                <Link to={`/user-profile/${user?.email}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                <Link to={`/user-contact-us/${user?.email}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact us</Link>
                                <Link to={"/terms-and-condition/"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Terms & condition</Link>
                                <Link onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</Link>
                            </div>
                        </div>
                    ) : (
                        // User is not logged in
                        <>
                            <Link to="/login" className="py-2 px-5 border rounded">
                                Log in
                            </Link>
                            <Link to="/sign-up" className="bg-green py-2 px-5 text-white rounded">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
                {/* mobile menu */}
                <div className="md:hidden block">
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? (
                            <>
                                <FaXmark className="w-5 h-5 text-primary/75" />
                            </>
                        ) : (
                            <>
                                <FaBarsStaggered className="w-5 h-5 text-primary/75" />
                            </>
                        )}
                    </button>
                </div>
            </nav>

            {/* mobile menu items */}
            <div
                className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"
                    }`}
            >
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li
                            key={path}
                            className="text-base text-white first:text-white py-1"
                        >
                            <NavLink
                                onClick={handleMenuToggler}
                                to={path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    {user ?
                        (<li className="text-white py-1" onClick={handleMenuToggler} >
                            <Link to={`/user-profile/${user.email}`}> Profile</Link>
                        </li>) :
                        (<li className="text-white hidden py-1">
                            <Link>Profile</Link>
                        </li>)}
                    {!user ?
                        (
                            <>
                                <li className="text-white py-1" onClick={handleMenuToggler}>
                                    <Link to="/login">Log in</Link>
                                </li>
                                <li className="text-white py-1" onClick={handleMenuToggler}>
                                    <Link to="/sign-up">Sign up</Link>
                                </li>
                            </>)

                        :
                        <>
                            <li className="text-white py-1" onClick={handleMenuToggler}>
                                <Link to={`/user-contact-us/${user?.email}`}>Contact us</Link>
                            </li>
                            <li className="text-white py-1" onClick={handleMenuToggler}>
                                <Link to={"/terms-and-condition/"}>Terms & condition</Link>
                            </li>
                            <li className="text-white py-1" onClick={handleMenuToggler}>
                                <Link onClick={handleLogout}>Log Out</Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
