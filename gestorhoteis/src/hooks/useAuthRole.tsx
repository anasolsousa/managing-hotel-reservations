import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export function useAuthRole() {

    const [role, setRole] = useState<String | null>(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if(token) {
            // acede as props dentro do token jwt
            // AVISO: NAO FAZ VALIDACAO
            const decoded = jwtDecode(token);
            console.log(decoded);

            setRole(decoded.role)
        }
    },[])

    return role;
}