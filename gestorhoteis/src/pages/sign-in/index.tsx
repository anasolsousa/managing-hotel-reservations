import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export function SignIn(){

    // variaveis que armazenam os valores e as que sao usadas para atualizar
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); //redirecionar o ultilizador e guarda essa funcao na variavel

    

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // verifica se os campos sao preenchidos
        if(!email || !password){
            alert("Preencha os campos todos")
            return;
        }
    
        try {
            const response = await fetch("https://api-tma-2024-production.up.railway.app/sign-in",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, // transformar os dados em json
                body: JSON.stringify({
                    email: email, 
                    password: password
                }),
            }); // processar a resposta da api
                const data = await response.json();

                if(response.ok){
                    
                    localStorage.setItem("token", data.token)
                    // para redirecionar para outro local apos login bem sucedido
                    navigate("/Profile");
                    console.log("token")
                } else{
                    alert(data.message || "Erro ao fazer login. Verifique suas credenciais.");
                }
            }catch(e) { 
                console.log(e) // se der algum erro sera mostrado aqui
            }
    }
    
    return(
        
        <main className={styles.main}>
            <h1>Sign-in</h1>

            <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.formInput}>
                    <label>
                        <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} required/>
                    </label>
                    <label>
                            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} required/>
                    </label> 
                    <button type="submit">Enter</button>

                    <div className={styles.button}>
                        <Link to="/SignUp">Create an Account</Link>
                    </div>
                </div>
            </form>            
        </main>
        
    )
}