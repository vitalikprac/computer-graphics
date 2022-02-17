import * as events from 'events';

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const HEIGHT = 600;
const WIDTH = 600;

const A = 4;
const B = 3;
const C = 12;

const lineFunction = (x, y) => A * x + B * y + C;

const getLineX = (y) => (-C - B * y) / A;
const getLineY = (x) => (-C - A * x) / B;

const getDistanceBetweenPointAndLine = ({ line, point }) => {
  const { a, b, c } = line;
  const { x, y } = point;

  return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
};

const getNearestPointToLine = ({ line, point }) => {
  const { a, b, c } = line;
  const { x, y } = point;

  const nearestX = (b * (b * x - a * y) - a * c) / (a * a + b * b);
  const nearestY = (a * (-b * x + a * y) - b * c) / (a * a + b * b);
  return { x: nearestX, y: nearestY };
};

const createCircle = ({ x = 0, y = 0, radius = 1 }) => {
  const circle = new THREE.Shape();
  circle.absarc(x, y, radius);
  const segments = 100;
  const geometry = new THREE.ShapeGeometry(circle, segments / 2);
  const material = new THREE.MeshBasicMaterial({
    color: '#3182bd',
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const squareMesh = new THREE.Mesh(geometry, material);
  return squareMesh;
};

const createLine = ({ from, to }) => {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;
  const points = [new THREE.Vector3(x1, y1, 0), new THREE.Vector3(x2, y2, 0)];

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geometry, material);
};

const createHelper = ({ scene }) => {
  const helper = new THREE.GridHelper(100, 2);
  helper.rotation.x = Math.PI / 2;
  helper.material.depthWrite = false;
  scene.add(helper);
};

const loadThreeJs = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  const camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 0.1, 1000);
  camera.position.z = 50;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 10;
  controls.maxDistance = 100;
  controls.enableRotate = false;
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#fff');

  createHelper({ scene });

  const x1 = -100;
  const y1 = getLineY(x1);

  const x2 = 100;
  const y2 = getLineY(x2);

  const line = createLine({
    from: {
      x: x1,
      y: y1,
    },
    to: {
      x: x2,
      y: y2,
    },
  });
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
    const line = {
      a: A,
      b: B,
      c: C,
    };
    const nearestPoint = getNearestPointToLine({
      line,
      point: event.object.position,
    });
    lineToPoint.geometry.attributes.position.setXYZ(
      1,
      event.object.position.x,
      event.object.position.y,
      0,
    );

    lineToPoint.geometry.attributes.position.setXYZ(
      0,
      nearestPoint.x,
      nearestPoint.y,
      0,
    );

    const distance = getDistanceBetweenPointAndLine({
      line,
      point: event.object.position,
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
