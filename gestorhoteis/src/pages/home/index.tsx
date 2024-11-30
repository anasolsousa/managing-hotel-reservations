import { useEffect, useState } from "react";
import Countries from "../../components/Countries";
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";

type Hotel = {
    id: string,
    name: string;
    location: string;
}

export function Home(){

    const navigate = useNavigate();
    
    // serve para armazenar o pais selecionado
    const [selectCountryId, setSelectCountryId] = useState<string>("");
    const [hotels, setHotels] = useState<Hotel[]>([]);
    
     // armazena o hotel selecionado - null porque nao tem nenhum selecionado 
     const [detailsHotel, setDetailsHotel] = useState<Hotel | null>(null);

    // funcao é chamada ao selecionar o pais
    const handelCountrySelect = (countryId: string) => {
        setSelectCountryId(countryId);
    }
    // funcao é chamada ao selecionar o hotel
    const handelHotelSelect = (hotel: Hotel) => {
        navigate("/details", { state: hotel });
    }
    
    useEffect(() =>{
        if(selectCountryId) {
                fetchHotels(selectCountryId);
        }
    }, [selectCountryId]); // atualizar sempre que o pais mudar

    async function fetchHotels() {
    
            setHotels([]); // limpar dados antigos dos hoteis
            setDetailsHotel(null);

            fetch("https://api-tma-2024-production.up.railway.app/hotels", {
                 method: "GET"
            }).then((response) => response.json())
                .then((data) => {
                    const filteredHotels = data.hotels.filter(
                        (hotel: any) => hotel.countryId === selectCountryId
                    );
                    setHotels(filteredHotels); // atualizar estado dos hoteis
            })
            .catch((error) => console.error(error));
    }

    return(
        <main>
            <header>
                <h1 className={styles.title}>
                    Choose the country of your dreams... and if the budget <br/> doesn't allow it, choose another one!
                </h1>
                <div>
                    <Countries onChange={handelCountrySelect}/>
                </div>
                <div>
                    <h1 className={styles.SubTitle}>Hotels</h1>
                    <>
                        <ul className={styles.ul}>
                            {hotels.map((hotel) => (
                                
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
                                        onClick={() => handelHotelSelect(hotel)}
                                        >
                                        Details
                                    </button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </>
                </div>
            </header>
        </main>
    )
}