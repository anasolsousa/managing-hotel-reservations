import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type User = {
    name: string,
    email:  string,
    birthDate: string,
  }

export function Users(){


    const [user, setUser] = useState<User| null>(null);


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
         .then(async(Response) => {
                 const data = await Response.json(); 
                 console.log(data);
                 setUser(data.user);
             })
     }

     return (
      <div>
        <div className={styles.user}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
            <p className={styles.userName}>{user?.name}</p>
        </div>
          <p className={styles.userEmail}>{user?.email}</p>
          <p className={styles.userBirth}>{user?.birthDate.split("T")[0]}</p>
      </div>
     );

  }

