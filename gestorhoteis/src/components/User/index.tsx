import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { User } from "lucide-react";
import { Booking, InfoUser } from "../../types";



export function Users(){


    const [user, setUser] = useState<InfoUser| null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);


    useEffect(() =>{
       fetchUser();
       }, []); 
   
       async function fetchUser() {
       // obter o token
       const token = localStorage.getItem("token");
   
   
         await fetch("https://api-tma-2024-production.up.railway.app/me", {
           headers: {
             Authorization: `Bearer ${token}`, // ir buscar os dados api
             "Content-Type": "application/json",
           },
         })
         .then(async(response) => {
                 const data = await response.json(); 
                 console.log(data);
                 setUser(data.user);
                 setBookings(data.bookings);
             })
     }

     return (
      <div>
        <div className={styles.user}>
           <User/>
            <p className={styles.userName}>{user?.name}</p>
        </div>
          <p className={styles.userEmail}>{user?.email}</p>
          <p className={styles.userBirth}>{user?.birthDate.split("T")[0]}</p>
      </div>
     );

  }

