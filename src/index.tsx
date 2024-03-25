import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { AuthProvider } from './Context/AuthProvider';
import ErrorPages from './Components/ErrorPages';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='register/*' element={<RegisterPage />} />
                        <Route path='login/*' element={<LoginPage />} />
                        <Route path='home/*' element={<MainPage />} />
                        <Route path='error/*' element={<ErrorPages />} />
                        <Route path='*' element={<MainPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
);
