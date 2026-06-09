"use client";

import { useEffect, useRef } from "react";

const GAME_HEIGHT = 180;
const DINO_X = 42;
const DINO_HIT_W = 40;
const DINO_HIT_H = 38;
const GRAVITY = 0.62;
const JUMP_VELOCITY = -11.5;

type GameState = "idle" | "running" | "gameover";

type Obstacle = {
  x: number;
  w: number;
  h: number;
};

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = container.clientWidth;
    let dpr = window.devicePixelRatio || 1;

    let state: GameState = "idle";
    let dinoY = 0;
    let dinoVy = 0;
    let obstacles: Obstacle[] = [];
    let speed = 6;
    let score = 0;
    let frame = 0;
    let spawnTimer = 0;
    let nextSpawn = 90;

    const groundY = GAME_HEIGHT - 1;

    const colors = {
      ground: "#1F2D45",
      dino: "#E2E8F0",
      cactus: "#10B981",
      text: "#4A5568",
      textBright: "#8B9ABB",
      overlay: "rgba(10, 15, 30, 0.55)",
      eye: "#0A0F1E",
    };

    const resize = () => {
      width = container.clientWidth;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.floor(GAME_HEIGHT * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${GAME_HEIGHT}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resetGame = () => {
      dinoY = 0;
      dinoVy = 0;
      obstacles = [];
      speed = 6;
      score = 0;
      frame = 0;
      spawnTimer = 0;
      nextSpawn = 90;
      state = "running";
    };

    const jump = () => {
      if (state === "idle" || state === "gameover") {
        resetGame();
        return;
      }

      if (state === "running" && dinoY === 0) {
        dinoVy = JUMP_VELOCITY;
      }
    };

    const spawnObstacle = () => {
      obstacles.push({
        x: width + 12,
        w: 12 + Math.random() * 8,
        h: 28 + Math.random() * 10,
      });
    };

    const update = () => {
      if (state !== "running") return;

      frame += 1;
      score = Math.floor(frame / 6);

      if (frame % 480 === 0) {
        speed += 0.35;
      }

      dinoVy += GRAVITY;
      dinoY += dinoVy;

      if (dinoY > 0) {
        dinoY = 0;
        dinoVy = 0;
      }

      spawnTimer += 1;
      if (spawnTimer >= nextSpawn) {
        spawnObstacle();
        spawnTimer = 0;
        nextSpawn = Math.max(
          42,
          110 - Math.floor(speed * 4) + Math.floor(Math.random() * 35)
        );
      }

      for (const obstacle of obstacles) {
        obstacle.x -= speed;
      }
      obstacles = obstacles.filter((obstacle) => obstacle.x + obstacle.w > -24);

      const footY = groundY + dinoY;
      const dinoLeft = DINO_X + 8;
      const dinoRight = DINO_X + DINO_HIT_W;
      const dinoTop = footY - DINO_HIT_H;
      const dinoBottom = footY;

      for (const obstacle of obstacles) {
        const obsLeft = obstacle.x;
        const obsRight = obstacle.x + obstacle.w;
        const obsTop = groundY - obstacle.h;

        if (
          dinoRight - 5 > obsLeft + 3 &&
          dinoLeft + 5 < obsRight - 3 &&
          dinoBottom - 3 > obsTop + 4 &&
          dinoTop + 3 < groundY
        ) {
          state = "gameover";
          return;
        }
      }
    };

    const drawGround = () => {
      ctx.strokeStyle = colors.ground;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 0.5);
      ctx.lineTo(width, groundY + 0.5);
      ctx.stroke();
    };

    const drawDino = (footY: number, animateLegs: boolean) => {
      const x = DINO_X;
      const color = colors.dino;

      ctx.fillStyle = color;

      ctx.fillRect(x, footY - 24, 8, 4);
      ctx.fillRect(x + 6, footY - 28, 5, 4);

      ctx.fillRect(x + 10, footY - 30, 20, 14);

      ctx.beginPath();
      ctx.arc(x + 30, footY - 30, 6, -Math.PI / 2, Math.PI / 2);
      ctx.fill();

      ctx.fillRect(x + 28, footY - 36, 10, 8);

      ctx.beginPath();
      ctx.arc(x + 40, footY - 31, 5, -0.4, 0.9);
      ctx.fill();

      ctx.fillStyle = colors.eye;
      ctx.fillRect(x + 33, footY - 34, 2, 2);

      ctx.fillStyle = color;
      const leg = animateLegs ? Math.floor(frame / 6) % 2 : 0;

      if (leg === 0) {
        ctx.fillRect(x + 14, footY - 8, 5, 8);
        ctx.fillRect(x + 22, footY - 5, 5, 5);
      } else {
        ctx.fillRect(x + 14, footY - 5, 5, 5);
        ctx.fillRect(x + 22, footY - 8, 5, 8);
      }
    };

    const drawCactus = (obstacle: Obstacle) => {
      ctx.fillStyle = colors.cactus;
      ctx.fillRect(obstacle.x, groundY - obstacle.h, obstacle.w, obstacle.h);
      ctx.fillRect(obstacle.x - 5, groundY - obstacle.h + 10, 7, 12);
      ctx.fillRect(
        obstacle.x + obstacle.w - 2,
        groundY - obstacle.h + 16,
        7,
        10
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, GAME_HEIGHT);

      drawGround();

      const footY = groundY + dinoY;
      const animateLegs = state === "running" && dinoY === 0;
      drawDino(footY, animateLegs);

      if (state === "idle") {
        return;
      }

      for (const obstacle of obstacles) {
        drawCactus(obstacle);
      }

      ctx.fillStyle = colors.text;
      ctx.font = "11px system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(String(score).padStart(5, "0"), width - 12, 18);

      if (state === "gameover") {
        ctx.fillStyle = colors.overlay;
        ctx.fillRect(0, 0, width, GAME_HEIGHT);

        drawGround();
        drawDino(footY, false);

        ctx.fillStyle = colors.textBright;
        ctx.font = "13px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`Score: ${score}`, width / 2, GAME_HEIGHT / 2 - 6);

        ctx.fillStyle = colors.text;
        ctx.font = "11px system-ui, sans-serif";
        ctx.fillText(
          "SPACE or tap to restart",
          width / 2,
          GAME_HEIGHT / 2 + 14
        );
      }
    };

    const loop = () => {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;

      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      event.preventDefault();
      jump();
    };

    const onPointerDown = () => {
      jump();
    };

    resize();
    loop();

    window.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("pointerdown", onPointerDown);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("pointerdown", onPointerDown);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative left-1/2 -mb-16 mt-16 w-screen max-w-[100vw] -translate-x-1/2"
    >
      <canvas
        ref={canvasRef}
        className="block w-full cursor-pointer"
        style={{ height: GAME_HEIGHT }}
        aria-label="Side scrolling runner game"
      />
    </div>
  );
}
