'use client';

import React, { useEffect } from 'react';

const BackgroundCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbles = Array.from({ length: 3 }, (_, index) => createBubble(index));
    let scrollSpeed = 0;
    let lastScrollY = 0;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    function createBubble(index: number) {
      const radius = Math.random() * 200 + 100;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 1.2;
      const dy = (Math.random() - 0.5) * 1.2;
      const color = [
        'rgba(0, 123, 255, 0.3)',
        'rgba(30, 144, 255, 0.3)',
        'rgba(100, 149, 237, 0.3)',
      ][index % 3];

      return { x, y, radius, dx, dy, color, direction: index };
    }

    function drawBubble(bubble) {
      const gradient = ctx.createRadialGradient(
        bubble.x,
        bubble.y,
        bubble.radius * 0.3,
        bubble.x,
        bubble.y,
        bubble.radius
      );
      gradient.addColorStop(0, bubble.color);
      gradient.addColorStop(0.6, 'rgba(0, 0, 255, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.filter = 'blur(80px)';
      ctx.fill();
      ctx.filter = 'none';
    }

    function updateBubble(bubble, scrollFactor, direction) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (isScrolling) {
        let targetX = centerX;
        let targetY = centerY;

        if (direction > 0) {
          // 퍼지는 동작
          if (bubble.direction === 0) {
            targetX = bubble.x - scrollFactor * 300;
            targetY = bubble.y - scrollFactor * 100;
          } else if (bubble.direction === 1) {
            targetX = bubble.x + scrollFactor * 300;
            targetY = bubble.y - scrollFactor * 150;
          } else {
            targetX = bubble.x + scrollFactor * 300;
            targetY = bubble.y + scrollFactor * 100;
          }
        }

        bubble.x += (targetX - bubble.x) * 0.05;
        bubble.y += (targetY - bubble.y) * 0.05;
      } else {
        // 자유롭게 움직이는 동작
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        if (bubble.x + bubble.radius > canvas.width || bubble.x - bubble.radius < 0)
          bubble.dx = -bubble.dx;
        if (bubble.y + bubble.radius > canvas.height || bubble.y - bubble.radius < 0)
          bubble.dy = -bubble.dy;
      }

      drawBubble(bubble);
    }

    function handleScroll() {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1000);

      const currentScrollY = window.scrollY;
      scrollSpeed = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollFactor = Math.min(Math.abs(scrollSpeed) / 50, 1);
      const direction = scrollSpeed > 0 ? 1 : -1;

      bubbles.forEach((bubble) => updateBubble(bubble, scrollFactor, direction));
      scrollSpeed *= 0.85; // 점진적 감속

      requestAnimationFrame(animate);
    }

    window.addEventListener('scroll', handleScroll);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      id="backgroundCanvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundCanvas;
