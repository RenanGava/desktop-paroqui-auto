import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/axios";
import { message } from "antd";

export function useConfigComunidadesApp() {
  const [amount, setAmount] = useState(0);
  const [comunidadesUnSync, setComunidadesUnSync] =
    useState<IListComunidades[]>();
  const [qtdComunidadesParoquiAuto, setQtdComunidadesParoquiAuto] = useState(0);

  useEffect(() => {
    async function handleCompareColetasDB() {
      const configReq = stringify({
        fields: ["nome", "theosId", "centroCustoId", "id"],
        pagination: {
          page: 1,
          pageSize: 100,
        },
      });

      const comunidades = await window.api.syncComunidades();
      const { data } = await api.get("/comunidades?" + configReq);
      const strapiComunidades = data.data as IListComunidades[];
      setQtdComunidadesParoquiAuto(strapiComunidades.length);
      console.log(comunidades);

      // percorremos a lista de coletas para achar os itens que nao existem
      // no nosso banco de dados "paroquiAuto"

      const isDiferentComunidades = comunidades
        .map((item) => {
          const isNoExistInParoquiAuto = strapiComunidades.find(
            (comunidade) => comunidade.theosId === item.theosId,
          );
          if (!isNoExistInParoquiAuto) {
            return item;
          }
        })
        .filter((coleta) => coleta !== undefined);

      // console.log('useEffect diferentes',isDiferentComunidades);

      setAmount(isDiferentComunidades.length);
      setComunidadesUnSync(isDiferentComunidades);
    }
    handleCompareColetasDB();
  }, []);

  async function handleSyncAllComunidadesDB() {
    console.log("caiu aqui");

    const comunidades = await window.api.syncComunidades();

    await Promise.all([
      ...comunidades.map(async (comunidade) =>
        api.post("/comunidades", {
          data: {
            nome: comunidade.nome,
            centroCustoId: comunidade.centroCustoId,
            theosId: comunidade.theosId,
          },
        }),
      ),
    ]);
    setAmount(0)
    setQtdComunidadesParoquiAuto(0)
  }

  // aqui sincroniza somente as coletas que estao diferentes entre
  // o sistema Theos e o ParoquiAuto
  async function handleSyncComunidadesDB() {
    console.log("Cadasrando novos itens ou que faltavam", comunidadesUnSync);

    if (comunidadesUnSync?.length === 0 || comunidadesUnSync === undefined) {
      console.log(
        "Cadasrando novos itens ou que faltavam IF",
        comunidadesUnSync,
      );
      return;
    }

    await Promise.all([
      ...comunidadesUnSync.map(async (comunidade) =>
        api.post("/comunidades", {
          data: {
            nome: comunidade.nome,
            centroCustoId: comunidade.centroCustoId,
            theosId: comunidade.theosId,
          },
        }),
      ),
    ]);

    setAmount(0)
    setQtdComunidadesParoquiAuto(0)
  }

  return {
    amount,
    comunidadesUnSync,
    qtdComunidadesParoquiAuto,
    setAmount,
    setComunidadesUnSync,
    handleSyncComunidadesDB,
    handleSyncAllComunidadesDB,
  };
}
