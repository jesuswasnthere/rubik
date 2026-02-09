import { useState, useCallback } from 'react';

const COLORS = {
  right: '#921111', left: '#f36113', top: '#ffffff', 
  bottom: '#fdd835', front: '#1b5e20', back: '#0d47a1', internal: '#212121'
};

const getInitialColors = (x, y, z) => {
  const nx = Math.round(x);
  const ny = Math.round(y);
  const nz = Math.round(z);
  return [
    nx === 1 ? COLORS.right : COLORS.internal,  // 0: +x
    nx === -1 ? COLORS.left : COLORS.internal,  // 1: -x
    ny === 1 ? COLORS.top : COLORS.internal,    // 2: +y
    ny === -1 ? COLORS.bottom : COLORS.internal, // 3: -y
    nz === 1 ? COLORS.front : COLORS.internal,  // 4: +z
    nz === -1 ? COLORS.back : COLORS.internal,  // 5: -z
  ];
};

export const useCubeLogic = () => {
  const generateState = () => {
    const cubies = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          cubies.push({
            id: `c-${x}-${y}-${z}`,
            position: [x, y, z],
            colors: getInitialColors(x, y, z),
          });
        }
      }
    }
    return cubies;
  };

  const [cubies, setCubies] = useState(generateState);
  const [moves, setMoves] = useState(0);

  const rotateFace = useCallback((axis, layer, direction = 1) => {
    setCubies((prev) =>
      prev.map((cubie) => {
        const axisMap = { x: 0, y: 1, z: 2 };
        const idx = axisMap[axis];

        if (Math.round(cubie.position[idx]) !== layer) return cubie;

        let [x, y, z] = cubie.position;
        let nP = [...cubie.position];
        let nC = [...cubie.colors];

        // MATRIZ DE PERMUTACIÓN CORREGIDA (Sentido Horario)
        if (axis === 'y') {
          nP[0] = z * direction;
          nP[2] = -x * direction;
          nC = direction === 1 
            ? [nC[4], nC[5], nC[2], nC[3], nC[1], nC[0]] 
            : [nC[5], nC[4], nC[2], nC[3], nC[0], nC[1]];
        } else if (axis === 'x') {
          nP[1] = -z * direction;
          nP[2] = y * direction;
          nC = direction === 1
            ? [nC[0], nC[1], nC[5], nC[4], nC[2], nC[3]]
            : [nC[0], nC[1], nC[4], nC[5], nC[3], nC[2]];
        } else if (axis === 'z') {
          nP[0] = -y * direction;
          nP[1] = x * direction;
          // CORRECCIÓN CLAVE AQUÍ:
          nC = direction === 1
            ? [nC[3], nC[2], nC[0], nC[1], nC[4], nC[5]]
            : [nC[2], nC[3], nC[1], nC[0], nC[4], nC[5]];
        }

        return { 
          ...cubie, 
          position: [Math.round(nP[0]), Math.round(nP[1]), Math.round(nP[2])], 
          colors: nC 
        };
      })
    );
    setMoves(m => m + 1);
  }, []);

  const shuffle = () => {
    const axes = ['x', 'y', 'z'], layers = [-1, 0, 1];
    for (let i = 0; i < 20; i++) {
      rotateFace(axes[Math.floor(Math.random() * 3)], layers[Math.floor(Math.random() * 3)], 1);
    }
    setMoves(0);
  };

  const isSolved = () => {
    const faces = [
      { axis: 0, layer: 1, colorIdx: 0 }, { axis: 0, layer: -1, colorIdx: 1 },
      { axis: 1, layer: 1, colorIdx: 2 }, { axis: 1, layer: -1, colorIdx: 3 },
      { axis: 2, layer: 1, colorIdx: 4 }, { axis: 2, layer: -1, colorIdx: 5 }
    ];
    return faces.every(({ axis, layer, colorIdx }) => {
      const faceCubies = cubies.filter(c => Math.round(c.position[axis]) === layer);
      const firstColor = faceCubies[0].colors[colorIdx];
      return faceCubies.every(c => c.colors[colorIdx] === firstColor);
    });
  };

  return { cubies, rotateFace, shuffle, reset: () => { setCubies(generateState()); setMoves(0); }, isSolved, moves };
};