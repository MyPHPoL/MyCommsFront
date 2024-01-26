import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";

const useAuth = () => {
    const auth: any = useContext(AuthContext);

    return auth;
};

export default useAuth;