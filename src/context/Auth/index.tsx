import React, { useContext, useEffect, useState } from "react"
import { createContext, ReactNode } from 'react'
import { api } from "../../utils/axios"

interface IAuthContext{
    login(email: string, password: string): Promise<void>
    signOut(): void
    user: IUserData | null
    authenticated: boolean
}
interface AuthProviderProps{
    children: ReactNode
}


const AuthContext = createContext({} as IAuthContext)






export function AuthProvider({ children }:AuthProviderProps) {
    const [user, setUser] = useState<IUserData | null>(null)
    const authenticated = !!user

    useEffect(() => {
        api.get('/users/me')
        .then(res => {
           setUser(res.data)
           console.log(res.data);
           
            
        })
        .catch(err =>{
            console.log(err);
        })
        .finally(() => console.log('Sempre executa'))
        
    }, [])



    async function login(identifier: string, password: string) {

        const resLogin = await api.post('/auth/local',{
            identifier:identifier,
            password: password
        })

        console.log(resLogin);
        
        
        setUser(resLogin.data.user)
        window.localStorage.setItem('@jwt', resLogin.data.jwt)
        window.localStorage.setItem('@rf-jwt', resLogin.data.refreshToken)
        
    }

    function signOut() {
        window.localStorage.removeItem('@jwt')
        window.localStorage.removeItem('@rf-jwt')
    }


    return(
        <AuthContext.Provider value={{user, login, authenticated, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    return useContext(AuthContext)
}