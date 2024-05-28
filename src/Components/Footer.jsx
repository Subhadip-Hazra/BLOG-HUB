import React, { useContext } from 'react'
import { IoDiamondOutline, IoHome } from "react-icons/io5";
import { IoIosCall, IoMdMail } from "react-icons/io";
import buyCoffe from '../assets/coffee.png';
import { Link } from "react-router-dom";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebookSquare, FaGithub } from "react-icons/fa";
import { FaEarthAsia } from 'react-icons/fa6';
import logo from '../assets/logo.png'
import { AuthContext } from '../context/AuthProvider';

const Footer = () => {

    const {user} = useContext(AuthContext)
    return (
        // footer off my website 
        <div className="bg-gray-200 max-w-screen-2xl container xl:px-24 md:py-8 py-8 px-8 mt-36">
            <div>
                <div className='flex items-center gap-3 '>
                    <IoDiamondOutline />
                    <h3 className='font-bold'>Blog Hub</h3>
                </div>
                <div className='mt-3 text-justify text-align-last-justify md:w-1/2 w-full'>
                    <div className='flex items-center gap-44 w-full'>
                    <p className='italic w-full'>
                        Unlocking the door to limitless knowledge and creativity with every click. Welcome to my blog app, where ideas come alive in the digital realm.
                    </p>
                    <img title='logo'  src={logo} alt='logo' className=' w-20 h-20 hidden sm:block rounded'/>

                    </div>
                </div>
                <div className='sm:flex items-center sm:gap-40'>
                    <div className='flex items-center sm:gap-40'>
                        <div className='mt-10 h-full w-full'>
                            <img title='coffee' src={buyCoffe} className='w-20' alt='buy me a Coffee' />
                            <p className='mt-3'>You can buy me a <a className='text-blue' href="https://buymeacoffee.com/neyqw6qdvr">Coffee</a></p>
                        </div>
                        {/* navigation links  */}
                        <div className='mt-10 ml-20 sm:ml-0 w-full'>
                            <li className='mt-2' ><Link to={"https://blog-hub-69.netlify.app/"} className='text-sm underline md:text-md'>Home</Link></li>
                            <li className='mt-1' ><Link to={"https://blog-hub-69.netlify.app/my-blogs"} className='text-sm underline md:text-md'>My Blogs</Link></li>
                            <li className='mt-1'><Link to={"https://blog-hub-69.netlify.app/post-blog"} className='text-sm underline md:text-md'>Post Blogs</Link></li>
                            <li className='mt-1'><Link to={`https://blog-hub-69.netlify.app/user-profile/${user?.email}`} className='text-sm underline md:text-md'>Profile</Link></li>
                            <li className='mt-1'><Link to={"https://blog-hub-69.netlify.app/terms-and-condition"} className='text-sm underline md:text-md flex'>Terms<span className='hidden sm:block'> & condition</span></Link></li>
                        </div>
                    </div>
                    {/* contact details  */}
                    <div className='sm:flex items-center sm:gap-40'>
                        <div className='w-full mt-8'>
                            <h1 className='font-bold'>Contact</h1>
                            <p className='flex items-center gap-3 mt-2'> <IoHome /> Asansol, West Bengal,713341</p>
                            <p className='flex items-center gap-3 mt-1'> <IoMdMail /> subhadiphazra129@gmail.com </p>
                            <p className='flex items-center gap-3 mt-1'> <IoIosCall /> +91 9339108776 </p>
                            <Link to={"https://subhadiphazraportfolio.netlify.app/"} ><p className='flex items-center gap-3 mt-1'>  <FaEarthAsia />Similar work </p></Link>
                        </div>
                        {/* social icons  */}
                        <div className='flex justify-center gap-5 mt-10'>
                            <Link to={"https://www.instagram.com/_subha__2002/"} > <BsInstagram className='sm:w-8 sm:h-8 w-6 h-6 text-pink-500' /></Link>
                            <Link to={"https://www.linkedin.com/in/subhadiphazra/"}><BsLinkedin  className='sm:w-7 sm:h-7 w-6 h-6 text-blue'/></Link>
                            <Link to={"https://www.facebook.com/subhadip.hazra.7169/"}><FaFacebookSquare className='sm:w-8 sm:h-8 w-6 h-6 text-blue'/></Link>
                            <Link to={"https://github.com/Subhadip-Hazra"}><FaGithub className='sm:w-8 sm:h-8 w-6 h-6'/></Link>
                        </div>
                    </div>
                </div>
                {/* copyright  */}
                <div className='flex justify-center px-5 text-center mt-10 py-10 bg-white h-full rounded-xl'>
                    <p>
                        &copy;2024 Subhadip Hazra. All rights reserved.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Footer