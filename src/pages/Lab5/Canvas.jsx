// eslint-disable-next-line import/no-extraneous-dependencies,no-unused-vars
import p5Types from 'p5';
import { useRef } from 'react';
import Sketch from 'react-p5';
import Stats from 'three/examples/jsm/libs/stats.module';

import { cubicBezierAABB } from './bezierIntersections';

const WIDTH = 800;
const HEIGHT = 600;

const firstLine = {
  p1: { x: 136, y: 500 },
  p2: { x: 338, y: 442 },
  p3: { x: 263, y: 144 },
  p4: { x: 700, y: 83 },
};

const secondLine = {
  p1: { x: 700, y: 500 },
  p2: { x: 467, y: 462 },
  p3: { x: 284, y: 162 },
  p4: { x: 100, y: 100 },
};

const bezier = (t, p0, p1, p2, p3) => {
  const cX = 3 * (p1.x - p0.x);
  const bX = 3 * (p2.x - p1.x) - cX;
  const aX = p3.x - p0.x - cX - bX;
  const cY = 3 * (p1.y - p0.y);
  const bY = 3 * (p2.y - p1.y) - cY;
  const aY = p3.y - p0.y - cY - bY;
  const x = aX * t ** 3 + bX * t ** 2 + cX * t + p0.x;
  const y = aY * t ** 3 + bY * t ** 2 + cY * t + p0.y;
  return { x, y };
};

const drawBezier = (ctx, p1, p2, p3, p4) => {
  const accuracy = 0.01;
  let lPx = p1.x;
  let lPy = p1.y;
  for (let i = 0; i < 1; i += accuracy) {
    const p = bezier(i, p1, p2, p3, p4);
    ctx.line(lPx, lPy, p.x, p.y);
    lPx = p.x;
    lPy = p.y;
  }
};

const myBezier = (p5, p1, p2, p3, p4) => {
  drawBezier(p5, p1, p2, p3, p4);
};

export const Canvas = ({ setMouse, setIntersection }) => {
  /**
   *
   * @param {p5Types} p5
   * @param canvasParentRef
   */
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);

    const result = cubicBezierAABB(
      firstLine.p1.x,
      firstLine.p1.y,
      firstLine.p2.x,
      firstLine.p2.y,
      firstLine.p3.x,
      firstLine.p3.y,
      firstLine.p4.x,
      firstLine.p4.y,
      secondLine.p1.x,
      secondLine.p1.y,
      secondLine.p2.x,
      secondLine.p2.y,
      secondLine.p3.x,
      secondLine.p3.y,
      secondLine.p4.x,
      secondLine.p4.y,
    );
    //
    setIntersection(result);
  };

  /**
   *
   * @param {p5Types} p5
   */
  const draw = (p5) => {
    p5.background(255);

    myBezier(p5, firstLine.p1, firstLine.p2, firstLine.p3, firstLine.p4);
    myBezier(p5, secondLine.p1, secondLine.p2, secondLine.p3, secondLine.p4);
    setMouse({
      x: p5.mouseX,
      y: p5.mouseY,
    });
  };

  return <Sketch setup={setup} draw={draw} />;
};
