import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CinematicScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    // --- 2. CAMERA SETUP ---
    const camera = new THREE.PerspectiveCamera(
      38,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    // --- 3. RENDERER SETUP ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    currentMount.appendChild(renderer.domElement);

    // --- 4. PROCEDURAL TEXTURES ---
    const createBrushedMetalTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        for (let i = 0; i < 400; i++) {
          const y = Math.random() * 256;
          const h = Math.random() * 2 + 1;
          const w = Math.random() * 150 + 20;
          const x = Math.random() * 256 - w / 2;
          ctx.fillRect(x, y, w, h);
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 4);
      return texture;
    };

    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 240, 240, 0.5)');
        grad.addColorStop(1, 'rgba(255, 240, 240, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const brushedTexture = createBrushedMetalTexture();
    const particleTexture = createParticleTexture();

    // --- 5. PREMIUM MATERIALS (OPTIMIZED TO STANDARD) ---
    const matBrushedMetal = new THREE.MeshStandardMaterial({
      color: 0x151515,
      metalness: 0.9,
      roughness: 0.45,
      roughnessMap: brushedTexture,
      side: THREE.DoubleSide,
    });

    const matFrostedGlass = new THREE.MeshStandardMaterial({
      color: 0x3a0a14,
      metalness: 0.1,
      roughness: 0.35,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });

    const matCrimsonReflective = new THREE.MeshStandardMaterial({
      color: 0x8b1e2f,
      metalness: 0.75,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });

    const matGlossyIvory = new THREE.MeshStandardMaterial({
      color: 0xf4f4f0,
      metalness: 0.15,
      roughness: 0.1,
      side: THREE.DoubleSide,
    });

    const matLightRibbon = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf4f4f0,
      emissiveIntensity: 0.8,
      metalness: 0.1,
      roughness: 0.1,
      side: THREE.DoubleSide,
    });

    const matCrimsonRibbon = new THREE.MeshStandardMaterial({
      color: 0x8b1e2f,
      emissive: 0x8b1e2f,
      emissiveIntensity: 0.6,
      metalness: 0.2,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });

    // --- 6. COMPOSITION: LAYERS ---
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    const backgroundGroup = new THREE.Group();
    const middleGroup = new THREE.Group();
    const foregroundGroup = new THREE.Group();

    sceneGroup.add(backgroundGroup);
    sceneGroup.add(middleGroup);
    sceneGroup.add(foregroundGroup);

    // === MIDDLE LAYER ===
    const sculptureCore = new THREE.Group();
    middleGroup.add(sculptureCore);

    const ribbonCount = 5;
    for (let i = 0; i < ribbonCount; i++) {
      const radius = 3.2 + i * 0.4;
      const tube = 0.4 - i * 0.05;
      const radialSegments = 12;
      const tubularSegments = 48;
      const arc = Math.PI * (1.2 + Math.random() * 0.6);

      const geom = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
      
      let mat = matBrushedMetal;
      if (i === 1) mat = matFrostedGlass;
      if (i === 3) mat = matCrimsonReflective;

      const mesh = new THREE.Mesh(geom, mat);

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.0008,
        ry: (Math.random() - 0.5) * 0.0012,
        rz: (Math.random() - 0.5) * 0.0005,
      };

      sculptureCore.add(mesh);
    }

    const lightRingsCount = 3;
    for (let i = 0; i < lightRingsCount; i++) {
      const radius = 2.0 + i * 0.8;
      const geom = new THREE.TorusGeometry(radius, 0.03, 8, 40, Math.PI * 1.5);
      const mat = i % 2 === 0 ? matLightRibbon : matCrimsonRibbon;
      const mesh = new THREE.Mesh(geom, mat);
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.002,
        ry: (Math.random() - 0.5) * 0.002,
        rz: (Math.random() - 0.5) * 0.002,
      };
      sculptureCore.add(mesh);
    }

    const coreGeom1 = new THREE.OctahedronGeometry(1.5, 2);
    const coreMesh1 = new THREE.Mesh(coreGeom1, matFrostedGlass);
    coreMesh1.scale.set(1, 1.6, 0.8);
    sculptureCore.add(coreMesh1);

    const finCount = 12;
    for (let i = 0; i < finCount; i++) {
      const finGeom = new THREE.BoxGeometry(0.08, 3.5, 0.4);
      const finMesh = new THREE.Mesh(finGeom, i % 3 === 0 ? matGlossyIvory : matBrushedMetal);

      const angle = (i / finCount) * Math.PI * 2;
      const distance = 1.1;
      finMesh.position.set(Math.cos(angle) * distance, 0, Math.sin(angle) * distance);
      finMesh.rotation.y = -angle;
      finMesh.rotation.x = 0.15;
      sculptureCore.add(finMesh);
    }

    // === FOREGROUND LAYER ===
    const fgCount = 4;
    for (let i = 0; i < fgCount; i++) {
      const fgGeom = new THREE.SphereGeometry(1.2, 12, 12);
      const fgMesh = new THREE.Mesh(fgGeom, matFrostedGlass);
      
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = 6 + Math.random() * 3;
      
      fgMesh.position.set(x, y, z);
      fgMesh.scale.set(1, 1.8, 0.5);
      fgMesh.rotation.z = Math.random() * Math.PI;

      fgMesh.userData = {
        speedY: (Math.random() - 0.5) * 0.002,
        floatOffset: Math.random() * Math.PI,
      };

      foregroundGroup.add(fgMesh);
    }

    // === BACKGROUND LAYER ===
    const particleCount = 150;
    const particlesGeom = new THREE.BufferGeometry();
    const particlesPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlesPos[i * 3] = (Math.random() - 0.5) * 30;
      particlesPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlesPos[i * 3 + 2] = -5 - Math.random() * 15;
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(particlesPos, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xf4f4f0,
    });

    const atmosphericParticles = new THREE.Points(particlesGeom, particlesMat);
    backgroundGroup.add(atmosphericParticles);

    const glowGeom = new THREE.PlaneGeometry(25, 25);
    const glowMat = new THREE.MeshBasicMaterial({
      map: particleTexture,
      transparent: true,
      opacity: 0.12,
      color: 0x8b1e2f,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bgGlow = new THREE.Mesh(glowGeom, glowMat);
    bgGlow.position.set(0, 0, -12);
    backgroundGroup.add(bgGlow);

    // --- 7. CINEMATIC LIGHTING ---
    const keyLight = new THREE.DirectionalLight(0xfff4e8, 2.5);
    keyLight.position.set(8, 12, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -8;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8b1e2f, 3.0);
    fillLight.position.set(-8, -8, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf4f4f0, 2.0);
    rimLight.position.set(0, 10, -10);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x2d080e, 0.8);
    scene.add(ambientLight);

    const coreLight1 = new THREE.PointLight(0x8b1e2f, 4.0, 10);
    coreLight1.position.set(0, 1, 0);
    sculptureCore.add(coreLight1);

    const coreLight2 = new THREE.PointLight(0xfff4e8, 2.0, 8);
    coreLight2.position.set(0, -1, 0);
    sculptureCore.add(coreLight2);

    // --- 8. CURSOR INTERACTION & SCROLL PARALLAX ---
    const mouse = {
      current: new THREE.Vector2(0, 0),
      target: new THREE.Vector2(0, 0),
    };

    const scroll = {
      current: 0,
      target: 0,
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.target.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.target.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scroll.target = window.scrollY / maxScroll;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- 9. MASTER RENDER LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Cinematic Easing for Cursor Parallax
      mouse.current.x += (mouse.target.x - mouse.current.x) * 0.03;
      mouse.current.y += (mouse.target.y - mouse.current.y) * 0.03;

      // Cinematic Easing for Scroll Parallax
      scroll.current += (scroll.target - scroll.current) * 0.05;

      // Map scroll to an elegant vertical path and gentle rotation
      const scrollOffsetY = scroll.current * 3.5;
      const scrollRotationY = scroll.current * Math.PI * 0.5;

      // 1. Parallax & Tilt on Middle Group
      middleGroup.position.x = mouse.current.x * 0.8;
      middleGroup.position.y = mouse.current.y * 0.8 + scrollOffsetY;
      middleGroup.rotation.y = mouse.current.x * 0.25 + scrollRotationY;
      middleGroup.rotation.x = -mouse.current.y * 0.25 + scroll.current * 0.2;

      // 2. Stronger Parallax on Foreground Group
      foregroundGroup.position.x = mouse.current.x * 1.8;
      foregroundGroup.position.y = mouse.current.y * 1.8 + scrollOffsetY * 1.2;

      // 3. Inverted Subtle Parallax on Background Group
      backgroundGroup.position.x = -mouse.current.x * 0.4;
      backgroundGroup.position.y = -mouse.current.y * 0.4 + scrollOffsetY * 0.3;

      // --- Restrained Living Motion ---
      sculptureCore.position.y = Math.sin(elapsedTime * 0.6) * 0.25;
      sculptureCore.rotation.y += 0.001;

      sculptureCore.children.forEach((child) => {
        if (child.userData && child.userData.rx) {
          child.rotation.x += child.userData.rx;
          child.rotation.y += child.userData.ry;
          child.rotation.z += child.userData.rz;
        }
      });

      foregroundGroup.children.forEach((child) => {
        if (child.userData && child.userData.speedY) {
          const offset = child.userData.floatOffset || 0;
          child.position.y += Math.sin(elapsedTime * 0.5 + offset) * 0.002;
          child.rotation.z += 0.0002;
        }
      });

      const positions = particlesGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.008;
        positions[i * 3] += Math.sin(elapsedTime * 0.3 + i) * 0.002;

        if (positions[i * 3 + 1] > 10) {
          positions[i * 3 + 1] = -10;
        }
      }
      particlesGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- 10. CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};
