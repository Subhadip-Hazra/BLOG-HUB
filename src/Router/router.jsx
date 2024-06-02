import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home,Docs,Login,Signup, Settings,Contact } from "../Pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "/" ,
                element: <Home/>
            },
            {
                path: "/legal",
                element : <Docs/>
            },
            {
                path:"/contact-us",
                element:<Contact/>
            }
        ],
    },
    {
        path: "/login",
        element:<Login/>
    },
    {
        path:"/sign-up",
        element:<Signup/>
    },
    {
        path:"/settings",
        element:<Settings/>
    }
]);

export default router;