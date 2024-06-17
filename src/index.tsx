import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider';
import { SignalRProvider } from './Context/SignalRProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <AuthProvider>
        <SignalRProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SignalRProvider>
    </AuthProvider>
);
