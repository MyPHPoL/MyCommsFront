import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ErrorPages from "./Components/ErrorPages";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
      <Routes>
          <Route path='register/*' element={<RegisterPage />} />
          <Route path='login/*' element={<LoginPage />} />
          <Route path='home/*' element={<MainPage />} />
          <Route path='error/*' element={<ErrorPages />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
  );
}

export default App;