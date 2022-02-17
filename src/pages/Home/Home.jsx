import { useRef } from 'react';

import { useHome } from './useHome';
import * as S from './Home.styled';

const Home = () => {
  const sceneRef = useRef(null);

  useHome({ sceneRef });

  return (
    <S.Wrapper>
      <span>Hello world</span>
      <S.Scene ref={sceneRef} />
    </S.Wrapper>
  );
};

export default Home;
