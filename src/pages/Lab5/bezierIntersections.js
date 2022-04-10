/* eslint-disable */
const POLYNOMIAL_TOLERANCE = 1e-6;
const TOLERANCE = 1e-12;

export function getPolynomialRoots() {
  const C = arguments;
  let degree = C.length - 1;
  const n = degree;
  const results = [];
  for (let i = 0; i <= degree; i++) {
    if (Math.abs(C[i]) <= TOLERANCE) degree--;
    else break;
  }

  switch (degree) {
    case 1:
      getLinearRoots(C[n], C[n - 1], results);
      break;
    case 2:
      getQuadraticRoots(C[n], C[n - 1], C[n - 2], results);
      break;
    case 3:
      getCubicRoots(C[n], C[n - 1], C[n - 2], C[n - 3], results);
      break;
    default:
      break;
  }

  return results;
}

export function getLinearRoots(C0, C1, results = []) {
  if (C1 !== 0) results.push(-C0 / C1);
  return results;
}

export function getQuadraticRoots(C0, C1, C2, results = []) {
  const a = C2;
  const b = C1 / a;
  const c = C0 / a;
  const d = b * b - 4 * c;

  if (d > 0) {
    const e = Math.sqrt(d);

    results.push(0.5 * (-b + e));
    results.push(0.5 * (-b - e));
  } else if (d === 0) {
    results.push(0.5 * -b);
  }

  return results;
}

export function getCubicRoots(C0, C1, C2, C3, results = []) {
  const c3 = C3;
  const c2 = C2 / c3;
  const c1 = C1 / c3;
  const c0 = C0 / c3;

  const a = (3 * c1 - c2 * c2) / 3;
  const b = (2 * c2 * c2 * c2 - 9 * c1 * c2 + 27 * c0) / 27;
  const offset = c2 / 3;
  let discrim = (b * b) / 4 + (a * a * a) / 27;
  const halfB = b / 2;
  let tmp;
  let root;

  if (Math.abs(discrim) <= POLYNOMIAL_TOLERANCE) discrim = 0;

  if (discrim > 0) {
    const e = Math.sqrt(discrim);
    tmp = -halfB + e;
    if (tmp >= 0) root = tmp ** (1 / 3);
    else root = -((-tmp) ** (1 / 3));
    tmp = -halfB - e;
    if (tmp >= 0) root += tmp ** (1 / 3);
    else root -= (-tmp) ** (1 / 3);
    results.push(root - offset);
  } else if (discrim < 0) {
    const distance = Math.sqrt(-a / 3);
    const angle = Math.atan2(Math.sqrt(-discrim), -halfB) / 3;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const sqrt3 = Math.sqrt(3);

    results.push(2 * distance * cos - offset);
    results.push(-distance * (cos + sqrt3 * sin) - offset);
    results.push(-distance * (cos - sqrt3 * sin) - offset);
  } else {
    if (halfB >= 0) tmp = -(halfB ** (1 / 3));
    else tmp = (-halfB) ** (1 / 3);

    results.push(2 * tmp - offset);
    results.push(-tmp - offset);
  }

  return results;
}

export function cubicBezierLine(
  p1x,
  p1y,
  p2x,
  p2y,
  p3x,
  p3y,
  p4x,
  p4y,
  a1x,
  a1y,
  a2x,
  a2y,
  result,
) {
  let ax;
  let ay;
  let bx;
  let by;
  let cx;
  let cy;
  let dx;
  let dy;
  let c3x;
  let c3y;
  let c2x;
  let c2y;
  let c1x;
  let c1y;
  let c0x;
  let c0y;
  let cl;
  let nx;
  let ny;
  const minx = Math.min(a1x, a2x);
  const miny = Math.min(a1y, a2y);
  const maxx = Math.max(a1x, a2x);
  const maxy = Math.max(a1y, a2y);
  ax = p1x * -1;
  ay = p1y * -1;
  bx = p2x * 3;
  by = p2y * 3;
  cx = p3x * -3;
  cy = p3y * -3;
  dx = ax + bx + cx + p4x;
  dy = ay + by + cy + p4y;
  c3x = dx;
  c3y = dy;
  ax = p1x * 3;
  ay = p1y * 3;
  bx = p2x * -6;
  by = p2y * -6;
  cx = p3x * 3;
  cy = p3y * 3;
  dx = ax + bx + cx;
  dy = ay + by + cy;
  c2x = dx;
  c2y = dy;
  ax = p1x * -3;
  ay = p1y * -3;
  bx = p2x * 3;
  by = p2y * 3;
  cx = ax + bx;
  cy = ay + by;
  c1x = cx;
  c1y = cy;
  c0x = p1x;
  c0y = p1y;
  nx = a1y - a2y;
  ny = a2x - a1x;
  cl = a1x * a2y - a2x * a1y;
  const roots = getPolynomialRoots(
    nx * c3x + ny * c3y,
    nx * c2x + ny * c2y,
    nx * c1x + ny * c1y,
    nx * c0x + ny * c0y + cl,
  );

  for (let i = 0; i < roots.length; i++) {
    const t = roots[i];
    if (t >= 0 && t <= 1) {
      const p5x = p1x + (p2x - p1x) * t;
      const p5y = p1y + (p2y - p1y) * t;
      const p6x = p2x + (p3x - p2x) * t;
      const p6y = p2y + (p3y - p2y) * t;

      const p7x = p3x + (p4x - p3x) * t;
      const p7y = p3y + (p4y - p3y) * t;

      const p8x = p5x + (p6x - p5x) * t;
      const p8y = p5y + (p6y - p5y) * t;

      const p9x = p6x + (p7x - p6x) * t;
      const p9y = p6y + (p7y - p6y) * t;

      const p10x = p8x + (p9x - p8x) * t;
      const p10y = p8y + (p9y - p8y) * t;

      if (a1x === a2x) {
        if (miny <= p10y && p10y <= maxy) {
          if (result) result.push(p10x, p10y);
          else return 1;
        }
      } else if (a1y === a2y) {
        if (minx <= p10x && p10x <= maxx) {
          if (result) result.push(p10x, p10y);
          else return 1;
        }
      } else if (p10x >= minx && p10y >= miny && p10x <= maxx && p10y <= maxy) {
        if (result) result.push(p10x, p10y);
        else return 1;
      }
    }
  }
  return result ? result.length / 2 : 0;
}

export function cubicBezierAABB(
  ax,
  ay,
  c1x,
  c1y,
  c2x,
  c2y,
  bx,
  by,
  a1x,
  a1y,
  c11x,
  c11y,
  c22x,
  c22y,
  b1x,
  b1y,
  result,
) {
  const { xmin, ymin, xmax, ymax } = arguments;
  return { x: 0, y: 0 };
  if (result) {
    cubicBezierLine(
      ax,
      ay,
      c1x,
      c1y,
      c2x,
      c2y,
      bx,
      by,
      xmin,
      ymin,
      xmax,
      ymin,
      result,
    );
    cubicBezierLine(
      ax,
      ay,
      c1x,
      c1y,
      c2x,
      c2y,
      bx,
      by,
      xmax,
      ymin,
      xmax,
      ymax,
      result,
    );
    cubicBezierLine(
      ax,
      ay,
      c1x,
      c1y,
      c2x,
      c2y,
      bx,
      by,
      xmin,
      ymax,
      xmax,
      ymax,
      result,
    );
    cubicBezierLine(
      ax,
      ay,
      c1x,
      c1y,
      c2x,
      c2y,
      bx,
      by,
      xmin,
      ymin,
      xmin,
      ymax,
      result,
    );
    return result.length / 2;
  }
  if (xmin <= ax && xmax >= ax && ymin <= ay && ymax >= ay) return 1;
  if (xmin <= bx && xmax >= bx && ymin <= by && ymax >= by) return 1;
  if (
    cubicBezierLine(ax, ay, c1x, c1y, c2x, c2y, bx, by, xmin, ymin, xmax, ymin)
  )
    return 1;
  if (
    cubicBezierLine(ax, ay, c1x, c1y, c2x, c2y, bx, by, xmax, ymin, xmax, ymax)
  )
    return 1;
  if (
    cubicBezierLine(ax, ay, c1x, c1y, c2x, c2y, bx, by, xmin, ymax, xmax, ymax)
  )
    return 1;
  if (
    cubicBezierLine(ax, ay, c1x, c1y, c2x, c2y, bx, by, xmin, ymin, xmin, ymax)
  )
    return 1;
  return 0;
}
