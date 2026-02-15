// cyberpunk-city.js

let scene, camera, renderer;
let cityMesh, rainSystem, lightingSystem;
let clock = new THREE.Clock();

// Configuration
const CONFIG = {
    rainCount: 1500,
    rainSpeed: 0.8,
    lightCount: 6,
    fogDensity: 0.02
};

function initCyberpunkCity() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, CONFIG.fogDensity); // Dark fog

    // 2. Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); // Alpha TRUE for overlay
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;

    // 4. Load City Background (Handled by CSS/HTML now due to local file restrictions)
    // We just render the atmosphere on top


    // 5. Rain System
    createRain();

    // 6. Flickering Lights
    lightingSystem = new FlickeringLights();

    // 7. Ambient Light (Low base)
    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    // 8. Animation Loop
    animate();

    // 9. Resize Handler
    window.addEventListener('resize', onWindowResize, false);

    // 10. Mouse Interaction (Parallax)
    document.addEventListener('mousemove', onMouseMove, false);
}

function createRain() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < CONFIG.rainCount; i++) {
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 20;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x00ffff, // Cyan rain
        size: 0.1,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    rainSystem = new THREE.Points(geometry, material);
    scene.add(rainSystem);
}

class FlickeringLights {
    constructor() {
        this.lights = [];
        const colors = [0xff00ff, 0x00ffff, 0xffff00, 0xff0000]; // Neon colors

        for (let i = 0; i < CONFIG.lightCount; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const light = new THREE.PointLight(color, 1, 20);

            // Random positions in front of city
            light.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
                -5 + Math.random() * 5
            );

            // Custom properties for flicker
            light.userData = {
                baseIntensity: 1 + Math.random() * 2,
                flickerSpeed: 0.05 + Math.random() * 0.1,
                timeOffset: Math.random() * 100
            };

            scene.add(light);
            this.lights.push(light);

            // Add a small sphere to visualize the light source (optional)
            // const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({color: color}));
            // sphere.position.copy(light.position);
            // scene.add(sphere);
        }
    }

    update(time) {
        this.lights.forEach(light => {
            // Flicker logic: Perlin-ish noise using sin waves
            const noise = Math.sin(time * 10 + light.userData.timeOffset) *
                Math.sin(time * 23 + light.userData.timeOffset);

            // Occasional "short circuit" blackout
            if (Math.random() < 0.01) {
                light.intensity = 0;
            } else {
                light.intensity = light.userData.baseIntensity + noise * 0.5;
            }
        });
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

let mouseX = 0;
let mouseY = 0;

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Update Rain
    if (rainSystem) {
        const positions = rainSystem.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= CONFIG.rainSpeed; // Fall down
            if (positions[i] < -20) {
                positions[i] = 20; // Reset to top
            }
        }
        rainSystem.geometry.attributes.position.needsUpdate = true;

        // Wind effect on rain
        rainSystem.rotation.z = 0.1;
    }

    // Update Lights
    if (lightingSystem) {
        lightingSystem.update(time);
    }

    // Camera Parallax
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, -10);

    renderer.render(scene, camera);
}
