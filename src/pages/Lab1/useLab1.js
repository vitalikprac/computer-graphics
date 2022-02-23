import { useEffect, useRef, useState } from 'react';

import { loadThreeJs } from './utils/threeUtils';

export const useLab1 = ({ sceneRef, lineFunction }) => {
  const [loaded, setLoaded] = useState(false);

  const [point, setPoint] = useState({});

  const lineRef = useRef(null);
  const calculateRef = useRef(null);

  useEffect(() => {
    if (loaded || !sceneRef) {
      return;
    }
    const { renderer, line, calculate } = loadThreeJs({
      setPoint,
      lineFunction,
    });

    lineRef.current = line;
    calculateRef.current = calculate;
    sceneRef.current.appendChild(renderer.domElement);

    setLoaded(true);
  }, [sceneRef, loaded, lineFunction]);

  return { point, line: lineRef.current, calculate: calculateRef.current };
};
