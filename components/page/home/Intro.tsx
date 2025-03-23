'use client';

import { OrbitControls, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// 면 정보 배열 (텍스트, URL, 고유 ID)
const faces = [
  { text: 'Home', url: '/', id: 'face-0' },
  { text: 'About', url: '/about', id: 'face-1' },
  { text: 'Portfolio', url: 'https://david-portfolio-96.netlify.app', id: 'face-2' },
  { text: 'Contact', url: '/contact', id: 'face-3' },
  { text: 'Blog', url: '/blog', id: 'face-4' },
  { text: 'Gallery', url: '/gallery', id: 'face-5' },
];

const Cube = ({ onFaceClick }: { onFaceClick: (url: string) => void }) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);

  useFrame(() => {
    // 큐브 회전 속도
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.002;
      cubeRef.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh
      ref={cubeRef}
      onPointerMove={(event) => {
        const face = faces[event.face?.materialIndex ?? -1];
        if (face) setHoveredFace(face.id);
      }}
      onPointerOut={() => setHoveredFace(null)}
      onClick={(event) => {
        if (!event.face) return;

        const face = faces[event.face.materialIndex ?? -1]; // 클릭한 면의 정보 가져오기
        console.log('Clicked face:', face?.text, 'Navigating to:', face?.url);
        if (face) {
          onFaceClick(face.url);
        }
      }}
    >
      <boxGeometry args={[4, 4, 4]} />
      {faces.map(({ id }, index) => (
        <meshStandardMaterial
          key={id}
          attach={`material-${index}`}
          transparent={true}
          opacity={0.7}
          color={hoveredFace === id ? '#2E42D1' : '#000000'}
        />
      ))}

      {/* ✅ 테두리 추가 */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.05, 4.05, 4.05)]} />
        <lineBasicMaterial color="#2E42D1" linewidth={2} />
      </lineSegments>

      {/* ✅ 텍스트 추가 */}
      {faces.map(({ text, id }, index) => {
        const positions: [number, number, number][] = [
          [0, 0, 2.01], // Front (z+)
          [0, 0, -2.01], // Back (z-)
          [-2.01, 0, 0], // Left (x-)
          [2.01, 0, 0], // Right (x+)
          [0, 2.01, 0], // Top (y+)
          [0, -2.01, 0], // Bottom (y-)
        ] as const; // ← `as const` 추가!

        const rotations: [number, number, number][] = [
          [0, 0, 0], // Front
          [0, Math.PI, 0], // Back
          [0, Math.PI / -2, 0], // Left
          [0, -Math.PI / -2, 0], // Right
          [-Math.PI / 2, 0, 0], // Top
          [Math.PI / 2, 0, 0], // Bottom
        ] as const;

        return (
          <group key={id} position={positions[index]} rotation={rotations[index]}>
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

  const handleFaceClick = (url: string) => {
    console.log(`Navigating to: ${url}`);
    router.push(url);
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
