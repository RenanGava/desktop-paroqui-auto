import React, { MouseEvent, useState } from "react";
import { Container } from "./styles";
import { OfertaTable } from "../../components/Dashboard/Oferta";
import { Button, DatePicker, Flex, Input, Modal, Typography } from "antd";
import dayjs from "dayjs";
import { useOferta } from "../../hooks/useOferta";
import { useNavigate } from "react-router";

export function OfertaDash() {
  const [open, setOpen] = useState(false);

  const { selectDate, setSelectDate, contextHolder, listOferta } = useOferta();
  const format = "DD/MM/YYYY";

  const navigate = useNavigate();

  function handleOpenAndSetDizimoEdit(dizimo: IListDizimo) {

    setOpen(true);
  }

  function formatedValueForDecimal(value: string) {
    const turnIntoDecimal = Number.parseFloat(value) / 100;

    if (turnIntoDecimal > 0) {
      // setFormatedDizimo(turnIntoDecimal);
      const formated = turnIntoDecimal.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return formated;
    } else {
      return "0";
    }
  }

  return (
    <Container>
      <header>
        <Flex gap="small" align="center">
          <DatePicker
            defaultValue={dayjs().startOf("month")}
            format={format}
            onChange={(date) => {
              console.log();
              setSelectDate({
                ...selectDate,
                initDate: date.format("YYYY-MM-DD"),
              });
            }}
          />
          <span>-</span>
          <DatePicker
            defaultValue={dayjs().endOf("month")}
            format={"DD/MM/YYYY"}
            onChange={(date) => {
              console.log();
              setSelectDate({
                ...selectDate,
                lastdate: date.format("YYYY-MM-DD"),
              });
            }}
          />
          <Button
            type="primary"
            onClick={() => { }}
          >
            Buscar
          </Button>
        </Flex>
      </header>
      <OfertaTable
        ofertas={listOferta}
        submit={async () => { }}
        deleteFn={async () => { }}
        edit={async () => { }}
      />

      <Modal
        title="Editar Dizimo"
        open={open}
        onOk={async () => {
          setOpen(false);

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
              value={''}
              key={"nome"}
              onChange={(e) => {
                e.preventDefault();

              }}
            />
          </Flex>
          <Flex orientation="vertical" gap={0}>
            <Typography.Title level={5}>Valor</Typography.Title>
            <Input
              placeholder="Nome"
              value={formatedValueForDecimal('0')}
              onChange={(e) => {

              }}
            />
          </Flex>
        </Flex>
      </Modal>
      {contextHolder}
    </Container>
  );
}
