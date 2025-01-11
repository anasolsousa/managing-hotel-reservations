import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Home } from "../home";
import { useNavigate } from "react-router-dom";

type country = {
    id: string;
    name: string;
}

export function SignUp(){

    // useSate() = guardar os dados do ultilizador
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birth_date, setbirth_date] = useState("");
    const [country_id, setCountry_id] = useState("");
    const [terms, setTerms] = useState(false); // boolean

    // armazenar o country selecionado
    const [countries, setCountries] = useState<country[]>([]);
    const navigate = useNavigate();

    useEffect(() =>{
        fetchCountries();
      }, []); 

    async function fetchCountries() {

        await fetch("https://api-tma-2024-production.up.railway.app/countries")
        .then(async(Response) => {
                const data = await Response.json(); // estrair dados
                console.log(data); // verificar 
                setCountries(data.countries);
            })
    }

    async function handleCreateNewAccount(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();
        
            try {
                await fetch("https://api-tma-2024-production.up.railway.app/sign-up", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        // formatar o corpo.
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password,
                            birth_date: birth_date,
                            country_id: country_id,
                            terms: terms
                        })
                    }) // O status da response (200 para sucesso ou 404 para erro)
                    .then(async (response) => {
                        return {
                            response,
                            data: await response.json()
                        }
                    }) // ve a resposta da api
                    .then(({data,response}) => {
                        console.log(data);
        
                        // 201 - indica que algo foi criado com sucesso
                        if(response.status === 201){
                            localStorage.setItem("token", data.token)
                            navigate("/Profile");
                        }   
                    }) // se der algum erro sera mostrado aqui
                }catch(e) {
                    console.log(e)
                }

            
    }
            
            return(
                // form
                <main className={styles.main}>
                    <h1>Create an Account</h1>
                    
                    <form className={styles.form} onSubmit={handleCreateNewAccount}>
                        <div className={styles.formInput}>
                            <label>
                                <input placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} required/>
                            </label>
                            <label>
                                <input placeholder="Email" type="email" onChange={(event) => setEmail(event.target.value)} required/>
                            </label>
                            <label>
                                <input placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)} required/>
                            </label>
                            <label>
                                <input className={styles.formDate} placeholder="Date of Birth" type="date"  onChange={(event) => setbirth_date(event.target.value)} required/>  
                            </label>
                            <label>
                                <select className={styles.countrySelect} onChange={(event) => {
                                        setCountry_id(event.target.value) 
                                    }} required>
                                    <option value=""> Select Country </option>
                                    {countries.map((country) => {
                                        return <option value={country.id}>{country.name}</option>
                                    })}
                                </select>
                            </label>
                        </div>
                        
                        <div className={styles.formCheckbox}>
                            <h3>{terms ? "You accepted the terms and conditions." : "Accept terms and conditions."}</h3>
                            <input type="checkbox" onChange={(event) => setTerms(event.target.checked) } required/>
                        </div>

                        <button type="submit">Create</button>
                    </form>
                </main>
            )
}
    
    
    