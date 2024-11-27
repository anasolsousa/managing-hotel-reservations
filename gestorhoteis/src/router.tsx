import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/app-layout/index";
import { SignUp } from "./pages/sign-up";
import { SignIn } from "./pages/sign-in";
import { Home } from "./pages/home";

export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: "/",
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
        ]
    }
])