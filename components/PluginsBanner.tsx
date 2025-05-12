"use client";
import React, { useRef, useEffect } from "react";
import * as Icons from "react-icons";

const getRandom = (min, max) => Math.random() * (max - min) + min;

export function PluginsBanner({ iconNames = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = 300);

    // Create floating icons
    const icons = iconNames.map((name) => {
      const IconComponent = Icons[name];
      const wrapper = document.createElement("div");

      // Apply styles to icon
      wrapper.style.position = "absolute";
      wrapper.style.pointerEvents = "none";
      wrapper.style.fontSize = `${getRandom(20, 40)}px`;
      wrapper.style.color = "white";
      wrapper.style.opacity = "0.8";
      wrapper.style.transform = `translate(-50%, -50%)`;
      wrapper.style.zIndex = "10";

      // Render icon inside div
      const iconMarkup = document.createElement("span");
      iconMarkup.innerHTML = (React.createElement(IconComponent).props as any).children;
      wrapper.appendChild(iconMarkup);

      document.body.appendChild(wrapper);

      return {
        el: wrapper,
        x: getRandom(0, width),
        y: getRandom(0, height),
        speedX: getRandom(-0.5, 0.5),
        speedY: getRandom(-0.2, -0.5),
      };
    });

    const drawGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f2027");
      gradient.addColorStop(0.5, "#203a43");
      gradient.addColorStop(1, "#2c5364");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      drawGradient();
      icons.forEach((icon) => {
        icon.x += icon.speedX;
        icon.y += icon.speedY;

        // Wrap around
        if (icon.x > width) icon.x = 0;
        if (icon.x < 0) icon.x = width;
        if (icon.y < -20) icon.y = height;

        icon.el.style.left = `${icon.x}px`;
        icon.el.style.top = `${icon.y}px`;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      icons.forEach((icon) => icon.el.remove());
    };
  }, [iconNames]);

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}
