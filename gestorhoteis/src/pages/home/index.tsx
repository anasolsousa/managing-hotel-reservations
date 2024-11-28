import { useEffect, useState } from "react";
import Countries from "../../components/Countries";
import styles from "./styles.module.css"
export function Home(){
    
    // serve para armazenar o pais selecionado
    const [selectCountryId, setSelectCountryId] = useState<string>("");
    const [hotels, setHotels] = useState<any[]>([]);

    // funcao é chamada ao selecionar o pais
    const handelCountrySelect = (countryId: string) => {
        setSelectCountryId(countryId);
    }

    useEffect(() =>{
        if(selectCountryId){
            
            setHotels([]); // limpar dados antigos dos hoteis

            fetch("https://api-tma-2024-production.up.railway.app/hotels")
                .then((response) => response.json())
                .then((data) => {
                    const filteredHotels = data.hotels.filter(
                        (hotel: any) => hotel.countryId === selectCountryId
                    );
                    setHotels(filteredHotels); // atualizar estado dos hoteis
            })
            .catch((error) => console.error(error));
        }
        }, [selectCountryId] // atualizar sempre que o pais mudar
    );


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
                                        <li key={hotel.countryId} 
                                            className={styles.CardName}>{hotel.name}
                                        </li>
                                        <li 
                                            className={styles.CardLocation}>{hotel.location}
                                        </li>
                                    </div>
                                    <div>
                                        <button>click</button>
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