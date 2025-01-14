"use client";

import React, { useEffect, useRef } from "react";

const GradientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGradient = (opacity: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2; // 화면 중앙
      const centerY = -780; // 상단에서 150px 떨어진 위치
      const radius = 1000; // 원형 반지름

      const gradient = ctx.createRadialGradient(
        centerX, // X 중심
        centerY, // Y 중심
        0, // 시작 반경
        centerX,
        centerY,
        radius
      );

      gradient.addColorStop(0, `rgba(46, 66, 209, ${opacity})`); // 중심부 색상
      gradient.addColorStop(0.5, `rgba(46, 66, 209, ${opacity * 0.6})`); // 중간 영역 더 진하게
      gradient.addColorStop(0.8, `rgba(46, 66, 209, ${opacity * 0.8})`); // 중간 영역 더 진하게
      gradient.addColorStop(1, `rgba(46, 66, 209, 0)`); // 가장자리 투명도 낮춤

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    let opacity = 0.7; // 초기 밝기
    let direction = 0.0015; // 밝기 변화 속도

    const animate = () => {
      drawGradient(opacity);

      opacity += direction;
      if (opacity >= 1 || opacity <= 0.5) {
        direction *= -1; // 방향 반전
      }

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", // 고정
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw", // 전체 너비
        height: "100vh", // 전체 높이
        pointerEvents: "none",
      }}
    />
  );
};

export default GradientCanvas;
