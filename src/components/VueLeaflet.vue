<template>
  <div class="vue-leaflet">
    <div class="map">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <v-marker-cluster>
          <l-marker v-for="s in stores" :key="s.id" :lat-lng="getCoods(s.x, s.y)" >
            <l-popup :content="s.name"></l-popup>
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
  // LGeoJson,
  LPopup
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
      zoom: 11,
      center: L.latLng(25.0677505, 121.5470599),
      token: '',
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
    renderMap () {
      fetch('./med-stores.json')
        .then(res => res.json())
        .then(jsonData => {
          // console.log(jsonData)
          this.stores = jsonData
        })
    }
  },
  mounted () {
    this.renderMap()
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
</style>
