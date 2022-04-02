import { useRef, useState } from 'react';

import { Canvas } from './Canvas';
import * as S from './Lab3.styled';

const Lab3 = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [state, setState] = useState(1);

  return (
    <S.Wrapper>
      <Canvas setMouse={setMouse} setState={setState} />
    </S.Wrapper>
  );
};

export default Lab3;
