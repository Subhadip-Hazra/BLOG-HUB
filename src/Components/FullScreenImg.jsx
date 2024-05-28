import React from 'react';
import '../App.css'

const FullscreenModal = ({ onClose, imageSrc }) => {
    return (
        // This is a component to show zoom in / full size of any image
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-4 rounded-lg">
                <button className="absolute top-0 right-0 mt-2 mr-2 hover:bg-cream" onClick={onClose}>
                    <svg className="w-6 h-6 text-black logo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <img title='image blog' src={imageSrc} className="h-80 w-full rounded-md border-8 border-white border-opacity-30" alt="My Logo Fullscreen" />
            </div>
        </div>
    );
}

export default FullscreenModal;
