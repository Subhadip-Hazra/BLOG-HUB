import React, { useContext, useEffect, useState } from 'react';
import PageHeader from '../Components/PageHeader';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import '../App.css'
import { FaPencil } from 'react-icons/fa6';
import Loading from '../Components/Loading';

const EditProfile = () => {
    const { email } = useParams();
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [profileURL, setProfileURL] = useState(null); // State to store profile image URL

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        fetch(`https://blog-app-backend-toa9.onrender.com/userProfile/${email}`)
            .then(response => response.json())
            .then(data => {
                setProfileData(data);
                reset(data);
            })
            .catch(error => console.error('Error fetching profile data:', error));
    }, [email, reset]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileSizeLimit = 10 * 1024 * 1024; // 10MB file size limit

        if (file && file.size > fileSizeLimit) {
            alert("File size exceeds the limit (10MB). Please choose a smaller file.");
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                compressImage(reader.result, (compressedImage) => {
                    setProfileURL(compressedImage); // Update profileURL state with compressed image
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

    const onSubmit = (data) => {
        // Include profileURL in the data object
        data.profileURL = profileURL;
        const { _id, ...postData } = data;
        fetch(`https://blog-app-backend-toa9.onrender.com/edit-profile/${email}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((result) => {
                if (result.success) {
                    showSuccessToast();
                } else {
                    showErrorToast(result.error);
                }
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                showErrorToast("Failed to update profile. Please try again later.");
            });
    };

    const showSuccessToast = () => {
        Swal.fire({
            icon: 'success',
            title: 'Profile Updated Successfully.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 700,
            timerProgressBar: true
        }).then(() => {
            window.location.href = `https://blog-hub-69.netlify.app/user-profile/${email}`;
        });
    };

    const showErrorToast = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
        });
    };

    if (!profileData) {
        return <div><Loading /></div>;
    }

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"Edit Profile"} path={"My Blog"} />
            <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="sm:w-52 sm:h-52 h-18 w-18 relative">
                            <img
                                src={profileURL || profileData.profileURL || "/default-profile-image.jpg"}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                            <label htmlFor="profilePhoto" className="absolute bottom-0 right-3 text-lg cursor-pointer">
                                <FaPencil />
                            </label>
                            <input
                                id='profilePhoto'
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="lg:w-1/2 w-full mt-5">
                            <label className="block mb-2 text-lg">Full Name <span className="text-red-500">*</span></label>
                            <input
                                placeholder="Ex: John Doe"
                                {...register("yourName")}
                                defaultValue={user?.displayName}
                                className="create-blog-input"
                                required
                            />
                        </div>
                        <div className="lg:w-1/2 w-full mt-5">
                            <label className="block mb-2 text-lg">GitHub</label>
                            <input
                                placeholder=" https://"
                                {...register("githubUrl")}
                                className="create-blog-input"
                                // className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="create-blog-flex mt-10">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">FaceBook</label>
                            <input
                                placeholder=" https://"
                                {...register("facebookUrl")}
                                className="create-blog-input"
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Linkedin</label>
                            <input
                                placeholder=" https://"
                                {...register("linkedinUrl")}
                                className="create-blog-input"
                            />
                        </div>
                    </div>
                    <div className="create-blog-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Instagram</label>
                            <input
                                placeholder=" https://"
                                {...register("instagramUrl")}
                                className="create-blog-input"
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Date of Birth <span className="text-red-500">*</span></label>
                            <input
                                {...register("dateOfBirth")}
                                className="create-blog-input"
                                type='date'
                                required
                                defaultValue="01-01-01"
                            />
                        </div>
                    </div>
                    <div className="create-blog-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">School Name</label>
                            <input
                                placeholder="Ex: Abc High School"
                                {...register("highSchool")}
                                className="create-blog-input"
                                defaultValue="Not specified"
                            />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">University Name</label>
                            <input
                                placeholder="Ex: Xyz University"
                                {...register("universityName")}
                                className="create-blog-input"
                                defaultValue="Not specified"

                            />
                        </div>
                    </div>
                    <div className="create-blog-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Relationship</label>
                            <select {...register("relation")} className="create-blog-input">
                                <option value="Single">Single</option>
                                <option value="In a relationship">In a Relationship</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Gender <span className="text-red-500">*</span></label>
                            <select {...register("gender")} required className="create-blog-input">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <label className="block mb-2 text-lg">Personal Website</label>
                        <input
                            placeholder="Ex: https://personal-website.com"
                            {...register("personalWeb")}
                            className="create-blog-input"
                            defaultValue="Not specified"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Bio </label>
                        <textarea
                            className="w-full pl-3 py-1.5 focus:outline-none create-blog-input"
                            rows={3}
                            {...register("userBio")}
                            placeholder="Write your bio"
                            defaultValue="This is the default bio."
                        />
                    </div>
                    <div className="pb-12">
                        <button
                            type="submit"
                            className="block mt-12 bg-green hover:bg-cream  text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
