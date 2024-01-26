import { useContext } from "react";
import Header from "../Components/Header";
import DataContext from "../Context/AuthProvider";
import { Navigate } from "react-router-dom";

function MainPage(){
  const { auth }: { auth: any } = useContext(DataContext); // id, username, email, password, token

    // if user not logged in redirect to login page
    return auth.id ? (
        <div className='flex'>
            <Header></Header>
        </div>
    ) : (
        <Navigate to='/login' />
    );
}

export default MainPage;