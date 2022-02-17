import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

import { getDistanceBetweenPointAndLine, getNearestPointToLine } from './math';
import {
  createCircle,
  createHelper,
  createLine,
  createLinePointsFromLineFunction,
} from './object';
import { createCamera, createOrbitControls, createScene } from './sceneUtils';

const HEIGHT = 600;
const WIDTH = 600;

const LINE_FUNCTION = {
  a: 4,
  b: 3,
  c: 12,
};

const handleDrag = ({ point, lineToPoint, lineFunction }) => {
  const nearestPoint = getNearestPointToLine({
    line: lineFunction,
    point,
  });
  lineToPoint.geometry.attributes.position.setXYZ(1, point.x, point.y, 0);

  lineToPoint.geometry.attributes.position.setXYZ(
    0,
    nearestPoint.x,
    nearestPoint.y,
    0,
  );

  const distance = getDistanceBetweenPointAndLine({
    line: LINE_FUNCTION,
    point,
  });
  // eslint-disable-next-line no-console
  console.log(distance);
  // TODO: distance between point and line
};

export const loadThreeJs = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  const camera = createCamera({ width: WIDTH, height: HEIGHT });
  const controls = createOrbitControls({ camera, renderer });
  const scene = createScene();
  createHelper({ scene });

  const linePoints = createLinePointsFromLineFunction(LINE_FUNCTION);
  const line = createLine(linePoints);
  scene.add(line);

  const point = createCircle({});
  scene.add(point);

  const dragControls = new DragControls([point], camera, renderer.domElement);

  const lineToPoint = createLine({
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
  });
  scene.add(lineToPoint);

  dragControls.addEventListener('drag', (event) => {
    handleDrag({
      point: event.object.position,
      lineToPoint,
      lineFunction: LINE_FUNCTION,
    });
    lineToPoint.geometry.attributes.position.needsUpdate = true;
  });

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  return { renderer };
};
