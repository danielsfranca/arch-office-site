"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cursorRef.current) return;

            const x = e.clientX;
            const y = e.clientY;

            const target = e.target as HTMLElement;

            // Comprehensive check for anything that should trigger a grow effect
            const shouldGrow =
                target?.closest('a') ||
                target?.closest('button') ||
                target?.closest('.hero-logo-container') ||
                target?.closest('.project-card') ||
                target?.closest('.client-area-trigger') ||
                target?.closest('.nav-btn') ||
                target?.closest('[role="button"]') ||
                target?.classList.contains('interactive');

            const scale = shouldGrow ? "scale(2.5)" : "scale(1)";

            // Direct DOM manipulation for maximum performance and reliability
            cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) ${scale}`;
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#ffffff",
                    mixBlendMode: "difference",
                    pointerEvents: "none",
                    zIndex: 100000,
                    borderRadius: "0px",
                    transition: "transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    transform: "translate(-100px, -100px) translate(-50%, -50%) scale(1)",
                }}
            />

            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
}
