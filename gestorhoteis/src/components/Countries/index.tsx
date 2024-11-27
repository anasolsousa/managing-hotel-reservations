import React from 'react';
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

// caracterizar dados
type Country = {
    id: string,
    name: string,
}

function Countries(){

     // useEffect para chamar o fechHoteis
     useEffect(() => {
        fetchCountries();
    }, []);

    // guardar informações da base de dados
    // [] = garante que o código só é executado uma vez (quando o componente é carregado).
    // Countries[] (final do código): Indica que o estado é uma lista de objetos que seguem o tipo Countries.
    const [countries, setCountries] = useState<Country[]>([]);

    const [filterByCountries, setFilterByCountries] = useState(0);

    async function fetchCountries() {

        await fetch('https://api-tma-2024-production.up.railway.app/countries', {
            method: "GET"
        }).then(async(Response) => {
            const data = await Response.json(); // estrair dados
            console.log(data); // verificar
            setCountries(data.countries);   // Atualiza   
        })
    }

    return (
        <main>
            <body>
                <select>
                    <option value="">Select...</option>
                    {
                        countries.map((country) => {
                            return(
                            <option value={country.id}>{country.name}</option>
                            )
                        })
                    }
                    </select>
            </body>  
        </main>
    )
}

// possa ser usado em outras partes do seu projeto
export default Countries;