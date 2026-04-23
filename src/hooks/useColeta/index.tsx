import React, { Key, useEffect, useState } from "react";
import { api } from "../../utils/axios";
import { stringify } from "qs";
import dayjs from "dayjs";
import { message } from "antd";

interface SelectDate {
  initDate: string;
  lastdate: string;
}

export function useColeta() {
  const [listColeta, setListColeta] = useState<IListColeta[]>([]);
  const [coletaForEdit, setColetaForEdit] = useState<IListColeta | null>(null);
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

    async function getColetas() {
      const configRequest = stringify(
        {
          fields: ["documentId", "data_lancamento", "valor"],
          populate: {
            comunidade: {
              fields: ["documentId", "nome", "theosId", "centroCustoId"],
            },
            tipo_coleta: {
              fields: [
                "documentId",
                "tipo",
                "theosContaId",
                "theosTipoDocId",
                "theosHistoricoId",
                "theosColetaId",
              ],
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      );

      const ofertas = await api.get("/coletas?" + configRequest);
      const ofertasList = ofertas.data.data as IListColeta[];

      console.log(ofertas);

      setListColeta(ofertasList);
    }

    getColetas();
  }, []);

  async function getColetas(initiDate: string, lastDate: string) {
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
          tipo_coleta: {
            fields: [
              "documentId",
              "tipo",
              "theosContaId",
              "theosTipoDocId",
              "theosHistoricoId",
              "theosColetaId",
            ],
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );

    const ofertas = await api.get("/coletas?" + configRequest);
    const ofertasList = ofertas.data.data as IListColeta[];

    console.log(ofertas);

    setListColeta(ofertasList);
  }

  async function submitColeta(coleta: IListColeta) {
    console.log(coleta);

    try {
      await window.api.sendOneColeta(coleta);

      await api.delete("/coletas/" + coleta.documentId);
      setListColeta( prev =>{

        return prev.filter( col => col.documentId !== coleta.documentId)
      })
      messageApi.open({
        type: "success",
        content: "Coleta Enviada com sucesso!",
      });
    } catch (error) {
      messageApi.open({
        type: "warning",
        content: "Coleta Apagada com sucesso!",
      });
    }
  }

  async function editColeta(coleta: IListColeta | null) {
    setListColeta((prev) => {
      return prev.map((item) => {
        return item.id === coleta?.id ? coleta : item;
      });
    });
  }

  async function deleteColeta(id: string) {
    console.log(id);
    await api.delete("/coletas/" + id).then((res) => {
      messageApi.open({
        type: "warning",
        content: "Coleta Apagada com sucesso!",
      });

      console.log(res);

      setListColeta((prev) => {
        return prev.filter((item) => {
          return item.documentId !== id;
        });
      });
    });
  }

  return {
    selectDate,
    listColeta,
    contextHolder,
    coletaForEdit,
    setColetaForEdit,
    setSelectDate,
    getColetas,
    editColeta,
    deleteColeta,
    submitColeta,
  };
}
