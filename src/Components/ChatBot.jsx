import Chatbot from 'react-simple-chatbot'
import { Segment } from 'semantic-ui-react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function ChatOn() {
    const { user } = useContext(AuthContext);

    // Basic chatbot whice I get  from react simple chatbot
    const handleIssueSubmit = async (issue) => {
        try {
            const response = await fetch('https://blog-app-backend-toa9.onrender.com/store-issue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ issue ,user: user?.email,userName : user?.displayName })
            });
            const data = await response.json();
            if (data.success) {
                //console.log("Issue stored successfully");
            } else {
                console.error("Failed to store issue");
            }
        } catch (error) {
            console.error("Error storing issue:", error);
        }
    };

    const steps = [
        {
            id: 'Greets',
            message: 'Hello,Welcome to Blog Hub',
            trigger: 'Ask Name'
        },
        {
            id: 'Ask Name',
            message: 'Please enter your name',
            trigger: 'waiting1'
        },
        {
            id: 'waiting1',
            user: true,
            trigger: 'Name'
        },
        {
            id: 'Name',
            message: `Hi {previousValue}, Please select your issue`,
            trigger: 'issues'
        },
        {
            id: 'issues',
            options: [
                {
                    value: 'Post Blog',
                    label: 'Post blog',
                    trigger: "Edit Blog"
                },
                {
                    value: 'Edit Blog',
                    label: 'Edit Blog',
                    trigger: "Delete Blog"
                },
                {
                    value: 'Delete Blog',
                    label: 'Delete Blog',
                    trigger: "Update Profile"
                },{
                    value:'Update Profile',
                    label:'Update Profile',
                    triger:'Others'
                },{
                    value:'Others',
                    label:'Others',
                    trigger:'Others'
                }
            ]
        },
        {
            id:'Post Blog',
            message:'Write your issue',
            trigger:'ending'
        },
        {
            id:'Edit Blog',
            message:'Write your issue',
            trigger:'ending'
        },
        {
            id:'Delete Blog',
            message:'Write your issue',
            trigger:'ending'
        },
        {
            id:'Update Profile',
            message:'Write your issue',
            trigger:'ending'
        },
        {
            id: 'Others',
            message:'Write your issue',
            trigger:'ending'
        },
        {
            id: 'ending',
            user:true,
            trigger: (previousValue) => {
                handleIssueSubmit(previousValue);
                    return 'end';
            }
        },
        {
            id: 'end',
            message: 'Thanks for telling your issues, We are contact you as soon as possible',
            end : true
        },
    ];
    return (
        <>
            <Segment floated="right">
                <Chatbot steps={steps} />
            </Segment>
        </>
    )
}