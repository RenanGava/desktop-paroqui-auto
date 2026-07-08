import { Space, DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";
import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { api } from "../../utils/axios";


interface ISearchProps {
    selectDate: SelectDate,
    setSelectDate: (date: SelectDate) => void
    getData: (...data: any) => Promise<void>
}

export function SearchComponent({
    selectDate,
    setSelectDate,
    getData
}: ISearchProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [comunities, setComunities] = useState<IListComunidades[]>([])
    const [selectedCommunity, setSelectedCommunity] = useState<IListComunidades>({}as IListComunidades)
    const format = "DD/MM/YYYY";


    useEffect(() => {

        async function getData(){

            const configReq = stringify({
                fields: ['id', 'documentId', "theosId", "centroCustoId", "nome"],
                pagination: {
                    pageSize: 100
                }
            })
            const res = await api.get('/comunidades?' + configReq)
            const comunitiesList = res.data.data as IListComunidades[]
                // setSelectedCommunity(comunitiesList[0])
                setComunities(comunitiesList)
            
            setIsLoading(false)
        }

        getData()
    }, [])
    console.log('Caiu aqui',selectedCommunity);



    return (
        <Space vertical={false} size={20}>
            <DatePicker
                defaultValue={dayjs().startOf("month")}
                format={format}
                onChange={(date) => {
                    console.log();
                    setSelectDate({
                        ...selectDate,
                        initDate: dayjs(date).format("YYYY-MM-DD"),
                    });
                }}
            />
            <span>-</span>
            <DatePicker
                defaultValue={dayjs().endOf("month")}
                format={"DD/MM/YYYY"}
                onChange={(date) => {
                    console.log();
                    setSelectDate({
                        ...selectDate,
                        lastdate: dayjs(date).format("YYYY-MM-DD"),
                    });
                }}
            />
            <Select
                style={{ width: 200 }}
                defaultValue={selectedCommunity?.nome}
                allowClear
                placeholder='Selecione a Comunidade'
                onChange={(val) => {
                    const findCommunity = comunities.find(com => com.documentId === val)

                    setSelectedCommunity(findCommunity!)
                }}
                loading={isLoading}
                disabled={isLoading}
                options={comunities.map(com => ({ value: com.documentId, label: com.nome }))}
            />
            <Button
                type="primary"
                onClick={() => getData(selectDate.initDate, selectDate.lastdate, selectedCommunity)}
            >
                Buscar
            </Button>
        </Space>
    )
}