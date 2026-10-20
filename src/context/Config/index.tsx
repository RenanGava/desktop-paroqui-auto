import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useAuth } from '../Auth'
import { useNavigate } from 'react-router'
import { api } from '../../utils/axios'
import { stringify } from 'qs'



interface IConfigContextProps { }

interface ConfigProviderProps {
    children: ReactNode
}

const ConfigContext = createContext({} as IConfigContextProps)




export function ConfigContextProvider({ children }: ConfigProviderProps) {

    const { user } = useAuth()
    // Passo Atual
    const [currentStep, SetCurrentStep] = useState(1)
    // Hook de Navegacao
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    // Quantidad de Comunidades Cadastradas em Cada base de dados
    const [theosCommunities, setTheosCommunities] = useState(0)
    const [paroquiCommunities, setParoquiCommunities] = useState(0)


    useEffect(() => {
        async function verifyAmountComunities() {
    
          console.log(user)
    
          setIsLoading(true)
          const configReq = stringify({
            fields: ["nome", "theosId", "centroCustoId", "id"],
            filters:{
              paroquia:{
                documentId:{
                  $eq: user?.paroquia.documentId
                }
              }
            },
            pagination: {
              page: 1,
              pageSize: 100,
            },
          });
    
          const comunidades = await window.api.syncComunidades();
          const { data } = await api.get("/comunidades?" + configReq);
          const strapiComunidades = data.data as IListComunidades[];
          setParoquiCommunities(strapiComunidades.length);
    
          // percorremos a lista de comunidades para achar os itens que nao existem
          // no nosso banco de dados "paroquiAuto"
    
          const isDiferentComunidades = comunidades
            .map((item) => {
              const isNoExistInParoquiAuto = strapiComunidades.find(
                (comunidade) => comunidade.theosId === item.theosId,
              );
              if (!isNoExistInParoquiAuto) {
                return item;
              }
            })
            .filter((coleta) => coleta !== undefined);
    
          
    
        //   setAmount(isDiferentComunidades.length);
        //   setComunidadesUnSync(isDiferentComunidades);
          setIsLoading(false)
        }
        verifyAmountComunities();
      }, []);




    async function syncCommunities() {
        setIsLoading(true)


        const comunidades = await window.api.syncComunidades();
        const res = await api.post('/comunidade/already-exists', {
            paroquiaID: user?.paroquia.id,
            comunidades
        })

        
        setIsLoading(false)
    }








    return (
        <ConfigContext.Provider value={{}}>
            {children}
        </ConfigContext.Provider>
    )
}




export function useConfig() {


    return useContext(ConfigContext)
}