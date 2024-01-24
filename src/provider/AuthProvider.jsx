
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    // const axiosSecure = useAxiosSecure()
    const createUser = (email, password) => {
        setLoading(true)


    }

    const signIn = (email, password) => {

        setLoading(true)


    }

    const logOut = () => {
        setLoading(true)
    }

    useEffect(() => {

        const token = localStorage.getItem('access-token')
        const authorization = `Bearer ${token}`
        console.log(authorization)
        axiosPublic.post('/checkUser', { authorization })
            .then(res => {
                setUser(res.data)
                setLoading(false)
            })



    }, [axiosPublic])
    console.log(user)

    const authInfo = { user, loading, createUser, signIn, logOut, setLoading, setUser }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;