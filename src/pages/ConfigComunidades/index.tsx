import { Button, Card, Flex } from "antd";
import React, { MouseEvent, useEffect, } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Listy, Typography, message } from "antd";
import { useConfigComunidadesApp } from "../../hooks/useConfigApp/useConfigComunidades";
import { useNavigate } from 'react-router'
import { useConfig } from "../../context/Config";
import { api } from "../../utils/axios";
import { stringify } from "qs";
import { useAuth } from "../../context/Auth";




const { Title } = Typography

export function Comunidades() {

  const { syncCommunities, comunitiesNotRegister, isLoading, SetCurrentStep, setComunitiesNotRegister, setIsLoading } = useConfig()
  const { user } = useAuth()
  const [msg, contextHolder] = message.useMessage()
  const navigate = useNavigate()


  useEffect(() => {
    async function verifyAmountComunities() {

      setIsLoading(true)

      const comunidades = await window.api.syncComunidades();
      const configReq = stringify({
        fields: ["nome", "theosId", "centroCustoId", "id"],
        filters: {
          paroquia: {
            id: {
              $eq: user?.paroquia.id
            }
          },
          theosId: {
            $in: comunidades.map(com => com.theosId)
          }
        },
        pagination: {
          page: 1,
          pageSize: 100,
        },
      });
      const { data } = await api.get("/comunidades?" + configReq);
      const strapiComunidades = data.data as IListComunidades[];


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
      setComunitiesNotRegister(isDiferentComunidades)

      setIsLoading(false)
    }

    verifyAmountComunities()

  }, [user])

  async function handleSyncComunities(e: MouseEvent) {
    e.preventDefault()
    try {
      await syncCommunities()
    } catch (error) {
      console.log(error);
      msg.error('Ocorreu Algum Erro')
    }
  }


  function handleNavigateNextPage(e: MouseEvent) {
    e.preventDefault()
    SetCurrentStep(2)
    navigate('/register-config/fieis')

  }

  return (
    <>
      {contextHolder}
      <Card
        title={
          <Flex justify="space-between">
            <Title level={5}> Comunidades Não Cadastradas</Title>
            <Button
              type="primary"
              onClick={handleSyncComunities}
              disabled={comunitiesNotRegister.length < 1}
            >
              {
                isLoading ? <Spin styles={{
                  root: {
                    color: "#fff"
                  }
                }} /> : "Cadastrar Todas"

              }</Button>
          </Flex>
        }
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "50px auto 0 auto",
          boxShadow: "0px 0px 10px 1px #919191"
        }}

      >
        <Listy<IListComunidades>
          height={500}
          items={comunitiesNotRegister}
          rowKey="theosId"
          itemRender={comunidade => comunidade.nome}
        />
      </Card>

      {comunitiesNotRegister.length < 1 && (
        <Button
          type="primary"
          style={{ margin: '10px 0' }}
          size="large"
          onClick={handleNavigateNextPage}
        >
          Seguir Para Sincronizar Fieis
        </Button>)}
    </>
  );
}
