import React from 'react';
import '../App.css';
import { FiClipboard } from "react-icons/fi";
import '../scrollbarStyle.css'

const ShareBox = ({ onClose, link }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        // This is a component to show zoom in / full size of any image
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-4 rounded-lg relative w-10/12 sm:w-1/2">
                <button className="absolute top-0 right-0 mt-2 mr-2 hover:bg-cream" onClick={onClose}>
                    <svg className="w-6 h-6 text-green logo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className='bg-white w-full p-3 rounded-md'>
                    <h1>Share your blog with others</h1>
                    <div className='flex items-center h-14 border rounded-md my-3 p-2 overflow-hidden'>
                        <div className='flex-1 overflow-x-auto'>
                            <p className='text-blue text-md whitespace-nowrap'>{link}</p>
                        </div>
                        <button onClick={copyToClipboard} className="ml-2 text-gray-500 hover:text-gray-700">
                            <FiClipboard className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShareBox;
