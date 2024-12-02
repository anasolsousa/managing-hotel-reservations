import { useEffect, useState } from "react";
import Countries from "../../components/Countries";
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";

// definir a tipagem do obejeto
type Hotel = {
    id: string,
    name: string;
    location: string;
    description: string;
}

type cancellationPolicy = {
  id: string;
  description: string;
}

{/* 
// array
type amenities = {
  id: string;
  name: string;
}
// array
type rooms = {
  id: string;
  name: string;
  bookings: [];
}

type bookings ={
  id: string;
  checkIn: string;
  checkOut: string;
}

type images = {
  id: string;
  url: string; 
}*/}


export function Home(){
    
    // usada para navegar para outra página
    const navigate = useNavigate();
    
    // armazena o pais selecionado
    const [selectCountryId, setSelectCountryId] = useState<string>("");
    // armazena a lista dos hoteis selecionados consuante o pais
    const [hotels, setHotels] = useState<Hotel[]>([]); 
     // armazena o hotel selecionado - null porque nao tem nenhum selecionado 
     const [detailsHotel, setDetailsHotel] = useState<Hotel | null>(null);

     const [cancellationPolicy, setcancellationPolicy] = useState<cancellationPolicy[]>([]); 

    // funcao é chamada ao selecionar o pais
    const handelCountrySelect = (countryId: string) => {
        setSelectCountryId(countryId); // atualiza consuante o pais
    }
    // funcao é chamada ao selecionar o hotel | e navega para página dos detalhes
    const handelHotelSelect = (hotel: Hotel) => {
        navigate("/details", { state: hotel });
    }
    
    // funcao para atualizar e mostar novos dados
    useEffect(() =>{
        if(selectCountryId) {
                fetchHotels(selectCountryId);
        }
    }, [selectCountryId]); // atualizar sempre que o pais mudar

    async function fetchHotels() {

            // limpar os dados anteriores e mostrar novos dados
            setHotels([]);
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