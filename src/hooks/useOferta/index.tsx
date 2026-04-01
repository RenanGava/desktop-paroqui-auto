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
  const [dizimoForEdit, setDizimoForEdit] = useState<IListDizimo>(null);
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
            }
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

  }

  async function submitDizimo(dizimo: IListDizimo) {

  }

  async function editDizimo(dizimo?: IListDizimo) {

  }

  async function deleteDizimo(id: string) {

  }

  return {
    selectDate,
    listOferta,
    contextHolder,
    setSelectDate,
  };
}
