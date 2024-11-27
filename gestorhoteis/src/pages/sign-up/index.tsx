import { useState } from "react";
import styles from "./styles.module.css";

export function SignUp(){

    // useSate() = guardar os dados do ultilizador
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birth_date, setbirth_date] = useState("");
    const [country_id, setCountry_id] = useState("");
    const [terms, setTerms] = useState(false); // boolean

    async function handleCreateNewAccount(event) {

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
                        }   
                    }) // se der algum erro sera mostrado aqui
                }catch(e) {
                    console.log(e)
                }
            }

            function handleChange(event){

                event.preventDefault();

                // !terms = verificar se o "terms" é false se sim ele obriga a marcar true
                if(!terms) {
                    return;
                }
            }
            
            return(
                // form
                <main className={styles.main}>
                    <h1>Sign-up</h1>
                    
                    <form onSubmit={handleCreateNewAccount}>
                        <label>
                            <p>Nome:</p>
                            <input type="text" onChange={(event) => setName(event.target.value)} required/>
                        </label>
                        <label>
                            <p>Email:</p>
                            <input type="email" onChange={(event) => setEmail(event.target.value)} required/>
                        </label>
                        <label>
                            <p>Password:</p>
                            <input type="password" onChange={(event) => setPassword(event.target.value)} required/>
                        </label>
                        <label>
                            <p>Data Nascimento</p>
                            <input type="date" onChange={(event) => setbirth_date(event.target.value)} required/>  
                        </label>
                        <label>
                            <p>Country</p>
                            <input type="country_id" onChange={(event) => setCountry_id(event.target.value)} required/>
                        </label>
                        <label className={styles.checkbox}>
                            <h3>{terms ? "You accepted the terms and conditions." : "Accept terms and conditions."}</h3>
                            <input type="checkbox" onChange={(event) => setTerms(event.target.checked) } required/>
                        </label>

                        <button type="submit">Create account</button>
                    </form>
                </main>
                
                
                
               
            )
}
    
    
    