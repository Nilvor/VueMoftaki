<template>
  <l-map style="height: 300px" :zoom="map.zoom" :center="map.center" @click="toggleMarker">
    <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
    <l-marker :lat-lng="map.markerLatLng">
      <l-icon
          :icon-size="[20,40]"
          :icon-anchor="[22, 94]"
          icon-url="src/assets/icons/map-icons/d-green-car.png" >
      </l-icon>
    </l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue3-leaflet';
import {ref} from "vue";

export default {

  name: "ShopMap",
  components: {LMap, LTileLayer, LMarker},

  setup() {

    var map = ref({
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 30,
      center: [32.66569, 51.65846],
      markerLatLng: [32.66569, 51.65846]
    })

    function toggleMarker(e) {
      console.log(e.latlng)
      map.value.markerLatLng = e.latlng
    }

    return {map, toggleMarker}
  }
}
</script>
