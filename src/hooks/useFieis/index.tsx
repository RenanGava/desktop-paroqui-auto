import { useEffect, useState } from "react"
import { api } from "../../utils/axios"
import { stringify } from "qs"
import { message } from "antd"



export function useFieis() {

    // States Fieis
    const [fieis, setFieis] = useState<FielProps[]>([])
    const [selectedFiel, setSelectedFiel] = useState<FielProps>()

    // Paginação dos dados
    const [selectedPage, setSelectedPage] = useState(1)
    const [pages, setPages] = useState(0)

    // Toast Api
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {

        async function getFieis() {

            const configRequest = stringify({
                fields: ['id', 'documentId', 'cpf', 'sexo', 'nome', 'dizimistaId'],
                filters: {
                    dizimistaId: {
                        $null: true
                    }
                },
                populate: {
                    comunidade: {
                        fields: ["documentId", "nome", "theosId", "centroCustoId"]
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


    async function submitFiel(fielData: FielProps) {
        try {
            const fiel = await window.api.createFieis(fielData)

            await updateFiel(fiel)
            setFieis(prevState => prevState.filter(fiel => fiel.documentId !== fielData.documentId))
            messageApi.success('Fiel Cadastrado na Theos Com sucesso!')

        } catch (error) {
            messageApi.success('Ocorreu um erro no Sincronismo')
        }
    }



    async function getFieis(selectedPage: number) {

        const configRequest = stringify({
            fields: ['id', 'documentId', 'cpf', 'sexo', 'nome', 'dizimistaId'],
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

    async function updateFiel(fielUpdated: FielProps) {
        const fiel = await api.put(`/fieis/${fielUpdated.documentId}`, {
            data: {
                dizimistaId: fielUpdated.dizimistaId
            }
        })

        console.log(fiel);

    }

    async function deleteFiel(documentId: string) {

        const fiel = await api.delete(`/fieis/${documentId}`)

        console.log(documentId);
        setFieis(prevState => {
            return prevState.filter(fiel => fiel.documentId !== documentId)
        })
    }





    return {
        fieis,
        selectedPage,
        setSelectedPage,
        pages,
        setPages,
        getFieis,
        deleteFiel,
        submitFiel,
        contextHolder
    }
}