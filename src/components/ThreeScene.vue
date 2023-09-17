<template>
    <div class="container is-fluid" ref="containerRef">
        <canvas  ref="canvasRef"></canvas>
    </div>
    
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, nextTick } from "vue"
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import * as THREE from "three"
  
  let scene = new THREE.Scene()
  let renderer
  let camera
  let controls
  
  let canvasRef = ref();
  let containerRef = ref();
  
  
  let ambientLight = new THREE.DirectionalLight("#ffffff", 1);
  ambientLight.position.set(-1, 2, 4);
  scene.add(ambientLight);

  let box = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
  )
  scene.add(box)
  
  let loop = () => {
    controls.update();
    renderer.render(scene, camera);
  };
  
  let resizeCallback = () => {
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
    camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight;
    camera.updateProjectionMatrix();
  };
  
  onMounted(() => {
    
    nextTick(() => {
    // ora containerRef.value dovrebbe essere definito

        // definire la camera qui
        camera = new THREE.PerspectiveCamera(
            75, //vertical field of view
            containerRef.value.clientWidth / containerRef.value.clientHeight, //aspect ratio
            0.1, //near plane
            100 //far plane
        );
        camera.position.y = 0;
        camera.position.z = 2;
        camera.position.x=0;
        scene.add(camera);

        renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.value,
            antialias: true,
            alpha: true,
        });
  
        renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.render(scene, camera);
  
        renderer.setAnimationLoop(loop);
  
        controls = new OrbitControls(camera, canvasRef.value);
        controls.enableDamping = true;
  
        window.addEventListener("resize", resizeCallback);
    });
  })
  
  onUnmounted(() => {
    renderer.setAnimationLoop(null);
  });
  </script>
  
  <style>
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>