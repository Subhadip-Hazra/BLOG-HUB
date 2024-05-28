import React from "react";
import { createBrowserRouter, } from "react-router-dom";
import App from '../App';
import Home from '../Pages/Home';
import YourBlogs from '../Pages/YourBlogs';
import CreateBlog from '../Pages/CreateBlog';
import UpdateBlog from '../Pages/UpdateBlog';
import Login from '../Pages/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import BlogDetails from "../Pages/BlogDetails";
import UserProfile from "../Pages/UserProfile";
import EditProfile from "../Pages/EditProfile";
import ContactUs from "../Pages/ContactUs";
import SignUp from "../Pages/SignUp";
import ForgetPassword from "../Pages/ForgetPassword";
import TermsAndConditions from "../Pages/termsCondition";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/my-blogs",
                element: <PrivateRoute><YourBlogs /></PrivateRoute>
            },
            {
                path: "/post-blog",
                element: <PrivateRoute><CreateBlog/></PrivateRoute>
            },
            {
                path: "/edit-blog/:id",
                element: <UpdateBlog/>,
                loader: ({ params }) => fetch(`https://blog-app-backend-toa9.onrender.com/all-blogs/${params.id}`)
            },
            {
                path: "/blogs/:id",
                element:<PrivateRoute><BlogDetails /></PrivateRoute>,
            },
            {
                path:"/user-profile/:email",
                element: <PrivateRoute><UserProfile/></PrivateRoute>,
                loader: ({ params }) => fetch(`https://blog-app-backend-toa9.onrender.com/userProfile/${params.email}`)
            },
            {
                path:"/edit-profile/:email",
                element: <PrivateRoute><EditProfile/></PrivateRoute>,
            },
            {
                path:"/user-contact-us/:email",
                element:<PrivateRoute><ContactUs/></PrivateRoute>
                
            },
            {
                path:"/terms-and-condition",
                element:<TermsAndConditions/>
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/sign-up",
        element:<SignUp/>
    },
    {
        path: "/forget-password",
        element:<ForgetPassword/>
    }
]);

export default Router;
