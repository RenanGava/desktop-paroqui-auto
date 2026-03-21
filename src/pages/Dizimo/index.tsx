import React, { useState, Key } from "react";
import { Container } from "./styles";
import { DizimoTable } from "../../components/Dashboard";
import { useNavigate } from "react-router";
import { Button, Flex, Table, DatePicker, Modal } from "antd";
import { useDizimo } from "../../hooks/useDizimo";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
dayjs.extend(UTC);

const { Column, ColumnGroup } = Table;

export function DizimoDash() {
  const [IsModalOpen, setIsMOdalOpen] = useState(false);
  const { listDizimo, getDizimos, selectDate, setSelectDate } = useDizimo();
  const format = "DD/MM/YYYY";

  const navigate = useNavigate();

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
            onClick={() => getDizimos(selectDate.initDate, selectDate.lastdate)}
          >
            Buscar
          </Button>
        </Flex>
      </header>
      <DizimoTable dizimos={listDizimo} />
    </Container>
  );
}
