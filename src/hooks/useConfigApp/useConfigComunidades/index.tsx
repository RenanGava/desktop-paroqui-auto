import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/axios";
import { message } from "antd";
import { useAuth } from "../../../context/Auth";

export function useConfigComunidadesApp() {
  const [amount, setAmount] = useState(0);
  const [comunidadesUnSync, setComunidadesUnSync] =
    useState<IListComunidades[]>();
  const [qtdComunidadesParoquiAuto, setQtdComunidadesParoquiAuto] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    async function verifyAmountComunities() {

      console.log(user)
      

      setIsLoading(true)
      const configReq = stringify({
        fields: ["nome", "theosId", "centroCustoId", "id"],
        filters:{
          paroquia:{
            documentId:{
              // $eq: user.
            }
          }
        },
        pagination: {
          page: 1,
          pageSize: 100,
        },
      });

      const comunidades = await window.api.syncComunidades();
      const { data } = await api.get("/comunidades?" + configReq);
      const strapiComunidades = data.data as IListComunidades[];
      setQtdComunidadesParoquiAuto(strapiComunidades.length);

      // percorremos a lista de comunidades para achar os itens que nao existem
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

      

      setAmount(isDiferentComunidades.length);
      setComunidadesUnSync(isDiferentComunidades);
      setIsLoading(false)
    }
    verifyAmountComunities();
  }, []);

  async function syncCommunities() {
    setIsLoading(true)
    

    const comunidades = await window.api.syncComunidades();

    const res = await api.post('/comunidade/already-exists',{
      paroquiaID: user?.paroquia.id,
      comunidades
    })

    setAmount(0)
    setQtdComunidadesParoquiAuto(0)
    setIsLoading(false)
  }

  return {
    amount,
    comunidadesUnSync,
    qtdComunidadesParoquiAuto,
    isLoading,
    setAmount,
    setComunidadesUnSync,
    syncCommunities,
  };
}
