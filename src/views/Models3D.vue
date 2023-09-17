<template>
    <div class="container is-fluid">
        <h1 class="title" style="text-align: center;">
          3D Model
        </h1>
        <!-- Contenuto principale -->       
        <div class="columns is-multiline">
            
            <!--COLONNA 1-->

            <!-- Elenco delle opere d'arte -->
            <div class="column is-4">
                
                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="man-and-horse.glb" name="statua1" :scale="0.3" :position-y="0.6" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">Knight On Horse</p>
                            <p class="subtitle is-6">Characters</p>
                        </div>
                    </div>
                </div>
                
                <!-- Ripetere qui il blocco di codice Card per inserire altre opere d'arte in colonna -->
                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="neck-amphora.glb" name="neck-amphora" :scale="0.05" :position-y="0.1" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">Neck Amphora</p>
                            <p class="subtitle is-6">Arts</p>
                        </div>
                    </div>
                </div>

                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="kama_dagger.glb" name="kama-dagger" :scale="0.005" :position-y="-0.6" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">Kama Dagger</p>
                            <p class="subtitle is-6">Weapons</p>
                        </div>
                    </div>
                </div>

            </div>
            
            <!-- Ripetere qui il blocco di codice (da riga 10 fino a quella precedente a questa) per inserire creare altre colonne  ( max altre 2) -->

            <!--COLONNA 2-->
            <div class="column is-4">
                
                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="bust_of_roza_loewenfeld.glb" name="bust-of-roza" :scale="0.005" :position-y="-0.6" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">R.Loewenfeld Bust</p>
                            <p class="subtitle is-6">Arts</p>
                        </div>
                    </div>
                </div>
                
                <!-- Ripetere qui il blocco di codice Card per inserire altre opere d'arte in colonna -->
                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="p35-pistol.glb" name="p35-pistol" :scale="0.01" :position-y="-0.2" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">P35-Pistol</p>
                            <p class="subtitle is-6">Weapons</p>
                        </div>
                    </div>
                </div>

<!--//////////////////////////////////////////////////// CONTINUA DA QUI ////////////////////////////////////////////////////////////////////////////////////////// -->
                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="eros-pelike/scene.gltf" name="eros-pelike-amphora" :scale="0.006" :position-y="-1.2" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">Eros Amphora</p>
                            <p class="subtitle is-6">Arts</p>
                        </div>
                    </div>
                </div>

            </div>

            <!--COLONNA 3-->
            <div class="column is-4">
                
                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="scifi-building-2/scene.gltf" name="scifi-building" :scale="0.08" :position-y="-1" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">Sci-fi Building</p>
                            <p class="subtitle is-6">Buildings</p>
                        </div>
                    </div>
                </div>
                
                <!-- Ripetere qui il blocco di codice Card per inserire altre opere d'arte in colonna -->
                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="satellite/scene.gltf" name="satellite" :scale="1.5" :position-y="-0.1" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">Satellite</p>
                            <p class="subtitle is-6">Space</p>
                        </div>
                    </div>
                </div>

                <!--Card-->
                <div class="card">                    
                    <Custom3DModel custom-model="ufo2/scene.gltf" name="ufo" :scale="0.01" :position-y="-0.1" style="margin:0; padding:0;" />
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-5">Ufo</p>
                            <p class="subtitle is-6">Space</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
    
<script setup>
import Custom3DModel from "../components/Custom3DModel.vue";
import ThreeScene from "../components/ThreeScene.vue"
    
</script>
    
<style>

.title {
  font-size: 4rem;
  margin-bottom: 1rem;
}
  
.subtitle {
  font-size: 2rem;
}
  

  
.menu-list li {
  margin-bottom: 0.5rem;
}
  
.card {
  margin-bottom: 1rem;
}
  
.card-image {
  max-height: 200px;
  overflow: hidden;
}
  
.card-image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

  
  
  
  
  
</style>
    
    
    
    
    