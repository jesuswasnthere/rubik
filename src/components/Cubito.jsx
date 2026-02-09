import React from 'react';

const Cubito = ({ position, colors = [], onClick }) => {
  return (
    <mesh position={position} onClick={onClick} castShadow receiveShadow>
      <boxGeometry args={[0.96, 0.96, 0.96]} />
      {/* Mapeamos los 6 materiales exactamente al orden [+x, -x, +y, -y, +z, -z] */}
      {Array.from({ length: 6 }).map((_, i) => (
        <meshStandardMaterial 
          key={i} 
          attach={`material-${i}`} 
          color={colors[i] || '#212121'} 
          roughness={0.1}
          metalness={0.1}
        />
      ))}
    </mesh>
  );
};

export default Cubito;