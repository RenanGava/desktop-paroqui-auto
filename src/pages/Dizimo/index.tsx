import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { DizimoTable } from "../../components/Dashboard/Dizimo";
import {
  Button,
  Flex,
  DatePicker,
  Modal,
  Input,
  Typography,
  Space,
  Select
} from "antd";
import { useDizimo } from "../../hooks/useDizimo";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import { formatedValueForDecimal } from "../../utils/formatedValue";
import { stringify } from "qs";
import { api } from "../../utils/axios";
import { SearchComponent } from "../../components/SearchComponent";
dayjs.extend(UTC);

export function DizimoDash() {
  const [open, setOpen] = useState(false);


  const {
    listDizimo,
    selectDate,
    dizimoForEdit,
    contextHolder,
    getDizimos,
    setSelectDate,
    submitDizimo,
    editDizimo,
    setDizimoForEdit,
    deleteDizimo,
    bulkDizimo,
    setBulkDizimo,
    sendBulkDizimo
  } = useDizimo();
  const format = "DD/MM/YYYY";


  function handleOpenAndSetDizimoEdit(dizimo: IListDizimo) {
    setDizimoForEdit(dizimo);
    setOpen(true);
  }

  function handleChangeName(name: string) {
    setDizimoForEdit(prevState => {


      return prevState ? {
        ...prevState,
        fiel: {
          ...prevState.fiel,
          nome: name,
        }
      } : null
    })
  }

  function handleChangeValue(value: string) {
    setDizimoForEdit(prevState => {
      return prevState ? {
        ...prevState,
        valor: value
      } : null
    })
  }

  async function handleSendBulk(data: IListDizimo[]) {
    const bulkList = data.map( row => row.documentId)

    try {
      const teste = await window.api.bulkDizimo(data)
    } catch (error) {
      console.log(error);
      
    }
    finally{
      await sendBulkDizimo(bulkList)
      await getDizimos(selectDate.initDate, selectDate.lastdate, {} as IListComunidades, 1)
    }

  }
  

  return (
    <Container>
      <header>
        <SearchComponent
          getData={getDizimos}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
        {bulkDizimo.length > 0 && (<Button
          type="primary"
          onClick={() => { handleSendBulk(bulkDizimo)}}
        >
          Enviar Selecionados
        </Button>)}
      </header>
      <DizimoTable
        dizimos={[...listDizimo]}
        submitDizimo={submitDizimo}
        setIsOpen={handleOpenAndSetDizimoEdit}
        deleteDizimo={deleteDizimo}
        setListDizimo={setBulkDizimo}
      />

      <Modal
        title="Editar Dizimo"
        open={open}
        onOk={async () => {
          setOpen(false);
          await editDizimo(dizimoForEdit);
        }}
        onCancel={() => {
          setOpen(false);
          setDizimoForEdit(null);
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
              value={dizimoForEdit?.fiel.nome}
              key={"nome"}
              onChange={(e) => {
                e.preventDefault();
                handleChangeName(e.target.value)
              }}
            />
          </Flex>
          <Flex orientation="vertical" gap={0}>
            <Typography.Title level={5}>Valor</Typography.Title>
            <Input
              placeholder="valor"
              value={formatedValueForDecimal(dizimoForEdit?.valor)}
              onChange={(e) => {
                e.preventDefault()
                handleChangeValue(e.target.value.replace(/\D/g, ""))
              }}
            />
          </Flex>
        </Flex>
      </Modal>
      {contextHolder}
    </Container>
  );
}
