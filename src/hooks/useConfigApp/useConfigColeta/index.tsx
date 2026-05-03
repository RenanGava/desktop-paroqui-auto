import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/axios";
import { message } from "antd";

export function useConfigColetaApp() {
  const [amount, setAmount] = useState(0);
  const [coletasUnSync, setColetasUnSync] = useState<ITiposColetas[]>();
  const [qtdColetasParoquiAuto, setQtdColetasParoquiAuto] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function handleCompareColetasDB() {
      setIsLoading(true)
      const configReq = stringify({
        fields: ["tipo", "theosContaId", "theosHistoricoId", "theosColetaId"],
      });

      const coletas = await window.api.syncColetas();
      const { data } = await api.get("/tipo-coletas?" + configReq);
      const strapiColetas = data.data as ITiposColetas[];
      setQtdColetasParoquiAuto(strapiColetas.length)

      // percorremos a lista de coletas para achar os itens que nao existem
      // no nosso banco de dados "paroquiAuto"

      const isDiferentColetas = coletas
        .map((item) => {
          const isNoExistInParoquiAuto = strapiColetas.find(
            (coleta) => coleta.tipo.trim() === item.tipo.trim(),
          );
          if (!isNoExistInParoquiAuto) {
            return item;
          }
        })
        .filter((coleta) => coleta !== undefined);

      console.log('dentro do useEffect', isDiferentColetas);

      setAmount(isDiferentColetas.length);
      setColetasUnSync(isDiferentColetas);
      setIsLoading(false)
    }
    handleCompareColetasDB();
  }, []);

  async function handleSyncAllColetasDB() {
    setIsLoading(true)
    console.log("Cadastrando tudo de uma vez");

    const coletas = await window.api.syncColetas();

    await Promise.all([
      ...coletas.map(async (coleta) =>
        api.post("/tipo-coletas", {
          data: {
            tipo: coleta.tipo,
            theosContaId: coleta.theosContaId,
            theosColetaId: coleta.theosColetaId,
            theosTipoDocId: coleta.theosTipoDocId,
            theosHistoricoId: coleta.theosHistoricoId,
          },
        }),
      ),
    ]);
    setIsLoading(false)
  }

  // aqui sincroniza somente as coletas que estao diferentes entre
  // o sistema Theos e o ParoquiAuto
  async function handleSyncColetasDB() {
    setIsLoading(true)
    console.log("Cadasrando novos itens ou que faltavam", coletasUnSync)

    if (coletasUnSync?.length === 0 || coletasUnSync === undefined) {
      console.log("Cadasrando novos itens ou que faltavam IF", coletasUnSync)
      return
    }

    try {
      await Promise.all([
        ...coletasUnSync.map(async (coleta) =>
          api.post("/tipo-coletas", {
            data: {
              tipo: coleta.tipo,
              theosContaId: coleta.theosContaId,
              theosColetaId: coleta.theosColetaId,
              theosTipoDocId: coleta.theosTipoDocId,
              theosHistoricoId: coleta.theosHistoricoId,
            },
          }),
        ),
      ]);
      setAmount(0)
      setQtdColetasParoquiAuto(coletasUnSync.length)
      setIsLoading(false)
    } catch (error) {

    }

    setIsLoading(false)
  }

  return {
    amount,
    coletasUnSync,
    qtdColetasParoquiAuto,
    isLoading,
    setAmount,
    setColetasUnSync,
    handleSyncColetasDB,
    handleSyncAllColetasDB
  };
}
