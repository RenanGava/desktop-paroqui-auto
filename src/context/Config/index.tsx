import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useAuth } from '../Auth'
import { useNavigate } from 'react-router'
import { api } from '../../utils/axios'
import { stringify } from 'qs'
import { message } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import { fiel } from '../../utils/theosData'



interface IConfigContextProps {
  isLoading: boolean
  syncCommunities: () => Promise<any>
  currentStep: number
  SetCurrentStep: (step: number) => void
  contextHolder: ReactNode
  messageApi: MessageInstance
  comunitiesNotRegister: IListComunidades[]
  setIsLoading: (data: boolean) => void
  FieisNotregister: IListFiel[]
  setFieisNotregister: (data: IListFiel[])=> void
  syncFieis: () => Promise<void>
  setComunitiesNotRegister: (data:IListComunidades[]) => void


}

interface ConfigProviderProps {
  children: ReactNode
}

const ConfigContext = createContext({} as IConfigContextProps)




export function ConfigContextProvider({ children }: ConfigProviderProps) {

  const { user } = useAuth()
  // Passo Atual
  const [currentStep, SetCurrentStep] = useState(0)
  // Hook de Navegacao
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // Estados das Comunidades
  const [comunitiesNotRegister, setComunitiesNotRegister] = useState<IListComunidades[]>([])

  // Estados Fieis
  const [FieisNotregister, setFieisNotregister] = useState<IListFiel[]>([])
  

  // Toast Message
  const [messageApi, contextHolder] = message.useMessage()

  

  async function syncCommunities() {

    console.log('Sync', user);
    
    try {
      setIsLoading(true)
      const comunidades = await window.api.syncComunidades();

      const res = await api.post('/comunidade/already-exists', {
        paroquiaID: user?.paroquia.id,
        comunidades
      })

      setComunitiesNotRegister([])
    } catch (error) {
      setIsLoading(false)
      throw error
    }
    finally {
      setIsLoading(false)
    }
  }

  async function syncFieis() {

    const configReq = stringify({
      filters: {

        paroquia: {
          documentId: {
            $eq: user?.paroquia.documentId
          }
        }

      },
      pagination: {
        pageSize: 2000
      }
    }, { encodeValuesOnly: true })
    const resComunities = await api.get('/comunidades?' + configReq)
    const comunidades = resComunities.data.data as IListComunidades[]



    const fieisCreateModel = FieisNotregister.map(fiel => {
      
      return comunidades.map( comunidade => {
        if (fiel.comunidadeTheosId === comunidade.theosId) {
          return {
            cpf: fiel.cpf,
            nome: fiel.nome,
            dizimistaId: fiel.dizimistaId,
            comunidade: {
              set: [
                {
                  id: comunidade.id,
                },
              ],
            },
          }
        }
      }).filter(fiel => fiel !== undefined)

    }).map(fiel => fiel[0])
  


    const resFieis = await api.post('/fieis/fielSync', fieisCreateModel)

    setFieisNotregister([])
    
  }








  return (
    <ConfigContext.Provider value={{
      syncCommunities,
      SetCurrentStep,
      currentStep,
      isLoading,
      contextHolder,
      messageApi,
      comunitiesNotRegister,
      FieisNotregister,
      setIsLoading,
      syncFieis,
      setFieisNotregister,
      setComunitiesNotRegister
    }}
    >
      {children}
    </ConfigContext.Provider>
  )
}




export function useConfig() {


  return useContext(ConfigContext)
}