import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent. Please check your email.");
            setError("");
        } catch (error) {
            setError("Failed to send reset email. Please try again.");
            setMessage("");
        }
    };

    return (
        <div className="h-screen mx-auto container flex items-center justify-center">
            <div className="w-full max-w-xs mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
                    <h3 className="text-xl font-semibold mb-4">Forgot Password</h3>
                    {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="name@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-green hover:bg-cream text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Reset Password
                        </button>
                        <Link
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            to="/login"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">&copy; 2024 Subhadip Hazra. All rights reserved.</p>
            </div>
        </div>
    );
};

export default ForgetPassword;
