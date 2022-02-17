import { useEffect, useState } from 'react';

import { loadThreeJs } from './utils/threeUtils';

export const useHome = ({ sceneRef }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded || !sceneRef) {
      return;
    }
    const { renderer } = loadThreeJs();

    sceneRef.current.appendChild(renderer.domElement);

    setLoaded(true);
  }, [sceneRef, loaded]);
};
