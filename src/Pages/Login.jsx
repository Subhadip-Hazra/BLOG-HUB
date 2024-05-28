import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { signUpWithGmail, login, signUpWithFacebook, signUpWithGithub } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage("Please provide valid email & password!");
            });
    };

    const handleRegister = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
            })
            .catch((error) => console.log(error));
    };

    const handleFacebookSignUp = () => {
        signUpWithFacebook()
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
            })
            .catch((error) => alert("Use a different method. You already have an account with others."));
    };

    const handleGithubSignUp = () => {
        signUpWithGithub()
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
            })
            .catch((error) => alert("Use a different method. You already have an account with others."));
    };

    return (
        <div className="h-screen mx-auto container flex items-center justify-center">
            <div className="w-full max-w-xs mx-auto">
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
                    <h3 className="text-xl font-semibold mb-4">Please Login!</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="name@email.com"
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <div className="flex items-center">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="******************"
                            />
                        <button
                            className="mb-2 ml-5"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        </div>
                        {/* show errors */}
                        {errorMessage && (
                            <p className="text-red-500 text-xs italic">Please write a correct password.</p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <input
                            className="bg-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                    {/* social login */}
                    <div className="mt-8 text-center w-full mx-auto">
                        <p className="mb-4">Sign up with Social</p>
                        <div className="flex items-center justify-center gap-4 w-full mx-auto">
                            <button
                                className=" border-2 text-blue hover:text-white hover:bg-green font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                                type="button"
                                onClick={handleRegister}
                            >
                                <FaGoogle />
                            </button>
                            <button
                                className=" border-2 text-blue hover:text-white hover:bg-green font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                                type="button"
                                onClick={handleFacebookSignUp}
                            >
                                <FaFacebookF />
                            </button>
                            <button
                                className=" border-2 text-blue hover:text-white hover:bg-green font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                                type="button"
                                onClick={handleGithubSignUp}
                            >
                                <FaGithub />
                            </button>
                        </div>
                        <div className="mt-5 font-sans">
                            <Link to={"https://blog-hub-69.netlify.app/sign-up"}>Not Login, <span className="text-blue">Sign Up</span></Link>
                        </div>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Subhadip Hazra. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
