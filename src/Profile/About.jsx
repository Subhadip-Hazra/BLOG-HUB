import React, { useContext, useState, useEffect, useRef } from 'react';
import { FaEnvelopeOpenText, FaHandPointUp } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { GoAlertFill } from "react-icons/go";
import { IoMdChatboxes } from 'react-icons/io';
import ChatOn from '../Components/ChatBot';

const About = ({ email, update }) => {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const userEmail = user?.email;
    const senderEmail = email;
    const [showChatBox, setShowChatBox] = useState(false);
    const chatBoxRef = useRef(null);

    const handleClickOutside = (event) => {
        if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
            setShowChatBox(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://blog-app-backend-toa9.onrender.com/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    senderEmail: userEmail,
                    reciverEmail: senderEmail,
                    name: user?.displayName,
                })
            });
            const data = await response.json();
            if (data.success) {
                //console.log("Message submitted successfully");
                setMessage('');
            } else {
                console.error("Failed to submit message");
            }
        } catch (error) {
            console.error("Error submitting message:", error);
        }
    };

    const defaultUserData = {
        facebookUrl: "https://facebook.com",
        instagramUrl: "https://instagram.com",
        linkedinUrl: "https://linkedin.com",
        githubUrl: "https://github.com",
    };

    const { facebookUrl, instagramUrl, linkedinUrl, githubUrl } = defaultUserData;

    return (
        <div className='ml-2'>
            {userEmail !== senderEmail && (
                <div className='block'>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <FaEnvelopeOpenText /> Contact Me
                    </h3>
                    <p className="text-primary/75 text-base mb-4">
                        {"Enjoy my content? Let's chat! Reach out to discuss collaborations, feedback, or just to say hi. I'd love to connect with you!"}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full block py-2 pl-3 border focus:outline-none"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full block py-2 bg-green hover:bg-cream rounded-sm text-white cursor-pointer font-semibold mt-3"
                        >
                            Message
                        </button>
                    </form>
                </div>
            )}
            {!update && userEmail === senderEmail && <div className='bg-gray-100'>
                <div className='m-auto p-3 w-full text-justify text-align-last-justify mt-3'>
                <h3 className='mt-1 mb-2 flex items-center gap-2'><GoAlertFill />Notice</h3>
                    <p> Please update your profile. If you do not, no one will be able to follow you or message you. </p>
                </div>
            </div>
            }
            <div className="flex items-center justify-center md:mt-10 mt-8 w-full space-y-4 mb-26 text-sm h-9 gap-3 p-1">
                <Link to={facebookUrl} target='_blank' rel='noopener noreferrer'><FiFacebook className="text-indigo-700 hover:bg-gray-300 w-6 h-6 mr-2 mt-4 bg-gray-100 rounded" /></Link>
                <Link to={instagramUrl} target='_blank' rel='noopener noreferrer'><FiInstagram className="text-pink-600 hover:bg-gray-300 w-6 h-6 mr-2 bg-gray-100 rounded" /></Link>
                <Link to={linkedinUrl} target='_blank' rel='noopener noreferrer'><FiLinkedin className="text-blue hover:bg-gray-300 w-6 h-6 mr-2 bg-gray-100 rounded" /></Link>
                <Link to={githubUrl} target='_blank' rel='noopener noreferrer'><FiGithub className="text-black hover:bg-gray-300 w-6 h-6 mr-2 bg-gray-100 rounded" /></Link>
            </div>
            <div className='mt-8 flex justify-center'>
                <div>
                    <p><FaHandPointUp className='move-up-down' /></p>
                </div>
            </div>
            <div className='mt-3 flex justify-center'>
                <div>
                    <p className=''>Unlock a treasure trove of content </p>
                </div>
            </div>
            { userEmail === senderEmail &&
            <div className='flex justify-center mt-5 '>
            <button className="flex items-center w-36 gap-2 rounded-md h-10 bg-blue text-white p-3" onClick={() => setShowChatBox(true)}>
                <IoMdChatboxes /> Text me <span className='animate-ping mb-3 ml-3'> • </span>
            </button>
            </div>}
            {showChatBox && <div ref={chatBoxRef}><ChatOn /></div>}
        </div>
    );
};

export default About;
