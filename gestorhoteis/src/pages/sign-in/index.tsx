import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin(event:React.FormEvent) {
        
        event.preventDefault();
    }

    try {
        const response = await fetch("https://api-tma-2024-production.up.railway.app/sign-in",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, 
                password: password
            })
        })
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


    return(
        <form onSubmit={handleLogin}>

            <input type="email" onChange={(event) => setEmail(event.target.value)}/>
            <input type="password" onChange={(event) => setPassword(event.target.value)}/>
                    
            <button type="submit">Entrar</button>
        </form>
    )
}
