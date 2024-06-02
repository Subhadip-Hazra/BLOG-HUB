import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import '../App.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext) || {};

    const handleLogout = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/", title: "Home" },
        { path: "/legal", title: "Legal" },
        { path: "/contact-us", title: "Contact" },
    ];

    return (
        <header className="max-w-screen-2xl container mx-auto xl:px-24 px-2 fixed z-50">
            <nav className="flex justify-between items-center py-4">
                <a href="/" className="flex items-center gap-2 text-2xl">
                    <h1 className="text-primary font-bold">AssistMe</h1>
                </a>
                <div className="flex gap-4 left-1/2 relative ml-8  cursor-pointer">
                    {user?.photoURL && (
                        <img
                            title="User profile"
                            className="h-10 w-10 rounded-full"
                            src={user?.photoURL}
                            alt="User profile"
                        />
                    )}
                </div>
                <div className="block">
                    <button onClick={handleMenuToggler} className="focus:outline-none">
                        {isMenuOpen ? (
                            <FaXmark className="w-6 h-6 text-white" />
                        ) : (
                            <FaBarsStaggered className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>
            </nav>
            <div className={`nav-menu ${isMenuOpen ? "visible" : "hidden"} px-4 py-5 rounded-md`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path}>
                            <NavLink
                                onClick={handleMenuToggler}
                                to={path}
                                className="block text-base text-white py-1"
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    {!user ? (
                        <>
                            <li onClick={handleMenuToggler}>
                                <Link to="/login" className="block text-white py-1">Log in</Link>
                            </li>
                            <li onClick={handleMenuToggler}>
                                <Link to="/sign-up" className="block text-white py-1">Sign up</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li onClick={handleMenuToggler} className="block sm:hidden">
                                <Link onClick={handleLogout} className="block text-white py-1">Log Out</Link>
                            </li>
                            <li onClick={handleMenuToggler} className="block sm:hidden">
                                <Link to="/settings" className=" text-white py-1">Settings</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
