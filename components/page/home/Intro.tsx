'use client';

import { OrbitControls, Text, Html } from '@react-three/drei'; // Html 컴포넌트 가져오기
import { Canvas, useFrame } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// 면 정보 배열 (텍스트, URL, 고유 ID)
const faces = [
    {
        text: 'TIL',
        url: '/til',
        id: 'face-0',
        description: 'This is the TIL page',
        image: '/example1.gif',
    },
    {
        text: 'About',
        url: '/about',
        id: 'face-1',
        description: 'About me page',
        image: '/example2.gif',
    },
    {
        text: 'Portfolio',
        url: 'https://david-portfolio-96.netlify.app',
        id: 'face-2',
        description: 'My portfolio',
        image: '/example3.gif',
    },
    {
        text: 'Wintodo',
        url: 'https://wintodo.vercel.app/',
        id: 'face-3',
        description: 'A Todo App',
        image: '/example4.gif',
    },
    { text: 'Blog', url: '/blog', id: 'face-4', description: 'My Blog', image: '/example5.gif' },
    {
        text: 'Project',
        url: '/project',
        id: 'face-5',
        description: 'Image Gallery',
        image: '/example6.gif',
    },
];

const Cube = ({ onFaceClick }: { onFaceClick: (url: string) => void }) => {
    const cubeRef = useRef<THREE.Group>(null);
    const [hoveredFace, setHoveredFace] = useState<string | null>(null);
    const [hoveredFaceImage, setHoveredFaceImage] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // 회전 속도 상태를 설정
    const rotationSpeed = hoveredFace ? 0.001 : 0.002; // 호버 시 속도를 느리게

    // useFrame : 매 프레임마다 큐브를 회전
    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.y += rotationSpeed; // Y축으로 회전
            cubeRef.current.rotation.x += rotationSpeed / 2; // X축으로 회전
        }
    });

    const onMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (dragging) {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        }
    };

    const onMouseUp = () => {
        setDragging(false);
    };

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
            {faces.map(({ text, id, url, description, image }, index) => (
                <mesh
                    key={id}
                    position={positions[index]} // 면의 위치 설정
                    rotation={rotations[index]} // 면의 회전 설정
                    onPointerMove={() => {
                        setHoveredFace(id);
                        setHoveredFaceImage(image); // 호버된 면의 이미지나 GIF 업데이트
                    }}
                    onPointerOut={() => {
                        setHoveredFace(null);
                        setHoveredFaceImage(null); // 호버가 끝나면 이미지 제거
                    }}
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

            {/* 드래그 가능한 팝업 이미지 */}
            {hoveredFaceImage && (
                <Html
                    distanceFactor={10}
                    position={[0, 0, 5]} // 팝업의 위치를 3D 공간에 설정
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: `${position.y}px`,
                            left: `${position.x}px`,
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            overflow: 'hidden', // 이미지를 원형으로 자르기 위해
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)', // 빛나는 효과
                            animation: 'pulse 2s infinite', // 애니메이션 추가
                        }}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                    >
                        <img
                            src={hoveredFaceImage}
                            alt="popup content"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', // 이미지가 원형에 맞게 잘리도록 설정
                            }}
                        />
                    </div>
                </Html>
            )}
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
