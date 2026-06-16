import { useEffect } from "react"
import { api } from "../../utils/axios"
import { stringify } from "qs"



export function useFieis(){








    useEffect(() => {

        async function getFieis(){

            const configRequest = stringify({
                filters:{
                    dizimistaId:{
                        $null: true
                    }
                }
            })


            const fieis = await api.get('/fieis?'+configRequest)

            console.log('Caiu aqui',fieis.data);
            
        }

        getFieis()

        
    }, [])


    return {}
}