import { useEffect, useState } from "react"
import { api } from "../../utils/axios"
import { stringify } from "qs"



export function useFieis() {

    // States Fieis
    const [fieis, setFieis] = useState<FielProps[]>([])
    const [selectedFiel, setSelectedFiel] = useState<FielProps>()

    // Paginação dos dados
    const [selectedPage, setSelectedPage] = useState(1)
    const [pages, setPages] = useState(0)

    useEffect(() => {

        async function getFieis() {

            const configRequest = stringify({
                filters: {
                    dizimistaId: {
                        $null: true
                    }
                },
                pagination: {
                    page: 1,
                    pageSize: 10
                }
            })
            const fieis = await api.get('/fieis?' + configRequest)


            setFieis(fieis.data.data)
            setPages(fieis.data.meta.pagination.pageCount)

        }

        getFieis()
    }, [])


    async function submitFiel(fielData: FielProps){

    }



    async function getFieis(selectedPage: number) {

        const configRequest = stringify({
            filters: {
                dizimistaId: {
                    $null: true
                }
            },
            pagination: {
                page: selectedPage,
                pageSize: 10
            }
        })
        const fieis = await api.get('/fieis?' + configRequest)


        setFieis(fieis.data.data)
        setPages(fieis.data.meta.pagination.pageCount)
    }

    async function updateFiel(fielUpdated: any) {
    }

    async function deleteFiel(documentId: string) {

        const fiel = await api.delete(`/fieis/${documentId}`)

        console.log(documentId);
        setFieis(prevState => {
            return prevState.filter(fiel => fiel.documentId !== documentId)
        })
    }





    return { fieis, selectedPage, setSelectedPage, pages, setPages, getFieis, deleteFiel }
}