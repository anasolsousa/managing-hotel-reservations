import { useEffect, useState } from "react";
import {Countries} from "../../components/Countries";
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";

// definir a tipagem do obejeto
type country = {
    id: string;
    name: string;
}

type detailsHotel = {

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
            url: string;
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
    hotelAmenity:{
        amenity: {
            name: string;
        }    
    }
    averageReview:{
        mumber: number;
    }
}


export function Home(){
    
    // usada para navegar para outra página
    const navigate = useNavigate();

     // armazena o hotel selecionado - null porque nao tem nenhum selecionado 
    const [hotels, setHotels] = useState<detailsHotel[]>([]);
    const [countryHotels, setCountryHotels] = useState<detailsHotel[]>([]);
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
        <main>
            <header>
                <h1 className={styles.title}>
                    Choose the country of your dreams... and if the budget <br/> doesn't allow it, choose another one!
                </h1>
                <div>
                    <h1 className={styles.SubTitle}>Hotels</h1>

                    <select onChange={(event) => {
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
                    
                        <ul className={styles.ul}>
                            {countryHotels.map((hotel) => (
                                
                                <div  className={styles.Card}>
                                    <div>
                                        <li key={hotel.id} 
                                            className={styles.CardName}>{hotel.name}
                                        </li>
                                        <li 
                                            className={styles.CardLocation}>{hotel.location}
                                        </li>
                                    </div>
                                    <div>
                                    <button
                                        className={styles.moreDetails}
                                        onClick={() => {}}
                                        >
                                        Details
                                    </button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    
                </div>
            </header>
        </main>
    )
}