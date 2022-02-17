export const getLineX = (y, { a, b, c }) => (-c - b * y) / a;
export const getLineY = (x, { a, b, c }) => (-c - a * x) / b;

export const getDistanceBetweenPointAndLine = ({ line, point }) => {
  const { a, b, c } = line;
  const { x, y } = point;

  return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
};

export const getNearestPointToLine = ({ line, point }) => {
  const { a, b, c } = line;
  const { x, y } = point;

  const nearestX = (b * (b * x - a * y) - a * c) / (a * a + b * b);
  const nearestY = (a * (-b * x + a * y) - b * c) / (a * a + b * b);
  return { x: nearestX, y: nearestY };
};
