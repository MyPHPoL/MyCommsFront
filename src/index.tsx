import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
                <Routes>
                    <Route path='*' element={<App />} />
                </Routes>
        </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
