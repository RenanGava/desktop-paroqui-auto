import React, { useEffect, useState } from "react";
import { Container, Content, HeaderMenu } from "./style";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation } from "react-router";

// eslint-disable-next-line import/no-unresolved

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: (<Link to={"/dizimo"}>Dizimo</Link>),
    key: 'dizimo',
  },
  {
    label: (<Link to={"/oferta"}>Oferta</Link>),
    key: 'oferta',
  },
  {
    label: (<Link to={"/coleta"}>Coleta</Link>),
    key: 'coleta',
  },
  {
    label: (<Link to={"/fieis"}>Fieis</Link>),
    key: 'fieis',
  },
  {
    key: 'config',
    label: 'Config App',
    disabled: false,
    children: [
      {
        label: (<Link to={"/syncColetas"}>Lançamentos e Coletas</Link>),
        key: 'syncColetas',
      },
      {
        label: (<Link to={"/tipos"}>tipo</Link>),
        key: 'tipos',
      }
    ]
  }
]

export function Header() {

  const [tab, setTab] = useState('dizimo')

  function handleTab(e: any) {
    setTab(e.key)
  }
  return (
    <Container>
      <Content>
        <HeaderMenu
          onClick={handleTab}
          selectedKeys={[tab]}
          items={items}
        />
      </Content>
    </Container>
  );
}
