import React from 'react';
import Robot from '../assets/robot.png';

const Loader = () => (
    <div className="p-1 mx-1 md:mx-40 h-48 rounded-sm">
        <div className="flex gap-4 items-center cursor-pointer p-3">
            <img
                title="default photo url"
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={Robot}
                alt="Default user profile"
            />
            <p>AssistMe</p>
        </div>
        <div className="w-full overflow-hidden ml-1 animate-pulse">
            {Array(6).fill().map((_, i) => (
                <p key={i} className="bg-slate-100 h-3 my-2 mx-10 rounded-full"></p>
            ))}
        </div>
    </div>
);

export default Loader;
