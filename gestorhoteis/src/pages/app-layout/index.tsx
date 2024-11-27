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
                    <Link to="/">Logo</Link> 
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
