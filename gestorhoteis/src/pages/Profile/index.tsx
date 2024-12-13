import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

    const location = useLocation();
    const navigate = useNavigate();

    // verificar se esta logado
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        // Remover o token do localStorage
        localStorage.removeItem("token");

        // Redirecionar para a página de login
        navigate("/");
    };

export function Profile() {

  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Reservado para utilizadores autenticados</h1>
      <p>Bem-vindo à sua página de perfil.</p>
      <div>
          {isLoggedIn && (
              <div className={styles.button}>
                  <button onClick={handleLogout}>Logout</button>
              </div>
          )}
      </div>
      
    </div>
  );
}
 
    
    