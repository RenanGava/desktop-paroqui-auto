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
  const [listDizimo, setListDizimo] = useState<IListOferta[]>([]);
  const [dizimoForEdit, setDizimoForEdit] = useState<IListDizimo>(null);
  const [selectDate, setSelectDate] = useState<SelectDate>({} as SelectDate);
  const [messageApi, contextHolder] = message.useMessage();

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

    async function getDizimos() {
      const configRequest = stringify(
        {
          fields: ["documentId", "data_lancamento", "valor"],
          populate: {
            comunidade: {
              fields: ["documentId", "nome", "theosId", "centroCustoId"],
            },
            fiel: {
              fields: ["nome", "documentId", "dizimistaId"],
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      );

      const dizimos = await api.get("/dizimos?" + configRequest);
      const dizimoList = dizimos.data.data as IListDizimo[];

      console.log(dizimoList);

      setListDizimo(dizimoList);
    }

    getDizimos();
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
   contextHolder,
   setSelectDate,
   
  };
}
