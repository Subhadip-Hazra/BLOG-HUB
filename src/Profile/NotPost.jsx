import React from 'react'
import { FiCamera } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NotPost = () => {
    return (
        <div className='mt-10'>
            <div className='flex justify-center'>
                <div className='rounded-full border-2 p-6 border-black'>
                    <FiCamera className='w-10 h-10 ' />
                </div>
            </div>
            <div className='mt-6 flex justify-center'>
                <h1 className='text-xl md:text-2xl block'>Share Blogs</h1>
            </div>
            <div className='mt-4 flex justify-center'>
                <p className='text-center block'>When you share blogs, they will appear on your profile.</p>
            </div>
            <div className='mt-6 flex justify-center'>
                <Link to={"https://blog-hub-69.netlify.app/post-blog"}><p className='block text-blue'>Share your first blog</p></Link>
            </div>
        </div>

    )
}

export default NotPost