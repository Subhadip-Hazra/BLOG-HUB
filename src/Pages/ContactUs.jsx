import React, { useState, useRef, useContext } from 'react';
import Contact from '../assets/image.gif';
import emailjs from '@emailjs/browser'; // Changed import to 'emailjs-com'
import Swal from 'sweetalert2';
import PageHeader from '../Components/PageHeader';
import { AuthContext } from '../context/AuthProvider';
import Footer from '../Components/Footer';


const ContactForm = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        message: ''
    });

    const form = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            to_name: formData.name,
            from_name: formData.email,
            message: formData.message
        };

        emailjs.sendForm('service_am9780i', 'template_qj3537l', form.current, 'oxAQk4lBr8vGnwR_L')
            .then((result) => {
                //console.log(result.text);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Message sent successfully!',
                });
                // Optionally, you can redirect to a success page or reload the current page
                window.location.href = 'https://blog-hub-69.netlify.app/';
            })
            .catch((error) => {
                //console.log(error.text);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to send message. Please try again later.',
                });
            });
    };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <PageHeader title={"Blog Details Page"} path={"Single Blog"} />
            <div className='flex justify-center'>
                <div className="max-w-md rounded px-8 w-full pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
                    <form ref={form} onSubmit={handleSubmit} className='text-text-color'>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <input
                                className="bg-card-color shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                className="bg-card-color shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2" htmlFor="message">Message</label>
                            <textarea
                                className="bg-card-color shadow appearance-none border rounded w-full h-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="flex justify-center w-24 text-center mx-auto bg-green hover:bg-blue font-bold py-2 px-4 rounded focus:outline-none text-white focus:shadow-outline"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <img title='contact' src={Contact} className="ml-56 md:block mt-12 w-1/3 h-1/2 hidden" alt="Contact" />
            </div>
            <Footer/>
        </div>
    );
};

export default ContactForm;
