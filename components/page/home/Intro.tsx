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
  // 큐브 그룹 참고 useRef 훅
  const cubeRef = useRef<THREE.Group>(null);
  // 현재 호버된 면의 ID를 저장하는 상태 값
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);

  // useFrame : 매 프레임마다 큐브를 회전
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.002; // Y축으로 회전
      cubeRef.current.rotation.x += 0.001; // X축으로 회전
    }
  });

  // 각 면의 위치 (position) 설정 (큐브의 각 면을 바깥으로 배치)
  const positions: [number, number, number][] = [
    [0, 0, 2.01], // 앞면 (z+)
    [0, 0, -2.01], // 뒷면 (z-)
    [-2.01, 0, 0], // 왼쪽 (x-)
    [2.01, 0, 0], // 오른쪽 (x+)
    [0, 2.01, 0], // 윗면 (y+)
    [0, -2.01, 0], // 아랫면 (y-)
  ];

  // 각 면 회전 (rotation) 설정 (텍스트 방향을 맞추기 위해 필요)
  const rotations: [number, number, number][] = [
    [0, 0, 0], // 앞면 정면
    [0, Math.PI, 0], // 뒷면 180도 회전
    [0, Math.PI / -2, 0], // 왼쪽 -90도 회전
    [0, -Math.PI / -2, 0], // 오른쪽 +90도 회전
    [-Math.PI / 2, 0, 0], // 윗면 -90도 회전
    [Math.PI / 2, 0, 0], // 아랫면 +90도 회전
  ];

  return (
    <group ref={cubeRef}>
      {faces.map(({ text, id, url }, index) => (
        <mesh
          key={id}
          position={positions[index]} // 면의 위치 설정
          rotation={rotations[index]} // 면의 회전 설정
          onPointerMove={() => setHoveredFace(id)}
          onPointerOut={() => setHoveredFace(null)}
          onClick={() => onFaceClick(url)}
        >
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial
            transparent={true} // 투명도 활성화
            opacity={0.7}
            color={hoveredFace === id ? '#2E42D1' : '#000000'}
          />

          <Text
            fontSize={0.6} // 텍스트 크기 설정
            color="white" // 텍스트 색상 설정
            anchorX="center" // X축 기준으로 가운데 정렬
            anchorY="middle" // Y축 기준으로 가운데 정렬
            position={[0, 0, 0.05]} // 텍스트 위치 (살짝 앞으로 배치)
          >
            {text}
          </Text>
        </mesh>
      ))}

      {/* ✅ 테두리 추가 */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.05, 4.05, 4.05)]} />
        <lineBasicMaterial color="#2E42D1" linewidth={2} />
      </lineSegments>
    </group>
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
