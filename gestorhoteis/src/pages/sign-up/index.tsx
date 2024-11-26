import { useState } from "react";


export function SignUp(){

    // useSate() = guardar os dados do ultilizador
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birth_date, setbirth_date] = useState("");
    const [country_id, setCountry_id] = useState("");
    const [terms, setTerms] = useState(""); // boolean

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
        
            return(
                // form
                <>
                <h1>Sign-up</h1>
        
                <form onSubmit={handleCreateNewAccount}>
                    <input type="text" onChange={(event) => setName(event.target.value)}/>   
                    <input type="email" onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" onChange={(event) => setPassword(event.target.value)}/>
                    <input type="birth_date" onChange={(event) => setbirth_date(event.target.value)}/>        
                    <input type="country_id" onChange={(event) => setCountry_id(event.target.value)}/> 
                    <input type="terms" onChange={(event) => setTerms(event.target.value)}/>

                    <button type="submit">registar</button>
                </form>
                </>
               
            )
}
    
    
    