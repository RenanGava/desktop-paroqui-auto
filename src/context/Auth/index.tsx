import React, { useContext, useEffect, useState } from "react"
import { createContext, ReactNode } from 'react'
import { api } from "../../utils/axios"

interface IAuthContext{
    login(email: string, password: string): Promise<void>
    user: IUserData
}
interface AuthProviderProps{
    children: ReactNode
}





const AuthContext = createContext({} as IAuthContext)





export function AuthProvider({ children }:AuthProviderProps) {

    const [user, setUser] = useState<IUserData>({} as IUserData)
    const authenticated = !!user

    useEffect(() => {
        console.log('Recarregou!');
        
    }, [])



    async function login(identifier: string, password: string) {

        const resLogin = await api.post('/auth/local',{
            identifier,
            password
        })
        console.log(resLogin.data);
        
    }


    return(
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    return useContext(AuthContext)
}