import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/axios";
import { message } from "antd";

export function useConfigColetaApp() {
  const [coletasStrapi, setColetasStrapi] = useState<ITiposColetas[]>([]);
  const [coletasTheos, setColetasTheos] = useState<IColetas[]>([])
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
        fields: ["tipo", "theosContaId", "theosHistoricoId", "theosColetaId", "ativo"],
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
          else {
          }
        })
        .filter((coleta) => coleta !== undefined);

      setColetasStrapi(strapiColetas)
      setColetasTheos(isDiferentColetas);
      setIsLoading(false)
    }
    handleCompareColetasDB();
  }, [])

  async function handleSubmitColeta(coleta: IColetas) {
    setIsLoading(true)

    try {
      const coletaTheosConfig = await window.api.configColeta(coleta);

      const coletaStrapi = await api.post("/tipo-coletas", {
        data: {
          tipo: coletaTheosConfig.tipo,
          theosContaId: coletaTheosConfig.theosContaId,
          theosColetaId: coletaTheosConfig.theosColetaId,
          theosTipoDocId: coletaTheosConfig.theosTipoDocId,
          theosHistoricoId: coletaTheosConfig.theosHistoricoId,
          ativo: false
        },
      })

      setColetasTheos(prevState => {

        return prevState.filter(col => {
          return col.id !== coleta.id
        })
      })

      setColetasStrapi(prevState => {
        return [...prevState, coletaStrapi.data.data]
      })
      message.success("Coleta Sincronizada com Sucesso")
    } catch (error) {
      message.error("Algo Deu Errado " + error)
    }

    setIsLoading(false)
  }

  async function handleToggleStatus(id: string, status: boolean) {
    try {
      const coletaStrapi = await api.put("/tipo-coletas/" + id, {
        data: {
          ativo: status
        }
      })

      setColetasStrapi(prevState => prevState.map(coleta => {
        if (coleta.documentId === id) {
          coleta.ativo = status
          return coleta
        }

        return coleta

      }))
      message.success('Status Atualizado com Sucesso!')
    } catch (error) {
      message.error('Erro ao Atualizar Status')
    }

  }

  async function handleDelete(id: string) {

    try {
      const coletaStrapi = await api.put("/tipo-coletas/" + id)

      setColetasStrapi(prevState => prevState.filter(coleta => {
        return coleta.documentId !== id
      }))

      message.success('Apagado com Sucesso!')
    } catch (error) {
      message.error('Erro ao Apagar')
    }
  }

  return {
    coletasStrapi,
    coletasTheos,
    columns,
    isLoading,
    handleToggleStatus,
    setColetasStrapi,
    handleSubmitColeta
  };
}
