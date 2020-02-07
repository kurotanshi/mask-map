<template>
  <div id="app">

    <div class="info" @click.prevent="isPopupShow = true">
      <h1>口罩供需資訊平台 & 健保特約醫事機構地圖</h1>
      <i class="fas fa-info-circle"></i>
    </div>

    <infoPopup v-show="isPopupShow" @close="isPopupShow = false" />

    <vue-leaflet />
  </div>
</template>

<script>

import VueLeaflet from './components/VueLeaflet.vue'
import infoPopup from './components/infoPopup.vue'

export default {
  name: 'app',
  components: {
    VueLeaflet,
    infoPopup
  },
  data () {
    return {
      isPopupShow: false
    }
  }
}

</script>

<style lang="scss">
@import './styles/reset';

.info {
  box-sizing: border-box;
  padding: 0 1em;
  position: fixed;
  display: block;
  width: 100%;
  height: 2.2em;
  line-height: 2.2em;
  background-color: #fff;
  z-index: 10;

  h1 {display: inline-block;}
}

.fa-info-circle {
  margin-left: 1em;
}
</style>
