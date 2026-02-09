// Color mapping for each cubie face based on position
export const COLORS = {
  right: 'red', // +x
  left: 'orange', // -x
  top: 'white', // +y
  bottom: 'yellow', // -y
  front: 'green', // +z
  back: 'blue', // -z
  internal: '#111', // interior faces
};

export const getCubieColors = (x, y, z) => [
  x === 1 ? COLORS.right : COLORS.internal, // +x
  x === -1 ? COLORS.left : COLORS.internal, // -x
  y === 1 ? COLORS.top : COLORS.internal, // +y
  y === -1 ? COLORS.bottom : COLORS.internal, // -y
  z === 1 ? COLORS.front : COLORS.internal, // +z
  z === -1 ? COLORS.back : COLORS.internal, // -z
];
