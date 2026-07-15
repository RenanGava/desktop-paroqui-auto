import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/axios";
import { message } from "antd";

export function useConfigColetaApp() {
  const [coletasStrapi, setColetasStrapi] = useState<IColetas[]>([]);
  const [coletasTheos, setColetasTheos] = useState<IColetas[]>([])
  const [coletaSelected, setColetaSelected] = useState<ITiposColetas>()
  const [isLoading, setIsLoading] = useState(false)


  const columns = [
    {
      title: 'ID',
      dataindex: 'id',
      key: 'id'
    },
    {
      title: 'Tipo',
      dataindex: 'descricao',
      key: 'descricao'
    }
  ]

  useEffect(() => {
    async function handleCompareColetasDB() {
      setIsLoading(true)
      const configReq = stringify({
        fields: ["tipo", "theosContaId", "theosHistoricoId", "theosColetaId"],
      });

      const coletas = await window.api.syncColetas() as IColetas[]
      const { data } = await api.get("/tipo-coletas?" + configReq);
      const strapiColetas = data.data as ITiposColetas[];
      
      
      // percorremos a lista de coletas para achar os itens que nao existem
      // no nosso banco de dados "paroquiAuto"
      
      const isDiferentColetas = coletas
      .map((item) => {
        const isNoExistInParoquiAuto = strapiColetas.find(
          (coleta) => coleta.tipo.trim() === item.descricao.trim(),
        );
        if (!isNoExistInParoquiAuto) {
          return item;
        }
        else{
          setColetasStrapi(prevState => [...prevState, item])
        }
      })
      .filter((coleta) => coleta !== undefined);
      
      
      setColetasTheos(isDiferentColetas);
      setIsLoading(false)
    }
    handleCompareColetasDB();
  }, [])
  
  console.log(coletasTheos);
  async function handleSubmitColeta(coleta: ITiposColetas) {
    setIsLoading(true)
    console.log("Cadastrando tudo de uma vez");

    const coletaTheosConfig = await window.api.configColeta();

    const coletaStrapi = await api.post("/tipo-coletas", {
      data: {
        tipo: coletaTheosConfig.tipo,
        theosContaId: coletaTheosConfig.theosContaId,
        theosColetaId: coletaTheosConfig.theosColetaId,
        theosTipoDocId: coletaTheosConfig.theosTipoDocId,
        theosHistoricoId: coletaTheosConfig.theosHistoricoId,
      },
    })

    console.log(coletaStrapi);


    setIsLoading(false)
  }

  // aqui sincroniza somente as coletas que estao diferentes entre
  // o sistema Theos e o ParoquiAuto
  async function handleConfigColeta(coletaId: number | string) {
    setIsLoading(true)
    try {
      const coletaConfig = await window.api.configColeta()
      setColetaSelected(coletaConfig)

    } catch (error) {

    }

    setIsLoading(false)
  }

  return {
    coletasStrapi,
    coletasTheos,
    columns,
    setColetasStrapi,
    handleConfigColeta,
    handleSubmitColeta
  };
}
