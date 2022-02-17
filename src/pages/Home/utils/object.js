import * as THREE from 'three';

import {
  CIRCLE_SEGMENTS,
  DEFAULT_CIRCLE_COLOR,
  DEFAULT_LINE_COLOR,
  GRID_DIVISIONS,
  GRID_SIZE,
  LINE_FUNCTION_X1,
  LINE_FUNCTION_X2,
} from './constants';
import { getLineY } from './math';

export const createCircle = ({
  x = 0,
  y = 0,
  radius = 1,
  color = DEFAULT_CIRCLE_COLOR,
}) => {
  const circle = new THREE.Shape();
  circle.absarc(x, y, radius);
  const geometry = new THREE.ShapeGeometry(circle, CIRCLE_SEGMENTS / 2);
  const material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  return new THREE.Mesh(geometry, material);
};

export const createLine = ({ from, to, color = DEFAULT_LINE_COLOR }) => {
  const { x: x1, y: y1, z1 = 0 } = from;
  const { x: x2, y: y2, z2 = 0 } = to;
  const points = [new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2)];
  const material = new THREE.LineBasicMaterial({ color });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geometry, material);
};

export const createHelper = ({ scene }) => {
  const helper = new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS);
  helper.rotation.x = Math.PI / 2;
  helper.material.depthWrite = false;
  scene.add(helper);
};

export const createLinePointsFromLineFunction = (lineFunction) => {
  const x1 = LINE_FUNCTION_X1;
  const x2 = LINE_FUNCTION_X2;
  return {
    from: {
      x: x1,
      y: getLineY(x1, lineFunction),
    },
    to: {
      x: x2,
      y: getLineY(x2, lineFunction),
    },
  };
};
