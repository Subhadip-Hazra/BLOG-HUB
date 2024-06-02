import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const UserCard = ({query}) => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <div className="border rounded bg-slate-100 p-5 mx-1 mt-6 md:mx-40">
                    {/* Profile picture and logout button */}
                    <div className="flex gap-4 items-center cursor-pointer mb-3">
                        <div className="flex -space-x-2 overflow-hidden gap-5">
                            {user?.photoURL ? (
                                <img
                                    title="photo url"
                                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                    src={user?.photoURL}
                                    alt="User profile"
                                />
                            ) : (
                                <img
                                    title="default photo url"
                                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Default user profile"
                                />
                            )}
                            {user?.displayName ? (
                                <p className='text-primary font-sans'>{user?.displayName}</p>
                            ) : (
                                <p>Annonomous</p>
                            )}
                        </div>
                    </div>
                    <div className='h-full w-full overflow-hidden ml-1 font-normal'>
                        <p className="text-justify text-align-last-justify">{query}</p>
                    </div>
                </div>
            </div>
    )
}
export default UserCard
