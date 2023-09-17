<template>
    
  
    <div id="menu">

      <div id="img_container">
        <img src="../assets/musa1.png" style="height: 200px;" alt="modern musa logo" />
      </div>

      <div class="content_container">
        <div id="content">

          <div class="title">
            <h1 class="stroke">3D Art Gallery</h1>
            <h1 class="main">3D Art Gallery</h1>
          </div>
            
          <div>
            <p>This is an interactive 3D gallery</p>
            <p>Art by Modern Musa</p>
            <p>Made by <a href="https://hazenhower-game-portfolio.netlify.app/">Hazenhower</a></p>
          </div>

          <div>
            <p class="instructions">Instructions:</p>
            <p>Arrow Keys Or W/A/S/D To Move Around</p>
            <p>Mouse To Look Around</p>
            <p>Esc To Pause</p>
          </div>
          
          <div id="play_button">
            <p>Enter The Gallery</p>
          </div>

        </div>
      </div>
          
    </div>


  

  <div class="container is-fluid" ref="containerRef">
    <div id="painting-info"></div>
    <canvas  ref="canvasRef"></canvas>
  </div>
  
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue"
import * as THREE from "three"
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
  
let scene = new THREE.Scene()
let renderer
let camera
let controls
  
let canvasRef = ref();
let containerRef = ref();
  

//LUCI
let ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//Funzione per creare spotlight
function createSpotLight(x,y,z, intensity, targetPosition){
  const spotlight = new THREE.SpotLight(0xffffff, intensity)
  spotlight.position.set(x,y,z)
  spotlight.target.position.copy(targetPosition)
  spotlight.castShadow = true
  spotlight.angle = Math.PI /3
  spotlight.penumbra = 1
  spotlight.decay = 1.5
  spotlight.distance = 40
  spotlight.shadow.mapSize.width = 1024
  spotlight.shadow.mapSize.height = 1024
  return spotlight
}

let spotlight1 = createSpotLight(0, 25, -10, 0.4, new THREE.Vector3(0, 2, -24.99))
let spotlight2 = createSpotLight(0, 25, 10, 0.4, new THREE.Vector3(0, 2, 24.99))
let spotlight3 = createSpotLight(-10, 25, 0, 0.4, new THREE.Vector3(-24.99, 2, 0))
let spotlight4 = createSpotLight(10, 25, 0, 0.4, new THREE.Vector3(24.99, 2, 0))
scene.add(spotlight1, spotlight2, spotlight3, spotlight4)
scene.add(spotlight1.target, spotlight2.target, spotlight3.target, spotlight4.target)
//TEXTURE LOADER
let textureLoader = new THREE.TextureLoader()

// FLOOR TEXTURE
let groundTexture = textureLoader.load("/texture/parquet.jpg")
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(4,4)

//WALL TEXTURE
let wallTexture = textureLoader.load("/texture/grey-wall.jpg")
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(4,4)

//PAVIMENTO
let ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50,50),
  new THREE.MeshBasicMaterial({map: groundTexture, side: THREE.DoubleSide})
)
ground.rotation.x += Math.PI/2 
ground.position.y = -Math.PI
scene.add(ground)

//Muri
let wallGroup = new THREE.Group()

//Front wall
let frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(50,40,0.001),
  new THREE.MeshLambertMaterial({map:wallTexture})
)
frontWall.position.set(0,4,-25)
wallGroup.add(frontWall)

//Left wall
let leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(50,40,0.001),
  new THREE.MeshLambertMaterial({map: wallTexture})
)
leftWall.rotation.y = Math.PI/2
leftWall.position.set(-25,4,0)
wallGroup.add(leftWall)

//Right wall
let rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(50,40,0.001),
  new THREE.MeshLambertMaterial({map: wallTexture})
)
rightWall.rotation.y = Math.PI/2
rightWall.position.set(25,4,0)
wallGroup.add(rightWall)

//Back wall
let backWall = new THREE.Mesh(
  new THREE.BoxGeometry(50,40,0.001),
  new THREE.MeshLambertMaterial({map: wallTexture})
)
backWall.position.set(0,4,25)
wallGroup.add(backWall)

scene.add(wallGroup)

//Creiamo le bounding box per le collisioni coi muri ed impedire di attraversarli
for(let i=0; i<wallGroup.children.length; i++){
  wallGroup.children[i].BoundingBox = new THREE.Box3();
  wallGroup.children[i].BoundingBox.setFromObject(wallGroup.children[i])
}

let ceilingTexture = textureLoader.load("/texture/grey-wall.jpg")
ceilingTexture.wrapS = THREE.RepeatWrapping;
ceilingTexture.wrapT = THREE.RepeatWrapping;
ceilingTexture.repeat.set(4,4)

//Tetto
let ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(50,50),
  new THREE.MeshLambertMaterial({map: ceilingTexture, side: THREE.DoubleSide})
)
ceiling.rotation.x += Math.PI/2 
ceiling.position.y = 24
scene.add(ceiling)



// DATI Dei DIPINTI //////////////////////////////////////////////////////////////////////////////////////////////

const paintingData = [
  

  //FRONT WALL
  {
    imgSrc: `artworks/notte-stellata.png`,
    width: 5, // width of the painting
    height: 3, // height of the painting
    position: { x: -15 + 10 * 0, y: 5, z: -24.99 }, // position of the painting
    rotationY: 0, // rotation of the painting
    info: { // info about the painting
      title: `De sterrennacht`, 
      artist: 'Vincent van Gogh',
      description: `This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. This artwork perfectly encapsulates his love for the beauty of everyday life.`,
      year: `1889`,
    },
  },

  {
    imgSrc: `artworks/relativity.jpg`,
    width: 5, // width of the painting
    height: 3, // height of the painting
    position: { x: -15 + 10 * 1 , y: 5, z: -24.99 }, // position of the painting
    rotationY: 0, // rotation of the painting
    info: { // info about the painting
      title: `Relativity`, 
      artist: 'M.C. Escher',
      description: `It depicts a world in which the normal laws of gravity do not apply. The architectural structure seems to be the centre of an idyllic community, with most of its inhabitants casually going about their ordinary business, such as dining.`,
      year: `1953`,
    },
  },

  {
    imgSrc: `artworks/skrik.jpg`,
    width: 5, // width of the painting
    height: 3, // height of the painting
    position: { x: -15 + 10 * 2 , y: 5, z: -24.99 }, // position of the painting
    rotationY: 0, // rotation of the painting
    info: { // info about the painting
      title: `Skrik`, 
      artist: 'Edvard Munch',
      description: `Commonly know as The Scream, Skrik (the original norwegian name) is a composition created by Edvard Munch in 1893. The agonized face in the painting has become one of the most iconic images of art, seen as symbolizing the anxiety of the human condition. Munch's work, including The Scream, had a formative influence on the Expressionist movement.`,
      year: `1893`,
    },
  },

  {
    imgSrc: `artworks/fallen-angel.jpg`,
    width: 5, // width of the painting
    height: 3, // height of the painting
    position: { x: -15 + 10 * 3 , y: 5, z: -24.99 }, // position of the painting
    rotationY: 0, // rotation of the painting
    info: { // info about the painting
      title: `L'Ange Déchu`, 
      artist: 'Alexandre Cabanel',
      description: `It was painted when the artist was 24 years old, and depicts the Devil after his fall from Heaven. The painting is part of the collection of the Musée Fabre in Montpellier, France.`,
      year: `1847`,
    },
  },


  //BACK WALL
  {
    imgSrc: `artworks/yport-la-nuit.jpg`,
    width: 5,
    height: 3,
    position: { x: -15 + 10 * 0 , y: 5, z: 24.99 },
    rotationY: Math.PI,
    info: {
      title: `Yport, La Nuit`,
      artist: 'Oscar-Claude Monet',
      description: `The Yport series represents Monet's passion for outdoor painting and the use of natural light in different phases of the day and seasons. In the specific case of "Yport, la nuit," Monet captured the nighttime atmosphere of the location. The painting may depict the village illuminated by the moonlight or street lamps, creating a suggestive and mysterious atmosphere.`,
      year: `Unknown`,
    },
  },

  {
    imgSrc: `artworks/il-trionfo-di-hercules.jpg`,
    width: 5,
    height: 3,
    position: { x: -15 + 10 * 1 , y: 5, z: 24.99 },
    rotationY: Math.PI,
    info: {
      title: `Il Trionfo Di Hercules`,
      artist: 'Domenico Mondo',
      description: `Domenico Mondo was an Italian painter, active in both a late Baroque and Neoclassical styles. He studied under Francesco Solimena. Mondo became director of the Neapolitan Royal Academy of Fine Arts from 1789–1805.`,
      year: `Unknown`,
    },
  },

  {
    imgSrc: `artworks/mona-lisa.jpg`,
    width: 5,
    height: 3,
    position: { x: -15 + 10 * 2 , y: 5, z: 24.99 },
    rotationY: Math.PI,
    info: {
      title: `Mona Lisa`,
      artist: 'Leonardo Da Vinci',
      description: `Mona Lisa, created by Leonardo da Vinci, is an iconic portrait of a woman with a mysterious smile. She wears a dark dress, and the painting features soft, blended background tones. It is renowned for its realistic detail and is displayed in the Louvre Museum in Paris, attracting millions of visitors annually.`,
      year: `1503-1506`,
    },
  },

  {
    imgSrc: `artworks/the-birth-of-venus.jpg`,
    width: 5,
    height: 3,
    position: { x: -15 + 10 * 3 , y: 5, z: 24.99 },
    rotationY: Math.PI,
    info: {
      title: `Nascita Di Venere`,
      artist: 'Sandro Botticelli',
      description: `Worldwide known as The Birth of Venus, is a famous painting by the Italian Renaissance artist Sandro Botticelli. It depicts the goddess Venus, emerging from the sea on a seashell.The painting is celebrated for its exquisite depiction of the female form and its mythological symbolism. It's considered one of the masterpieces of Renaissance art.`,
      year: `1485`,
    },
  },

  //LEFT WALL
  {
    imgSrc: `artworks/taking-of-christ.jpg`,
    width: 5,
    height: 3,
    position: { x: -24.99, y: 5, z: -15 + 10 * 0 },
    rotationY: Math.PI / 2,
    info: {
      title: `La Cattura Di Cristo`,
      artist: 'Caravaggio',
      description: `It depicts the moment of Jesus' arrest in the Garden of Gethsemane. The painting is characterized by dramatic use of chiaroscuro, with intense light illuminating Jesus' face while the surrounding figures are in shadow. This creates a powerful contrast, a hallmark of Caravaggio's style known as "caravaggism."`,
      year: `1602`,
    },
  },

  {
    imgSrc: `artworks/the-artist-in-his-studio.jpg`,
    width: 5,
    height: 3,
    position: { x: -24.99, y: 5, z: -15 + 10 * 1 },
    rotationY: Math.PI / 2,
    info: {
      title: `The Artist In His Studio`,
      artist: 'Rembrandt van Rijn',
      description: `In this artwork, Rembrandt portrays himself in the act of painting at his easel. He is shown as a mature and contemplative artist, with an intense expression. The painting is bathed in soft, golden light that highlights Rembrandt's face and hands, creating a striking contrast with the darker background.`,
      year: `ca.1628`,
    },
  },

  {
    imgSrc: `artworks/the-card-players.jpg`,
    width: 5,
    height: 3,
    position: { x: -24.99, y: 5, z: -15 + 10 * 2 },
    rotationY: Math.PI / 2,
    info: {
      title: `The Card Players`,
      artist: 'Paul Cèzanne',
      description: `Cézanne's distinctive style is evident in the geometric forms and the careful arrangement of colors. The painting exudes a sense of quiet intensity and a deep connection between the subjects and their surroundings. Cézanne's exploration of form, composition, and color in "The Card Players" series is considered a precursor to Cubism and has had a significant influence on modern art.`,
      year: `1890-1892`,
    },
  },

  {
    imgSrc: `artworks/fishing.jpg`,
    width: 5,
    height: 3,
    position: { x: -24.99, y: 5, z: -15 + 10 * 3 },
    rotationY: Math.PI / 2,
    info: {
      title: `Fishing`,
      artist: 'Edouard Manet',
      description: ` this artwork portrays a serene and idyllic scene along the banks of the Seine River. In the painting, two figures, a man, and a woman, are depicted fishing together. The painting is characterized by its Impressionistic style, characterized by loose brushwork and an emphasis on light and atmosphere. It showcases Manet's skill in conveying the nuances of outdoor leisure, making it a noteworthy addition to his body of work.`,
      year: `ca.1862-1863`,
    },
  },

  
  //RIGHT WALL
  {
    imgSrc: `/artworks/nude-on-a-blue-cushion.jpg`,
    width: 5,
    height: 3,
    position: { x: 24.99, y: 5, z: -15 + 10 * 0 },
    rotationY: -Math.PI / 2,
    info: {
      title: `Nude On A Blue Cushion`,
      artist: 'Amedeo Modigliani',
      description: `This artwork features a female nude against a vivid blue background. This painting is a prime example of Modigliani distinctive approach to portraiture, characterized by the elongation of forms and a focus on the essential elements of the subject. The vibrant blue background serves to accentuate the sensuality and allure of the nude figure.`,
      year: `1917`,
    },
  },

  {
    imgSrc: `/artworks/the-return-of-the-prodigal-son.jpg`,
    width: 5,
    height: 3,
    position: { x: 24.99, y: 5, z: -15 + 10 * 1 },
    rotationY: -Math.PI / 2,
    info: {
      title: `The Return Of The Prodigal Son`,
      artist: 'James Tissot',
      description: `It depicts a biblical scene from the parable of the prodigal son.  The scene is set in a warm, welcoming atmosphere, symbolizing the themes of redemption and reconciliation found in the biblical story. Tissot's detailed and realistic style captures the emotional depth of the moment, making it a poignant and thought-provoking work.`,
      year: `1862`,
    },
  },

  {
    imgSrc: `/artworks/the-coast-at-greville.jpg`,
    width: 5,
    height: 3,
    position: { x: 24.99, y: 5, z: -15 + 10 * 2 },
    rotationY: -Math.PI / 2,
    info: {
      title: `The Coast At Grèville`,
      artist: 'Jean-François Millet',
      description: ` The scene is characterized by its serene and natural beauty, with a sense of tranquility and timelessness. Millet's careful attention to detail and the use of soft, muted colors contribute to the overall peaceful atmosphere of the painting. "The Coast at Greville" reflects Millet's affinity for depicting rural and natural scenes, which was a hallmark of his work during the Barbizon School movement in France.`,
      year: `ca.1850`,
    },
  },

  {
    imgSrc: `/artworks/joseph-and-potiphar-wife.jpg`,
    width: 5,
    height: 3,
    position: { x: 24.99, y: 5, z: -15 + 10 * 3 },
    rotationY: -Math.PI / 2,
    info: {
      title: `Joseph And Potiphar's Wife`,
      artist: 'Guido Reni',
      description: `In the painting, Joseph is shown resisting the advances of Potiphar's wife as she reaches out to him. The composition highlights the tension and moral conflict of the moment. Reni's skillful use of light and shadow adds depth to the characters and their emotions.`,
      year: `ca.1630`,
    },
  },
]


//Nuova funzione che dovrebbe caricare i dipinti da una variabile(?)
  const paintings = []

 function createPaintings(){

  paintingData.forEach((data)=>{
    const painting = new THREE.Mesh(
      new THREE.PlaneGeometry(data.width, data.height),
      new THREE.MeshLambertMaterial({map:textureLoader.load(data.imgSrc)})
    )
    painting.position.set(data.position.x, data.position.y, data.position.z)
    painting.rotation.y = data.rotationY

    painting.userData = {
      type: "painting",
      info: data.info
    }

    painting.castShadow = true
    painting.receiveShadow = true

    paintings.push(painting)
  })

  return paintings
}

createPaintings()
for(let i=0; i< paintings.length; i++){
  scene.add(paintings[i])
}

//CREA QUI TUTTI I DIPINTI CHE TI PARE
//...

//AGGIUNGERE QUI(?) I DATI DEI DIPINDI

//AGGIUNGERE QUI(?) LE FUNZIONI PER DISPLAY & HIDE DELLE INFO DEI DIPINTI

//Display Painting Info
function displayPaintingInfo(info){
  const infoElement = document.getElementById("painting-info")

  infoElement.innerHTML = `
    <h3>Title: ${info.title}</h3>
    <p>Artist: ${info.artist}</p>
    <p>Description: ${info.description}</p>
    <p>Year: ${info.year}</p>
  `
  infoElement.classList.add("show")
}

//Hide Painting Info
function hidePaintingInfo(){
  const infoElement = document.getElementById("painting-info")
  infoElement.classList.remove("show")
}



//WASD and ARROW Controls

//Tasti
const keyPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  W: false,
  a: false,
  A: false,
  s: false,
  S: false,
  d: false,
  D: false,
  
}

//Event listner WASD controls
document.addEventListener(
  "keydown", 
  (e)=>{
    if(e.key in keyPressed){
      keyPressed[e.key] = true
    }
  },
  false
)

document.addEventListener(
  "keyup", 
  (e)=>{
    if(e.key in keyPressed){
      keyPressed[e.key] = false
    }
  },
  false
)

const clock = new THREE.Clock()

//Update movement function 
function updateMovement(delta){
  const moveSpeed = 10 * delta
  const previousPosition = camera.position.clone()

  if(keyPressed.ArrowRight || keyPressed.d || keyPressed.D){
    controls.moveRight(moveSpeed)
  }
  else if(keyPressed.ArrowLeft || keyPressed.a || keyPressed.A){
    controls.moveRight(-moveSpeed)
  }
  else if(keyPressed.ArrowUp || keyPressed.w || keyPressed.W){
    controls.moveForward(moveSpeed)
  }
  else if(keyPressed.ArrowDown || keyPressed.s || keyPressed.S){
    controls.moveForward(-moveSpeed)
  }

  if(checkCollision()){
    camera.position.copy(previousPosition)
  }

}



//Check Collision Function (only collision with walls)
function checkCollision(){
  const playerBoundingBox = new THREE.Box3() //bounding box per il player
  const cameraWorldPosition = new THREE.Vector3()

  camera.getWorldPosition(cameraWorldPosition) //get the camera position and store it in this new vector we have just create (cameraWorldPosition)

  playerBoundingBox.setFromCenterAndSize(cameraWorldPosition, new THREE.Vector3(1,1,1)) //center the player bounding box on the camera position, the vector 3 is the size of the bounding box

  for(let i = 0; i < wallGroup.children.length; i++){
    let wall = wallGroup.children[i]
    if(playerBoundingBox.intersectsBox(wall.BoundingBox)){
      return true
    }
  }

  return false

}


let loop = () => {
  const delta = clock.getDelta()
  updateMovement(delta)

  let cameraPos = camera.position
  ambientLight.position.set(cameraPos)

  //Painting info loop
  
  const distanceTreshold = 8
  let paintingToShow
  paintings.forEach((painting)=> {
    const distanceToPainting = camera.position.distanceTo(painting.position)
    if(distanceToPainting < distanceTreshold){
      paintingToShow = painting
    }
  })

  if(paintingToShow){
    displayPaintingInfo(paintingToShow.userData.info)
  }
  else{
    hidePaintingInfo()
  }
 

  renderer.render(scene, camera);
};
  
let resizeCallback = () => {
  if(containerRef.value){
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
  camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
  }
};
  
onMounted(() => {
    
  nextTick(() => {
  // ora containerRef.value dovrebbe essere definito

    // CAMERA
    camera = new THREE.PerspectiveCamera(
      60, //vertical field of view
      containerRef.value.clientWidth / containerRef.value.clientHeight, //aspect ratio
      0.1, //near plane
      1000 //far plane
    );
    camera.position.y = 5;
    scene.add(camera);

    //RENDERER
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
    renderer.setClearColor(0xffffff,1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
    renderer.setAnimationLoop(loop);
    
    //CONTROLS
    controls = new PointerLockControls(camera, document.body)

    //Lock the pointer( activate controls ) and start the experience hiding the menu
    function startExperience(){
      //lock the pointer
      controls.lock()
      //hide the menu
      hideMenu()
      
    }

    //event listener to the enter gallery button
    let playButton = document.getElementById("play_button")
    playButton.addEventListener("click", startExperience)

    //Hide Menu Function
    function hideMenu(){
      let menu = document.getElementById("menu")
      menu.style.display="none" //hide the menu
      enterFullscreen()
    }

    //Show Menu Function
    function showMenu(){
      let menu = document.getElementById("menu")
      menu.style.display="block"
      enterFullscreen() 
    }

    //Enter fullscreen Function
    function enterFullscreen(){
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
      if(!fullscreenElement){
        if(containerRef.value.requestFullScreen){
          containerRef.value.requestFullScreen()
        }
        else if(containerRef.value.webkitRequestFullscreen){
          containerRef.value.webkitRequestFullscreen()
        }
      }
      else{
        if(document.exitFullscreen){
          document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen){
          document.webkitExitFullscreen()
        }
      }
    }

    controls.addEventListener("unlock", showMenu)

  
    window.addEventListener("resize", resizeCallback);
  });
})
  
onUnmounted(() => {
  renderer.setAnimationLoop(null);
});
  
</script>
  
<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #28282f;
  margin: 0em;
}

body {
  margin: 0em;
  padding: 0em;
  overflow: hidden;
  font-family: 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
    'Lucida Grande', sans-serif;
  background-color: #121212;
  cursor: url('http://www.rw-designer.com/cursor-view/97756.png') 16 16, auto;
}

p,
img,
div,
canvas {
  vertical-align: top;
}

::-moz-selection {
  /* Code for Firefox */
  background: #34495e;
  background-color: #34495e;
  color: #fff;
}

::selection {
  /* Code for Chrome, Safari and Opera */
  background: #34495e;
  background-color: #34495e;
  color: #fff;
}

.hide {
  /* Hide elements */
  display: none;
}

#menu {
  width: 48em;

  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -46%);

  border-radius: 0.9em;

  text-align: center;
  font-size: 1.2em;

  background-color: white;
  opacity: 1;

  box-shadow: none;

  animation: fadeIn 1s ease-in;
}

#menu #content_container {
  background-color: #fff;
  padding: 1em;
  border-bottom-left-radius: 0.9em;
  border-bottom-right-radius: 0.9em;

  -webkit-box-shadow: 0em 0.25em 0.75em rgba(124, 124, 124, 0.5);
  -moz-box-shadow: 0em 0.25em 0.75em rgba(124, 124, 124, 0.5);
  box-shadow: 0em 0.25em 0.75em rgba(124, 124, 124, 0.5);
}

#menu #img_container {
  position: relative;
  height: 14.5em;
  overflow: hidden;
  border-top-left-radius: 0.9em;
  border-top-right-radius: 0.9em;
}

#menu #img_container img {
  flex-shrink: 0;
  width: 105%;
}

#menu #content {
  padding: 0.5em;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInSlideUp 3s ease-out forwards;
}

@keyframes fadeInSlideUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

#menu #content div {
  margin-bottom: 1em;
}

#menu h1 {
  font-family: 'Oswald';
  letter-spacing: 0.25em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

#menu #content p {
  font-family: 'Lato', sans-serif;
  font-size: 1.1em;
  font-weight: 500;
  line-height: 1.6em;
  color: #333;
  margin: 0.2em 0;
}

#menu #content p.instructions {
  font-size: 1.3em;
  font-weight: 600;
  margin-bottom: 0.75em;
}

#menu #play_button {
  display: inline-block;
  background-color: #34495e;
  color: #fff;
  border-radius: 0.9em;
  padding: 0.5em 1.5em;
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 1.5em;
  transition: all 0.4s;
}

#menu #play_button:hover {
  background-color: #2323be;
  color: #fff;
  transform: scale(1.05);
  cursor: pointer;
  transition: all 0.4s;
}

#menu #play_button p {
  font-family: 'Oswald';
  letter-spacing: 0.125em;
  color: white;
  font-size: 1.3em;
  transition: all 0.4s;
}

#menu #play_button:hover p {
  color: #2323be;
  transition: all 0.4s;
  color: white;
}

#background_menu {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: #111;
  opacity: 0.125;
}

canvas {
  width: 100%;
  height: 100%;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.title {
  position: relative;
  display: inline-block;
  margin-bottom: 1em;
}

.title .stroke {
  color: transparent;
  -webkit-text-stroke: 2px #2323be;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  animation: fadeIn 2s ease-in;
}

.title .main {
  position: relative;
  z-index: 2;
  color: #fff;
  text-shadow: 2px 2px 0px #2323be, 4px 4px 0px rgba(0, 0, 0, 0.4);
  animation: fadeIn 2s ease-in;
}

#starry_night_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://th.bing.com/th/id/R.cf8cb0d1a972300c5e60b3ebf20b5779?rik=QLOj5Ukvu%2brJNQ&pid=ImgRaw&r=0');
  background-size: cover;
  background-position: center;
  z-index: -1;
  animation: panBg 30s linear infinite;
  background-attachment: fixed;
}

@keyframes panBg {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

#painting-info {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  font-family: 'Arial', sans-serif;
  color: #fff;
  width: 300px;
  height: auto;
  z-index: 990;
  transition: all 0.3s ease-in-out;
  transform: translate(500px, 100px);
  opacity: 0;
}

#painting-info.show {
  transform: translate(500px, 150px);
  opacity: 1;
  z-index:990;
}

#painting-info h3 {
  margin: 0 0 10px 0;
  font-size: 2em;
  font-weight: bold;
  text-transform: uppercase;
}

#painting-info p {
  margin: 0;
  font-size: 1.2em;
}
</style>