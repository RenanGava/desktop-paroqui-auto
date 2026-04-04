import React, { Key, useEffect, useState } from "react";
import { api } from "../../utils/axios";
import { stringify } from "qs";
import dayjs from "dayjs";
import { message } from "antd";

interface SelectDate {
  initDate: string;
  lastdate: string;
}

export function useOferta() {
  const [listOferta, setListOferta] = useState<IListOferta[]>([]);
  const [ofertaForEdit, setOfertaForEdit] = useState<IListOferta>(null);
  const [selectDate, setSelectDate] = useState<SelectDate>({} as SelectDate);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const lastDay = dayjs().daysInMonth().toString();
    const day = lastDay.length < 2 ? "0".concat(lastDay) : lastDay;
    const month = dayjs().month() + 1;
    const year = dayjs().year();

    setSelectDate({
      initDate: `${year}-${month}-01`,
      lastdate: `${year}-${month}-${day}`,
    });

    async function getOfertas() {
      const configRequest = stringify(
        {
          fields: ["documentId", "data_lancamento", "valor"],
          populate: {
            comunidade: {
              fields: ["documentId", "nome", "theosId", "centroCustoId"],
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      );

      const ofertas = await api.get("/ofertas?" + configRequest);
      const ofertasList = ofertas.data.data as IListOferta[];

      console.log(ofertas);

      setListOferta(ofertasList);
    }

    getOfertas();
  }, []);

  async function getDizimos(initiDate: string, lastDate: string) {
    const configRequest = stringify(
      {
        fields: ["documentId", "data_lancamento", "valor"],
        filters: {
          data_lancamento: {
            $between: [
              dayjs(initiDate).format("YYYY-MM-DD"),
              dayjs(lastDate).format("YYYY-MM-DD"),
            ],
          },
        },
        populate: {
          comunidade: {
            fields: ["documentId", "nome", "theosId", "centroCustoId"],
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );

    const ofertas = await api.get("/ofertas?" + configRequest);
    const ofertasList = ofertas.data.data as IListOferta[];

    console.log(ofertas);

    setListOferta(ofertasList);
  }

  async function submitDizimo(dizimo: IListOferta) {

    

  }

  async function editDizimo(oferta?: IListOferta) {
    setListOferta((prev) => {
      return prev.map((item) => {
        return item.id === oferta.id? oferta: item
      });
    });
  }

  async function deleteOferta(id: string) {

    console.log(id);
    api.delete('/ofertas/'+id).then( res =>{

      messageApi.open({
        type:"warning",
        content: 'Oferta Apagada com sucesso!'
      })

      console.log(res);
      

      setListOferta((prev) => {
      return prev.filter((item) => {
        return item.documentId !== id
      });
    });
    })


  }

  return {
    selectDate,
    listOferta,
    contextHolder,
    ofertaForEdit,
    setOfertaForEdit,
    setSelectDate,
    getDizimos,
    editDizimo,
    deleteOferta,
    submitDizimo,
  };
}
