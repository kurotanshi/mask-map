<template>
  <div class="vue-leaflet">
    <div class="map">

      <l-map :zoom="zoom" :center="center" :options="{ zoomControl: false }" ref="myMap">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <l-marker :lat-lng="center" :icon="icon" ref='hereMarker'></l-marker>

        <v-marker-cluster>
          <l-marker v-for="s in stores" :key="s.id" :lat-lng="getCoods(s.x, s.y)">
            <l-popup :content="getPopup(s)"></l-popup>
          </l-marker>
        </v-marker-cluster>

        <!-- <l-geo-json :geojson="geoJson" :options="geoJsonOptions"></l-geo-json> -->
      </l-map>
    </div>
  </div>
</template>

<script>
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup
  // LGeoJson,
} from 'vue2-leaflet'

var L = window.L

export default {
  name: 'VueLeaflet',
  components: {
    'v-marker-cluster': Vue2LeafletMarkerCluster,
    LMap,
    LTileLayer,
    LMarker,
    // LGeoJson,
    LPopup
  },
  data () {
    return {
      stores: [],
      zoom: 16,
      center: L.latLng(25.0677505, 121.5470599),
      token: '',
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }
  },
  methods: {
    getCoods (x, y) {
      x = x.toString()
      y = y.toString()
      let lng = x.includes('\n') ? x.split('\n')[0] : x
      let lat = y.includes('\n') ? y.split('\n')[0] : y

      return [lat, lng]
    },
    getPopup (item) {
      let addr = item.address.includes('\n') ? item.address.split('\n')[0] : item.address

      return `
        <h3 class="store-title">${item.name}</h3>
        <div class="store-info">
          <a target="_blank" href="https://www.google.com.tw/maps/place/${addr}">${addr}</a><br>
          ${item.tel}
        </div>
      `
    },
    renderMap () {
      fetch('./med-stores.json')
        .then(res => res.json())
        .then(jsonData => {
          // console.log(jsonData[0])
          this.stores = jsonData
        })
    }
  },
  mounted () {
    this.renderMap()

    this.$nextTick(() => {
      const map = this.$refs.myMap.mapObject
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      navigator.geolocation.getCurrentPosition((pos) => {
        const p = pos.coords
        this.center = L.latLng(p.latitude, p.longitude)
        this.$refs.hereMarker.mapObject.bindTooltip('You', {
          offset: [0, -36],
          permanent: true,
          direction: 'top'
        })
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.vue-leaflet {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
}
.map-info {
  display: block;
  padding: .75em 1.75em;
  background-color: #fff;
  border: 1px solid #000;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
}
.map{
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

>>> .store-title {
  font-size: 1.3em;
  line-height: 1.7em;
  font-weight: 900;
  margin-bottom: 6px;
}

>>> .store-info {
  font-size: 1.1em;
  line-height: 1.5;
}

</style>
