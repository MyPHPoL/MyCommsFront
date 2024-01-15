import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import Server from './Components/Server';
import Channel from './Components/Channel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="home" element={<MainPage />}>
            <Route path="home/:id" element={<Server />} />
            <Route path="home/:id/:channel" element={<Channel />} />
          </Route>
          <Route path="*" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
</React.StrictMode>
);
