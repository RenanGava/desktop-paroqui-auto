import React, {createContext, ReactNode, useContext, useEffect} from 'react'
import { useAuth } from '../Auth'



interface IConfigContextProps{}

interface ConfigProviderProps{
    children: ReactNode
}

const ConfigContext = createContext({} as IConfigContextProps)




export function ConfigContextProvider({ children }:ConfigProviderProps){


    const {user} = useAuth()

    useEffect(() => console.log("Config PRovider", user), [])



    


    return (
        <ConfigContext.Provider value={{}}>
            {children}
        </ConfigContext.Provider>
    )
}




export function useConfig(){


    return useContext(ConfigContext)
}