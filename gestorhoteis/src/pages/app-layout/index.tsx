import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import { BedDouble } from "lucide-react";

export function AppLayout(){

    // localizar página
    const location = useLocation();
    const navigate = useNavigate();
    
    // verificar se esta logado
    const isLoggedIn = !!localStorage.getItem("token");


    return(
        <main>
            <header>
                <div className={styles.content}>
                       <BedDouble color="orange"/>
                        <div className={styles.buttons}>
                            {!isLoggedIn &&  (
                                <div className={styles.button}>
                                    <Link to="/SignIn">Sign In</Link>
                                </div>
                            )}
                                {isLoggedIn && (
                                    <div className={styles.button}>
                                        <button onClick={() => navigate("/Profile")}>Prefil</button>
                                    </div>
                                )}
                            </div>
                        </div>
            </header>
                <div>
                    <ul className={styles.menu}> 
                        <Link to={"/"}
                            className={
                                // serve para ele ler e aplicar ou nao o active
                                location.pathname.includes("/Home")? styles.active: ""  
                            }
                            > 
                            <li>Home</li>
                        </Link>
                    </ul>
                    <Outlet/>
                </div>
        </main>
        
    ) 
}