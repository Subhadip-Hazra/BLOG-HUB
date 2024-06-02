import { Html } from '@react-three/drei'

const LoaderImg = () => {
    return (
        <Html>
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="relative w-20 h-20">
                    <div className="w-full h-full border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-50"></div>
                </div>
            </div>
            <style>{`
                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </Html>
    )
}

export default LoaderImg
