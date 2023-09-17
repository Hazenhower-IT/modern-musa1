<template>
  <section class="hero is-fullheight" style="background-color: #000000;">
            
    <div class="columns" style="padding-bottom: 0; margin-bottom: 0;">
              
      <div class="column is-one-fifth">
        <!-- Sidebar sinistra -->
        <SideNavbar style="height: 100vh;" />
      </div>
      
      <div class="column">
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
          <RouterLink to="/">
          <img src="../src/assets/musa1.png" style="width:70px;height:70px;"/>
          </RouterLink>  
        <h1 class="title is-1" style="padding-left: 20px;">
          Modern Musa
        </h1>
        </div>
       
        <RouterView />
      </div>

    </div>
  </section> 
</template>
  
<script setup>
import SideNavbar from "../src/components/SideNavbar.vue"

</script>
  
<style>

</style>
  
  
  
  
  