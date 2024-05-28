import { useState } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import FullscreenModal from "./FullScreenImg";
import '../App.css';
import DOMPurify from 'dompurify';
import { IoMdShare } from "react-icons/io";
import ShareBox from "./ShareBox";

const Card = ({ data, imageSrc }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLinkOpen, setIsLinkOpen] = useState(false);

    const currentDate = new Date().toISOString().split('T')[0];

    // Data destructuring
    const { _id, yourName, blogTitle, blogLocation, postingDate, description, tags, profileURL, postedBy } = data;

    // Function to truncate the description to a maximum of 100 characters
    const truncateDescription = (text) => {
        if (text?.length > 100) {
            return text.slice(0, 100) + '...';
        }
        return text;
    };

    return (
        <div>
            {/* Card section */}
            <section className="card">
                {currentDate === postingDate && (
                    <div className="animate-pulse flex justify-end">
                        <p className="w-10 h-6 text-center rounded-md text-white bg-red-600">NEW</p>
                    </div>
                )}
                <div className="flex gap-10 flex-col sm:flex-row items-start">
                    {/* Blog image */}
                    {imageSrc && (
                        <img
                            src={imageSrc}
                            alt="Uploaded Image"
                            title="blog-image"
                            className="card-img gap-4 w-32 h-32 rounded border-1"
                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                            onClick={() => setIsModalOpen(true)}
                        />
                    )}
                    <Link to={`/blogs/${_id}`}>
                        <div className="w-full ">
                            {/* Profile photo */}
                            <div className="flex -space-x-2 gap-4 overflow-hidden">
                                {profileURL ? (
                                    <img
                                        title="profile img"
                                        className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                        src={profileURL}
                                        alt="profile image"
                                    />
                                ) : (
                                    <img
                                        title="profile image"
                                        className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="default image"
                                    />
                                )}
                                <h4 className="text-primary">
                                    <Link to={`/user-profile/${postedBy}`}>{yourName}</Link>
                                </h4>
                            </div>
                            <h3 className="text-xl font-sans m-2">{blogTitle}</h3>

                            <div className="t text-primary/70 text-base flex flex-wrap gap-4 mb-4">
                                <span className="flex items-center gap-2">
                                    <FiMapPin className="text-orange-500" /> {blogLocation}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FiCalendar className="t text-pink-500" /> {postingDate}
                                </span>
                            </div>
                            <div className="text-base w-full text-primary/70 text-justify text-align-last-justify first-letter:capitalize first-letter:text-3xl">
                                <div
                                    className="text-gray-800 min-w-full leading-relaxed mb-6"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncateDescription(description)) }}
                                />
                            </div>
                            <div className="mt-5">
                                {tags && tags.map((tag, index) => (
                                    <span key={index} className="text-blue bg-gray-100 px-2 py-1 text-sm rounded-md mr-2">
                                        # {tag.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex justify-end">
                    <button> <IoMdShare className="text-2xl" onClick={() => setIsLinkOpen(true)} /></button>
                </div>
            </section>
            {isModalOpen && <FullscreenModal onClose={() => setIsModalOpen(false)} imageSrc={imageSrc} />}
            {isLinkOpen && <ShareBox onClose={() => setIsLinkOpen(false)} link={`https://blog-hub-69.netlify.app/blogs/${_id}`} />}
        </div>
    );
};

export default Card;
