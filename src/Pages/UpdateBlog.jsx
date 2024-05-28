import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from '../Components/PageHeader';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import { useLoaderData, useParams } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";

const UpdateBlog = () => {
    const { id } = useParams();
    const [imageSrc, setimageSrc] = useState(null);
    const { yourName, blogTitle, blogLocation, postingDate, description,tags } = useLoaderData();
    const [selectedOption, setSelectedOption] = useState(null);
    const { user } = useContext(AuthContext);
    const currentDate = new Date().toISOString().split('T')[0];
    const [currentLocation,setCurrentLocation] = useState(' ');

    useEffect(() => {
        // Fetch user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Convert coordinates to human-readable location
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.tags = selectedOption;
        data.imageSrc = imageSrc;
        data.blogLocation = currentLocation;
        fetch(`https://blog-app-backend-toa9.onrender.com/update-blog/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.acknowledged === true) {
                    showSuccessToast();
                } else {
                    showErrorToast("Blog Update Failed");
                }
            })
            .catch((error) => {
                console.error("Error updating blog:", error);
                showErrorToast("Failed to update blog. Please try again later.");
            });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileSizeLimit = 100 * 1024 * 1024; // 10MB file size limit (adjust as needed)

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
            const maxDimensions = 800; // Maximum dimensions for the compressed image
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

            const compressedImage = canvas.toDataURL('image/jpeg', 0.2); // Adjust quality as needed
            callback(compressedImage);
        };
    };

    const options = [
        { value: "Short Story", label: "Short Story" },
        { value: "Trvel", label: "Travel" },
        { value: "Fashion", label: "Fashion" },
        { value: "Technology", label: "Technology" },
        { value: "Polities", label: "Polities" },
        { value: "Pogramming", label: "Pogramming" },
        { value: "Photography", label: "Photography" },
        { value: "Anime", label: "Anime" },
        { value: "News", label: "News" },
    ];

    const showSuccessToast = () => {
        Swal.fire({
            title: 'Success!',
            text: 'Blog Updated Successfully.',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: "#05fb4b",
            cancelButtonColor: "red",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'https://blog-hub-69.netlify.app/my-blogs';          }
        });
    };

    const showErrorToast = (message) => {
        Swal.fire({
            title: 'Some Unknown Error Occurred',
            text: message,
            icon: 'error'
        });
    };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"Edit Blog"} path={"Edit Blog"} />
            <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Your Name <span className=" text-red-500">*</span></label>
                            <input
                                value={yourName}
                                {...register("yourName", { required: true })}
                                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 rounded-md"
                            />
                            {errors.yourName && <span className="text-red-500">Your name is required</span>}
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg ">Blog Location <span className=" text-red-500">*</span></label>
                            <input
                                {...register("blogLocation")}
                                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 rounded-md"
                                value={currentLocation}
                            />
                        </div>
                    </div>
                        {/* 3rd row */}
                        <div className="create-blog-flex">
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
                        <div className=" w-full">
                            <label className="block mb-2 text-lg">Blog Title  <span className=" text-red-500">*</span></label>
                            <input
                                placeholder="Ex: The Heaven"
                                defaultValue={blogTitle}
                                {...register("blogTitle")}
                                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 hover:border-blue"
                                required
                            />
                        </div>
                    </div>

                    {/* 5th row */}

                    {/* Other input fields */}
                    <div className="create-blog-flex">
                        <div className="w-full">
                            <label className="block mb-2 text-lg ">Upload Image <span className=" text-red-500">*</span></label>
                            <input
                                type="file"
                                accept='image/*'
                                {...register("imageSrc", { required: true })}
                                className="create-blog-input"
                                onChange={handleFileChange}
                                defaultValue={imageSrc}
                            />
                            {errors.imageSrc && <span className="text-red-500">Image is required</span>}
                        </div>
                    </div>
                    {/* 7th row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Blog Description <span className=" text-red-500">*</span></label>
                        <textarea
                            className="w-full pl-3 py-1.5 focus:outline-none border-2 hover:border-blue"
                            rows={10}
                            {...register("description")}
                            placeholder="Blog Description"
                            defaultValue={description}
                            required
                        />
                    </div>

                    <div className="">
                        <label className="block mb-2 text-lg">Add Tags <span className=" text-red-500">*</span></label>
                        <CreatableSelect
                            className="create-blog-input py-4"
                            defaultValue={tags}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            required
                        />
                    </div>
                    {/* last row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Blog Posted by <span className=" text-red-500">*</span></label>
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

export default UpdateBlog;
