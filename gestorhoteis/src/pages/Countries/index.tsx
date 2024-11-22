import { useEffect, useState } from "react";

// caracterizar dados
type Country = {
    id: string,
    name: string,
}


export function Countries(){

    // useEffect para chamar o fechHoteis
    useEffect(() => {
        fetchCountries();
    }, []);

    // guardar informações da base de dados
    // [] = garante que o código só é executado uma vez (quando o componente é carregado).
    // Countries[] (final do código): Indica que o estado é uma lista de objetos que seguem o tipo Countries.
    const [countries, setCountries] = useState<Country[]>([]);

    async function fetchCountries() {

        await fetch('https://api-tma-2024-production.up.railway.app/countries', {
            method: "GET"
        }).then(async(Response) => {
            const data = await Response.json(); // estrair dados
            console.log(data); // verificar
            setCountries(data.countries);   // Atualiza   
        })
    }

    // mostrar os dados no ecra
    return(
       <div>
           {countries.map(country => (
            <p key={country.id}>{country.name}</p>
           ))}
       </div>
    );
}