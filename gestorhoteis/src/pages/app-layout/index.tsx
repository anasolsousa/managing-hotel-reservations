import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.css";

export function AppLayout(){

    // localizar página
    const location = useLocation()

    return(
        <div>
            <ul> 
                <Link to={"/Countries"}
                    className={
                        // serve para ele ler e aplicar ou nao o active
                        location.pathname.includes("/Countries")? styles.active: ""  
                    }
                    > 
                    <li>Countries</li>
                </Link>
            </ul>
            <Outlet/>
        </div>
    )
}
