import { useEffect, useState, FormEvent } from "react";
import { Booking, InfoUser } from "../../types";


export function BookingsAndReviews(){

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
        Authorization: `Bearer ${token}`,
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
           <div>
              {bookings.map((booking) => (
                <div key={booking.id}>
                  <p>Check-in: {booking.checkIn.split("T")[0]}</p>
                  <p>Check-out: {booking.checkOut.split("T")[0]}</p>
                  <br />
                </div>
              ))}
           </div>
        </div>
      );
  }

