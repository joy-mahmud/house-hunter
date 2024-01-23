
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)

    }

    const signIn = (email, password) => {

        setLoading(true)


    }
    const googlesignIn = () => {
        setLoading(true)
    }
    const logOut = () => {
        setLoading(true)
    }

    useEffect(() => {
        
    },)

    const authInfo = { user, loading, createUser, signIn, logOut, googlesignIn }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;