import { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

// definir a tipagem do obejeto
type country = {
    id: string;
    name: string;
}

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

    export function Home(){
        
        // usada para navegar para outra página
        const navigate = useNavigate();

        // armazena o hotel selecionado - null porque nao tem nenhum selecionado 
        const [hotels, setHotels] = useState<infoHotel[]>([]);
        const [countryHotels, setCountryHotels] = useState<infoHotel[]>([]);
        const [countries, setCountries] = useState<country[]>([]);
        
        // funcao para atualizar e mostar novos dados
        useEffect(() =>{
            fetchHotels();
            fetchCountries();
        }, []); // atualizar sempre que o pais mudar
        
        async function fetchHotels() {

            await fetch("https://api-tma-2024-production.up.railway.app/hotels")
            .then(async(Response) => {
                    const data = await Response.json(); // estrair dados
                    console.log(data); // verificar 
                    setHotels(data.hotels);
                })
                
        }

        async function fetchCountries() {

            await fetch("https://api-tma-2024-production.up.railway.app/countries")
            .then(async(Response) => {
                    const data = await Response.json(); // estrair dados
                    console.log(data); // verificar 
                    setCountries(data.countries);
                })
        }


        return(
            <div className={styles.content}>

                <h1 className={styles.title}>
                    Choose the country of your dreams... and if the budget <br/> doesn't allow it, choose another one!
                </h1>
                <div className={styles.select}>
                    <select className={styles.countrySelect} onChange={(event) => {
                        setCountryHotels(
                            hotels.filter((hotel) => {
                                return hotel.country.id === event.target.value;
                            })
                        );
                    }}>
                        <option value=""> Select Country </option>
                        {countries.map((country) => {
                            return <option value={country.id}>{country.name}</option>
                        })}
                    </select>
                </div>
              

                    <div>
                        <h2 className={styles.SubTitle}>Hotels</h2>
                            <ul className={styles.ul}>
                                {countryHotels.map((hotel) => (
                                    <div  className={styles.Card}>
                                        <div>
                                            <li key={hotel.id} 
                                                className={styles.CardName}>{hotel.name} <p>{hotel.averageReview}</p>
                                               <Star color="gray" width={18}/>

                                            </li>
                                            <li 
                                                className={styles.CardLocation}>{hotel.location}
                                            </li>
                                        </div>
                                    <div>
                                        <button
                                            className={styles.moreDetails} 
                                            onClick={() => {
                                                // serve para passar a listagem dos hoteis, para passar o id para a url
                                                navigate(`/Details/${hotel.id}`, {state: {hotels: countryHotels}});
                                            }}
                                            >
                                            Details
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </ul>
                    </div>
            </div> 
        )
    }

    