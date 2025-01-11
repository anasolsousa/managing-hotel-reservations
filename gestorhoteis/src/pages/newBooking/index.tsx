import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";

export function NewBooking(){

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();
    const { id } = useParams(); // Captura o ID da URL

    const validarDatas = () => {

        const today = new Date();
        const startDateDate = new Date(startDate);
        const endDateDate = new Date(endDate);

        if(startDateDate < today){
            alert ("A data não pode ser no passado");
            return false;
        }
        if(endDateDate <= startDateDate){
            alert ("A data do check-Out tem que ser posterior a data de check-In")
            return false;
        }
        return true;
    };

    async function handleNewBooking(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        if(!startDate || !endDate){
            alert("Preencha os campos todos")
            return;
        }
        
        if (!validarDatas()) {
            return;
        }

        try{
            const response = await fetch("https://api-tma-2024-production.up.railway.app/booking", {
                method: "POST",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomId: id,
                    startDate,
                    endDate, 
                })
            });

            const data = await response.json();

                if(response.ok){
                    navigate("/Profile");
                } else{
                    alert("Erro ao fazer reserva.");
                }
            }catch(e) { 
                console.log(e)
            }
        }

        return(
            <main>
                <div>
                    <h1>Marcar estadia</h1>
    
                    <form onSubmit={handleNewBooking}>
                    <div className={styles.dateInputs}>
                        <label>
                            Data de Entrada:
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)} 
                                required
                            />
                        </label>
                        <label>
                            Data de Saída:
                            <input  
                                type="date"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)} 
                                required
                            />
                        </label>  
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Confirmar Reserva
                    </button>
                </form>
    
                </div>
            </main>
          
            
        );
        
    }