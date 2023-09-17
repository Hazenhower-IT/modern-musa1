<template>
    <div style="display: flex; flex-direction: row;" >
        <RouterLink to="/"><img src="../assets/home.png" style="width:50px; height: 50px;" /></RouterLink>
    </div>
    <nav class="menu">
        
        <p class="title is-5 menu-label">
            Categorie
        </p>

        <ul class="menu-list">
            <li><RouterLink to="/models-3d">3D Models</RouterLink></li>
            <li><RouterLink to="/illustrazioni">Illustrazioni</RouterLink></li>
            <li><RouterLink to="/grafica">Grafica 3D</RouterLink></li>        
            <li><RouterLink to="/motion-graphics">Motion Graphics</RouterLink></li>
        </ul>

    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style>
</style>