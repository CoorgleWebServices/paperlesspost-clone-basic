export const pitagorasFormula = (a, b, c) => {
  return Math.pow(a, 2) + Math.pow(b, 2) <= Math.pow(c, 2);
};

export const getAngleBetweenPoints = (a, b) => {
  const distance = {
    x: a.x - b.x,
    y: (a.y - b.y) * -1,
  };
  return Math.atan2(distance.y, distance.x);
};

export const getDistanceBetweenPoints = (a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

export const getCenterPosition = (x, y, width, height) => {
  return { x: x + width / 2, y: y + height / 2 };
};

export const getRotatedPosition = (center, pos, angle) => {
  const distance = getDistanceBetweenPoints(pos, center);
  const originAngle = getAngleBetweenPoints(pos, center);
  const rotatedAngle = originAngle + angle * -1;
  const x = Math.cos(rotatedAngle) * distance;
  const y = Math.sin(rotatedAngle) * distance;

  return { x: center.x + x, y: center.y - y };
};

export const isRectIn = (p, vs) => {
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i][0],
      yi = vs[i][1];
    let xj = vs[j][0],
      yj = vs[j][1];
    let intersect =
      yi > p[1] != yj > p[1] &&
      p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

export const getBoundaryPoints = (x, y, width, height, angle) => {
  const centerPos = getCenterPosition(x, y, width, height);
  const pos1 = getRotatedPosition({ ...centerPos }, { x, y }, angle);
  const pos2 = getRotatedPosition(centerPos, { x: x + width, y }, angle);
  const pos3 = getRotatedPosition(
    { ...centerPos },
    { x: x + width, y: y + height },
    angle
  );
  const pos4 = getRotatedPosition(centerPos, { x, y: y + height }, angle);
  return [
    [pos1.x, pos1.y],
    [pos2.x, pos2.y],
    [pos3.x, pos3.y],
    [pos4.x, pos4.y],
  ];
};
