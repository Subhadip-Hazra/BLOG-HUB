/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from "react";
import emailjs from '@emailjs/browser';
import { Canvas } from "@react-three/fiber";
import useALert from "../hooks/useAlert";
import Fox from "../models/Fox";
import { LoaderImg, Alert } from "../Components";

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('idle');
    const { alert, showAlert, hideAlert } = useALert();

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleFocus = () => setCurrentAnimation('walk');
    const handleBlur = () => setCurrentAnimation('idle');
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation('hit');
        emailjs.send(
            serviceId,
            templateId,
            {
                from_name: form.name,
                to_name: 'Subhadip',
                from_email: form.email,
                to_email: 'subhadip03031996@gmail.com',
                message: form.message
            },
            publicKey
        ).then(() => {
            setIsLoading(false);
            showAlert({ show: true, text: 'Message Sent successfully!', type: 'success' });

            setTimeout(() => {
                hideAlert();
                setCurrentAnimation('idle');
                setForm({ name: '', email: '', message: '' });
            }, 3000);

        }).catch((error) => {
            setIsLoading(false);
            setCurrentAnimation('idle');
            showAlert({ show: true, text: 'Message not sent!', type: 'danger' });
        });
    };

    return (
        <div className="max-w-screen-2xl md:px-60 fixed h-screen container p-6 overflow-hidden">
            <section className="relative flex lg:flex lg:flex-row flex-col container h-[100vh]">
                {alert.show && <Alert {...alert} />}
                <div className="flex-1 min-w-[50%] flex flex-col">
                    <h1 className="mt-16 head-text text-black">Get in Touch</h1>
                    <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleSubmit}>
                        <label className="text-gray-900 font-semibold">
                            Name
                            <input
                                type="text"
                                name="name"
                                className="input"
                                placeholder="John"
                                required
                                value={form.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                            />
                        </label>
                        <label className="text-gray-900 font-semibold">
                            Email
                            <input
                                type="email"
                                name="email"
                                className="input"
                                placeholder="Enter your email..."
                                required
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                            />
                        </label>
                        <label className="text-gray-900 font-semibold">
                            Message
                            <textarea
                                name="message"
                                className="textarea"
                                placeholder="Enter your message..."
                                required
                                value={form.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                            />
                        </label>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='btn'
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        >
                            {isLoading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
                <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                    <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
                        <directionalLight intensity={2.5} position={[0, 0, 1]} />
                        <ambientLight intensity={0.5} />
                        <Suspense fallback={<LoaderImg />}>
                            <Fox
                                currentAnimation={currentAnimation}
                                position={[0.5, 0.35, 0]}
                                rotation={[0, -0.6, 0]}
                                scale={[0.5, 0.5, 0.5]}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </section>
        </div>
    );
};

export default Contact;
