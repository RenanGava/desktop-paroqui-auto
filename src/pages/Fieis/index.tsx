import React, { useState, Key, useEffect } from "react";
import { Container } from "./styles";
import { DizimoTable } from "../../components/Dashboard/Dizimo";
import { useNavigate } from "react-router";
import {
  Button,
  Flex,
  Table,
  DatePicker,
  Modal,
  Input,
  Typography,
  InputNumber,
  Select,
  Space
} from "antd";
import { useDizimo } from "../../hooks/useDizimo";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import { User } from "lucide-react";
import { formatedValueForDecimal } from "../../utils/formatedValue";
import { useFieis } from "../../hooks/useFieis";
import { FieisTable } from "../../components/Dashboard/Fieis";
import { api } from "../../utils/axios";
import { stringify } from "qs";
import { SearchComponent } from "../../components/SearchComponent";
import { SearchFieisComponent } from "../../components/SearchFiesComponent";
dayjs.extend(UTC);


export function FieisDash() {
  const [open, setOpen] = useState(false);
  const [comunities, setComunities] = useState<IListComunidades[]>([])
  const [isLoading, setIsLoading] = useState(true)


  const {
    fieis,
    selectedPage,
    setSelectedPage,
    pages,
    deleteFiel,
    submitFiel,
    contextHolder,
    selectedFiel,
    setSelectedFiel,
    updateComunidade,
    setSelectedCommunity,
    selectedCommunity,
    messageApi,
    selectDate,
    setSelectDate,
    getFieis
  } = useFieis()



  useEffect(() => {


    const configReq = stringify({
      fields: ['id', 'documentId', "theosId", "centroCustoId", "nome"],
      pagination: {
        pageSize: 100
      }
    })
    api.get('/comunidades?' + configReq).then(res => {
      const comunitiesList = res.data.data as IListComunidades[]
      setComunities(comunitiesList)
    })
    setIsLoading(false)
  }, [])

  function handleOpenAndSetFielEdit(fiel: FielProps) {
    setSelectedFiel(fiel);
    console.log('caiu aqui', fiel)
    setOpen(true);
  }



  return (
    <Container>
      
      <header>
        <SearchFieisComponent
          getData={getFieis}
        />
      </header>
      <FieisTable
        fieis={[...fieis]}
        submitFiel={submitFiel}
        setIsOpen={handleOpenAndSetFielEdit}
        deleteFiel={deleteFiel}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        getData={getFieis}
        selectedComunyti={selectedCommunity!}
        pages={pages}
        
      />

      <Modal
        title="Editar Dados Fiel"
        open={open}
        onOk={async () => {
          setOpen(false);
          await updateComunidade(
            selectedFiel!,
            selectedCommunity?.documentId,
          );
        }}
        onCancel={() => {
          setOpen(false);
          
        }}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Flex orientation="vertical" gap={5}>
          <Flex orientation="vertical">
            <Typography.Title level={5}>Nome</Typography.Title>
            <Input
              placeholder="Nome"
              value={selectedFiel?.nome}
              key={"nome"}
              onChange={(e) => {
                e.preventDefault();
                setSelectedFiel(prevState => ({...prevState!, nome: e.target.value}))
              }}
            />
          </Flex>
          <Flex orientation="vertical" gap={0}>
            <Typography.Title level={5}>CPF</Typography.Title>
            <Input
              placeholder="Valor"
              key={"valor"}
              value={selectedFiel?.cpf}
              type={'number'}
              onChange={(e) => {
                e.preventDefault()
                // handleChangeValue(e.target.value)
                if(e.target.value.length >= 11){
                  messageApi.info('CPF nao pode ser maior que 11 caracteres')
                  return
                }
                setSelectedFiel(prevState => ({...prevState!, cpf: e.target.value}))
                
                
              }}
            />
          </Flex>
          <Flex orientation="horizontal" gap={80} justify="center">
            <Flex orientation="vertical" gap={0}>
              <Typography.Title level={5}>Sexo</Typography.Title>
              <Select
                defaultValue="Sexo"
                style={{ width: 120 }}
                onChange={(val) => {
                  setSelectedFiel(prevState => {
                    return ({ ...prevState!, sexo: val })
                  })
                }}
                options={[
                  { value: 'F', label: 'Feminino' },
                  { value: 'M', label: 'Masculino' }
                ]}
              />
            </Flex>

            <Flex orientation="vertical" gap={0}>
              <Typography.Title level={5}>Comunidade</Typography.Title>
              <Select
                defaultValue={selectedFiel?.comunidade.nome}
                style={{ width: 200 }}
                onChange={(val) => {
                  const findCommunity = comunities.find(com => com.documentId === val)
                  
                  setSelectedCommunity(findCommunity)
                }}
                loading={isLoading}
                disabled={isLoading}
                options={comunities.map(com => ({ value: com.documentId, label: com.nome }))}
              />
            </Flex>
          </Flex>
        </Flex>
      </Modal>
      {contextHolder}
    </Container>
  );
}
