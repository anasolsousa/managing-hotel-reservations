import { useParams, useLocation } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import styles from "./styles.module.css";
import img from "../../../public/star.svg";

// definir a tipagem do obejeto

type infoHotel = {

    id: string;
    name: string;
    description: string;
    location: string;

    country: {
        id: string;
        name: string;
    }

    cancellationPolicy: {
        id: string;
        name: string;
    }
    
    rooms: {
        id: string;
        type: string;
        price: number;
        
        images: {
            id: string;
            url: string;
            roomId: string;
        }

        bookings: {
            reviwes: {
                id: string;
                bookingId: string;
                rating: number;
                comment: string;
            }
        }
    }

    amenities: string;

    hotelAmenity:{
        amenity: {
            name: string;
        }    
    }
    averageReview: number;
}

export function Details() {
  const { id } = useParams(); // Captura o ID da URL
  const location = useLocation();
  const { hotels } = location.state || { hotels: [] };

  const [selectedHotel, setSelectedHotel] = useState<infoHotel | null>(null);

  useEffect(() => {
    if (id) {
      const hotel = hotels.find((hotel: { id: string; }) => hotel.id === id);
      setSelectedHotel(hotel || null);
    }
  }, [id, hotels]);

  if (!selectedHotel) {
    return <p>Informações não encontradas</p>;
  }
  
  return (
    <div className={styles.content}>
      <h1 className={styles.DetailsTitle}>Details {selectedHotel.name}</h1>
      <div>
        {/* info geral hotel */}
        <div className={styles.cardHotel}>
            <div className={styles.Cardcolumm}>
                <div className={styles.cardHeader}>
                    <div className={styles.heTitle}>
                        <p className={styles.title}>{selectedHotel.name}</p>
                        <p className={styles.averageReview}>
                            {selectedHotel.averageReview} 
                            <img src={img} /> 
                        </p>
                </div>
                <div className={styles.loc}>
                    <p>{selectedHotel.country.name}, {selectedHotel.location}</p>
                </div>

                </div>
                <div className={""}>
                    <p>{selectedHotel.description}</p>
                    <p>Política de Cancelamento: {selectedHotel.cancellationPolicy.name}</p>
                </div>
                <div>
                    <p>{selectedHotel.amenities}</p> 
                </div>
            </div> 
        </div> 

         {/* img hotel */}
        {selectedHotel.rooms.map((room) => (
            <div key={room.id}  className={styles.imghotel}>
                {room.images.map((img) => (
                    <img key={img.id} src={img.url}/>
                ))}  
            </div>
        ))} 
            
        {/* quartos hotel */}
        <div className={styles.cardRoom}>
            {selectedHotel.rooms.map((room) => (
                <div className={styles.room}>
                    <p className={styles.title}>{room.type}</p>
                    <p>Preço: {room.price} €</p>
                    <button>Reservar</button>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
