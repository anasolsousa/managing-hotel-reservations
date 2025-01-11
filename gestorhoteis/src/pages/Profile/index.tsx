import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Users } from "../../components/User";
import { useEffect, useState } from "react";
import { BookingsAndReviews} from "../../components/BookingsAndReviews"
import { LogOut, Mail } from "lucide-react";

  type booking = {
    id: string;
    roomId: string;
    startDate: Date;
    endDate: Date;
  }
  export function Profile(){

    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token"); // verificar se esta logado

    const [bookings, setBookings] = useState<booking[]>([]);
    const token = localStorage.getItem("token");

    // fazer log out
    const handleLogout = () => {
      // Remover o token do localStorage
      localStorage.removeItem("token");

      // Redirecionar para a página de login
      navigate("/");
    };

    useEffect(() => {
      fetchBookings();
    }, []);

    async function fetchBookings() {
      try{
        const response = await fetch("https://api-tma-2024-production.up.railway.app/booking", {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });

        if(response.ok){
          const data = await response.json();
          setBookings(data);
        }
        else{
          console.error("Erro")
        }
      } catch (error) {
        console.error(error)
      }
    }
    
    return(
      <main>
        <div className={styles.content}>
          <h1 className={styles.title}>User Profile</h1>
            <div className={styles.container}>
                <section className={styles.columnOne}>
                    <Users/>
                    {/* botao */}
                    <div className={styles.changeEmail}>
                      <Mail/>
                      <button onClick={() => navigate("/UpdateEmail")}>Change Email</button>
                    </div>
                  {/* botao */}
                  <div>
                      {isLoggedIn && (
                          <div className={styles.UserLogOut}>
                           <LogOut/>
                              <button onClick={handleLogout}>Logout</button>
                          </div>
                      )}
                  </div>
                </section>
                  <BookingsAndReviews/>
            </div>
        </div>   
      </main>
    )
  }