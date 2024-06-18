import { ReactNode, createContext, useEffect, useState } from "react";
import { SignalRClient, SignalRClientImpl } from "../SignalR";

export const SignalRContext = createContext<SignalRClient | null>(null)

interface SignalRProviderProps {
    children: ReactNode;
}

export const SignalRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [connection, setConnection] = useState<SignalRClient | null>(null)

    useEffect(() => {
        const signalR: SignalRClient = new SignalRClientImpl();
        setConnection(signalR)
    }, [])

    return (
        <SignalRContext.Provider value={ connection }>
            {children}
        </SignalRContext.Provider>
    )
}