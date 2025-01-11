import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Hotel } from "../../types";
import { Star } from "lucide-react";



export function Details() {

    const { id } = useParams(); // Captura o ID da URL
    const location = useLocation();
    const { hotels } = location.state || { hotels: [] };

    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const navigate = useNavigate();

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
                            </p>
                            <Star color="gray" width={18}/>
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
                    {selectedHotel.amenities.map((amenity, i) => (
                        <p key={i}>{amenity}</p>
                    ))}
                    </div>
                </div> 
            </div> 

            {/* img hotel */}
            {selectedHotel.rooms.map((room) => (
                <div key={room.id}  className={styles.imghotel}>
                    <div className={styles.cardRoom}>
                        <p className={styles.title}>{room.type}</p>
                        <p>Preço: {room.price} €</p>
                        <button
                            className={styles.button} 
                            onClick={() => {

                                const token = localStorage.getItem("token");

                                if (!token) {
                                    navigate("/SignIn"); 
                                    return;
                                }
                                // serve para passar o id para a url e algumas informações
                                navigate(`/newBooking/${room.id}`);
                            }}
                            >
                            Reservar
                        </button>
                    </div>
                    <div className={styles.images}>
                        {room.images.map((img) => (
                            <img key={img.id} src={img.url}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}