import { createContext, useState } from 'react'

const AuthContext: any = createContext({});

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )};

export default AuthContext;