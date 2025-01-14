"use client";

import React, { useEffect } from "react";

const BackgroundCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById(
      "backgroundCanvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles();
    };

    window.addEventListener("resize", resizeCanvas);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bubbles: any[] = [];
    const colors = [
      "rgba(0, 123, 255, 0.3)",
      "rgba(30, 144, 255, 0.3)",
      "rgba(100, 149, 237, 0.3)",
    ];

    let scrollSpeed = 0; // 스크롤 속도
    let lastScrollY = 0; // 이전 스크롤 위치
    // eslint-disable-next-line no-undef
    let scrollTimeout: NodeJS.Timeout | null = null; // 스크롤 멈춤 감지
    let isFreeMoving = true; // 자유롭게 움직이는 상태

    class Bubble {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      baseSpeed: number;
      color: string;
      direction: number; // 각 버블의 고유 방향

      constructor(
        x: number,
        y: number,
        radius: number,
        dx: number,
        dy: number,
        baseSpeed: number,
        color: string,
        direction: number
      ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.baseSpeed = baseSpeed;
        this.color = color;
        this.direction = direction; // 방향 설정
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          this.radius * 0.3,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.3, "rgba(0, 0, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.filter = "blur(80px)";
        ctx.fill();
        ctx.filter = "none";
      }

      update(scrollFactor: number, direction: number) {
        if (!isFreeMoving && scrollFactor !== 0) {
          // 스크롤 동작: 중앙으로 모이거나 퍼짐
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          let targetX = centerX;
          let targetY = centerY;

          if (direction > 0) {
            // 스크롤 내릴 때
            if (this.direction === 0) {
              targetX = this.x - scrollFactor * 300; // 왼쪽 대각선 위
              targetY = this.y - scrollFactor * 100;
            } else if (this.direction === 1) {
              targetX = this.x + scrollFactor * 300; // 오른쪽 대각선 위
              targetY = this.y - scrollFactor * 150;
            } else if (this.direction === 2) {
              targetX = this.x + scrollFactor * 300; // 오른쪽 아래 대각선
              targetY = this.y + scrollFactor * 100;
            }
          }

          // 부드럽게 이동
          this.x += (targetX - this.x) * 0.05;
          this.y += (targetY - this.y) * 0.05;
        } else {
          // 자유롭게 움직임
          this.x += this.dx * this.baseSpeed;
          this.y += this.dy * this.baseSpeed;

          if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
            this.dx = -this.dx;
          if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
            this.dy = -this.dy;
        }

        this.draw();
      }
    }

    const initBubbles = () => {
      bubbles = [];
      for (let i = 0; i < 3; i++) {
        const radius = Math.random() * 200 + 100;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = Math.random() - 0.5;
        const dy = Math.random() - 0.5;
        const baseSpeed = Math.random() * 1 + 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        bubbles.push(new Bubble(x, y, radius, dx, dy, baseSpeed, color, i));
      }
    };

    const handleScroll = () => {
      isFreeMoving = false;
      const currentScrollY = window.scrollY;
      scrollSpeed = currentScrollY - lastScrollY; // 스크롤 속도 계산
      lastScrollY = currentScrollY;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isFreeMoving = true; // 스크롤 멈춤 후 1초 뒤 자유 움직임
      }, 1000);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollFactor = Math.abs(scrollSpeed) / 50; // 스크롤 속도에 따른 이동 정도
      const direction = scrollSpeed > 0 ? 1 : -1; // 스크롤 방향
      bubbles.forEach((bubble) => bubble.update(scrollFactor, direction));
      scrollSpeed *= 0.95; // 스크롤 속도 점차 감소
      requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);

    resizeCanvas();
    initBubbles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      id="backgroundCanvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundCanvas;
