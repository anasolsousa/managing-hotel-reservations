import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Users } from "../../components/User";
import iconEmail from "../../assets/icons/mail.svg";
import iconLogOut from "../../assets/icons/log-out.svg";

export function Profile(){

  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // verificar se esta logado

   // fazer log out
   const handleLogout = () => {
      // Remover o token do localStorage
      localStorage.removeItem("token");

      // Redirecionar para a página de login
      navigate("/");
    };

  return(
    <main>
      <div className={styles.content}>
        <h1 className={styles.title}>User Profile</h1>
          <div className={styles.container}>
              <section className={styles.columnOne}>
                  <Users/>
                  {/* botao */}
                  <div className={styles.changeEmail}>
                    <img className="svg" src={iconEmail} /> 
                    <button onClick={() => navigate("/UpdateEmail")}>Change Email</button>
                  </div>
                 {/* botao */}
                <div>
                    {isLoggedIn && (
                        <div className={styles.UserLogOut}>
                           <img className="svg" src={iconLogOut} /> 
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
              </section>
            <section className={styles.section}>
              <div>
                <h2>Suas Estadias</h2>
                <p>Aqui é as estadias</p>
              </div>
              <div>
                <h2>Suas Reviews</h2>
                <p>Aqui é as Reviewa</p>
              </div> 
            </section>
          </div>
      </div>   
    </main>
  )
}