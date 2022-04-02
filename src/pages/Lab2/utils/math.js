import * as THREE from 'three';

export const getLineX = (y, { a, b, c }) => (-c - b * y) / a;
export const getLineY = (x, { a, b, c }) => (-c - a * x) / b;

export const getDistanceBetweenPointAndLine = ({ line, point }) => {
  const { a, b, c } = line;
  const { x, y } = point;

  return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
};

export const getNearestPointToSquare = ({ square, point }) => {
  const { a, b, c, d, e, f } = square;
  const { x, y, z } = point;

  const t =
    (a * d - a * x + b * e - b * y + c * f - c * z) / (a * a + b * b + c * c);
  return {
    x: x + t * a,
    y: y + t * b,
    z: z + t * c,
  };
};

const calculateDistanceBetweenTwoPoints = (point1, point2) => {
  const { x: x1, y: y1, z: z1 } = point1;
  const { x: x2, y: y2, z: z2 } = point2;

  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
};

// n - це вектор нормалі (0,0,1);
// r - це вектор до площини (1,1,1);

// Ax+By+Cz+D=0;

// n*r = 0; - раціональноми векторний-параметричний вигляд.

// n
