import React, { useContext, useEffect, useState } from "react"
import { createContext, ReactNode } from 'react'
import { api } from "../../utils/axios"
import { stringify } from "qs"

interface IAuthContext {
    login(email: string, password: string): Promise<void>
    signOut(): void
    register(data: ICreateUser): Promise<any>
    user: IUserData | null
    authenticated: boolean
}
interface AuthProviderProps {
    children: ReactNode
}


const AuthContext = createContext({} as IAuthContext)



export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUserData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const authenticated = !!user

    useEffect(() => {

        const configReq = stringify({
            populate: ['paroquia']
        })

        api.get('/users/me?' + configReq)
            .then(res => {
                setUser(res.data)
                console.log(res.data);
                window.local.saveData({
                    Email: res.data.paroquia.theosEmail,
                    Senha: res.data.paroquia.theosPass
                })
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => console.log('Sempre executa'))

    }, [])



    async function login(identifier: string, password: string) {
        try {
            setIsLoading(true)
            const resLogin = await api.post('/auth/local', {
                identifier: identifier,
                password: password
            })

            console.log(resLogin);


            setUser(resLogin.data.user)
            window.localStorage.setItem('@jwt', resLogin.data.jwt)
            window.localStorage.setItem('@rf-jwt', resLogin.data.refreshToken)

            return resLogin.data.user
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }

    }

    function signOut() {
        window.localStorage.removeItem('@jwt')
        window.localStorage.removeItem('@rf-jwt')
    }

    async function register({ email, password, username }: ICreateUser) {
        try {
            setIsLoading(true)
            const resResgister = await api.post('/auth/local/register', {
                email,
                password,
                username
            })

            setUser(resResgister.data.user)
            window.localStorage.setItem('@jwt', resResgister.data.jwt)
            window.localStorage.setItem('@rf-jwt', resResgister.data.refreshToken)

            return resResgister.data.user
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <AuthContext.Provider value={{
            user,
            login,
            authenticated,
            signOut,
            register
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext)
}