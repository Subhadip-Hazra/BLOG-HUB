import React, { useContext, useState, useEffect } from "react";
import {
    FaFacebookF,
    FaGithub,
    FaGoogle,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { signUpWithGmail, createUser, signUpWithFacebook, signUpWithGithub, user } = useContext(AuthContext);
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRenterPassword, setShowRenterPassword] = useState(false);
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user && user.emailVerified) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate]);

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        if (password !== reEnterPassword) {
            setErrorMessage("Please write a correct Password!");
            return;
        }

        createUser(email, password)
            setMessage("A verification email send to your mail, verify it first.")
            .catch((error) => {
                setErrorMessage("Please use a valid email !!");
            });
    };

    const handleRegister = () => {
        signUpWithGmail()
            .catch((error) => console.log(error));
    };

    const handleFacebookSignUp = () => {
        signUpWithFacebook()
            .catch((error) => alert("Use Different method, you already have an account with another provider"));
    };

    const handleGithubSignUp = () => {
        signUpWithGithub()
            .catch((error) => alert("Use Different method, you already have an account with another provider"));
    };

    return (
        <div className="h-screen mx-auto container flex items-center justify-center">
            <div className="w-full max-w-xs mx-auto">
                <form
                    onSubmit={handleSignUp}
                    className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
                >
                    <h3 className="text-xl font-semibold mb-4">Sign Up!</h3>
                    <div className="mb-4">
                    {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="name@email.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
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
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Re-enter Password
                        </label>
                        <div className="flex items-center">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="reEnterPassword"
                                type={showRenterPassword ? "text" : "password"}
                                placeholder="******************"
                                value={reEnterPassword}
                                onChange={(e) => setReEnterPassword(e.target.value)}
                            />
                            <button
                                className="ml-5 mb-2"
                                onClick={() => setShowRenterPassword(!showRenterPassword)}
                            >
                                {showRenterPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-xs italic">{errorMessage}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <input
                            className="bg-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                            type="submit"
                            value="Sign Up"
                        />
                    </div>
                </form>
                <div className="mt-4 flex justify-center">
                    <p>Already a user? <Link className="text-blue-500" to="/login">Login</Link></p>
                </div>
                <div className="mt-8 text-center w-full mx-auto">
                    <p className="mb-4">Sign up with Social</p>
                    <div className="flex items-center justify-center gap-4 w-full mx-auto">
                        <button
                            className="border-2 text-blue hover:text-white hover:bg-green font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleRegister}
                        >
                            <FaGoogle />
                        </button>
                        <button
                            className="border-2 text-blue hover:text-white hover:bg-green font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleFacebookSignUp}
                        >
                            <FaFacebookF />
                        </button>
                        <button
                            className="border-2 text-blue hover:text-white hover:bg-green font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleGithubSignUp}
                        >
                            <FaGithub />
                        </button>
                    </div>
                </div>
                <p className="text-center text-gray-500 text-xs mt-4">
                    &copy;2024 Subhadip Hazra. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SignUp;
