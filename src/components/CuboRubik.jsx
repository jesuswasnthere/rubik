import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useCubeLogic } from '../hooks/useCubeLogic';
import Cubito from './Cubito';

const CuboRubik = () => {
  const { cubies, rotateFace, shuffle, reset, isSolved, moves } = useCubeLogic();

  // Función para ejecutar movimientos por nombre
  const handleMove = (name, axis, layer, dir) => {
    rotateFace(axis, layer, dir);
  };

  return (
    <div className="cube-shell">
      <div className="cube-hud">
        <div className="hud-header">
          <h2>Simulador 3x3</h2>
          <span className="hud-moves">Movimientos: {moves}</span>
        </div>

        <div className="hud-actions">
          <button onClick={shuffle}>Mezclar</button>
          <button onClick={reset}>Reiniciar</button>
        </div>

        <hr />

        <div className="hud-grid">
          <button onClick={() => handleMove('U', 'y', 1, 1)}>U</button>
          <button onClick={() => handleMove('D', 'y', -1, -1)}>D</button>
          <button onClick={() => handleMove('L', 'x', -1, 1)}>L</button>
          <button onClick={() => handleMove('R', 'x', 1, -1)}>R</button>
          <button onClick={() => handleMove('F', 'z', 1, 1)}>F</button>
          <button onClick={() => handleMove('B', 'z', -1, -1)}>B</button>

          <button onClick={() => handleMove("U'", 'y', 1, -1)}>U'</button>
          <button onClick={() => handleMove("D'", 'y', -1, 1)}>D'</button>
          <button onClick={() => handleMove("L'", 'x', -1, -1)}>L'</button>
          <button onClick={() => handleMove("R'", 'x', 1, 1)}>R'</button>
          <button onClick={() => handleMove("F'", 'z', 1, -1)}>F'</button>
          <button onClick={() => handleMove("B'", 'z', -1, 1)}>B'</button>
        </div>
      </div>

      <Canvas shadows className="cube-canvas">
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Environment preset="city" />

        {cubies.map((data) => (
          <Cubito
            key={data.id}
            position={data.position}
            colors={data.colors}
          />
        ))}

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
};

export default CuboRubik;