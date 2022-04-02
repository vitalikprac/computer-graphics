import * as THREE from 'three';

import { getDistanceBetweenPointAndLine } from './math';
import {
  createCircle,
  createHelper,
  createLine,
  createLinePointsFromLineFunction,
  createPlane,
} from './object';
import {
  createCamera,
  createScene,
  createTrackballControls,
} from './sceneUtils';

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

const rVector = { x: 0, y: 0, z: 0 };
const pointCoords = { x: 0, y: 0, z: 10 };

const A = 0;
const B = 1;
const C = 0.5;
const D = 0;
const normalVector = { x: A, y: B, z: C };

export const loadThreeJs = ({ sceneRef, setPoint }) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  const camera = createCamera({ width: WIDTH, height: HEIGHT });

  const scene = createScene();
  createHelper({ scene });

  const plane = createPlane(normalVector, D);

  setPoint(pointCoords);

  const distanceToPoint = plane.distanceToPoint(
    new THREE.Vector3(pointCoords.x, pointCoords.y, pointCoords.z),
  );

  const projection = plane.projectPoint(
    new THREE.Vector3(pointCoords.x, pointCoords.y, pointCoords.z),
    new THREE.Vector3(normalVector.x, normalVector.y, normalVector.z),
  );

  const r = plane.intersectLine(
    new THREE.Line3(
      new THREE.Vector3(projection.x, projection.y, projection.z),
      new THREE.Vector3(pointCoords.x, pointCoords.y, pointCoords.z),
    ),
    new THREE.Vector3(0, 0, 0),
  );

  const planeHelper = new THREE.PlaneHelper(plane, 30, 0xffff00);
  scene.add(planeHelper);

  const point = createCircle({
    x: pointCoords.x,
    y: pointCoords.y,
    z: pointCoords.z,
    radius: 0.25,
  });
  scene.add(point);

  const pointProjected = createCircle({
    x: r.x,
    y: r.y,
    z: r.z,
    radius: 0.25,
  });
  scene.add(pointProjected);

  const lineToPoint = createLine({
    from: pointCoords,
    to: r,
  });
  scene.add(lineToPoint);

  let isAnimateEnabled = true;
  const stopAnimation = () => {
    isAnimateEnabled = false;
  };

  let controls;
  const animate = () => {
    if (!isAnimateEnabled) {
      return;
    }
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  sceneRef.current.appendChild(renderer.domElement);
  controls = createTrackballControls({ camera, renderer });
  animate();

  return { renderer, stopAnimation };
};
