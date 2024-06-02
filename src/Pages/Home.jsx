import React, { useContext, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import UserCard from '../Components/UserCard';
import AssistantCard from '../Components/AssistantCard';
import Loader from '../Components/Loader'; // Ensure correct import path
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Grittings from '../Components/grittings';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [queries, setQueries] = useState([]); // State to store user queries
    const [output, setOutput] = useState([]); // State to store chatbot responses
    const [currentQuery, setCurrentQuery] = useState(''); // State to store current user query
    const [loading, setLoading] = useState(false); // State to manage loading
    const [check, setCheck] = useState(true);

    // Function to handle form submission
    const handleSubmit = () => {
        if (currentQuery.trim() === '') return; // Don't add empty queries
        setCheck(false);
        setQueries(prevQueries => [...prevQueries, currentQuery]); // Add current query to the list of queries
        sendToBackend(currentQuery); // Call sendToBackend function with the current query
        setCurrentQuery(''); // Clear the input field
    }

    async function sendToBackend(query) {
        setLoading(true);
        try {
            const response = await fetch('https://chatbot-backend-onan.onrender.com/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_message: query }),
            });
            if (!response.ok) {
                console.error('Failed to send response');
            }
            const data = await response.json();
            setLoading(false);
            setOutput(prevOutput => [...prevOutput, data.chatbot_response]); // Add the response to the output state
    
            // Save chat to history
            saveChatToHistory(user?.uid, query, data.chatbot_response);
        } catch (error) {
            console.error('Unable to send data to backend', error);
        }
    }
    
    async function saveChatToHistory(userId, query, response) {
        try {
            await fetch('https://chatbot-backend-onan.onrender.com/save_chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId, query, response }),
            });
        } catch (error) {
            console.error('Failed to save chat to history', error);
        }
    }
    

    return (
        <div className="max-w-screen-2xl md:px-20 fixed h-screen container overflow-hidden">
            <div className=' p-10 h-full bg-white'>
                <div className='input-box overflow-y-scroll mt-5'>
                    {check && <Grittings />}
                    {queries.map((query, index) => (
                        <React.Fragment key={index}>
                            <UserCard query={query} />
                            {loading && index === queries.length - 1 ? (
                                <Loader /> // Show loader for the latest query if still loading
                            ) : (
                                output[index] && <AssistantCard output={output[index]} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className='flex items-center gap-3 md:justify-center'>
                    <div className="flex md:rounded-s-md rounded border border-primary md:h-10 md:w-1/2 w-full">
                        <input
                            type="text"
                            name="userQuery"
                            id="userQuery"
                            value={currentQuery}
                            onChange={(e) => setCurrentQuery(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Ask me something..."
                        />
                        <FiSearch className="absolute mt-2.5 ml-2 mr-2 text-blue" />
                    </div>
                    {user ? (
                        <button type='button' onClick={handleSubmit} className='w-20 h-9 md:h-10 md:w-28 bg-blue rounded text-white'>Submit</button>
                    ) : (
                        <Link to='/login'><button type='button' className='w-20 h-9 md:h-10 md:w-28 bg-blue rounded text-white'>Submit</button></Link>
                    )}
                </div>
                <p className="text-center text-gray-500 text-xs mt-4">
                    &copy;2024 Subhadip Hazra. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Home;
