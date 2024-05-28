import React, { useContext, useState } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaRocket } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { AuthContext } from "../context/AuthProvider";
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2';


const Newsletter = () => {
    const { user } = useContext(AuthContext);
    const [feedback, setFeedback] = useState('');
    const [notification, setNotification] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://blog-app-backend-toa9.onrender.com/send-feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: user?.email, userName: user?.displayName, feedback: feedback }),
            });
            const data = await response.json();
            if (data.success) {
                //console.log("feedback send successfully");
                const message = "feedback send successfully";
                const icon = 'success';
                showSuccessToast(message, icon);
                setFeedback('');
            }
            else {
                const message = "Unable to send Feedback";
                const icon = 'error';
                showAlreadyExistToast(message, icon);
                //console.log("feedback not send");
            }
        }
        catch (error) {
            console.error("Error to send feedback", error);
        }
    }
    const handleNotification = () => {
        if (!notification) {
            const message = 'Notification On';
            const icon = 'success';
            showSuccessToast(message, icon);
            setNotification(true);
            //console.log("pressed");
        }
        else {
            const message = 'Notification Off';
            const icon = 'success';
            showAlreadyExistToast(message, icon);
            setNotification(false);
            //console.log(" not pressed");
        }
    }
    const showSuccessToast = (message, icon) => {
        Swal.fire({
            icon: icon,
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        })
    };
    const showAlreadyExistToast = (message, icon) => {
        Swal.fire({
            icon: icon,
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        })
    };

    return (
        <div>
            <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    {" "}
                    <VscFeedback /> Feedback
                </h3>
                <p className="text-primary/75 text-base mb-4">
                    If you encounter any issues, please contact us. Your feedback is very important.
                </p>
                <div className="w-full space-y-4">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type your feedback..."
                            className="w-full block py-2 pl-3 border focus:outline-none"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full block py-2 bg-green hover:bg-cream rounded-sm text-white cursor-pointer font-semibold mt-3"
                        >
                            Feedeback
                        </button>
                    </form>
                </div>
            </div>

            {/* 2nd section */}
            <div className="mt-20">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <FaRocket /> Get noticed faster
                </h3>
                <p className="text-primary/75 text-base mb-4">
                    Get updates faster with just one click! Stay informed effortlessly.
                </p>
                <div className="w-full space-y-4">
                    <button type="submit" onClick={handleNotification} className="w-full flex justify-center items-center py-2 bg-green hover:bg-cream rounded-sm text-white cursor-pointer font-semibold">
                        <HiOutlineBellAlert className="text-xl mr-2" />
                        Notification
                    </button>
                </div>
                {/* rating take from react materials */}
                <div className="w-full p-3 flex justify-center">
                    <div>
                        <h2 className="mb-5 ml-8 mt-8"> Rate Us </h2>
                        <Rating />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
