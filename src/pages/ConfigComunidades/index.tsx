import { Button, Card, Flex } from "antd";
import React, { MouseEvent, } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Listy, Typography, message } from "antd";
import { useConfigComunidadesApp } from "../../hooks/useConfigApp/useConfigComunidades";
import { useNavigate } from 'react-router'
import { useConfig } from "../../context/Config";




const { Title } = Typography

export function Comunidades() {

  const { syncCommunities, comunitiesNotRegister, isLoading, SetCurrentStep } = useConfig()
  const [msg, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  async function handleSyncComunities(e: MouseEvent) {
    e.preventDefault()
    try {
      await syncCommunities()
    } catch (error) {
      msg.error('Ocorreu Algum Erro')
    }
  }


  function handleNavigateNextPage(e: MouseEvent){
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
        style={{margin: '10px 0'}}
        size="large"
        onClick={handleNavigateNextPage}
      >
        Seguir Para Sincronizar Fieis
      </Button>)}
    </>
  );
}
