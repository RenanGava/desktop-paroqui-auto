import React, { Key, useEffect, useState } from "react";
import { api } from "../../utils/axios";
import { stringify } from "qs";
import dayjs from "dayjs";
import { message } from "antd";

interface SelectDate {
  initDate: string;
  lastdate: string;
}

export function useDizimo() {
  const [listDizimo, setListDizimo] = useState<IListDizimo[]>([]);
  const [dizimoForEdit, setDizimoForEdit] = useState<IListDizimo | null>(null);
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

    console.log(dizimoList);
    setListDizimo(dizimoList);
  }

  async function submitDizimo(dizimo: IListDizimo) {
    try {
      const teste = await window.api.sendOneDizimo(dizimo);
      const configRequest = stringify(
        {
          filters: {
            id: {
              $eq: dizimo.id,
            },
          },
          populate: ["comunidade", "fiel"],
        },
        {
          encodeValuesOnly: true,
        },
      );

      const response = await api.delete("/dizimos/" + dizimo.documentId);
      setListDizimo((prev) => prev.filter((item) => item.id != dizimo.id));
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: "Erro ao enviar o Dízimo " + error.message,
      });
    }
  }

  async function editDizimo(dizimo: IListDizimo | null) {
    if (Number(dizimo?.valor) / 100 < 1) {
      messageApi.open({
        type: "error",
        content: "Erro ao editar lancamento " + dizimo?.fiel.nome,
      });
      return;
    }

    const res = await api.put("/dizimos/" + dizimo?.documentId, {
      data: {
        valor: dizimo?.valor,
      },
    });
    setListDizimo((prev) => {
      return prev.map((item) => {
        return item.id === dizimo?.id ? dizimo : item;
      });
    });
  }

  async function deleteDizimo(id: string) {
    messageApi.open({
      type: "warning",
      content: "Dizimo apagado com sucesso",
    });
    await api.delete("/dizimos/" + id);

    setListDizimo( prev => {
      return prev.filter( diz => {
        return diz.documentId !== id
      })
    })
  }

  return {
    getDizimos,
    setSelectDate,
    submitDizimo,
    editDizimo,
    setDizimoForEdit,
    deleteDizimo,
    listDizimo,
    selectDate,
    dizimoForEdit,
    contextHolder,
  };
}
