import React, { Key, useEffect, useState } from "react";
import { api } from "../../utils/axios";
import { stringify } from "qs";
import dayjs from "dayjs";

interface SelectDate {
  initDate: string;
  lastdate: string;
}

export function useDizimo() {
  const [listDizimo, setListDizimo] = useState<IListDizimo[]>([]);
  const [selectDate, setSelectDate] = useState<SelectDate>({} as SelectDate);

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
              fields: ["documentId", "nome"],
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

      setListDizimo(dizimoList);
    }

    getDizimos();
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
            fields: ["documentId", "nome"],
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
    console.log(initiDate, lastDate);

    const dizimos = await api.get("/dizimos?" + configRequest);
    const dizimoList = dizimos.data.data as IListDizimo[];

    setListDizimo(dizimoList);
  }

  async function submitDizimo(dizimo: IListDizimo) {
    await window.api.sendOneDizimo(dizimo);
    console.log("Veio da func Enviar", dizimo);
    console.log("Veio da Lista de Dizimo", listDizimo[0]);
  }

  return {
    getDizimos,
    setSelectDate,
    submitDizimo,
    listDizimo,
    selectDate,
  };
}
