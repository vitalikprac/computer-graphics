import { Form as FormAntd } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin-top: 4rem;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  user-select: none;
`;

export const Form = styled(FormAntd)`
  padding: 0.5rem;
  width: 300px;
  border: 2px solid black;
`;

export const Scene = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & canvas {
    border: 1px solid black;
  }
`;
