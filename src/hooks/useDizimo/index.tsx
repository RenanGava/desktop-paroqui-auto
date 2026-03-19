import React, { useEffect, useState } from "react";
import { api } from "../../utils/axios";
import { stringify } from 'qs'


interface IListDizimo {
    id: number;
    valor: string;
    documentId: string;
    data_lancamento: string;
    comunidade: {
        id: number;
        documentId: string;
        nome: string;
    };
    fiel: {
        id: number;
        documentId: string;
        nome: string;
        dizimistaId: string
    }

}




export function useDizimo() {

    const [listDizimo, setListDizimo] = useState<IListDizimo[]>([])


    useEffect(() => {

        async function getDizimos() {

            const configRequest = stringify({
                fields: ['documentId', 'data_lancamento', 'valor'],
                populate: {
                    comunidade: {
                        fields: ['documentId', 'nome']
                    },
                    fiel: {
                        fields: ['nome', 'documentId', 'dizimistaId']
                    }
                }
            }, {
                encodeValuesOnly: true
            })


            const dizimos = await api.get('/dizimos?' + configRequest)
            const dizimoList = dizimos.data.data as IListDizimo[]

            setListDizimo(dizimoList)

        }


        getDizimos()
    }, [])




    async function getDizimos(initiDate:string, lastDate:string) {


        const configRequest = stringify({
            fields: ['documentId', 'data_lancamento', 'valor'],
            filters: {
                data_lancamento: [initiDate, lastDate]
            },
            populate: {
                comunidade: {
                    fields: ['documentId', 'nome']
                },
                fiel: {
                    fields: ['nome', 'documentId', 'dizimistaId']
                }
            }
        }, {
            encodeValuesOnly: true
        })

        const dizimos = await api.get('/dizimos?' + configRequest)
        const dizimoList = dizimos.data.data as IListDizimo[]

        setListDizimo(dizimoList)
    }


    return {
        listDizimo,
        getDizimos
    }
}