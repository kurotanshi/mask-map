/* eslint-disable no-unused-vars */
<template>
  <div class="vue-leaflet">
    <div class="map">

      <l-map :zoom="zoom" :center="center" :options="{ zoomControl: false }" ref="myMap">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="center" :icon="icon" ref='hereMarker'></l-marker>
        <v-marker-cluster :options="clusterOptions">
          <l-geo-json v-for="geoJson in stores" :key="geoJson.id" :geojson="geoJson" :options="geoJsonOptions"></l-geo-json>
        </v-marker-cluster>
      </l-map>
    </div>
  </div>
</template>

<script>

import {
  LMap,
  LTileLayer,
  LMarker,
  LGeoJson
} from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

const L = window.L

export default {
  name: 'VueLeaflet',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  data () {
    return {
      stores: [],
      center: L.latLng(25.0677505, 121.5470599),
      zoom: 15,
      isEmptyHide: false,
      clusterOptions: {
        disableClusteringAtZoom: 16
      },
      geoJsonOptions: {
        style: (feature) => {

        },
        pointToLayer: this.createCustomIcon,
        onEachFeature: (feature, layer) => {
          // console.log(feature, layer)
          layer.bindPopup(this.getPopup(feature.properties))
        }
      },
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
      return `
        <h3 class="store-title">${item.name}</h3>
        <div class="store-info">
          <div>成人口罩: ${item.mask_adult}</div>
          <div>小孩口罩: ${item.mask_child}</div>
          <div>資料更新: ${item.updated}</div>
          <a target="_blank" href="https://www.google.com.tw/maps/place/${item.address}">${item.address}</a><br>
          ${item.phone}
        </div>
      `
    },
    createCustomIcon (feature, latlng) {
      let prop = feature.properties
      let range = prop.mask_adult + prop.mask_child
      let color = null

      if (range > 100) {
        color = 'green'
      } else if (range > 50) {
        color = 'yellow'
      } else if (range > 0) {
        color = 'red'
      } else {
        color = 'grey'
      }

      let myIcon = L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })

      return L.marker(latlng, { icon: myIcon })
    },
    renderMap () {
      fetch('https://kiang.github.io/pharmacies/json/points.json')
        .then(res => res.json())
        .then(jsonData => {
          console.log(jsonData)
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
