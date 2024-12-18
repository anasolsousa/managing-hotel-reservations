import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./styles.module.css";

export function UpdateEmail() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userFromStorage = JSON.parse(localStorage.getItem("user") || "null");

    const [user, setUser] = useState(userFromStorage);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleUpdate(event) {
        event.preventDefault();
        
        try {
            const response = await fetch("https://api-tma-2024-production.up.railway.app/me/change-email", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: email, 
                    password: password,
                }),
            });

            if (response.ok) {
                const updatedUser = { ...user, email: email };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
                alert("Email atualizado com sucesso!")
                console.log("Email atualizado com sucesso!");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erro ao atualizar e-mail");
            }
        } catch(e) {
            setError("Erro de conexão. Tente novamente.");
            console.error(e);
        }
    }

    return(
        <main className={styles.main}>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <h1>Atualizar Email</h1>

            <form className={styles.form} onSubmit={handleUpdate}>
                <div className={styles.formInput}>
                    <label>
                        <input 
                            type="email" 
                            placeholder="Novo email" 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} 
                            required
                        />
                    </label> 
                    <label>
                        <input 
                            type="password" 
                            placeholder="Senha atual" 
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} 
                            required
                        />
                    </label>
                    <button  onClick={() => (
                        navigate("/Profile")
                    )}>Atualizar</button>
                </div>
            </form>
        </main>
    );
}

export default UpdateEmail;