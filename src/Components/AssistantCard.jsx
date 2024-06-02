import React from 'react'
import Robot from '../assets/robot.png'

const AssistantCard = ({output}) => {

    return (
        <div>
            <div className=" bg-white p-5 mx-1 md:mx-40">
                {/* Profile picture and logout button */}
                <div className="flex gap-4 items-center cursor-pointer mb-3">
                    <div className="flex -space-x-2 overflow-hidden gap-5">
                        <img
                            title="default photo url"
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            src={Robot}
                            alt="Default user profile"
                        />
                        <p>AssistMe</p>
                    </div>
                </div>
                <div className='h-full w-full overflow-hidden ml-1 font-normal'>
                    <p className="text-justify text-align-last-justify">{output}</p>
                </div>
            </div>
        </div>
    )
}
export default AssistantCard
