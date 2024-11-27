import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.css";


export function AppLayout(){

    // localizar página
    const location = useLocation()

    return(
        <main>
            <header>
                <div className={styles.conteiner}>
                    <div
                    className={styles.logo}>
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="30" 
                            height="30" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#f97316" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="lucide lucide-bed-double">
                                <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
                                <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
                                <path d="M12 4v6"/><path d="M2 18h20"/>
                        </svg>
                    </Link> 
                    </div>

                    <div className={styles.buttons}>
                        <div className={styles.button}>
                            <Link to="/SignUp">Create an Account</Link>
                        </div>
                        <div className={styles.button}> 
                            <Link to="/SignIn">Sign In</Link>
                        </div>
                    </div>
                    
                </div>
            </header>
                <div>
                    <ul className={styles.menu}> 
                        <Link to={"/"}
                            className={
                                // serve para ele ler e aplicar ou nao o active
                                location.pathname.includes("/")? styles.active: ""  
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
