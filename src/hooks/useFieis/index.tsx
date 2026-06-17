import { useEffect, useState } from "react"
import { api } from "../../utils/axios"
import { stringify } from "qs"



export function useFieis() {

    const [fieis, setFieis] = useState([])
    const [selectedPage, setSelectedPage] = useState(1)
    const [pages, setPages] = useState(0)







    useEffect(() => {

        async function getFieis() {

            const configRequest = stringify({
                filters: {
                    dizimistaId: {
                        $null: true
                    }
                }
            })
            const fieis = await api.get('/fieis?' + configRequest)

            setFieis(fieis.data.data)
            setSelectedPage((fieis.data.meta.pagination.page))
            setPages(fieis.data.meta.pagination.pageCount)

        }

        getFieis()
    }, [])



    


    return { fieis, selectedPage, setSelectedPage, pages, setPages }
}