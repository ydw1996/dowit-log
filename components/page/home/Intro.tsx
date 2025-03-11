'use client';

import { OrbitControls, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// 정확한 면 순서 맞추기
const faces = [
  { text: 'Home', url: '/' }, // Front (z+)
  { text: 'About', url: '/about' }, // Back (z-)
  { text: 'Projects', url: '/projects' }, // Left (x-)
  { text: 'Contact', url: '/contact' }, // Right (x+)
  { text: 'Blog', url: '/blog' }, // Top (y+)
  { text: 'Gallery', url: '/gallery' }, // Bottom (y-)
];

const Cube = ({ onFaceClick }: { onFaceClick: (index: number) => void }) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.004;
      cubeRef.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh
      ref={cubeRef}
      onPointerMove={(event) => {
        if (event.face) {
          setHoveredFace(event.face.materialIndex);
        }
      }}
      onPointerOut={() => setHoveredFace(null)}
      onClick={(event) => {
        if (!event.object.geometry.groups) return;
        const faceIndex = event.object.geometry.groups.findIndex(
          (group) => group.materialIndex === event.face?.materialIndex
        );

        if (faceIndex !== -1) onFaceClick(faceIndex);
      }}
    >
      <boxGeometry args={[4, 4, 4]} />
      {faces.map(({ text }, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          color={hoveredFace === index ? '#2E42D1' : '#000000'}
        />
      ))}

      {/* ✅ 테두리 추가 */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.05, 4.05, 4.05)]} />
        <lineBasicMaterial color="white" linewidth={2} />
      </lineSegments>

      {/* ✅ 텍스트 추가 (각 면 중앙 배치) */}
      {faces.map(({ text }, index) => {
        const positions = [
          [0, 0, 2.01], // Front (z+)
          [0, 0, -2.01], // Back (z-)
          [-2.01, 0, 0], // Left (x-)
          [2.01, 0, 0], // Right (x+)
          [0, 2.01, 0], // Top (y+)
          [0, -2.01, 0], // Bottom (y-)
        ];

        const rotations = [
          [0, 0, 0], // 정면
          [0, Math.PI, 0], // 후면
          [0, Math.PI / 2, 0], // 좌측
          [0, -Math.PI / 2, 0], // 우측
          [-Math.PI / 2, 0, 0], // 위
          [Math.PI / 2, 0, 0], // 아래
        ];

        return (
          <group key={index} position={positions[index]} rotation={rotations[index]}>
            <Text
              fontSize={0.6}
              color="white"
              anchorX="center"
              anchorY="middle"
              rotation={[0, 0, 0]}
            >
              {text}
            </Text>
          </group>
        );
      })}
    </mesh>
  );
};

const CubeScene = () => {
  const router = useRouter();

  const handleFaceClick = (index: number) => {
    console.log(`Clicked face index: ${index}, Navigating to: ${faces[index].url}`);
    if (faces[index]) {
      router.push(faces[index].url);
    }
  };

  return (
    <Canvas className="w-full h-screen" camera={{ position: [7, 7, 7], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <Cube onFaceClick={handleFaceClick} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default CubeScene;
