<template>
    <div class="container is-fluid" ref="containerRef">
        <canvas  ref="canvasRef"></canvas>
    </div>
    
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, nextTick } from "vue"
  import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
  import * as THREE from "three"
  
  const props = defineProps({
    customModel: String,
    name: String,
    scale: Number,
    positionY: Number,
  })

  //man-and-horse.glb

  let scene = new THREE.Scene()
  let renderer
  let camera
  


  let canvasRef = ref();
  let containerRef = ref();

  const gltfLoader = new GLTFLoader()
  let sceneModel 
  gltfLoader.load(`/models/${props.customModel}`, (model)=>{
    let loadedModel = model.scene.children[0]
    sceneModel = loadedModel.clone()
    sceneModel.name =`${props.name}`
    sceneModel.scale.set(props.scale, props.scale, props.scale)
    sceneModel.position.y += props.positionY

    switch(sceneModel.name){
      case "kama-dagger":
        sceneModel.position.z += 1.2;
      break;
      
      case "chalice":
        sceneModel.position.z -= 10;
      break;
      // case "space-shuttle":
      //   sceneModel.rotation.y = Math.PI/4
      // break;
    }
   
    scene.add(sceneModel)
  })

  let ambientLight = new THREE.DirectionalLight("#ffffff", 1);
  ambientLight.position.set(-1, 2, 4);
  scene.add(ambientLight);

  
  let loop = () => {
    if(sceneModel){
      switch(sceneModel.name){

        case "statua1":
          sceneModel.rotation.y -= 0.01;
        break;

        case "neck-amphora":
          sceneModel.rotation.z +=0.01;
        break;

        case "kama-dagger":
          sceneModel.rotation.x += 0.01;
        break;

        case "bust-of-roza":
          sceneModel.rotation.z += 0.01;
        break;

        case "p35-pistol":
          sceneModel.rotation.y -= 0.01;
        break;

        case "eros-pelike-amphora":
          sceneModel.rotation.y -= 0.01;
        break;

        case "scifi-building":
          sceneModel.rotation.z += 0.01;
        break;

        case "satellite":
          sceneModel.rotation.y -= 0.01;
          sceneModel.rotation.x -= 0.01;
        break;
        
        case "ufo":
          sceneModel.rotation.z += 0.01;
        break;
      }
      // if(sceneModel.name==="neck-amphora" ){
      //   sceneModel.rotation.z += 0.01
      // }
      // else{
      //   sceneModel.rotation.y -= 0.01
      // }
      
    }
    
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