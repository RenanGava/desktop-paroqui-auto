import styled from "styled-components";

export const Container = styled.main`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  table, th, td{
    /* border: 1px solid #000; */
  }

  th, td{
    line-height: 40px;
  }

  
`;

export const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 0;
  border-radius: 0.25rem;
  padding: 1rem;

`;

export const THeader = styled.thead`
  line-height: 40px;

  tr{
    background-color: aqua;
  }
  tr > th:first-child{
    border-top-left-radius: 0.25rem;
    /* background-color: #000; */;
  }
  tr > th:last-child{
    border-top-right-radius: 0.25rem;
    /* background-color: #000; */;
  }

`;

export const TBody = styled.tbody`
  text-align: center;

`;
