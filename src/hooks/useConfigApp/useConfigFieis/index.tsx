import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/axios";
import { message } from "antd";

export function useConfigFieisApp() {
  const [amount, setAmount] = useState(0);
  const [fieisUnSync, setFieisUnSync] = useState<IListFiel[]>();
  const [qtdFieisParoquiAuto, setQtdFieisParoquiAuto] = useState(0);
  const [isNotSincronized, setIsNotSincronized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function handleCompareFieisDB() {
      const isSincronized = window.localStorage.getItem("syncronized");
      setIsLoading(true);
      const allFieis = await api.get("/fieis");

      if (isSincronized === "ok") {
        console.log(isSincronized);
        setIsNotSincronized(true);
      }
      setQtdFieisParoquiAuto(allFieis.data.meta.pagination.total);
      await getFieisTheos()
      setIsLoading(false);

      setInterval(
        () => {
          handleCompareFieisDB();
        },
        1 * 60 * 1000,
      );
    }

    async function getFieisTheos() {
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
        return strapiComunidades
          .map((comunidade) => {
            if (fiel.comunidadeTheosId === comunidade.theosId) {
              return {
                cpf: fiel.cpf,
                nome: fiel.nome,
                dizimistaId: fiel.dizimistaId,
                comunidade: {
                  connect: [
                    {
                      documentId: comunidade.documentId,
                    },
                  ],
                },
              } as const;
            }
          })
          .filter((fiel) => fiel !== undefined);
      });
      const listFielData = mapUserData.map((item) => item[0]);

      const removeDuplicatesFieis = [
        ...new Map(listFielData.map((fiel) => [fiel.cpf, fiel])).values(),
      ];
      setAmount(removeDuplicatesFieis.length)
    }


    handleCompareFieisDB();
    
  }, []);

  async function handleSyncFieisDB() {
    setIsLoading(true);

    window.localStorage.setItem("syncronized", "ok");
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
      return strapiComunidades
        .map((comunidade) => {
          if (fiel.comunidadeTheosId === comunidade.theosId) {
            return {
              cpf: fiel.cpf,
              nome: fiel.nome,
              dizimistaId: fiel.dizimistaId,
              comunidade: {
                connect: [
                  {
                    documentId: comunidade.documentId,
                  },
                ],
              },
            } as const;
          }
        })
        .filter((fiel) => fiel !== undefined);
    });
    const listFielData = mapUserData.map((item) => item[0]);

    const removeDuplicatesFieis = [
      ...new Map(listFielData.map((fiel) => [fiel.cpf, fiel])).values(),
    ];

    await api.post("/fieis/fielSync", removeDuplicatesFieis);
    setIsLoading(false);
  }

  return {
    amount,
    fieisUnSync,
    qtdFieisParoquiAuto,
    isLoading,
    handleSyncFieisDB,
  };
}
