import { Navigate, Outlet } from "react-router-dom";

function App(){
    return (
        <div>
          <Navigate to='/login' />
          <Outlet/>
        </div>
    );
}

export default App;