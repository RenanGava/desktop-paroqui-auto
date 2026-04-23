import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/axios";
import { message } from "antd";

export function useConfigFieisApp() {
  const [amount, setAmount] = useState(0);
  const [fieisUnSync, setFieisUnSync] = useState<IListFiel[]>();
  const [qtdFieisParoquiAuto, setQtdFieisParoquiAuto] = useState(0);

  useEffect(() => {
    async function handleCompareColetasDB() {
      const configReq = stringify({
        fields: ["nome", "theosId", "centroCustoId", "documentId"],
        pagination: {
          page: 1,
          pageSize: 100,
        },
      });

      const fieis = await window.api.syncFieis();
      const { data } = await api.get("/comunidades?" + configReq);
      const strapiComunidades = data.data as IListComunidades[];

      const mapUserData = fieis.map((fiel) => {

        return strapiComunidades.map(comunidade => {
          console.log(fiel.comunidadeTheosId, comunidade.theosId);
          if (fiel.comunidadeTheosId === comunidade.theosId) {
            return {
              cpf: fiel.cpf,
              nome: fiel.nome,
              dizimistaId: fiel.dizimistaId,
              data_nascimento: fiel.data_nascimento,
              comunidade: {
                connect: [
                  {
                    documentId: comunidade.documentId,
                  },
                ],
              },
            } as const


          }
          
        }).filter( fiel => fiel !== undefined)

      });

      // setQtdFieisParoquiAuto(strapiComunidades.length);
      const listFielData = mapUserData.map(item => item[0])
      listFielData.map(item => item.cpf === null && console.log(item.cpf))
      console.log([...new Set(listFielData)].length);
      

      // await api.post('/fieis/fielSync', listFielData)

      // percorremos a lista de coletas para achar os itens que nao existem
      // no nosso banco de dados "paroquiAuto"

      // const isDiferentFieis = fieis
      //   .map((item) => {
      //     const isNoExistInParoquiAuto = strapiComunidades.find(
      //       (comunidade) => comunidade.dizimistaId === item.dizimistaId,
      //     );
      //     if (!isNoExistInParoquiAuto) {
      //       return item;
      //     }
      //   })
      //   .filter((coleta) => coleta !== undefined);

      // console.log('useEffect diferentes',isDiferentComunidades);

      // setAmount(isDiferentFieis.length);
      // setFieisUnSync(isDiferentFieis);
    }
    handleCompareColetasDB();
  }, []);

  async function handleSyncAllFieisDB() {
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
    setAmount(0);
    setQtdFieisParoquiAuto(0);
  }

  // aqui sincroniza somente as coletas que estao diferentes entre
  // o sistema Theos e o ParoquiAuto
  async function handleSyncFieisDB() {
    console.log("Cadasrando novos itens ou que faltavam", fieisUnSync);

    if (fieisUnSync?.length === 0 || fieisUnSync === undefined) {
      console.log("Cadasrando novos itens ou que faltavam IF", fieisUnSync);
      return;
    }

    await Promise.all([
      ...fieisUnSync.map(async (fieis) =>
        api.post("/comunidades", {
          data: {
            nome: fieis.nome,
            // centroCustoId: fieis.,
            // theosId: comunidade.theosId,
          },
        }),
      ),
    ]);

    setAmount(0);
    setQtdFieisParoquiAuto(0);
  }

  return {
    amount,
    fieisUnSync,
    qtdFieisParoquiAuto,
    handleSyncFieisDB,
    handleSyncAllFieisDB,
  };
}
