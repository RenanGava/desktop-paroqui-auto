import { Menu } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  width: 100%;
`;

export const Content = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
export const HeaderMenu = styled(Menu).attrs({
  mode: 'horizontal',

  styles: {
    root: {
      border: 0,
      display: 'flex',
      justifyContent: 'center'
    }
  }
})`
  width:100%
`
