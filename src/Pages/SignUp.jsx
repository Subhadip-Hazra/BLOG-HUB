/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FacebookF, GithubG, Google } from "../assets/icons";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRenterPassword, setShowRenterPassword] = useState(false);
    const [message, setMessage] = useState("");
    const { signUpWithGmail, createUser, signUpWithFacebook, signUpWithGithub, user } = useContext(AuthContext);

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

        if (password !== reEnterPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        createUser(email, password)
            .then(() => {
                setMessage("A verification email has been sent to your email address. Please verify it first.");
                setErrorMessage("");
            })
            .catch((error) => {
                setErrorMessage("Failed to create an account. Please use a valid email.");
                setMessage("");
            });
    };

    const handleRegister = () => {
        signUpWithGmail()
            .then(() => navigate(from, { replace: true }))
            .catch((error) => console.log(error));
    };

    const handleFacebookSignUp = () => {
        signUpWithFacebook()
            .then(() => navigate(from, { replace: true }))
            .catch((error) => alert("Use a different method, you already have an account with another provider."));
    };

    const handleGithubSignUp = () => {
        signUpWithGithub()
            .then(() => navigate(from, { replace: true }))
            .catch((error) => alert("Use a different method, you already have an account with another provider."));
    };

    return (
        <div className="h-full mx-auto container text-gray-700 flex items-center justify-center">
            <div className="w-full mx-auto px-8 sm:px-16 sm:w-1/2 ">
                <form
                    onSubmit={handleSignUp}
                    className="bg-gray-100 mt-24 shadow-md card-border rounded-md px-8 pt-8 pb-8 mb-4"
                >
                    <h3 className="text-xl font-semibold mb-4">Sign Up!</h3>
                    <div className="mb-4">
                        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
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
                    <div className="mb-4">
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
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="reEnterPassword">Re-enter Password</label>
                        <div className="flex items-center">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="reEnterPassword"
                                type={showRenterPassword ? "text" : "password"}
                                placeholder="******************"
                                value={reEnterPassword}
                                onChange={(e) => setReEnterPassword(e.target.value)}
                                aria-label="Re-enter Password"
                            />
                            <button
                                type="button"
                                className="ml-5 mb-2 focus:outline-none"
                                onClick={() => setShowRenterPassword(!showRenterPassword)}
                                aria-label="Toggle Re-enter Password Visibility"
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
                            className="btn card-border cursor-pointer"
                            type="submit"
                            value="Sign Up"
                        />
                    </div>
                <div className="mt-4 flex justify-center">
                    <p>Already a user? <Link className="text-blue-500" to="/login">Login</Link></p>
                </div>
                </form>
                <div className="mt-8 text-center w-full mx-auto">
                    <p className="mb-4">Sign up with Social</p>
                    <div className="flex items-center justify-center gap-4 w-full mx-auto">
                        <button
                            className="border-2 border-gray-700 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleRegister}
                            aria-label="Sign up with Google"
                        >
                        <img className="w-5" src={Google} alt="google/logo"/>

                        </button>
                        <button
                            className="border-2 border-gray-700 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleFacebookSignUp}
                            aria-label="Sign up with Facebook"
                        >
                        <img className="w-5" src={FacebookF} alt="facebook/logo"/>

                        </button>
                        <button
                            className="border-2 border-gray-700 font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2"
                            type="button"
                            onClick={handleGithubSignUp}
                            aria-label="Sign up with Github"
                        >
                        <img className="w-5" src={GithubG} alt="github/logo"/>
                        </button>
                    </div>
                </div>
                <p className="text-center text-gray-700 text-xs mt-16 mb-10">
                    &copy;2024 Subhadip Hazra. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SignUp;
