import Header from "../Components/Header";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { SignalRProvider } from "../Context/SignalRProvider";

function MainPage() {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, setAuth } = useAuth();
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
        <SignalRProvider token={auth.token}>
            <div className="flex">
                {isLoading ? (
                    <div />
                ) : (
                    <div>
                        <Header></Header>
                    </div>
                )}
            </div>
        </SignalRProvider>
    );
}

export default MainPage;