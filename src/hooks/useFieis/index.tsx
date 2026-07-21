import { useEffect, useState } from "react"
import { api } from "../../utils/axios"
import { stringify } from "qs"
import { message } from "antd"
import axios from "axios"
import dayjs from "dayjs"



export function useFieis() {

    // States Fieis
    const [fieis, setFieis] = useState<FielProps[]>([])
    const [selectedFiel, setSelectedFiel] = useState<FielProps>()
    const [selectedCommunity, setSelectedCommunity] = useState<IListComunidades>()

    // Paginação dos dados
    const [selectedPage, setSelectedPage] = useState(1)
    const [pages, setPages] = useState(0)

    // Toast Api
    const [messageApi, contextHolder] = message.useMessage();

    const [selectDate, setSelectDate] = useState<SelectDate>({} as SelectDate)

    useEffect(() => {
        const lastDay = dayjs().daysInMonth().toString();
        const day = lastDay.length < 2 ? "0".concat(lastDay) : lastDay;
        const month = dayjs().month() + 1;
        const year = dayjs().year();

        console.log(dayjs().utc().toISOString());

        setSelectDate({
            initDate: `${year}-${month}-01`,
            lastdate: `${year}-${month}-${day}`,
        });

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



    async function getFieis(selectedPage: number, selectedCommunity: IListComunidades) {

        const configRequest = stringify({
            fields: ['id', 'documentId', 'cpf', 'sexo', 'nome', 'dizimistaId'],
            filters: {
                dizimistaId: {
                    $null: true
                },
                comunidade: {
                    documentId: {
                        $eq: selectedCommunity.documentId
                    }
                }
            },
            pagination: {
                page: selectedPage,
                pageSize: 10
            }
        })
        const fieis = await api.get('/fieis?' + configRequest)

        console.log(fieis);
        


        setFieis(fieis.data.data)
        setPages(fieis.data.meta.pagination.pageCount)
    }

    async function updateFiel(fielUpdated: FielProps) {
        const fiel = await api.put(`/fieis/${fielUpdated.documentId}`, {
            data: {
                dizimistaId: fielUpdated.dizimistaId
            }
        })
    }

    async function updateComunidade(fielUpdated: FielProps, newComunidadeId?: string) {

        const configReq = stringify({
            fields: ['id', 'documentId', 'cpf', 'sexo', 'nome', 'dizimistaId'],
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

        try {
            const updateComunityDocumentId = !!newComunidadeId ? newComunidadeId : fielUpdated.comunidade.documentId
            console.log(updateComunityDocumentId);

            const fielData = await api.put(`/fieis/${fielUpdated.documentId}?${configReq}`, {
                data: {
                    nome: fielUpdated.nome,
                    sexo: fielUpdated.sexo,
                    cpf: fielUpdated.cpf,
                    comunidade: {
                        set: [
                            {
                                documentId: updateComunityDocumentId
                            }
                        ]
                    }
                }
            })

            setFieis(prevState => {
                return [...prevState.filter(fiel => fiel.documentId !== fielUpdated.documentId), fielUpdated]
            })

            messageApi.info('Fiel Atualizado!')
        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.log(error.toJSON());

                messageApi.error(`HTTP ${error.message} Code ${error.status}`)
            }
        }

    }

    async function updateDataFiel() {

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
        contextHolder,
        setSelectedFiel,
        selectedFiel,
        updateComunidade,
        selectedCommunity,
        setSelectedCommunity,
        messageApi,
        selectDate,
        setSelectDate
    }
}