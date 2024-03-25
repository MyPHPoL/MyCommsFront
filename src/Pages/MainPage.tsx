import { useContext } from "react";
import Header from "../Components/Header";
import DataContext from "../Context/AuthProvider";
import { Navigate } from "react-router-dom";

function MainPage(){

    return (
        <div className='flex'>
            <Header></Header>
        </div>
    );
}

export default MainPage;