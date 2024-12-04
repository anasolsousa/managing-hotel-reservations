import { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
import img from "../../../public/star.svg";

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
        const [details, setDetails] = useState<infoHotel[]>([]);

        
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
        
        function Details() {

            return(
            <div className="content">
                <h1>Details</h1>
                {hotels.map((hotel) => (
                    <div key={hotel.id}>
                        <p>Nome: {hotel.name}</p>
                        <p>descricao: {hotel.description}</p>
                        <p>localizacao: {hotel.location}</p>
                        <p>pais: {hotel.country.name}</p>
                        <p>politica cancelamento: {hotel.cancellationPolicy.name}</p>
                        <p>{hotel.rooms.id}</p>
                         {/*// nao esta a funcionar ainda

                            <p>Quartos: {hotel.rooms.type}</p>
                            <p>Quartos preço: {hotel.rooms.price}</p>
                            <p>{hotel.images.url}</p>
                        */}
                        <p>comodidades: {hotel.amenities}</p> 
                        <p>estrelas: {hotel.averageReview}</p>
                        <br/><br/>
                    </div>
                ))}
            </div>
        
            )
        }
        
        return(
            <div className={styles.content}>

                <h1 className={styles.title}>
                    Choose the country of your dreams... and if the budget <br/> doesn't allow it, choose another one!
                </h1>

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

                    <div>
                        <h2 className={styles.SubTitle}>Hotels</h2>
                            <ul className={styles.ul}>
                                {countryHotels.map((hotel) => (
                                    <div  className={styles.Card}>
                                        <div>
                                            <li key={hotel.id} 
                                                className={styles.CardName}>{hotel.name} <p>{hotel.averageReview}</p>
                                                <img src={img}/>

                                            </li>
                                            <li 
                                                className={styles.CardLocation}>{hotel.location}
                                            </li>
                                        </div>
                                    <div>
                                        <button
                                            className={styles.moreDetails} onClick={(event) => {
                                                navigate("/Details")
                                            }}
                                            >
                                            Details
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </ul>
                    </div>

                    <p><Details/></p>

            </div> 
        )

        
    }

    