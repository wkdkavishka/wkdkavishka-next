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
        let renderer: THREE.WebGLRenderer | undefined;
        let scene: THREE.Scene | undefined;
        let camera: THREE.PerspectiveCamera | undefined;
        let animationId: number;
        let particles: THREE.Points | undefined;
        let positions: Float32Array;
        let velocities: Float32Array;
        let colors: Float32Array;
        let geometry: THREE.BufferGeometry | undefined;
        let material: THREE.PointsMaterial | undefined;
        const PARTICLE_COUNT = 800;
        const teal = new THREE.Color('#14b8a6');
        const purple = new THREE.Color('#a78bfa');
        let mouseX = 0.5;
        let mouseY = 0.5;

        if (mountNode) {
            // Renderer
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            mountNode.appendChild(renderer.domElement);

            // Scene
            scene = new THREE.Scene();

            // Camera
            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 8;

            // Particle geometry
            geometry = new THREE.BufferGeometry();
            positions = new Float32Array(PARTICLE_COUNT * 3);
            velocities = new Float32Array(PARTICLE_COUNT * 2); // 2D flow
            colors = new Float32Array(PARTICLE_COUNT * 3);

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                // Spread particles in a 2D plane
                const x = (Math.random() - 0.5) * 16;
                const y = (Math.random() - 0.5) * 9;
                const z = (Math.random() - 0.5) * 0.2;
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
                // Initial velocity
                velocities[i * 2] = 0.01 + Math.random() * 0.02;
                velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.01;
                // Initial color, will be updated in animation
                colors[i * 3] = teal.r;
                colors[i * 3 + 1] = teal.g;
                colors[i * 3 + 2] = teal.b;
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            // Material
            material = new THREE.PointsMaterial({
                size: 0.08,
                vertexColors: true,
                transparent: true,
                opacity: 0.7,
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            // Mouse move handler to update gradient direction
            const handleMouseMove = (e: MouseEvent) => {
                mouseX = e.clientX / window.innerWidth;
                mouseY = e.clientY / window.innerHeight;
            };
            window.addEventListener('mousemove', handleMouseMove);

            // Animation
            const animate = () => {
                animationId = requestAnimationFrame(animate);
                // Calculate gradient direction based on mouse
                const gradAngle = Math.atan2(mouseY - 0.5, mouseX - 0.5);
                const gradCos = Math.cos(gradAngle);
                const gradSin = Math.sin(gradAngle);
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    // Project particle position onto gradient direction
                    const x = positions[i * 3];
                    const y = positions[i * 3 + 1];
                    // t is 0 at one end of the gradient, 1 at the other
                    const t = 0.5 + 0.5 * ((x * gradCos + y * gradSin) / 9);
                    const color = lerpColor(teal, purple, Math.min(Math.max(t, 0), 1));
                    colors[i * 3] = color.r;
                    colors[i * 3 + 1] = color.g;
                    colors[i * 3 + 2] = color.b;
                    // Wind flow direction follows gradient
                    positions[i * 3] += velocities[i * 2] * gradCos * 1.2;
                    positions[i * 3 + 1] +=
                        velocities[i * 2] * gradSin * 1.2 +
                        Math.sin(Date.now() * 0.0005 + i) * 0.002 +
                        velocities[i * 2 + 1];
                    // Wrap around horizontally/vertically
                    if (positions[i * 3] > 8) positions[i * 3] = -8;
                    if (positions[i * 3] < -8) positions[i * 3] = 8;
                    if (positions[i * 3 + 1] > 5) positions[i * 3 + 1] = -5;
                    if (positions[i * 3 + 1] < -5) positions[i * 3 + 1] = 5;
                }
                geometry!.attributes.position.needsUpdate = true;
                geometry!.attributes.color.needsUpdate = true;
                renderer!.render(scene!, camera!);
            };
            animate();

            // Responsive
            const handleResize = () => {
                if (!camera || !renderer) return;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);

            // Cleanup
            return () => {
                cancelAnimationFrame(animationId);
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', handleMouseMove);
                if (renderer) renderer.dispose();
                if (geometry) geometry.dispose();
                if (material) material.dispose();
                if (mountNode && renderer) mountNode.removeChild(renderer.domElement);
            };
        }
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
            aria-hidden="true"
        />
    );
}
