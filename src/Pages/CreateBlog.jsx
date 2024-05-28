/* eslint-disable react/no-unknown-property */
import React, { useState, useContext, useEffect, useRef } from "react";
import swal from 'sweetalert2';
import PageHeader from "../Components/PageHeader";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { AuthContext } from "../context/AuthProvider";
import JoditEditor from "jodit-react";
import '../App.css';

const CreateBlog = () => {
    const [imageSrc, setimageSrc] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(' ');
    const currentDate = new Date().toISOString().split('T')[0];
    const editor = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`)
                    .then(response => response.json())
                    .then(data => setCurrentLocation(data.address.state))
                    .catch(error => console.error('Error fetching current location:', error));
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileSizeLimit = 10 * 1024 * 1024;

        if (file && file.size > fileSizeLimit) {
            alert("File size exceeds the limit (10MB). Please choose a smaller file.");
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                compressImage(reader.result, (compressedImage) => {
                    setimageSrc(compressedImage);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const compressImage = (base64Image, callback) => {
        const image = new Image();
        image.src = base64Image;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDimensions = 800;
            let width = image.width;
            let height = image.height;

            if (width > height) {
                if (width > maxDimensions) {
                    height *= maxDimensions / width;
                    width = maxDimensions;
                }
            } else {
                if (height > maxDimensions) {
                    width *= maxDimensions / height;
                    height = maxDimensions;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, width, height);

            const compressedImage = canvas.toDataURL('image/jpeg', 0.5);
            callback(compressedImage);
        };
    };

    const [selectedOption, setSelectedOption] = useState(null);

    const { user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        data.imageSrc = imageSrc;
        data.blogLocation = currentLocation;
        data.tags = selectedOption;
        data.description = content;

        fetch("https://blog-app-backend-toa9.onrender.com/post-blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.acknowledged === true) {
                    swal.fire({
                        title: 'Success!',
                        text: 'Blog Posted successfully.',
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonText: 'OK',
                        confirmButtonColor: "#05fb4b",
                        cancelButtonColor: "red",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'https://blog-hub-69.netlify.app/';
                        }
                    });
                    reset();
                }
            });
    };

    const options = [
        { value: "Short Story", label: "Short Story" },
        { value: "Travel", label: "Travel" },
        { value: "Fashion", label: "Fashion" },
        { value: "Technology", label: "Technology" },
        { value: "Politics", label: "Politics" },
        { value: "Programming", label: "Programming" },
        { value: "Photography", label: "Photography" },
        { value: "Anime", label: "Anime" },
        { value: "News", label: "News" },
    ];

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"Post A Blog"} path={"Post Blog"} />

            <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-1/2 w-full hidden">
                            <label className="mb-2 text-lg hidden">Profile Url <span className=" text-red-500">*</span></label>
                            <input
                                {...register("profileURL")}
                                value={user?.photoURL}
                                className="create-blog-input"
                                required
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Full Name <span className=" text-red-500">*</span></label>
                            <input
                                placeholder="Ex: John Doe"
                                {...register("yourName")}
                                value={user?.displayName}
                                className="w-full pl-3 py-1.5 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg ">Blog Location <span className=" text-red-500">*</span></label>
                            <input
                                placeholder="Ex: New York"
                                {...register("blogLocation")}
                                className="w-full pl-3 py-1.5 focus:outline-none"
                                value={currentLocation}
                            />
                        </div>
                    </div>
                    <div className="create-blog-flex">
                        <div className=" w-full">
                            <label className="block mb-2 text-lg">Blog Title  <span className=" text-red-500">*</span></label>
                            <input
                                placeholder="Ex: The Heaven"
                                {...register("blogTitle")}
                                className="create-blog-input"
                                required
                            />
                        </div>
                        <div className="lg:w-1/2 w-full hidden">
                            <label className="block mb-2 text-lg">Blog Posting Date <span className=" text-red-500">*</span></label>
                            <input
                                className="create-blog-input"
                                {...register("postingDate")}
                                placeholder="Ex: 2024-11-12"
                                value={currentDate}
                                type="date"
                                required
                            />
                        </div>
                    </div>

                    <div className="create-blog-flex">
                        <div className="w-full">
                            <label className="block mb-2 text-lg ">Upload Image <span className=" text-red-500">*</span></label>
                            <input type="file"
                                accept="image/*"
                                {...register("imageSrc")}
                                className="create-blog-input"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block mb-2 text-lg">Blog Description <span className="text-red-500">*</span></label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)}
                            onChange={newContent => {}}
                        />
                    </div>

                    <div className="">
                        <label className="block mb-2 text-lg">Add Tags <span className=" text-red-500">*</span></label>
                        <CreatableSelect
                            className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 rounded-md"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block mb-2 text-lg">Blog Posted by <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            value={user?.email}
                            className="w-full pl-3 py-1.5 focus:outline-none"
                            {...register("postedBy")}
                            placeholder="your email"
                            required
                        />
                    </div>

                    <input
                        type="submit"
                        className="block mt-12 bg-green text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
