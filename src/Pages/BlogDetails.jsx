import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMapPin, FiCalendar, FiFlag, FiVolume2 } from "react-icons/fi";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import { AuthContext } from "../context/AuthProvider";
import Loading from "../Components/Loading";
import { useForm } from "react-hook-form";
import PageHeader from "../Components/PageHeader"
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';
import { GiSpeakerOff } from "react-icons/gi";


const BlogDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [blog, setBlog] = useState(null);
    const [action, setAction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputComment, setInputComment] = useState('');
    const [comments, setComments] = useState([]);
    const userName = user ? user.displayName : null;
    const dp = user ? user.photoURL : null;
    const { register, handleSubmit } = useForm();
    const [isAudio, setIsAudio] = useState(false);
    const speechInstance = useRef(null);

    // function for search blog continuously
    useEffect(() => {
        fetchBlogDetails();
    }, [id, user]);

    // function for fetch new blogs 
    const fetchBlogDetails = async () => {
        try {
            const [blogRes, actionRes, commentsRes] = await Promise.all([
                fetch(`https://blog-app-backend-toa9.onrender.com/all-blogs/${id}`).then(res => res.json()),
                user ? fetch(`https://blog-app-backend-toa9.onrender.com/user-action/${id}?userId=${user?.email}`).then(res => res.json()) : null,
                fetch(`https://blog-app-backend-toa9.onrender.com/comments/${id}`).then(res => res.json()) // Fetch comments for the blog post
            ]);
            if (!blogRes || blogRes.error) {
                throw new Error(blogRes ? blogRes.error : "Error fetching blog details");
            }

            setBlog(blogRes);
            setAction(actionRes ? actionRes.action : null);
            setComments(commentsRes.reverse()); // Reverse comments array to display newly added comments first
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const onSubmit = async () => {
        // Create a comment object
        const newComment = {
            blogId: id,
            name: userName,
            comment: inputComment,
            photoURL: dp,
            email: blog?.postedBy,
        };

        try {
            // Make a POST request to add the comment to the database
            const response = await fetch(`https://blog-app-backend-toa9.onrender.com/post-comment/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment)
            });

            const result = await response.json();

            if (result.acknowledged) {
                // console.log("Comment Posted Successfully");
                // Reset the input field
                setInputComment("");

                // Update the comments state with the new comment
                setComments(prevComments => [newComment, ...prevComments]); // Add new comment to the beginning of the array
            } else {
                console.log("Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    // function for handle post actions 
    const handleLikeOrDislike = async (newAction) => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch(`https://blog-app-backend-toa9.onrender.com/${newAction}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user?.email,
                    email: blog?.postedBy,
                    name: user?.displayName,
                }),
            });

            if (response.ok) {
                setAction(newAction);
                fetchBlogDetails();
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            setError(`Error ${newAction}ing post: ${error.message}`);
        }
    };

    // function for report 
    const handleReport = () => {
        if (!user) {
            return;
        }

        fetch(`https://blog-app-backend-toa9.onrender.com/report/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user?.email,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to report post");
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    showSuccessToast();
                } else {
                    if (data.message === "You have already reported this post") {
                        //alert("You have already reported this post");
                        showAlreadyExistToast();
                    } else if (data.message === "Blog Deleted") {
                        //alert(data.message);
                        // Optionally, you might want to handle the case where the blog is deleted differently
                        deletedSuccussfully(data.message);
                    } else {
                        showErrorToast();
                    }
                }
            })
            .catch((error) => {
                setError(`Error reporting post: ${error.message}`);
            });
    };

    const showSuccessToast = () => {
        Swal.fire({
            icon: 'success',
            title: 'Reported Successfully.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        })
    };
    const showAlreadyExistToast = () => {
        Swal.fire({
            icon: 'error',
            title: 'You have already reported this post.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        })
    };

    const deletedSuccussfully = (message) => {
        Swal.fire({
            icon: 'success',
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        }).then(() => {
            window.location.href = "https://blog-hub-69.netlify.app/";
        });
    };

    const showErrorToast = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
        });
    };

    // function for comment actions 
    const handleCommentLikeOrDislike = async (newAction, commentId) => {
        if (!user) {
            return;
        }
        if (!commentId) {
            fetchBlogDetails();
            return;
        }
        if (newAction === action) {
            fetchBlogDetails();
            newAction = null;
        }
        //console.log("Comment ID:", commentId);
        try {
            const response = await fetch(`https://blog-app-backend-toa9.onrender.com/comment/${newAction}/${commentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user?.email,
                }),
            });

            if (response.ok) {
                // Update the comments state to reflect the new action
                setAction(newAction);
                fetchBlogDetails();
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            setError(`Error ${newAction}ing comment: ${error.message}`);
        }
    };


    // function for comment reports 
    const handleCommentReport = (commentId) => {
        if (!user) {
            return;
        }
        if (!commentId) {
            return;
        }

        fetch(`https://blog-app-backend-toa9.onrender.com/comment/report/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user?.email,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to report post");
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    showSuccessToast();
                } else {
                    if (data.message === "You have already reported this post") {
                        //alert("You have already reported this post");
                        showAlreadyExistToast();
                    } else if (data.message === "Comment Deleted") {
                        //alert(data.message);
                        // Optionally, you might want to handle the case where the blog is deleted differently
                        deletedSuccussfully(data.message);
                    } else {
                        showErrorToast();
                    }
                }
            })
            .catch((error) => {
                setError(`Error reporting post: ${error.message}`);
            });
    };


    const handleSpeak = () => {
        if (!speechInstance.current) {
            speechInstance.current = new SpeechSynthesisUtterance();
            speechInstance.current.lang = "en-US";
            speechInstance.current.onstart = () => setIsAudio(true);
            speechInstance.current.onend = () => setIsAudio(false);
            speechInstance.current.onerror = () => setIsAudio(false);
        }

        if (isAudio) {
            window.speechSynthesis.cancel();
        } else {
            speechInstance.current.text = blog?.description.replace(/<[^>]+>/g, '') || "";
            window.speechSynthesis.speak(speechInstance.current);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"Blog Details Page"} path={"Single Blog"} />

            <div className="w-full rounded">
                <div className="my-4 flex items-center rounded">
                    <img title="blog image" src={blog.imageSrc} alt="Blog Image" className="w-full rounded-md h-96 md:h-1/2 opacity-75">
                    </img>
                </div>
            </div>
            <div className="flex gap-4 flex-col w-full sm:flex-row">
                <div className="mt-2 sm:mt-10 w-full">
                    {blog ? (
                        <div className="my-4 space-y-2">
                            <h1 className="text-2xl font-sans mb-2">{blog.blogTitle}</h1>
                            <div className="t text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                                <span className="flex items-center gap-2"><FiMapPin className=" text-orange-500" /> {blog.blogLocation}</span>
                                <span className="flex items-center gap-2"><FiCalendar className=" text-orange-500" /> {blog.postingDate}</span>
                            </div>
                        </div>
                    ) : (
                        <Loading />
                    )}
                    <div className="text-primary/75 mt-6 my-5 sm:mt-16 space-y-6 text-justify text-align-last-justify first-letter:capitalize first-letter:text-5xl">
                        {blog && <div className="text-gray-800 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.description) }} />}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSpeak}
                            className="flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {isAudio ? (
                                <FiVolume2 className="w-6 h-6" />
                            ) : (
                                <GiSpeakerOff className="w-6 h-6" />
                            )}
                        </button>
                        <div className="w-24 h-5 mt-2 flex align-middle">
                            <p>~{blog.description.split(" ")?.length} Words</p>
                        </div>
                    </div>
                    <Link to={`/user-profile/${blog?.postedBy}`}>
                        <div className="flex items-center gap-2 mb-10 mt-12 sm:mt-14">
                            <div className="flex -space-x-2 overflow-hidden">
                                {blog.profileURL ? (
                                    <img
                                        title="blog profile"
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                        src={blog.profileURL}
                                        alt="profile image"
                                    />
                                ) : (
                                    <img
                                        title="blog profile"
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="default profile image"
                                    />
                                )}
                            </div>
                            <h3 className="text-primary italic font-serif underline">~ By  {blog?.yourName}</h3>
                        </div>
                    </Link>
                    <div className="gap-5 mb-10">
                        {blog?.tags && blog.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 px-2 text-blue py-1 mr-2 rounded-md"># {tag.value} </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-11">
                        <button onClick={() => handleLikeOrDislike("like")} disabled={action === true} className=" text-blue">
                            <MdThumbUp /> {blog?.likes}
                        </button>
                        <button onClick={() => handleLikeOrDislike("dislike")} disabled={action === false} className="text-red-600 ">
                            <MdThumbDown /> {blog?.dislikes}
                        </button>
                        <div className="ring-2 ring-white group">
                            <button className="relative z-10 ring-2 ring-white">
                                <FiFlag />
                            </button>
                            <div className="absolute right-70 mb-8 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                                <Link onClick={handleReport} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hateful or abusive Content</Link>
                                <Link onClick={handleReport} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sexual content</Link>
                                <Link onClick={handleReport} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Harmful or dangerous Content</Link>
                                <Link onClick={handleReport} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Violent or repulsive Content</Link>
                                <Link onClick={handleReport} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Spam or misleading</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex align-middle">
                        <div className="w-full mt-10 mb-9 border h-14 border-gray-300">
                            <input
                                className="w-full outline-none p-3"
                                placeholder="Write your comment..."
                                {...register("comment")}
                                value={inputComment}
                                onChange={(e) => setInputComment(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            type="button"
                            className="w-28 h-14 mt-10 ml-4 rounded font-semibold bg-green hover:bg-cream text-white font-sans"
                        >
                            Submit
                        </button>
                    </div>
                    {/* Display comments */}

                    {comments.map((comment, index) => (
                        <div key={index} className="mt-10">
                            <div className="flex items-start w-full h-full">
                                <div className="h-10 w-13 rounded-full overflow-hidden">
                                    <img title="comment img" src={comment.photoURL} alt="Commenter Profile" className="object-cover w-full h-full" />
                                </div>
                                <div className="ml-3">
                                    <div className="flex items-center mb-1">
                                        <p className="font-bold">{comment.name}</p>
                                        <div className="ml-2">

                                        </div>
                                    </div>
                                    <p className="font-sans">
                                        <span className="bg-gray-200 px-2 rounded-md font-mono mr-2">{blog.yourName}:</span>
                                        <span className="italic">{comment?.comment}</span>
                                    </p>
                                    <div className="mt-1 gap-5">
                                        <button
                                            onClick={() => handleCommentLikeOrDislike("like", comment?._id)}
                                            disabled={comment?.disableLike}
                                            className="text-blue mr-2"
                                        >
                                            <MdThumbUp className="mt-1 ml-7" /><span className="ml-7">{comment?.likes}</span>
                                        </button>
                                        <button
                                            onClick={() => handleCommentLikeOrDislike("dislike", comment?._id)}
                                            disabled={comment?.disableDislike}
                                            className="text-red-600"
                                        >
                                            <MdThumbDown className="mt-1 ml-7" /><span className="ml-7">{comment?.dislikes}</span>
                                        </button>
                                        <button onClick={() => handleCommentReport(comment?._id)} className="relative z-10 ring-2 ring-white">
                                            <FiFlag className="mb-4 ml-7" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default BlogDetails;
