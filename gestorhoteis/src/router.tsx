import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/app-layout/index";
import { Countries } from "./pages/Countries";

export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: "/Countries",
                element: <Countries/>
            },
        ]
    }
])