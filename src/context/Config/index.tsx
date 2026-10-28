import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useAuth } from '../Auth'
import { useNavigate } from 'react-router'
import { api } from '../../utils/axios'
import { stringify } from 'qs'
import { message } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'



interface IConfigContextProps {
  isLoading: boolean
  syncCommunities: () => Promise<any>
  currentStep: number
  SetCurrentStep: (step: number) => void
  contextHolder: ReactNode
  messageApi: MessageInstance
  comunitiesNotRegister: IListComunidades[]
  setIsLoading: (data: boolean) => void
  qtdFieisNotregister: number

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
  const [qtdFieisNotregister, setQtdFieisNotregister] = useState(0)
  

  // Toast Message
  const [messageApi, contextHolder] = message.useMessage()


  useEffect(() => {
    async function verifyAmountComunities() {

      setIsLoading(true)
      const configReq = stringify({
        fields: ["nome", "theosId", "centroCustoId", "id"],
        filters: {
          paroquia: {
            documentId: {
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
      setComunitiesNotRegister(isDiferentComunidades)

      setIsLoading(false)
    }

    async function verifyFieis() {


      const theosFieis = await window.api.syncFieis()

      const configReq = stringify({
        filters: {
          comunidade: {
            paroquia: {
              documentId: {
                $eq: "cznl0z20a3ftwwsly00eyssg"
              }
            }
          }
        },
        pagination: {
          pageSize: 2000
        }
      }, { encodeValuesOnly: true })
      console.log(configReq);



      const res = await api.get('/fieis?' + configReq)
      const totalFieisParoquiAuto = res.data.meta.pagination.total
      setQtdFieisNotregister((totalFieisParoquiAuto - theosFieis.length) * (-1))
      
      
      
      
      
    }
    verifyAmountComunities();
    verifyFieis()
  }, [user]);
  

  async function syncCommunities() {

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
            $eq: "cznl0z20a3ftwwsly00eyssg"
          }
        }

      },
      pagination: {
        pageSize: 2000
      }
    }, { encodeValuesOnly: true })
    console.log(configReq);
    const resComunities = await api.get('/comunidades?' + configReq)
    const comunidades = resComunities.data.data as IListComunidades[]
    console.log(comunidades);



    // const fieisCreateModel = theosFieis.map(fiel => {

    //   return comunidades.find( comunidade => {
    //     if (fiel.comunidadeTheosId === comunidade.theosId) {
    //       return {
    //         cpf: fiel.cpf,
    //         nome: fiel.nome,
    //         dizimistaId: fiel.dizimistaId,
    //         comunidade: {
    //           connect: [
    //             {
    //               documentId: comunidade.documentId,
    //             },
    //           ],
    //         },
    //       }
    //     }
    //   })

    // })


    // const resFieis = await api.post('/fieis/fielSync', fieisCreateModel)
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
      qtdFieisNotregister,
      setIsLoading
    }}
    >
      {children}
    </ConfigContext.Provider>
  )
}




export function useConfig() {


  return useContext(ConfigContext)
}