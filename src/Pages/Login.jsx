/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FacebookF, GithubG, Google } from "../assets/icons";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { signUpWithGmail, login, signUpWithFacebook, signUpWithGithub } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        login(email, password)
            .then((result) => {
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setErrorMessage("Please provide a valid email & password!");
            });
    };

    const handleRegister = () => {
        signUpWithGmail()
            .then((result) => {
                navigate(from, { replace: true });
            })
            .catch((error) => console.log(error));
    };

    const handleFacebookSignUp = () => {
        signUpWithFacebook()
            .then((result) => {
                navigate(from, { replace: true });
            })
            .catch((error) => alert("Use a different method. You already have an account with others."));
    };

    const handleGithubSignUp = () => {
        signUpWithGithub()
            .then((result) => {
                navigate(from, { replace: true });
            })
            .catch((error) => alert("Use a different method. You already have an account with others."));
    };

    return (
        <div className="h-full mx-auto container flex items-center justify-center text-gray-700">
            <div className="w-full px-8 sm:px-16 mt-24 mb-10 sm:w-1/2 mx-auto">
                <form onSubmit={handleLogin} className="bg-gray-50 card-border rounded-md px-10 pt-8 pb-8 mb-4">
                    <h3 className="text-xl font-semibold mb-4">Login</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="name@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email Address"
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <div className="flex items-center">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="******************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Password"
                            />
                            <button
                                type="button"
                                className="mb-2 ml-5 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-xs italic">{errorMessage}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-between gap-10 sm:gap-16">
                        <input
                            className="btn card-border cursor-pointer"
                            type="submit"
                            value="Sign in"
                        />
                        <Link
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            to="/forget-password"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="mt-10 font-sans flex justify-center">
                        <Link to="/sign-up">Not Logged in? <span className="text-blue-500">Sign Up</span></Link>
                    </div>
                </form>
                <div className="mt-8 text-center text-gray-700 w-full mx-auto">
                    <p className="mb-4">Sign up with Social</p>
                    <div className="flex items-center justify-center gap-4 w-full mx-auto">
                        <button
                            className="border-2 border-gray-700 hover:bg-green font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleRegister}
                            aria-label="Sign up with Google"
                        >
                            <img className="w-5" src={Google} alt="google/logo" />
                        </button>
                        <button
                            className="border-2 border-gray-700 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleFacebookSignUp}
                            aria-label="Sign up with Facebook"
                        >
                            <img className="w-5" src={FacebookF} alt="facebook/logo" />
                        </button>
                        <button
                            className="border-2 border-gray-700 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleGithubSignUp}
                            aria-label="Sign up with Github"
                        >
                            <img className="w-5" src={GithubG} alt="github/logo" />
                        </button>
                    </div>
                </div>
                <p className="text-center mt-16 text-gray-700 text-xs">
                    &copy;2024 Subhadip Hazra. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
