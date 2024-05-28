import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri"
import { useContext, useState, useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import FullscreenModal from "../Components/FullScreenImg";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import NotPost from "../Profile/NotPost";
import DOMPurify from 'dompurify';




const YourBlogs = () => {
    const { user } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://blog-app-backend-toa9.onrender.com/yourBlogs/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setIsLoading(false);
            });
    }, [searchText, user]);


    const handleSearch = () => {
        const filter = blogs.filter(
            (blog) =>
                blog.blogTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
                blog.yourName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        setBlogs(filter);
        setIsLoading(false);
    };


    // Function to truncate the description to a maximum of 20 words
    const truncateDescription = (text) => {
        if (text?.length > 100) {
            return text.slice(0, 100) + '...';
        }
        return text;
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            iconColor: "red",
            confirmButtonColor: "#05fb4b",
            cancelButtonColor: "red",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://blog-app-backend-toa9.onrender.com/delete-blog/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.acknowledged === true) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                                iconColor: "#05fb4b",
                                confirmButtonColor: "#05fb4b",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = 'https://blog-hub-69.netlify.app/my-blogs';
                                }
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to delete the file.",
                            icon: "error",
                            iconColor: "red",
                        });
                    });
            }
        });
    };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"My Blogs"} path={"My Blog"} />
            <div className="my-blogs-container">
                <div className="search-box p-2 text-center mb-2">
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-green hover:bg-cream text-white font-semibold px-8 py-2 rounded-sm mb-4"
                    >
                        Search
                    </button>
                </div>

                <div className="py-1 bg-greenGray-50">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="flex md:flex-row gap-4 flex-col items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        <h3 className="font-semibold text-base text-blueGray-700">
                                            All Blogs
                                        </h3>
                                    </div>
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                        <Link
                                            to="/post-blog"
                                            className="bg-green text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        >
                                            Post A New Blog
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="block w-full overflow-hidden">
                                <div className="items-center bg-transparent w-full border-collapse ">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center h-20">
                                            <p><Loading /></p>
                                        </div>
                                    ) : (
                                        blogs.length > 0 ?
                                            <div>
                                                {blogs.map((blog, index) => (
                                                    <div key={index}>
                                                        <section className="card">
                                                            <div className="flex gap-10 flex-col w-full sm:flex-row items-start">
                                                                {blog.imageSrc && (
                                                                    <img title="blog img" src={blog.imageSrc} alt="Uploaded Image" className="card-img gap-4 w-44 h-44 rounded border-1 mb-4"
                                                                        style={{ objectFit: 'cover', borderRadius: '50% ' }} onClick={() => setIsModalOpen(true)} />
                                                                )}
                                                                <Link to={`/blogs/${blog._id}`}>
                                                                    <div>
                                                                        <div className="flex -space-x-2 gap-5 overflow-hidden">
                                                                            {
                                                                                blog.profileURL ? <> <img
                                                                                    className="inline-block h-7 mb-4 w-7 rounded-full ring-2 ring-white"
                                                                                    src={blog.profileURL}
                                                                                    alt="profile image"
                                                                                /></> : <> <img
                                                                                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                                                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                                    alt="default profile image"
                                                                                /></>
                                                                            }

                                                                            <h4 className="text-primary mb-1 text-xl">{blog.yourName}</h4>
                                                                        </div>
                                                                        <h3 className="text-lg font-semibold mb-2">{blog.blogTitle}</h3>

                                                                        <div className="t text-primary/70 text-base flex flex-wrap gap-4 mb-2">
                                                                            <span className="flex items-center gap-2 "><FiMapPin className=" text-orange-500" /> {blog.blogLocation}</span>
                                                                            <span className="flex items-center gap-2"><FiCalendar className=" text-pink-500" /> {blog.postingDate}</span>
                                                                        </div>
                                                                        <div className="text-base text-primary/70 w-full text-justify text-align-last-justify first-letter:text-3xl first-letter:capitalize">
                                                                            <div
                                                                                className="text-gray-800 min-w-full leading-relaxed mb-6"
                                                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncateDescription(blog.description)) }}
                                                                            />
                                                                        </div>
                                                                        <div className="mt-10 mb-4">
                                                                            {blog.tags && blog.tags.map((tag, index) => (
                                                                                <span key={index} className="text-green bg-gray-100  px-2 py-1 text-sm rounded-md mr-2"># {tag.label} </span>
                                                                            ))}
                                                                        </div>

                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className=" mt-5">
                                                                <button><Link to={`/edit-blog/${blog._id}`}><FaEdit className=" text-2xl ml-5 mr-3 text-slate-950" /></Link></button>
                                                                <button onClick={() => handleDelete(blog._id)}>
                                                                    <RiDeleteBinLine className="text-2xl text-slate-950 ml-3" />
                                                                </button>
                                                            </div>
                                                        </section>
                                                    </div>
                                                ))}
                                            </div> :
                                            <div className="mt-10 mb-16 md:p-0 p-10">
                                                <NotPost />
                                            </div>
                                    )

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <FullscreenModal onClose={() => setIsModalOpen(false)} imageSrc={blogs.filter(blog => blog.imageSrc)[0]?.imageSrc} />}
        </div>
    );
};

export default YourBlogs;