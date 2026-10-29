import { Button, Card, Listy, Typography } from "antd";
import React, { MouseEvent } from "react";
import { Flex, Spin } from "antd";
import { useConfig } from "../../context/Config";
import { useLocation, useNavigate, useRoutes } from "react-router";




const { Title, Text } = Typography

export function ConfigFieis() {
  const { FieisNotregister, isLoading, syncFieis } = useConfig()
  const navigate = useNavigate()
  const locatrion = useLocation()



  function handleNavigate(e: MouseEvent) {
    e.preventDefault()

    navigate('/')
    // console.log(locatrion);
    
  }

  return (
    <Flex vertical gap={10}>
      <Card
        style={{
          marginTop: 20
        }}
        title={
          <Flex justify="space-between" align="center">
            <Title level={5}>Fieis</Title>
            <Text>Fieis nao Cadastrados {FieisNotregister.length}</Text>
            <Button
              type="primary"
              onClick={() => syncFieis()}
              disabled={FieisNotregister.length < 1}
            >
              {
                isLoading ? <Spin styles={{
                  root: {
                    color: "#fff"
                  }
                }} /> : "Cadastrar Todos"

              }</Button>
          </Flex>
        }
      >
        <Listy<IListFiel>
          itemRender={fiel => fiel.nome}
          items={FieisNotregister}
          rowKey="cpf"
          height={600}

        />

      </Card>

      {FieisNotregister.length < 1 && (

        <Button
          type="primary"
          onClick={handleNavigate}

        >
          Finalizar Cadastro
        </Button>
      )}
    </Flex>
  );
}
