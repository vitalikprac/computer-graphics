import { useEffect, useRef, useState } from 'react';

import { useWindowUnloadEffect } from '../../utils/useWindowUnloadEffect';

import { loadThreeJs } from './utils/threeUtils';

export const useLab2 = ({ sceneRef, lineFunction }) => {
  const [loaded, setLoaded] = useState(false);
  const stopAnimationRef = useRef(null);

  const [point, setPoint] = useState({});

  const lineRef = useRef(null);
  const calculateRef = useRef(null);

  useWindowUnloadEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.childNodes?.[0]?.remove?.();
      stopAnimationRef.current?.();
    }

    const { stopAnimation } = loadThreeJs({ sceneRef, setPoint });

    stopAnimationRef.current = stopAnimation;
  }, true);

  useEffect(() => {
    if (loaded || !sceneRef) {
      return;
    }
    const { stopAnimation } = loadThreeJs({ sceneRef, setPoint });

    stopAnimationRef.current = stopAnimation;

    setLoaded(true);
  }, [sceneRef, loaded, lineFunction]);

  return { point, line: lineRef.current, calculate: () => {} };
};
