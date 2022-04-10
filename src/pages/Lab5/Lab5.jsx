import { useEffect, useRef, useState } from 'react';

import { Canvas } from './Canvas';
import * as S from './Lab5.styled';

const Lab5 = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [intersection, setIntersection] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log(mouse.x, mouse.y);
  }, [mouse]);

  return (
    <S.Wrapper>
      <Canvas setMouse={setMouse} setIntersection={setIntersection} />
      <div>
        Перетин в точці
        <b>
          x: {intersection.x.toFixed(2)}, y: {intersection.y.toFixed(2)}
        </b>
      </div>
    </S.Wrapper>
  );
};

export default Lab5;
