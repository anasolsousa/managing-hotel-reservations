import React, { FormEvent } from 'react';
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Hotel = {
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

type CountriesProps = {
    hotels: Hotel[];
    setCountryHotels: ([]: Hotel[]) => void;
}

// caracterizar dados
type Country = {
    id: string,
    name: string,
};

// possa ser usado em outras partes do seu projeto
export function Countries(props: CountriesProps) {

     // useEffect para chamar o fechHoteis
     useEffect(() => {
        fetchCountries();
    }, []);

    // guardar informações da base de dados
    // [] = garante que o código só é executado uma vez (quando o componente é carregado).
    // Countries[] (final do código): Indica que o estado é uma lista de objetos que seguem o tipo Countries.
    const [countries, setCountries] = useState<Country[]>([]);

    async function fetchCountries() {

        await fetch('https://api-tma-2024-production.up.railway.app/countries')
        .then(async(Response) => {
            const data = await Response.json(); // estrair dados
            console.log(data); // verificar
            setCountries(data.countries);   // Atualiza   
        })
    }

    return (
        <select className={styles.countrySelect} onChange={(event) => {
            props.setCountryHotels(props.hotels.filter((hotel) =>
                hotel.country.id === event.target.value
            ));
        }}>
            <option value=""> Select Country </option>

            {countries.map((country) => (
                <option key={country.id} value={country.id}>
                    {country.name}
                </option>
            ))}

        </select>
    )
}
