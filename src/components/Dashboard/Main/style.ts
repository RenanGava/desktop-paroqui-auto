import styled from "styled-components";

export const Container = styled.main`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  table, th, td{
    border: 1px solid #000;
  }
`;

export const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;


`;

export const THeader = styled.thead`

`;

export const TBody = styled.tbody`
  text-align: center;

`;
