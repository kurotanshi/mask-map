<template>
  <div id="app">

    <div class="info" @click.prevent="isPopupShow = true">
      <h1>口罩供需資訊平台 & 健保特約醫事機構地圖</h1>
      <i class="fas fa-info-circle"></i>
    </div>

    <div class="popup" v-show="isPopupShow">
      <a class="popup-close" href @click.prevent="isPopupShow = false">
        <i class="fas fa-times-circle"></i>
      </a>
      <p>您好：</p>
      <p>口罩的取得須依政府頒布的規則辦理。 庫存數量僅供參考，資訊約每分鐘更新一次，實際庫存仍以個別單位現場為準。</p>
      <p>詳細情況以 <a target="_blank" href="https://www.nhi.gov.tw/Content_List.aspx?n=395F52D193F3B5C7&topn=787128DAD5F71B1A">衛生福利部中央健康保險署</a> 說明為主，本網頁資料由 <a target="_blank" href="https://mask.pdis.nat.gov.tw/">口罩供需資訊平台</a> 與社群朋友提供，感謝各方協助</p>
    </div>

    <vue-leaflet />
  </div>
</template>

<script>

import VueLeaflet from './components/VueLeaflet.vue'

export default {
  name: 'app',
  components: {
    VueLeaflet
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

.popup {
  box-sizing: border-box;
  border-radius: 10px;
  position: fixed;
  display: block;
  width: 90%;
  min-height: 150px;
  background-color: #fff;
  top: 15%;
  left: 5%;
  padding: 1.5rem;
  line-height: 1.5;
  z-index: 100;
  border: 2px solid #999;

  p {
    margin-bottom: 1em;
  }

  .popup-close {
    top: -0.5em;
    right: -0.25em;
    font-size: 2rem;
    position: absolute;
    color: #333;
  }
}
</style>
