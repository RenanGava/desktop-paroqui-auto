import React from "react";
import { Container, TableContent, TBody, THeader } from "./style";
import { Dropdown, Button, MenuProps } from "antd";
import { List, PencilLine, Send } from "lucide-react";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Editar",
    icon: <PencilLine size={12}/>,
    onClick: teste1,
  },
  {
    key: "2",
    label: "Enviar",
    icon: <Send size={12}/>,
    onClick: teste2,
  },
];

function teste1(e: any) {
  console.log("teste1", e);
}

function teste2(e: any) {
  console.log("teste2", e);
}

const menu: MenuProps = {
  items,
};

export function DashMainData() {
  return (
    <Container>
      <TableContent>
        <THeader>
          <tr>
            <th>ID</th>
            <th>Fiel</th>
            <th>Valor</th>
            <th>Comunidade</th>
          </tr>
        </THeader>
        <TBody>
          <tr>
            <td>1</td>
            <td>Renan Dellecrode Gava</td>
            <td>100,00</td>
            <td>Alto Boa Vista</td>
            <td>
              <Dropdown
                menu={{
                  items: items,
                  
                }}
                placement="top"
              >
                <List size={20}/>
              </Dropdown>
            </td>
          </tr>
        </TBody>
      </TableContent>
    </Container>
  );
}
