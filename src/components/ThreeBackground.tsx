// ThreeBackground.tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function lerpColor(a: THREE.Color, b: THREE.Color, t: number) {
    return a.clone().lerp(b, t);
}

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mountNode = mountRef.current;
        if (!mountNode) return;

        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.zIndex = '0';
        container.style.pointerEvents = 'none';
        container.id = 'three-background-container';

        document.body.appendChild(container);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: container.appendChild(document.createElement('canvas')),
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background

        // Gradient background removed for transparency

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 8;

        // Particles
        const PARTICLE_COUNT = 2500;
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;

            velocities[i] = (Math.random() - 0.5) * 0.05;
            velocities[i + 1] = (Math.random() - 0.5) * 0.05;
            velocities[i + 2] = (Math.random() - 0.5) * 0.05;

            colors[i] = new THREE.Color('#14b8a6').r;
            colors[i + 1] = new THREE.Color('#14b8a6').g;
            colors[i + 2] = new THREE.Color('#14b8a6').b;

            // Add some random variation to colors
            colors[i] += (Math.random() - 0.5) * 0.1;
            colors[i + 1] += (Math.random() - 0.5) * 0.1;
            colors[i + 2] += (Math.random() - 0.5) * 0.1;

            // Clamp colors to valid range
            colors[i] = Math.max(0, Math.min(1, colors[i]));
            colors[i + 1] = Math.max(0, Math.min(1, colors[i + 1]));
            colors[i + 2] = Math.max(0, Math.min(1, colors[i + 2]));
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.125,
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let animationId: number;
        let mouseX = 0.5;
        let mouseY = 0.5;

        // Mouse movement
        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX / window.innerWidth;
            mouseY = event.clientY / window.innerHeight;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            if (particles && geometry) {
                const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
                const colorAttr = geometry.getAttribute('color') as THREE.BufferAttribute;

                for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
                    posAttr.array[i] += velocities[i];
                    posAttr.array[i + 1] += velocities[i + 1];
                    posAttr.array[i + 2] += velocities[i + 2];

                    if (Math.random() < 0.01) {
                        const color = lerpColor(
                            new THREE.Color('#14b8a6'),
                            new THREE.Color('#a78bfa'),
                            Math.random()
                        );
                        colorAttr.array[i] = color.r;
                        colorAttr.array[i + 1] = color.g;
                        colorAttr.array[i + 2] = color.b;
                    }

                    if (Math.abs(posAttr.array[i]) > 20) {
                        posAttr.array[i] *= -0.5;
                    }
                    if (Math.abs(posAttr.array[i + 1]) > 20) {
                        posAttr.array[i + 1] *= -0.5;
                    }
                    if (Math.abs(posAttr.array[i + 2]) > 20) {
                        posAttr.array[i + 2] *= -0.5;
                    }
                }

                posAttr.needsUpdate = true;
                colorAttr.needsUpdate = true;

                // Camera movement
                camera.position.x += (mouseX * 20 - camera.position.x) * 0.05;
                camera.position.y += (-mouseY * 20 - camera.position.y) * 0.05;
                camera.lookAt(scene.position);
            }

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            renderer.dispose();
            scene.clear();
            geometry.dispose();
            material.dispose();
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        };
    }, []);

    return (
        <>
            <div ref={mountRef} className="absolute inset-0 z-0" />
            {/* Frosted glass effect layer */}
            <div className="fixed inset-0 z-[1] bg-gradient-to-tl from-teal-400/50 to-purple-400/50 backdrop-blur-xs" />
        </>
    );
}
