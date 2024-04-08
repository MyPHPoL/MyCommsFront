import Header from "../Components/Header";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

function MainPage(){
    const [isLoading, setIsLoading] = useState(true);
    const {setAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("auth");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setAuth(foundUser);
            setIsLoading(false);
        }
        else {
            navigate("/login");
        }
      }, []);

    return (
        <div className="flex">
            {isLoading ? (
                <div/>
            ) : (
                <div>
                    <Header></Header>
                </div>
            )}
        </div>
    );
}

export default MainPage;