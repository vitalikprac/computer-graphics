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
    line: lineFunction,
    point,
  });

  return { distance };
};

export const updateLine = ({ line, lineFunction }) => {
  const linePoints = createLinePointsFromLineFunction(lineFunction);

  line.geometry.attributes.position.setXYZ(
    0,
    linePoints.from.x,
    linePoints.from.y,
    0,
  );
  line.geometry.attributes.position.setXYZ(
    1,
    linePoints.to.x,
    linePoints.to.y,
    0,
  );
};

export const loadThreeJs = ({ setPoint, lineFunction }) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  const camera = createCamera({ width: WIDTH, height: HEIGHT });
  const controls = createOrbitControls({ camera, renderer });
  const scene = createScene();
  createHelper({ scene });

  const linePoints = createLinePointsFromLineFunction(lineFunction);
  const line = createLine(linePoints);
  scene.add(line);

  const point = createCircle({});
  scene.add(point);
  setPoint({ ...point.position });

  const dragControls = new DragControls([point], camera, renderer.domElement);

  const lineToPoint = createLine({
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
  });
  scene.add(lineToPoint);

  const calculate = (event, lineFunc) => {
    console.log(event);
    const { distance } = handleDrag({
      point: event.object.position,
      lineToPoint,
      lineFunction: lineFunc,
    });
    lineToPoint.geometry.attributes.position.needsUpdate = true;
    setPoint({ ...event.object.position, distance });
  };

  dragControls.addEventListener('drag', (event) => {
    calculate(event, lineFunction);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  return { renderer, point, line, calculate };
};
