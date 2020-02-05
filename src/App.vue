<template>
  <div id="app">
    <!-- <h1 class="info">口罩供需資訊平台</h1> -->
    <vue-leaflet />
  </div>
</template>

<script>

import VueLeaflet from './components/VueLeaflet.vue'

export default {
  name: 'app',
  components: {
    VueLeaflet
  }
}
</script>

<style lang="scss">
@import './styles/reset';

.info {
  position: fixed;
  display: block;
  z-index: 10;
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
}
</style>
