import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { Outlet } from "react-router-dom";
function App(){
    return (
        <div>
          <MainPage/>
        </div>
    );
}

export default App;