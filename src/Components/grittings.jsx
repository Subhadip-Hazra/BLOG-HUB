import React from 'react'
import Robot from '../assets/robot.png'

const Grittings = () => {
    return (
        <div>
            <div className="flex justify-center mt-36 -space-x-2 overflow-hidden gap-5">
                <img
                    title="default photo url"
                    className="inline-block h-16 w-16"
                    src={Robot}
                    alt="Default user profile"
                />
            </div>
            <div className='flex justify-center px-5'>
            <p className='text-xl font-mono mt-8 text-center font-bold'>How can I assist you Today ? </p> 

            </div>
        </div>
    )
}

export default Grittings
