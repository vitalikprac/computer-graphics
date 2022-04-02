// eslint-disable-next-line import/no-extraneous-dependencies,no-unused-vars
import p5Types from 'p5';
import { useRef } from 'react';
import Sketch from 'react-p5';
import Stats from 'three/examples/jsm/libs/stats.module';

const WIDTH = 800;
const HEIGHT = 600;

const points = [
  {
    p1: {
      x: 50,
      y: 350,
    },
    p2: {
      x: 53.1328320802005,
      y: 323.07692307692304,
    },
    p3: {
      x: 62.15538847117794,
      y: 312.0401337792642,
    },
    p4: {
      x: 68.1704260651629,
      y: 310.0334448160535,
    },
  },
  {
    p1: {
      x: 68.1704260651629,
      y: 310.0334448160535,
    },
    p2: {
      x: 125.31328320802004,
      y: 297.9933110367893,
    },
    p3: {
      x: 214.5363408521303,
      y: 295.9866220735786,
    },
    p4: {
      x: 249.62406015037593,
      y: 304.0133779264214,
    },
  },
  {
    p1: {
      x: 249.62406015037593,
      y: 304.0133779264214,
    },
    p2: {
      x: 269.6741854636591,
      y: 247.82608695652172,
    },
    p3: {
      x: 294.7368421052631,
      y: 275.9197324414716,
    },
    p4: {
      x: 296.7418546365915,
      y: 306.0200668896321,
    },
  },
  {
    p1: {
      x: 296.7418546365915,
      y: 306.0200668896321,
    },
    p2: {
      x: 330.8270676691729,
      y: 304.0133779264214,
    },
    p3: {
      x: 329.82456140350877,
      y: 304.0133779264214,
    },
    p4: {
      x: 328.8220551378446,
      y: 306.0200668896321,
    },
  },
  {
    p1: {
      x: 328.8220551378446,
      y: 306.0200668896321,
    },
    p2: {
      x: 490.7268170426065,
      y: 97.32441471571906,
    },
    p3: {
      x: 497.7443609022556,
      y: 79.26421404682274,
    },
    p4: {
      x: 551.8796992481202,
      y: 92.3076923076923,
    },
  },
  {
    p1: {
      x: 551.8796992481202,
      y: 92.3076923076923,
    },
    p2: {
      x: 611.0275689223057,
      y: 114.38127090301003,
    },
    p3: {
      x: 609.0225563909775,
      y: 116.38795986622073,
    },
    p4: {
      x: 607.0175438596491,
      y: 114.38127090301003,
    },
  },
  {
    p1: {
      x: 607.0175438596491,
      y: 114.38127090301003,
    },
    p2: {
      x: 594.9874686716792,
      y: 187.62541806020067,
    },
    p3: {
      x: 505.7644110275689,
      y: 331.10367892976586,
    },
    p4: {
      x: 492.7318295739348,
      y: 332.10702341137124,
    },
  },
  {
    p1: {
      x: 492.7318295739348,
      y: 332.10702341137124,
    },
    p2: {
      x: 571.9298245614035,
      y: 373.24414715719064,
    },
    p3: {
      x: 578.9473684210526,
      y: 378.2608695652174,
    },
    p4: {
      x: 579.9498746867167,
      y: 380.2675585284281,
    },
  },
  {
    p1: {
      x: 579.9498746867167,
      y: 380.2675585284281,
    },
    p2: {
      x: 611.0275689223057,
      y: 343.1438127090301,
    },
    p3: {
      x: 639.0977443609022,
      y: 360.2006688963211,
    },
    p4: {
      x: 626.0651629072681,
      y: 401.33779264214047,
    },
  },
  {
    p1: {
      x: 626.0651629072681,
      y: 401.33779264214047,
    },
    p2: {
      x: 662.155388471178,
      y: 416.38795986622074,
    },
    p3: {
      x: 704.2606516290726,
      y: 438.46153846153845,
    },
    p4: {
      x: 701.2531328320802,
      y: 445.4849498327759,
    },
  },
  {
    p1: {
      x: 701.2531328320802,
      y: 445.4849498327759,
    },
    p2: {
      x: 701.2531328320802,
      y: 466.5551839464883,
    },
    p3: {
      x: 668.1704260651629,
      y: 476.5886287625418,
    },
    p4: {
      x: 658.1453634085212,
      y: 473.5785953177257,
    },
  },
  {
    p1: {
      x: 658.1453634085212,
      y: 473.5785953177257,
    },
    p2: {
      x: 411.5288220551378,
      y: 445.4849498327759,
    },
    p3: {
      x: 408.52130325814534,
      y: 436.45484949832775,
    },
    p4: {
      x: 401.50375939849624,
      y: 437.45819397993307,
    },
  },
  {
    p1: {
      x: 401.50375939849624,
      y: 437.45819397993307,
    },
    p2: {
      x: 388.4711779448621,
      y: 479.59866220735785,
    },
    p3: {
      x: 351.3784461152882,
      y: 475.58528428093643,
    },
    p4: {
      x: 325.31328320802004,
      y: 464.5484949832776,
    },
  },
  {
    p1: {
      x: 325.31328320802004,
      y: 464.5484949832776,
    },
    p2: {
      x: 281.203007518797,
      y: 491.63879598662203,
    },
    p3: {
      x: 213.03258145363407,
      y: 499.66555183946485,
    },
    p4: {
      x: 196.99248120300751,
      y: 480.6020066889632,
    },
  },
  {
    p1: {
      x: 196.99248120300751,
      y: 480.6020066889632,
    },
    p2: {
      x: 187.96992481203006,
      y: 465.5518394648829,
    },
    p3: {
      x: 166.9172932330827,
      y: 452.50836120401334,
    },
    p4: {
      x: 144.86215538847117,
      y: 453.5117056856187,
    },
  },
  {
    p1: {
      x: 144.86215538847117,
      y: 453.5117056856187,
    },
    p2: {
      x: 141.85463659147868,
      y: 428.4280936454849,
    },
    p3: {
      x: 182.95739348370927,
      y: 423.4113712374582,
    },
    p4: {
      x: 189.9749373433584,
      y: 427.4247491638796,
    },
  },
  {
    p1: {
      x: 189.9749373433584,
      y: 427.4247491638796,
    },
    p2: {
      x: 164.91228070175438,
      y: 363.2107023411371,
    },
    p3: {
      x: 162.90726817042605,
      y: 367.2240802675585,
    },
    p4: {
      x: 164.91228070175438,
      y: 368.22742474916384,
    },
  },
  {
    p1: {
      x: 164.91228070175438,
      y: 368.22742474916384,
    },
    p2: {
      x: 109.77443609022556,
      y: 341.1371237458194,
    },
    p3: {
      x: 79.69924812030075,
      y: 343.1438127090301,
    },
    p4: {
      x: 51.62907268170426,
      y: 350.16722408026754,
    },
  },
  {
    p1: {
      x: 232,
      y: 398,
    },
    p2: {
      x: 215,
      y: 362,
    },
  },
  {
    p1: {
      x: 215,
      y: 362,
    },
    p2: {
      x: 255,
      y: 366,
    },
  },
  {
    p1: {
      x: 255,
      y: 366,
    },
    p2: {
      x: 232,
      y: 398,
    },
  },
];

window.points = points;

const lastPoint = points[0];

const firstPoint = { ...lastPoint.p4 };
const secondPoint = { ...lastPoint.p4 };
const thirdPoint = { ...lastPoint.p4 };
const fourthPoint = { ...lastPoint.p4 };

const STATE_FIRST = 1;
const STATE_BEZIC_1 = 2;
const STATE_BEZIC_2 = 3;

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

export const Canvas = ({ setMouse, setState }) => {
  const stateRef = useRef(STATE_FIRST);
  /**
   *
   * @param {p5Types} p5
   * @param canvasParentRef
   */
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
  };

  /**
   *
   * @param {p5Types} p5
   */
  const draw = (p5) => {
    p5.background(255);
    setMouse({ x: p5.mouseX, y: p5.mouseY });

    points.forEach(({ p1, p2, p3, p4 }) => {
      if (p3 && p4) {
        myBezier(p5, p1, p2, p3, p4);
      } else {
        p5.line(p1.x, p1.y, p2.x, p2.y);
      }
    });

    switch (stateRef.current) {
      case STATE_FIRST:
        fourthPoint.x = p5.mouseX;
        fourthPoint.y = p5.mouseY;
        // p5.line(firstPoint.x, firstPoint.y, fourthPoint.x, fourthPoint.y);
        break;
      case STATE_BEZIC_1:
        thirdPoint.x = fourthPoint.x;
        thirdPoint.y = fourthPoint.y;
        secondPoint.x = p5.mouseX;
        secondPoint.y = p5.mouseY;
        myBezier(p5, firstPoint, secondPoint, thirdPoint, fourthPoint);

        break;
      case STATE_BEZIC_2:
        thirdPoint.x = p5.mouseX;
        thirdPoint.y = p5.mouseY;
        myBezier(p5, firstPoint, secondPoint, thirdPoint, fourthPoint);
        break;
      default:
        break;
    }
  };

  const mouseClicked = (p5) => {
    switch (stateRef.current) {
      case STATE_FIRST:
        fourthPoint.x = p5.mouseX;
        fourthPoint.y = p5.mouseY;
        stateRef.current = STATE_BEZIC_1;
        break;
      case STATE_BEZIC_1:
        secondPoint.x = p5.mouseX;
        secondPoint.y = p5.mouseY;
        stateRef.current = STATE_BEZIC_2;
        break;
      case STATE_BEZIC_2:
        thirdPoint.x = p5.mouseX;
        thirdPoint.y = p5.mouseY;
        stateRef.current = STATE_FIRST;
        points.push({
          p1: { ...firstPoint },
          p2: { ...secondPoint },
          p3: { ...thirdPoint },
          p4: { ...fourthPoint },
        });

        firstPoint.x = fourthPoint.x;
        firstPoint.y = fourthPoint.y;
        setState([...points]);
        break;
      default:
        break;
    }

    // points.push({ x: p5.mouseX, y: p5.mouseY });
  };

  return <Sketch mouseClicked={mouseClicked} setup={setup} draw={draw} />;
};
