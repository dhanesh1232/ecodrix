"use client";

import { useEffect, useRef } from "react";

const CELL_SIZE = 60; // Adjusted for a denser grid
const SPEED = 2; // Pixels per frame. Must cleanly divide CELL_SIZE
const MAX_LINES = 20;
const COLORS = ["#7C6EFA", "#22D3EE", "#F472B6", "#4ADE80", "#EAB308"];

interface Trace {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  progress: number;
  life: number;
  dead: boolean;
  history: { x: number; y: number }[];
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  strength: number;
}

export function HeroCanvas({
  containerRef,
}: {
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef?.current || canvas;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let offsetX = 0;
    let offsetY = 0;
    let cols = 0;
    let rows = 0;
    let maxX = 0;
    let maxY = 0;

    let traces: Trace[] = [];
    const shockwaves: Shockwave[] = [];
    let animId: number;

    const occupiedCols = new Set<number>();
    const occupiedRows = new Set<number>();

    const mouse = { x: -1000, y: -1000, radius: 0 };
    const targetMouse = { x: -1000, y: -1000, radius: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
      targetMouse.radius = 450;
    };

    const handleMouseLeave = () => {
      targetMouse.radius = 0;
    };

    const handleDoubleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        strength: 80, // Pixels of max displacement
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("dblclick", handleDoubleClick);

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      offsetX = (width % CELL_SIZE) / 2;
      offsetY = (height % CELL_SIZE) / 2;
      cols = Math.floor(width / CELL_SIZE);
      rows = Math.floor(height / CELL_SIZE);
      maxX = offsetX + cols * CELL_SIZE;
      maxY = offsetY + rows * CELL_SIZE;

      traces = [];
    };

    const deform = (x: number, y: number) => {
      let pullX = 0;
      let pullY = 0;
      let scale = 1;

      // Mouse dent
      if (mouse.radius > 0.1) {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const pull = Math.pow(1 - dist / mouse.radius, 2) * 0.45;
          pullX += dx * pull;
          pullY += dy * pull;
          scale = Math.max(0.5, 1 - pull * 0.6);
        }
      }

      // Shockwaves
      shockwaves.forEach((sw) => {
        const dx = x - sw.x;
        const dy = y - sw.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distFromRing = Math.abs(dist - sw.radius);

        // Ring thickness
        const thickness = 150;
        if (distFromRing < thickness) {
          const force = Math.pow(1 - distFromRing / thickness, 2) * sw.strength;
          if (dist > 0) {
            pullX -= (dx / dist) * force;
            pullY -= (dy / dist) * force;
          }
        }
      });

      return { x: x - pullX, y: y - pullY, scale };
    };

    const spawnTrace = () => {
      const validCols: number[] = [];
      for (let i = 0; i <= cols; i++)
        if (!occupiedCols.has(i)) validCols.push(i);

      const validRows: number[] = [];
      for (let i = 0; i <= rows; i++)
        if (!occupiedRows.has(i)) validRows.push(i);

      if (validCols.length === 0 && validRows.length === 0) return;

      const isVertical = Math.random() < 0.5;
      let startCol, startRow, vx, vy;

      if (isVertical && validCols.length > 0) {
        startCol = validCols[Math.floor(Math.random() * validCols.length)];
        startRow = Math.floor(Math.random() * (rows + 1));
        vx = 0;
        vy = Math.random() < 0.5 ? 1 : -1;
      } else if (!isVertical && validRows.length > 0) {
        startRow = validRows[Math.floor(Math.random() * validRows.length)];
        startCol = Math.floor(Math.random() * (cols + 1));
        vx = Math.random() < 0.5 ? 1 : -1;
        vy = 0;
      } else {
        return;
      }

      const x = offsetX + startCol * CELL_SIZE;
      const y = offsetY + startRow * CELL_SIZE;

      if (vx !== 0) occupiedRows.add(startRow);
      if (vy !== 0) occupiedCols.add(startCol);

      traces.push({
        x,
        y,
        vx,
        vy,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        progress: 0,
        life: Math.random() * 400 + 200,
        dead: false,
        history: [{ x, y }],
      });
    };

    for (let i = 0; i < Math.floor(MAX_LINES / 2); i++) spawnTrace();

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;
      mouse.radius += (targetMouse.radius - mouse.radius) * 0.08;

      // Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 25; // Expansion speed
        sw.strength *= 0.94; // Decay, smoothly settles back
        if (sw.strength < 0.1) shockwaves.splice(i, 1);
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(124, 110, 250, 0.10)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = offsetX; x <= width + CELL_SIZE; x += CELL_SIZE) {
        for (let y = offsetY; y <= height + CELL_SIZE; y += CELL_SIZE) {
          const p = deform(x, y);

          if (x + CELL_SIZE <= width + CELL_SIZE) {
            const pRight = deform(x + CELL_SIZE, y);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pRight.x, pRight.y);
          }
          if (y + CELL_SIZE <= height + CELL_SIZE) {
            const pDown = deform(x, y + CELL_SIZE);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pDown.x, pDown.y);
          }
        }
      }
      ctx.stroke();

      ctx.fillStyle = "rgba(124, 110, 250, 0.2)";
      for (let x = offsetX; x <= width + CELL_SIZE; x += CELL_SIZE) {
        for (let y = offsetY; y <= height + CELL_SIZE; y += CELL_SIZE) {
          const p = deform(x, y);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "lighter";

      if (traces.length < MAX_LINES && Math.random() < 0.15) {
        spawnTrace();
      }

      traces.forEach((trace) => {
        if (trace.dead) return;

        trace.life--;
        if (trace.life <= 0) {
          trace.dead = true;
          const col = Math.round((trace.x - offsetX) / CELL_SIZE);
          const row = Math.round((trace.y - offsetY) / CELL_SIZE);
          if (trace.vy !== 0) occupiedCols.delete(col);
          if (trace.vx !== 0) occupiedRows.delete(row);
          return;
        }

        trace.x += trace.vx * SPEED;
        trace.y += trace.vy * SPEED;
        trace.progress += SPEED;

        trace.history.push({ x: trace.x, y: trace.y });
        if (trace.history.length > 40) {
          trace.history.shift();
        }

        // Draw segmented tail
        for (let i = 1; i < trace.history.length; i++) {
          const pPrev = deform(trace.history[i - 1].x, trace.history[i - 1].y);
          const pCurr = deform(trace.history[i].x, trace.history[i].y);

          ctx.beginPath();
          ctx.moveTo(pPrev.x, pPrev.y);
          ctx.lineTo(pCurr.x, pCurr.y);

          const opacity = i / trace.history.length;
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = trace.color;
          ctx.lineWidth = 1.5 * deform(trace.x, trace.y).scale;

          if (i === trace.history.length - 1) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = trace.color;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Draw bright spark head
        const pHead = deform(trace.x, trace.y);
        if (
          Math.random() < 0.2 ||
          (trace.progress >= CELL_SIZE && Math.random() < 0.5)
        ) {
          ctx.beginPath();
          ctx.arc(pHead.x, pHead.y, 2 * pHead.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.shadowBlur = 20;
          ctx.shadowColor = trace.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Intersection logic
        if (trace.progress >= CELL_SIZE) {
          trace.progress = 0;
          trace.x = Math.round(trace.x);
          trace.y = Math.round(trace.y);

          const col = Math.round((trace.x - offsetX) / CELL_SIZE);
          const row = Math.round((trace.y - offsetY) / CELL_SIZE);

          let forceTurn = false;
          // Boundary bounce inward (reverses direction, stays on same line)
          if (trace.x <= offsetX) {
            trace.vx = 1;
            trace.vy = 0;
            forceTurn = true;
          } else if (trace.x >= maxX) {
            trace.vx = -1;
            trace.vy = 0;
            forceTurn = true;
          } else if (trace.y <= offsetY) {
            trace.vx = 0;
            trace.vy = 1;
            forceTurn = true;
          } else if (trace.y >= maxY) {
            trace.vx = 0;
            trace.vy = -1;
            forceTurn = true;
          }

          // Random turn (30% chance)
          if (!forceTurn && Math.random() < 0.3) {
            if (trace.vx !== 0) {
              // Currently moving horizontally
              if (!occupiedCols.has(col)) {
                // Can we turn vertically into this column?
                trace.vx = 0;
                trace.vy = Math.random() < 0.5 ? 1 : -1;
                occupiedRows.delete(row); // No longer occupying this row
                occupiedCols.add(col); // Now occupying this column
                forceTurn = true;
              }
            } else {
              // Currently moving vertically
              if (!occupiedRows.has(row)) {
                // Can we turn horizontally into this row?
                trace.vx = Math.random() < 0.5 ? 1 : -1;
                trace.vy = 0;
                occupiedCols.delete(col); // No longer occupying this column
                occupiedRows.add(row); // Now occupying this row
                forceTurn = true;
              }
            }
          }

          // Draw a bright spark at the turn/intersection node (20% chance or if turned)
          if (forceTurn || Math.random() < 0.2) {
            ctx.beginPath();
            ctx.arc(trace.x, trace.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 15;
            ctx.shadowColor = trace.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      traces = traces.filter((t) => !t.dead);

      const rect = canvas.getBoundingClientRect();
      const sparkPositions = traces
        .filter((t) => !t.dead && t.history.length > 0)
        .map((t) => {
          const p = deform(t.x, t.y);
          return {
            x: rect.left + p.x,
            y: rect.top + p.y,
            color: t.color,
          };
        });

      window.dispatchEvent(
        new CustomEvent("hero-sparks", { detail: sparkPositions }),
      );

      animId = requestAnimationFrame(updateAndDraw);
    };

    initCanvas();
    updateAndDraw();

    window.addEventListener("resize", initCanvas);
    return () => {
      window.removeEventListener("resize", initCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("dblclick", handleDoubleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
