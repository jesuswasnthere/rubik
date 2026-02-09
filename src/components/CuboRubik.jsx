import React, { useEffect } from 'react';
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
    <div style={{ width: '100%', height: '100vh', background: '#0a0a0c', position: 'relative', overflow: 'hidden' }}>
      
      {/* HUD PRINCIPAL */}
      <div style={hudStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ color: 'white', margin: 0 }}>Simulador 3x3</h2>
            <span style={{ color: '#00ff00', fontWeight: 'bold' }}>Movimientos: {moves}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={shuffle} style={actionBtnStyle}>Mezclar</button>
          <button onClick={reset} style={actionBtnStyle}>Reiniciar</button>
        </div>

        <hr style={{ border: '0.5px solid #333', margin: '15px 0' }} />

        {/* BOTONES DE GIRO ESTÁNDAR */}
        <div style={controlsGridStyle}>
          {/* Fila 1: Movimientos Horarios */}
          <button onClick={() => handleMove('U', 'y', 1, 1)} style={moveBtnStyle}>U</button>
          <button onClick={() => handleMove('D', 'y', -1, -1)} style={moveBtnStyle}>D</button>
          <button onClick={() => handleMove('L', 'x', -1, 1)} style={moveBtnStyle}>L</button>
          <button onClick={() => handleMove('R', 'x', 1, -1)} style={moveBtnStyle}>R</button>
          <button onClick={() => handleMove('F', 'z', 1, 1)} style={moveBtnStyle}>F</button>
          <button onClick={() => handleMove('B', 'z', -1, -1)} style={moveBtnStyle}>B</button>
          
          {/* Fila 2: Movimientos Antihorarios (Prime) */}
          <button onClick={() => handleMove("U'", 'y', 1, -1)} style={primeBtnStyle}>U'</button>
          <button onClick={() => handleMove("D'", 'y', -1, 1)} style={primeBtnStyle}>D'</button>
          <button onClick={() => handleMove("L'", 'x', -1, -1)} style={primeBtnStyle}>L'</button>
          <button onClick={() => handleMove("R'", 'x', 1, 1)} style={primeBtnStyle}>R'</button>
          <button onClick={() => handleMove("F'", 'z', 1, -1)} style={primeBtnStyle}>F'</button>
          <button onClick={() => handleMove("B'", 'z', -1, 1)} style={primeBtnStyle}>B'</button>
        </div>
      </div>

      <Canvas shadows>
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

// ESTILOS
const hudStyle = {
  position: 'absolute', top: 20, left: 20, zIndex: 100,
  background: 'rgba(20, 20, 25, 0.8)', padding: '20px',
  borderRadius: '12px', border: '1px solid #444', backdropFilter: 'blur(5px)',
  width: '280px'
};

const controlsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px' };

const moveBtnStyle = {
  background: '#444', color: 'white', border: 'none', padding: '8px 0',
  borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px'
};

const primeBtnStyle = { ...moveBtnStyle, background: '#222', color: '#aaa' };

const actionBtnStyle = {
  flex: 1, padding: '10px', background: '#eee', border: 'none',
  borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
};

export default CuboRubik;