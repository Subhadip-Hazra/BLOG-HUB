import React, { useContext, useState, useEffect } from 'react';
import { MdOutlinePowerSettingsNew, MdSettings } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import '../App.css';

const LeftBar = () => {
    const { user, logOut } = useContext(AuthContext) || {};
    const [history, setHistory] = useState([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (expanded) {
            fetchHistory();
        }
    }, [expanded]);

    const handleLogout = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchHistory = async () => {
        try {
            const response = await fetch(`https://chatbot-backend-onan.onrender.com/get_all_history/${user?.uid}`);
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Failed to fetch history', error);
        }
    };

    return (
        <div>
            <div className={`leftbar fixed h-screen hidden sm:block ${expanded ? 'w-64' : 'w-20'}`}>
                <div className='flex justify-center mt-20'>
                    <FaHistory className='icon w-6 h-7 cursor-pointer block' onClick={() => setExpanded(!expanded)} />
                </div>
                {expanded && (
                    <div className='mt-10 history-container block'>
                        {history.map(chat => (
                            <div key={chat.id} className='history-item'>
                                <p className='history-query'>{chat.query}</p>
                                <p className='history-response'>{chat.response}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className='flex justify-center relative mt-16 top-1/2'>
                    <Link to='/settings'><MdSettings className='icon w-10 h-7' /></Link>
                </div>
                <div className='flex justify-center relative mt-10 top-1/2'>
                    <Link to='/' onClick={handleLogout}><MdOutlinePowerSettingsNew className='icon w-10 h-7' /></Link>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
