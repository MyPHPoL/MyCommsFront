import { useEffect } from 'react'
import useAuth from "../Hooks/useAuth";

export function useStorage() {
    const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
    let id: string = "";
    let username: string = "";
    let token: string = "";
    let email: string = "";
    useEffect(() => {
    if(localStorage.getItem("username") === null) { 
        window.location.href = "/login";     
    }
    else {
        if(localStorage.getItem("username"))
        username = localStorage.getItem("username");
        id = localStorage.getItem("id");
        token = localStorage.getItem("token");
        email = localStorage.getItem("email");
        setAuth({id, username, email, token});
        window.location.href = "/home";
    }
    })
}