import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/app-layout";
import { SignUp } from "./pages/sign-up";
import { SignIn } from "./pages/sign-in";
import { Home } from "./pages/home";
import { Details } from "./pages/Details";
import { Profile } from "./pages/Profile/index";


export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: "/Home",
                element: <Home/>
            },
            {
                path: "/SignUp",
                element: <SignUp/>
            },
            {
                path: "/SignIn",
                element: <SignIn/>
            },
            {
                path: "/Details/:id",
                element: <Details/>
            },
            {
                path: "/Profile",
                element: <Profile/>
            },
        ]
    }
])